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
      if (this.students[student].thumbValue) {
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


module.exports.ThumbsData = ThumbsData;
module.exports.Student = Student;
// let chris = new Student('caaker@gmail.com', 'ASKDK293949');
// let shyan = new Student('shyan@gmail.com', 'DJHWIW93944');
// let mike = new Student('mike@gmail.com', 'WOEKD293935');
// let rob = new Student('rob@gmail.com', 'PSIMQW93908');

// let question = new ThumbsData(1, 1, 'Mr. Sprinkles');
// question.addStudent(chris);
// question.addStudent(shyan);
// question.addStudent(mike);
// question.addStudent(rob);

// question.setThumbValueForStudent('caaker@gmail.com', 3);
// question.setThumbValueForStudent('shyan@gmail.com', 1);
// console.log(question.getAverageThumbValue());  // 2
// question.setThumbValueForStudent('mike@gmail.com', 2);
// question.setThumbValueForStudent('rob@gmail.com', 4);
// console.log(question.getAverageThumbValue()); // 2.5







