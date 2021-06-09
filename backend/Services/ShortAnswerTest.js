const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();



async function createShortAnswerTest(examId,question) {
    const kind = 'ShortAnswerTest';

    const taskKey = datastore.key([kind]);

    const shortAnswerTest = {
      key: taskKey,
      data: {
    	question: question,
    	examId: examId,
      response: "",
    	grade: "0"
      },
    };
    await datastore.save(shortAnswerTest);
  }

async function getShortAnswerTests() {

    const query = datastore.createQuery('ShortAnswerTest');
    var shortAnswerTests;
    await datastore.runQuery(query)
      .then(results => {
        shortAnswerTests = results[0]

        const sendShortAnswerTest = shortAnswerTests.map(shortAnswerTest=> {

            return {question: shortAnswerTest.question, examId: shortAnswerTest.examId, grade: shortAnswerTest.grade , response: shortAnswerTest.response ,shortAnswerTestId: shortAnswerTest[datastore.KEY].id }


      });

        shortAnswerTests = sendShortAnswerTest;

      })


    return shortAnswerTests;


  }



  async function getShortAnswerTestsbyExamId(examId) {

    const query = datastore.createQuery('ShortAnswerTest');
    var shortAnswerTests;
    await datastore.runQuery(query)
      .then(results => {
        shortAnswerTests = results[0]

        const sendShortAnswerTest = shortAnswerTests.map(shortAnswerTest=> {
            if (examId === shortAnswerTest.examId )
                return {question: shortAnswerTest.question, examId: shortAnswerTest.examId, grade: shortAnswerTest.grade , response: shortAnswerTest.response ,shortAnswerTestId: shortAnswerTest[datastore.KEY].id }


      });

        shortAnswerTests = sendShortAnswerTest;

      })


    return shortAnswerTests[0];


  }


async function findShortAnswerTestById(shortAnswerTestId) {

    const query = datastore.createQuery('ShortAnswerTest');
    var shortAnswerTests;
    var shortAnswerTestData;
    await datastore.runQuery(query)
      .then(results => {
        shortAnswerTests = results[0]

        shortAnswerTests.map(shortAnswerTest => {

            if (shortAnswerTestId === shortAnswerTest[datastore.KEY].id )
                shortAnswerTestData =  {question: shortAnswerTest.question, examId: shortAnswerTest.examId, grade: shortAnswerTest.grade , response: shortAnswerTest.response ,shortAnswerTestId: shortAnswerTest[datastore.KEY].id }

      });

      })


    return shortAnswerTestData;


  }


async function deleteShortAnswerTestById(shortAnswerTestId) {

    const taskId = Number(shortAnswerTestId);
    const taskKey = datastore.key(['ShortAnswerTest', taskId]);
    await datastore.delete(taskKey); 

  }

module.exports = {

   createShortAnswerTest,
   getShortAnswerTests,
   findShortAnswerTestById,
   deleteShortAnswerTestById,
   getShortAnswerTestsbyExamId

}