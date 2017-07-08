var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'thumbscheck'
});


console.log(`db connection: DB_HOST ${process.env.DB_HOST}, DB_USERNAME ${process.env.DB_USERNAME}, DB_PASSWORD ${process.env.DB_PASSWORD}, DB_NAME ${process.env.DB_NAME}`);

exports.getUserType = function (gmail) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT user_type FROM users WHERE gmail = "${gmail}"`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.createNewLecture = function (name) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO lectures (name) VALUES ("${name}")`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.createNewQuestion = function (lectureId) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO questions (lectureId) VALUES ("${lectureId}")`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};

/* Section
*/

exports.addAvgThumbForQuestion = function (questionId, avgThumbValue) {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE questions SET average_thumb_question=${avgThumbValue} WHERE id=${questionId}`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.addAvgThumbForLecture = function (lectureId, avgThumbValue) {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE lectures SET average_thumb_lecture=${avgThumbValue} WHERE id=${lectureId}`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getAvgThumbsForQuestionsInLecture = function (lectureId) {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT average_thumb_question FROM questions WHERE lectureId=${lectureId}`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};














exports.addMCQAnswerForQuestion = function(questionId, MCQAnswers) {
  return new Promise ((resolve, reject) => {
    console.log(questionId,MCQAnswers )
    pool.query(`UPDATE questions SET MCQ_responses=${MCQAnswers} WHERE id=${questionId}`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.addMCQAnswerForLecture = function(lectureId, MCQAnswers) {
  return new Promise ((resolve, reject) => {
    pool.query(`UPDATE lectures SET MCQ_responses=${MCQAnswers} WHERE id=${lectureId}`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}

exports.getMCQAnswersForQuestionsInLecture = function(lectureId) {
  return new Promise ((resolve, reject) => {
    pool.query(`SELECT MCQ_responses FROM questions WHERE lecture_id=${lectureId}`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })
}
















/* Section
*/

exports.createThumbData = function (gmail, questionId, thumbsValue) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO thumbs (user_id, question_id, thumb_value) VALUES ((SELECT id FROM users WHERE gmail="${gmail}"), ${questionId}, ${thumbsValue})`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};


exports.createMCQData = function(gmail, questionId, MCQAnswer) {
  return new Promise ((resolve, reject) => {
    pool.query(`INSERT INTO MCQAnswers (user_id, question_id, MCQ_value) VALUES ((SELECT id FROM users WHERE gmail="${gmail}"), ${questionId}, ${MCQAnswer})`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  })}

exports.getUserId = function(gmail) {
  return new Promise ((resolve, reject) => {

    pool.query(`SELECT id FROM users WHERE gmail = "${gmail}"`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};


exports.addStudent = function (first, last, gmail) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO users (first_name, last_name, gmail, user_type) VALUES ("${first}", "${last}", "${gmail}", "STUDENT");`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};

// test

/*
=======
/* Section
*/

exports.asyncTimeout = function (time, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let results = 'no callback';
      if (callback) {
        results = callback();
      }
      resolve(results);
    }, time || 1000);
  });
};


// add question to the data base 
exports.createQuestion = function (lectureId, question) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO questions (lectureId, questionName) VALUES ("${lectureId}", "${question}")`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};


// add answers to the db 
exports.addAnswers = function (questionId, options) {
  return new Promise((resolve, reject) => {
    pool.query(`INSERT INTO answers (questionId, option1, option2, option3, option4) VALUES ("${questionId}",${options[0]}","${options[1]}","${options[2]}","${options[3]}",)`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};


// pull questions from the db for the lecture 

exports.getQuestions = function (lectureId) {
  return new Promise((resolve, reject) => {
    pool.query(`select * from questions where questions.lectureId = "${lectureId}"`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};

// pull all answers for questionId 

exports.getAnswers = function (questionId) {
  return new Promise((resolve, reject) => {
    pool.query(`select * from answers where answers.questionId = "${questionId}"`, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        resolve(results);
      }
    });
  });
};