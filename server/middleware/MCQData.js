class MCQData {
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
  setThumbValueForStudent(gmail, MCQAnswer) {
    this.students[gmail].MCQAnswer = MCQAnswer;
  }

  getAverageThumbValue() {
    
    return 6;
  }

  //returns the average thumb value
  getMCQAnswerString() {
    console.log('here in server/db helper')
    var allAnswers = '';
    for (let student in this.students) {
      if ('answer here', this.students[student].MCQAnswer) {
        console.log(this.students[student].MCQAnswer)
        allAnswers = allAnswers.concat(this.students[student].MCQAnswer)
      }
    }
    return allAnswers;
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
    this.MCQAnswer = null;
  }
}


module.exports.MCQData = MCQData;
//module.exports.Student = Student;


