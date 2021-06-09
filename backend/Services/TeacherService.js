const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();



async function createTeacher(username,email,password,phone) {
    const kind = 'Teachers';

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

async function getTeachers() {

    const query = datastore.createQuery('Teachers');
    var teachers;
    await datastore.runQuery(query)
      .then(results => {
        teachers = results[0]

        const sendTeachers = teachers.map(teacher=> {

            return {username: teacher.username, email: teacher.email, password: teacher.password , phone: teacher.phone ,teacherId: teacher[datastore.KEY].id }


      });

      teachers = sendTeachers;

      })


    return teachers;


  }



  
async function loginTeacher(username,password) {

    const query = datastore.createQuery('Teachers');
    var teachers;
    var verifyTeacher = false;


    console.log(username,password)
    await datastore.runQuery(query)
      .then(results => {
        teachers = results[0]

        teachers.map(teacher => {

            if (username === teacher.username && password == teacher.password)
                verifyTeacher = teacher[datastore.KEY].id;

      });

      })


    return verifyTeacher;

  }


async function findTeachersbyId(teacherId) {

    const query = datastore.createQuery('Teachers');
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


async function deleteTeacherById(teacherId) {

    const taskId = Number(teacherId);
    const taskKey = datastore.key(['Teachers', taskId]);
    await datastore.delete(taskKey); 

  }

module.exports = {

    createTeacher,
    getTeachers,
    findTeachersbyId,
    deleteTeacherById,
    loginTeacher


}