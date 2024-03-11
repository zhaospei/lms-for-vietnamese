import cheerio from 'cheerio';
import {START_TERM_ID, CUR_TERM_ID} from '../constant.js';
import UserScore from '../models/userScore.js';
import Subject from '../models/subject.js';
import User from '../models/user.js';
import Score from '../models/score.js';
import { Op } from 'sequelize';
import fetch from 'node-fetch';

function trimClass(str) {
  let tmp = str.replace(" (CLC)", "");
  let words = tmp.split(" ");
  if (words.length == 2) return words[0];
  let res = tmp.replace(/\s+/, "");
  let ans = res.split(" ");
  return ans[0];
}


async function getCoursebyStudentId(studentId, term_id) {
  try {
    const response = await fetch(`http://112.137.129.87/qldt/index.php?SinhvienLmh%5BmasvTitle%5D=${studentId}&SinhvienLmh%5BhotenTitle%5D=&SinhvienLmh%5BngaysinhTitle%5D=&SinhvienLmh%5BlopkhoahocTitle%5D=&SinhvienLmh%5BtenlopmonhocTitle%5D=&SinhvienLmh%5BtenmonhocTitle%5D=&SinhvienLmh%5Bnhom%5D=&SinhvienLmh%5BsotinchiTitle%5D=&SinhvienLmh%5Bghichu%5D=&SinhvienLmh%5Bterm_id%5D=0${term_id}&SinhvienLmh_page=1&ajax=sinhvien-lmh-grid&pageSize=50&r=sinhvienLmh%2Fadmin`);
    const html = await response.text();
    // Load HTML với Cheerio
    const $ = cheerio.load(html);

    // Lấy bảng đầu tiên có class là "item"
    const table = $('table.items').first();
    const tbody = table.find('tbody');
    const trElements = tbody.find('tr');
    //console.log(trElements.html());
    // Lưu trữ dữ liệu từ các thẻ <tr>
    const data = [];

    trElements.each((index, element) => {
      const row = {};
      const tdElements = $(element).find('td');
      tdElements.each((tdIndex, tdElement) => {
        
        if (tdIndex == 5) {
          const key = "class";
          const value = $(tdElement).text().trim();
          row[key] = value;

          let subjectCode = trimClass(value);
          row["subjectCode"] = subjectCode;
        } else if (tdIndex == 6) {
          const key = "name";
          const value =  $(tdElement).text().trim();
          row[key] = value;
        } 
        else if (tdIndex == 7) {
          const key = "group";
          const value = $(tdElement).text().trim();
          row[key] = value;
        }
      });

      data.push(row);

    });
    return data;
  } catch (error) {
    console.log('Đã xảy ra lỗi:', error);
  }
}

// async function getAllCoursesbyStudentId(studentId) {
//   try {
//     const res = [];
//     for (let term = START_TERM_ID; term <= CUR_TERM_ID; term++) {
//       const response = await fetch(`http://112.137.129.87/qldt/index.php?SinhvienLmh%5BmasvTitle%5D=${studentId}&SinhvienLmh%5BhotenTitle%5D=&SinhvienLmh%5BngaysinhTitle%5D=&SinhvienLmh%5BlopkhoahocTitle%5D=&SinhvienLmh%5BtenlopmonhocTitle%5D=&SinhvienLmh%5BtenmonhocTitle%5D=&SinhvienLmh%5Bnhom%5D=&SinhvienLmh%5BsotinchiTitle%5D=&SinhvienLmh%5Bghichu%5D=&SinhvienLmh%5Bterm_id%5D=0${term}&SinhvienLmh_page=1&ajax=sinhvien-lmh-grid&pageSize=50&r=sinhvienLmh%2Fadmin`);
//       const html = await response.text();
//       // Load HTML với Cheerio
//       const $ = cheerio.load(html);
      
//       // Lấy bảng đầu tiên có class là "item"
//       const table = $('table.items').first();
//       const tbody = table.find('tbody');
//       const trElements = tbody.find('tr');
//       //console.log(trElements.html());
//       // Lưu trữ dữ liệu từ các thẻ <tr>
//       const data = [];
  
//       trElements.each((index, element) => {
//         const row = {};
//         const tdElements = $(element).find('td');
//         tdElements.each((tdIndex, tdElement) => {
//           if (tdIndex == 5) {
//             const key = "class";
//             const value = $(tdElement).text().trim();
//             row[key] = value;
//           } else if (tdIndex == 7) {
//             const key = "group";
//             const value = $(tdElement).text().trim();
//             row[key] = value;
//           }
//         });
  
//         data.push(row);
  
//       });
//       return data;
//     }


//   } catch (error) {
//     console.log('Đã xảy ra lỗi:', error);
//   }
// }

async function crawlAllCourseWithInitMark(studentCreated) {
  
  for (let termId = START_TERM_ID; termId <= CUR_TERM_ID; termId++) {
    
    let cur = await getCoursebyStudentId(studentCreated.StudentId, termId);
    if (Array.isArray(cur) && cur.length === 1 && Object.keys(cur[0]).length === 0 && cur[0].constructor === Object) {
      continue;
    }
    //  console.log(cur.length);
    //  console.log(cur);
    //  console.log(cur[0]);
    for (let c of cur) {
      // if (c) console.log(c);
      let curSubject = await Subject.findOne({
        raw: true,
        where: {
          Code: c.subjectCode
        }
      });
      if (curSubject === null) {
        curSubject = await Subject.findOne({
          raw: true,
          where: {
            Name: c.name
          }
        })
      }
      // console.log(curSubject);
      const newScore = await Score.create({
        total10: 0
      });
      await newScore.save(); 
      let scoreId = newScore.Id;
      const newUserScore = await UserScore.create({
          UserId: studentCreated.Id,
          SubjectId: curSubject.Id,
          ScoreId: scoreId,
          SemesterId: termId - 28
      });
      await newUserScore.save();
    }
  }
}

// let curStudent = await User.findOne({
//   raw: true,
//   where: {
//     StudentId: "21020051"
//   }
// })
// console.log("start");
// crawlAllCourseWithInitMark(curStudent)
// async function main() {
//   let curSubject = await Subject.findOne({
//     raw: true,
//     where: {
//       Code: "INT3110"
//     }
//   });
//   if (curSubject === null) console.log("ok"); 
//   console.log(curSubject);
// }
// main();

// let res = await getCoursebyStudentId(21020001, 33);
// console.log(res);
export {getCoursebyStudentId, crawlAllCourseWithInitMark};