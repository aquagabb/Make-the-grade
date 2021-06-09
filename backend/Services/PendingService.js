const { Datastore } = require('@google-cloud/datastore');
const { response } = require('express');

const datastore = new Datastore();



async function createEssay(question,response,essayId,examId,studentId) {
    const kind = 'Pending';

    const taskKey = datastore.key([kind]);

    const essay = {
      key: taskKey,
      data: {
        question: question,
        response: response,
        testId: essayId,
        examId: examId,
        studentId: studentId,
        grade: "0",
        status: "false",
        type: "essay"
      },
    };

    console.log("WAT")
    await datastore.save(essay);
  }


  async function createShortAnswerTest(question,response,essayId,examId,studentId) {
    const kind = 'Pending';

    const taskKey = datastore.key([kind]);

    const test = {
      key: taskKey,
      data: {
        question: question,
        response: response,
        testId: essayId,
        examId: examId,
        studentId: studentId,
        grade: "0",
        status: "false",
        type: "shortAnswer"
      },
    };
    await datastore.save(test);
  }

async function getPendingTests(type,idExam) {

    const query = datastore.createQuery('Pending');
    var catalogs;
    var sendCatalog;
    await datastore.runQuery(query)
      .then(results => {
        catalogs = results[0]

        if (type === "essay" ){
             sendCatalog = catalogs.map(catalog=> {

                if(type === catalog.type && idExam == catalog.examId ) 
                    return {question: catalog.question, response: catalog.response, 
                        testId: catalog.testId, examId: catalog.examId ,studentId: catalog.studentId,grade: catalog.grade,status: catalog.status}
                    
          });
    
        }
  
      
       
        catalogs = sendCatalog.filter(n => n!=null)
        // catalogs = sendCatalog;

      })


    return catalogs;
    }


    async function getPendingShortAnswerTests(type,idExam) {

      const query = datastore.createQuery('Pending');
      var catalogs;
      var sendCatalog;
      await datastore.runQuery(query)
        .then(results => {
          catalogs = results[0]
          if(type === "shortAnswer" ){
              sendCatalog = catalogs.map(catalog=> {
  
                  if(type === catalog.type && idExam == catalog.examId ) 
                      return {question: catalog.question, response: catalog.response, 
                        testId: catalog.testId, examId: catalog.examId ,studentId: catalog.studentId,grade: catalog.grade,status: catalog.status}
                      
            });
          }
         
          catalogs = sendCatalog.filter(n => n!=null)
          // catalogs = sendCatalog;
  
        })
  
  
      return catalogs;
      }
  


module.exports = {

    getPendingTests,
    getPendingShortAnswerTests,
    createShortAnswerTest,
    createEssay

}