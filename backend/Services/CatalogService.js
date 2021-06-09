const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();

const { jsPDF } = require("jspdf"); // will automatically load the node version

const doc = new jsPDF();


async function createCatalog(studentId,teacherId,examId,grade,testId) {
    const kind = 'Catalogs';

    const taskKey = datastore.key([kind]);

    const catalog = {
      key: taskKey,
      data: {
        studentId: studentId,
        teacherId: teacherId,
        examId: examId,
        testId: testId,
        grade: grade,
      },
    };
    await datastore.save(catalog);
  }

async function getCatalogs() {

    const query = datastore.createQuery('Catalogs');
    var catalogs;
    await datastore.runQuery(query)
      .then(results => {
        catalogs = results[0]

        const sendCatalog = catalogs.map(catalog=> {




            return {studentId: catalog.studentId, teacherId: catalog.teacherId, examId: catalog.examId, grade: catalog.grade ,testId:catalog.testId,catalogId: catalog[datastore.KEY].id }

      });

        catalogs = sendCatalog;

      })


    return catalogs;
    }


async function getCatalogsByStudentId(idStudent) {

    const query = datastore.createQuery('Catalogs');
    var catalogs;
    await datastore.runQuery(query)
      .then(results => {
        catalogs = results[0]

        const sendCatalog = catalogs.map(catalog=> {

            if ( idStudent == catalog.studentId)         
              return {studentId: catalog.studentId, teacherId: catalog.teacherId, examId: catalog.examId, grade: catalog.grade ,testId:catalog.testId,catalogId: catalog[datastore.KEY].id }

      });

       catalogs = sendCatalog.filter(n => n!=null)


      })


    return catalogs;
    }

async function deleteCatalogById(catalogId) {

    const taskId = Number(catalogId);
    const taskKey = datastore.key(['Catalogs', taskId]);
    await datastore.delete(taskKey); 

  }


  async function saveToPDF(idStudent) {

    const query = datastore.createQuery('Catalogs');
    var catalogs;
    await datastore.runQuery(query)
      .then(results => {
        catalogs = results[0]

        const sendCatalog = catalogs.map(catalog=> {

            if ( idStudent == catalog.studentId)         
              return {studentId: catalog.studentId, teacherId: catalog.teacherId, examId: catalog.examId, grade: catalog.grade ,testId:catalog.testId,catalogId: catalog[datastore.KEY].id }

      });

       catalogs = sendCatalog.filter(n => n!=null)


      })

      doc.text(String(catalogs), 10, 10);
      doc.save("a4.pdf"); // will save the file in the current working directory
      
    }



module.exports = {

   createCatalog,
   getCatalogs,
   deleteCatalogById,
   getCatalogsByStudentId,
   saveToPDF

}