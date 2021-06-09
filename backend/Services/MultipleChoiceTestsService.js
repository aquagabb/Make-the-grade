
const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();



async function createMultipleChoiceTest(examId,question,possibleAnswers,correctAnswers) {
    const kind = 'MultipleChoice';

    const taskKey = datastore.key([kind]);


    const essayTest = {
      key: taskKey,
      data: {
        question: question,
        examId: examId,
        possibleAnswers: possibleAnswers,
        correctAnswers : correctAnswers
      },
    };
    await datastore.save(essayTest);
  }
  
async function getMultipleChoiceTest() {

    const query = datastore.createQuery('MultipleChoice');
    var quizTests;
    await datastore.runQuery(query)
      .then(results => {
        quizTests = results[0]     

        const sendExams = quizTests.map(test => {

            return {question: test.question, examId: test.examId,possibleAnswers: test.possibleAnswers,correctAnswers: test.correctAnswers , testId: test[datastore.KEY].id }
            

      });

      quizTests = sendExams;

      })


    return quizTests;
    
  
  }


  async function getMultipleChoiceTestByExamId(examId) {

    const query = datastore.createQuery('MultipleChoice');
    var quizTests;
    var quizTrimite;
    await datastore.runQuery(query)
      .then(results => {
        quizTests = results[0]     
        console.log(quizTests)
        quizTests.map(test => {
          console.log(test.examId)
          console.log(examId);
          console.log("PAUZA=============")
          if (examId == test.examId )
            quizTrimite = {question: test.question, examId: test.examId,possibleAnswers: test.possibleAnswers,correctAnswers: test.correctAnswers , testId: test[datastore.KEY].id }
            

      });

      })


    return quizTrimite;
    
  
  }

  
async function findMultipleChoiceTestById(examId) {

    const query = datastore.createQuery('MultipleChoice');
    var essays;
    var essayData;
    await datastore.runQuery(query)
      .then(results => {
        essays = results[0]     

        essays.map(test => {

            if (examId === test[datastore.KEY].id )
                essayData =  {question: test.question, examId: test.examId,possibleAnswers: test.possibleAnswers,correctAnswers: test.correctAnswers , testId: test[datastore.KEY].id }
            
      });

      

      })


    return essayData;
    
  
  }

  
async function deleteMultipleChoiceTestById(examId) {

    const taskId = Number(examId);
    const taskKey = datastore.key(['MultipleChoice', taskId]);
    await datastore.delete(taskKey); 
  
  }

module.exports = {

   createMultipleChoiceTest,
   getMultipleChoiceTest,
   findMultipleChoiceTestById,
   deleteMultipleChoiceTestById,
   getMultipleChoiceTestByExamId

}