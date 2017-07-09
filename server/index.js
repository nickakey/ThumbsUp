var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var db = require('../database-mysql');
var google = require('./middleware/googleAuth.js');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//var thumbsData = require('./middleware/thumbsData.js');
var MCQData = require('./middleware/MCQData.js');

const port = process.env.PORT || 3000;

server.listen(port);

var lectureId = '';
var questionId = '';
var thumbs = '';
var MCQs = '';
var instructorId = '';  // this will be the socket.id

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/login', (req, res) => {
  var googleResults;
  google.verifyToken(req.query.tokenId, '680855944065-qdr8lsnna8oolpo50sar7i6dm5d1akip.apps.googleusercontent.com')
    .then(fromGoogle => {
      googleResults = fromGoogle;
      return db.getUserType(fromGoogle.gmail);
    })
    .then(result => {
      console.log(result);
      if (result.length === 0) {
        //add user to db
        console.log(`add user to db, ${googleResults.gmail}`);
        return db.addStudent(googleResults.first, googleResults.last, googleResults.gmail);
      } else {
        res.status(200).send(result);
        throw ('early exit from promise chain');
      }
    })
    .then(result => {
      console.log(result);
      return db.getUserType(googleResults.gmail);
    })
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/lecture', (req, res) => {
  console.log('post to lecture is happening! ', req.query.name);
  let name = req.query.name;
  db.createNewLecture(name)
    .then(results => {
      lectureId = results.insertId;
      res.send({ lectureId: lectureId });
      io.emit('lectureStarted', {
        lectureId: lectureId,
        lectureName: name
      });
    });
});

app.post('/checkthumbs', (req, res) => {
  let lecture = req.query.lectureId;
  db.createNewQuestion(lecture)
    .then(results => {
      questionId = results.insertId;
      thumbs = new ThumbsData(lectureId, questionId);
      //Emit the new question to students here
      io.emit('checkingThumbs', { questionId: questionId });
      //This will add thumbsdata in the db after the question ends
      db.asyncTimeout(32000, () => {
        for (let student in thumbs.students) {
          //console.log(`${thumbs.students[student].gmail}, ${thumbs.questionId}, ${thumbs.students[student].thumbValue}`);
          db.createThumbData(thumbs.students[student].gmail, thumbs.questionId, thumbs.students[student].thumbValue);
        }
        db.addAvgThumbForQuestion(questionId, thumbs.getAverageThumbValue());
      });
      //send the response to the teacher
      res.send({ questionId: questionId });

    });
});

app.post('/mcq', (req, res) => {
  //console.log('Karel Luwena')
  let lecture = req.query.lectureID;
  db.createNewQuestion(lecture)
    //console.log('server-side mcq side')
    .then(results => {
      questionId = results.insertId;
      //console.log('this is the questionId in the MCQ post server-side', questionId)
      //console.log('this is the MCQDAta', MCQData.MCQData)
      MCQ = new MCQData.MCQData(lectureId, questionId);
      //Emit the new question to students here
      io.emit('posingMCQ', { questionId: questionId });
      //This will add thumbsdata in the db after the question ends
      db.asyncTimeout(10000, () => {
        console.log('this is the OBJECT after the set timeout!! ', MCQ)
        for (let student in MCQ.students) {
          //console.log(`${thumbs.students[student].gmail}, ${thumbs.questionId}, ${thumbs.students[student].thumbValue}`);
          db.createMCQData(MCQ.students[student].gmail, MCQ.questionId, MCQ.students[student].MCQAnswer);
        }
        //console.log('here is the qid', questionId, 'and here is the other thang', MCQ.getMCQAnswerString())
        db.addMCQAnswerForQuestion(questionId, MCQ.getMCQAnswerString());
      });
      //send the response to the teacher
      res.send({ questionId: questionId });
    });
});


app.post('/endLecture', (req, res) => {
  let lecture = req.query.lectureId;
  // calculate the average for all thumbs in lecture
  // and store it in the database
  io.emit('lectureEnded', { response: 'ok' });

  db.getAvgThumbsForQuestionsInLecture(lectureId)
    .then(results => {
      console.log(results);
      let sum = 0;
      let avg = 0;
      for (let i = 0; i < results.length; i++) {
        sum += results[i].average_thumb_question;
      }
      avg = (sum / results.length);
      db.addAvgThumbForLecture(lectureId, avg);
    });
  res.status(200).send('end lecture');
});

io.on('connection', function (socket) {
  console.log(`socket: ${socket}`);

  //put the gmail username on each socket that is connected
  socket.on('username', function (data) {
    console.log('username', data);
    socket.username = data.username;
  });

  socket.on('instructor', data => {
    instructorId = socket.id;
    socket.instructor = data.username;
    console.log(`the instructor is: ${socket.instructor}`);

  });


  socket.on('MCQAnswer', data => {
    console.log('this is where the multiple choice answer goes ', data);
    //console.log('here at MCQ socket answer receiver before if')
    if (MCQ) {
      //console.log('here at MCQ socket answer receiver')
      if (!MCQ.hasStudent(socket.username)) {
        let student = new Student(socket.username, socket.id);
        MCQ.addStudent(student);
      }
      MCQ.setThumbValueForStudent(socket.username, data.MCQAnswer);
      let allAnswersInString = MCQ.getMCQAnswerString();
      io.emit('allAnswersInString', { allAnswersInString: allAnswersInString });
      console.log(`sending allAnswersInString of ${allAnswersInString}`);
      console.log(`MCQ value for ${socket.username} is ${data.MCQAnswer}`);
      console.log(`huge class for ${socket.username} is ${MCQ.students[socket.username].MCQAnswer}`);
    }
  });

  //recieve the thumb value from the student
  socket.on('thumbValue', data => {
    if (thumbs) {
      if (!thumbs.hasStudent(socket.username)) {
        let student = new Student(socket.username, socket.id);
        thumbs.addStudent(student);
      }
      thumbs.setThumbValueForStudent(socket.username, data.thumbValue);
      let average = thumbs.getAverageThumbValue();
      io.emit('averageThumbValue', { averageThumbValue: average });
      console.log(`sending averageThumbValue of ${average}`);
      console.log(`thumb value for ${socket.username} is ${data.thumbValue}`);
    }
  });
});

class ThumbsData {
  constructor(lectureId, questionId, instructor) {
    this.lectureId = lectureId;
    this.questionId = questionId;
    this.students = {};
    this.instructor = instructor;
  }

  //adds a student to the data structure
  addStudent(student) {
    this.students[student.gmail] = student;
  }

  //sets the thumb value for the student
  setThumbValueForStudent(gmail, thumbValue) {
    this.students[gmail].thumbValue = thumbValue;
  }

  //returns the average thumb value
  getAverageThumbValue() {
    let count = 0;
    let total = 0;
    for (let student in this.students) {
      if (this.students[student].thumbValue || this.students[student].thumbValue === 0) {
        count++;
        total += this.students[student].thumbValue;
      }
    }
    return total / count;
  }

  //check if a student is connected
  hasStudent(gmail) {
    return this.students.hasOwnProperty(gmail);
  }
}

class Student {
  constructor(gmail, socketId) {
    this.gmail = gmail;
    this.socketId = socketId;
    this.thumbValue = null;
  }
}

// post question 

//you can delete the thing below this
app.post('/questionsAnswers', (req, res) => {
  const questionObject = JSON.parse(req.query.options);
  return db.createNewQuestion(questionObject.lectureID, questionObject.question, questionObject.answer1, questionObject.answer2, questionObject.answer3, questionObject.answer4)
  .then((dbres)=>{
    console.log('this is the database res ', dbres)
    res.status(200)
    .send(dbres)
    .end();
  })
  .catch((err)=>{
    console.log('this is err! ', err);
  })
});

// get questions 
app.get('/questions', (req, res) => {
  console.log(req.query)
  console.log(req.query.url)
  console.log(req.url)
  var lectureId = req.query.lectureId;
  return db.getQuestions(lectureId)
    .then(results => {
      res.status(200).send(result);
    });
});

app.get('/questionsByLectureName', (req, res) => {
  return db.getLectureId(req.query.lectureName)
  .then(results => {
    console.log('this should be a lecture id ', results[0].id)
    return db.getQuestions(results[0].id)
  })
  .then(results => {
    res
    .status(200)
    .send(results);
  })




});


app.get('/lectures', (req, res) => {
  return db.getLectures()
    .then(results => {
      res
      .status(200)
      .send(results);
    });
});


app.get('/lectures', (req, res) => {
  return db.getLectures()
    .then(results => {
      res
      .status(200)
      .send(results);
    });
});

// get answers 

app.get('/answers', (req, res) => {
  var questionId = req.body.questionId;

  return db.getAnswers(questionId)
    .then(results => {
      res.status(200).send(result);
    });
});
