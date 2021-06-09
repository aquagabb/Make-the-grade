const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();



async function createStudent(username,email,password,phone) {
    const kind = 'Students';

    const taskKey = datastore.key([kind]);

    const shortAnswerTest = {
      key: taskKey,
      data: {
        username: username,
        email: email,
        password: password,
        phone: phone,
      },
    };
    await datastore.save(shortAnswerTest);
  }


async function loginStudent(username,password) {

    const query = datastore.createQuery('Students');
    var teachers;
    var verifyStudent = false;

    await datastore.runQuery(query)
      .then(results => {
        teachers = results[0]

        console.log(teachers)
        teachers.map(teacher => {

            if (username === teacher.username && password == teacher.password)
              verifyStudent = teacher[datastore.KEY].id;
            
               

      });

      })


    return verifyStudent;

  }

async function getStudents() {

    const query = datastore.createQuery('Students');
    var teachers;
    await datastore.runQuery(query)
      .then(results => {
        teachers = results[0]

        const sendTeachers = teachers.map(teacher=> {

            return {username: teacher.username, email: teacher.email, password: teacher.password , phone: teacher.phone ,studentId: teacher[datastore.KEY].id }


      });

      teachers = sendTeachers;

      })


    return teachers;


  }


async function findStudentbyId(teacherId) {

    const query = datastore.createQuery('Students');
    var teachers;
    var teacherData;
    await datastore.runQuery(query)
      .then(results => {
        teachers = results[0]

        teachers.map(teacher => {

            if (teacherId === teacher[datastore.KEY].id )
                teacherData =  {username: teacher.username, email: teacher.email, password: teacher.password , phone: teacher.phone ,teacherId: teacher[datastore.KEY].id }

      });

      })


    return teacherData;


  }


async function deleteStudentbyId(teacherId) {

    const taskId = Number(teacherId);
    const taskKey = datastore.key(['Students', taskId]);
    await datastore.delete(taskKey); 

  }

module.exports = {

    createStudent,
    getStudents,
    findStudentbyId,
    deleteStudentbyId,
    loginStudent


}