
const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();



async function createEssay(examId,question) {
    const kind = 'Essay';

    const taskKey = datastore.key([kind]);
  
    const essayTest = {
      key: taskKey,
      data: {
        question: question,
        examId: examId,
        essayText: "",
        grade : "0"
      },
    };
    await datastore.save(essayTest);
  }
  
async function getEssays() {

    const query = datastore.createQuery('Essay');
    var essays;
    await datastore.runQuery(query)
      .then(results => {
        essays = results[0]     

        const sendExams = essays.map(essay => {

            return {question: essay.question, examId: essay.examId,essayText: essay.essayText ,essayId: essay[datastore.KEY].id }
            

      });

        essays = sendExams;

      })


    return essays;
    
  
  }


  async function getEssayByIdExam(examId) {

    const query = datastore.createQuery('Essay');
    var essays;
    await datastore.runQuery(query)
      .then(results => {
        essays = results[0]     
        console.log(essays)
        console.log(examId)
        
        const sendExams = essays.map(essay => {
            if (examId === essay.examId )
              return {question: essay.question, examId: essay.examId,essayText: essay.essayText ,essayId: essay[datastore.KEY].id }
            

      });

        essays = sendExams;

      })


    return essays[0];
    
  
  }


async function findEssayById(examId) {

    const query = datastore.createQuery('Essay');
    var essays;
    var essayData;
    await datastore.runQuery(query)
      .then(results => {
        essays = results[0]     

        essays.map(essay => {

            if (examId === essay[datastore.KEY].id )
                essayData =  {question: essay.question, examId: essay.examId,essayText: essay.essayText ,essayId: essay[datastore.KEY].id }
              
      });

      

      })


    return essayData;
    
  
  }

  
async function deleteEssayById(examId) {

    const taskId = Number(examId);
    const taskKey = datastore.key(['Essay', taskId]);
    await datastore.delete(taskKey); 
  
  }

module.exports = {

   createEssay,
   getEssays,
   findEssayById,
   deleteEssayById,
   getEssayByIdExam

}