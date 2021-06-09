
const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();



async function createExam(description,teacherId) {
    const kind = 'Exam';

    const taskKey = datastore.key([kind]);
  
    const exam = {
      key: taskKey,
      data: {
        teacherId: teacherId,
        description: description
  
      },
    };
    await datastore.save(exam);

    console.log(await datastore.save(exam))

    const query = datastore.createQuery('Exam');
    var exams;
    var examId;

    await datastore.runQuery(query)
      .then(results => {
        exams = results[0]     

        exams.map(exam => {

            if (description === exam.description )
                examId =  exam[datastore.KEY].id
            

      });

      

      })


    return examId;
  }
  
async function getExams() {

    const query = datastore.createQuery('Exam');
    var exams;
    await datastore.runQuery(query)
      .then(results => {
        exams = results[0]     

        const sendExams = exams.map(exam => {

            return {description: exam.description, teacherId: exam.teacherId,examId: exam[datastore.KEY].id }
            

      });

        exams = sendExams;

      })


    return exams;
    
  
  }


  
async function findExamById(examId) {

    const query = datastore.createQuery('Exam');
    var exams;
    var examDataId;
    await datastore.runQuery(query)
      .then(results => {
        exams = results[0]     

        exams.map(exam => {

            if (examId === exam[datastore.KEY].id )
                examDataId = {description: exam.description, teacherId: exam.teacherId,examId: exam[datastore.KEY].id }
            

      });

      

      })


    return examDataId;
    
  
  }

  
async function deleteExamById(examId) {

    const taskId = Number(examId);
    const taskKey = datastore.key(['Exam', taskId]);
    console.log(taskKey);
    await datastore.delete(taskKey); 
  
  }

module.exports = {

    createExam,
    getExams,
    findExamById,
    deleteExamById

}