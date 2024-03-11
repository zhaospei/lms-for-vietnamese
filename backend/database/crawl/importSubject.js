// import fs from 'fs';
// import Subject from "../../models/subject.js";



// const dataObject = {};
// const filePath = "./database/result/subject.json";

// function readFile() {
//     return new Promise((resolve, reject) => {
//       fs.readFile(filePath, 'utf8', (error, data) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(data);
//         }
//       });
//     });
//   }


// async function importSubjects(sz) {
//     for (let i = 0; i < sz; i++) {
//         try {
//             let cur = dataObject.data[i];
//             console.log(cur);
//             const newSubject = await Subject.create({
//                 Name: cur.Name,
//                 Code: cur.SubjectCode,
//                 Credit: parseInt(cur.Credit), 
//                 MajorId: 1
//             });
//             await newSubject.save();
//         } catch (importErr) {
//             console.log("Import Error: ", importErr);
//         }
//     }
// }

// async function main() {
//     try {
//         const data = await readFile();
//         const jsonData = JSON.parse(data);
//         dataObject.data = jsonData;
//         importSubjects(jsonData.length);

//     } catch (error) {
//     console.log('Error:', error);
//     }
// }

// main();