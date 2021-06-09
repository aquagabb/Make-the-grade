


const { Datastore } = require('@google-cloud/datastore');

const examService = require("./Services/ExamService");
const essayTestService = require("./Services/EssayTestsService");
const multipleChoiceService = require("./Services/MultipleChoiceTestsService");
const shortAnswerTestService = require("./Services/ShortAnswerTest");
const CatalogService = require("./Services/CatalogService");
const teacherService = require("./Services/TeacherService");
const studentService = require("./Services/StudentService");
const pendingService = require("./Services/PendingService");
const datastore = new Datastore();
'use strict';

// [START gae_node_request_example]
const express = require('express');

const app = express();

const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

app.use(cors()) 

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});



// const verifyCredentials = async (req, res) => {
//   const query = datastore.createQuery('Users');
//   await datastore.runQuery(query)
//     .then(results => {
//       console.log(results[0]);
//       const users = results[0]
//       // users.forEach(user => {
     
//       //   if()

//       // });
//       res.status(200).send("Query").end();
//     })
//     .catch(err => {
//       console.error('ERROR:', err)
//     })

// };

// app.get('/users/register', (req, res) => {
//   getCar(req,res);

// });



app.get('/users/login', (req, res) => {



});


// TODO Exams

app.post('/exams',async (req, res) => {


  const description = req.body.description;
  const teacherId = req.body.teacherId;

  const response = await examService.createExam(description,teacherId);

  res.status(200).send(response)

});

app.get('/exams', async (req, res) => {


  const response = await examService.getExams();


  res.status(200).json(response);


});


app.get('/exams/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await examService.findExamById(examId);

  res.status(200).json(response);


});

app.delete('/exams/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await examService.deleteExamById(examId);

  res.status(200).json(response);


});



// TODO Essays

app.post('/essay-tests', (req, res) => {

  const question = req.body.question;
  const examId = req.body.examId;

  essayTestService.createEssay(examId,question);

  res.status(200).send("S-a creat")

});

app.get('/essay-tests', async (req, res) => {


  const response = await essayTestService.getEssays();


  res.status(200).json(response);


});



app.get('/:id/essay-tests', async (req, res) => {

  const id = req.params.id;
  const response = await essayTestService.getEssayByIdExam(id);


  res.status(200).json(response);


});


app.get('/essay-tests/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await essayTestService.findEssayById(examId);

  res.status(200).json(response);


});

app.delete('/essay-tests/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await essayTestService.deleteEssayById(examId);

  res.status(200).json(response);


});



// TODO Multiple Choice Test

app.post('/multiple-choice-tests', (req, res) => {

  const question = req.body.question;
  const examId = req.body.examId;
  const possibleAnswers = req.body.possibleAnswers;
  const correctAnswers = req.body.correctAnswers;

  multipleChoiceService.createMultipleChoiceTest(examId,question,possibleAnswers,correctAnswers);

  res.status(200).send("S-a creat testul Multiple Choice")

});

app.get('/multiple-choice-tests', async (req, res) => {


  const response = await multipleChoiceService.getMultipleChoiceTest();


  res.status(200).json(response);


});


app.get('/:id/multiple-choice-tests', async (req, res) => {



  const id = req.params.id;

  const response = await multipleChoiceService.getMultipleChoiceTestByExamId(id);


  res.status(200).json(response);


});


app.get('/multiple-choice-tests/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await multipleChoiceService.findMultipleChoiceTestById(examId);

  res.status(200).json(response);


});

app.delete('/multiple-choice-tests/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await multipleChoiceService.deleteMultipleChoiceTestById(examId);

  res.status(200).send("S-a facut delete");


});


// TODO Short Answer Tests


app.post('/short-answer-tests', (req, res) => {

  const question = req.body.question;
  const examId = req.body.examId;

  shortAnswerTestService.createShortAnswerTest(examId,question);

  res.status(200).send("S-a creat testul Short Answer Test")

});

app.get('/:id/short-answer-tests', async (req, res) => {

  const id = req.params.id;
  const response = await shortAnswerTestService.getShortAnswerTestsbyExamId(id);


  res.status(200).json(response);


});


app.get('/short-answer-tests/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await shortAnswerTestService.findShortAnswerTestById(examId);

  res.status(200).json(response);


});

app.delete('/short-answer-tests/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await shortAnswerTestService.deleteShortAnswerTestById(examId);

  res.status(200).send("S-a facut delete");


});



// TODO Catalog


app.post('/catalogs', (req, res) => {

  const studentId = req.body.studentId;
  const teacherId = req.body.teacherId;
  const examId = req.body.examId;
  const grade = req.body.grade;
  const testId = req.body.testId;

  CatalogService.createCatalog(studentId,teacherId,examId,grade,testId);

  res.status(200).send("S-a creat in Catalog")

});

app.get('/catalogs', async (req, res) => {


  const response = await CatalogService.getCatalogs();


  res.status(200).json(response);


});

app.get('/catalogs/:id', async (req, res) => {

  const id = req.params.id;
  const response = await CatalogService.getCatalogsByStudentId(id);


  res.status(200).json(response);


});

app.get('/catalogs/:id/pdf', async (req, res) => {

  const id = req.params.id;
  const response = await CatalogService.saveToPDF(id);


  res.status(200).json(response);


});


app.delete('/catalogs/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await CatalogService.deleteCatalogById(examId);

  res.status(200).send("S-a facut delete catalog");


});

// TODO TEACHERS

app.post('/teachers', (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;

  teacherService.createTeacher(username,email,password,phone);

  res.status(200).send("S-a creat un Teacher")

});

app.post('/teachers/login',async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  const response = await teacherService.loginTeacher(username,password);

  res.status(200).send(response);

});

app.get('/teachers', async (req, res) => {


  const response = await teacherService.getTeachers();


  res.status(200).json(response);


});


app.get('/teachers/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await teacherService.findTeachersbyId(examId);

  res.status(200).json(response);


});

app.delete('/teachers/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await teacherService.deleteTeacherById(examId);

  res.status(200).send("S-a facut delete");


});


// TODO students



app.post('/students', (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;

  studentService.createStudent(username,email,password,phone);

  res.status(200).send("S-a creat un Student")

});


app.post('/students/login',async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  const response = await studentService.loginStudent(username,password);

  res.status(200).send(response);

});


app.get('/students', async (req, res) => {


  const response = await studentService.getStudents();


  res.status(200).json(response);


});


app.get('/students/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await studentService.findStudentbyId(examId);

  res.status(200).json(response);


});

app.delete('/students/:id', async (req, res) => {

  const examId = req.params.id;

  const response = await studentService.deleteStudentbyId(examId);

  res.status(200).send("S-a facut delete");


});



// TODO Pending

app.post('/pending/essay', (req, res) => {

  const question = req.body.question;
  const response = req.body.response;
  const essayId = req.body.essayId;
  const examId = req.body.examId;
  const studentId = req.body.studentId;

  pendingService.createEssay(question,response,essayId,examId,studentId);

  res.status(200).send("S-a creat")

});

app.post('/pending/short-answer', (req, res) => {

  const question = req.body.question;
  const response = req.body.response;
  const essayId = req.body.essayId;
  const examId = req.body.examId;
  const studentId = req.body.studentId;

  pendingService.createShortAnswerTest(question,response,essayId,examId,studentId);

  res.status(200).send("S-a creat")

});



app.get('/pending/:id/short-answer-tests', async (req, res) => {

  const idExam = req.params.id;

  const response = await pendingService.getPendingShortAnswerTests("shortAnswer",idExam);

  res.status(200).json(response);


});

app.get('/pending/:id/essay', async (req, res) => {

  const idExam = req.params.id;

  const response = await pendingService.getPendingTests("essay",idExam);

  res.status(200).json(response);


});



// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
