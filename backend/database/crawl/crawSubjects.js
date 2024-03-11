import fs from 'fs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
let keyNames = ["STT", "SubjectCode", "Name", "Credit", "ClassCode", "Teacher", "NumberStudent", 
"Session", "Weekday", "Lesson", "Location", "Group"];

fetch('http://112.137.129.115/tkb/listbylist.php')
  .then(response => response.text())
  .then(html => {
    const $ = cheerio.load(html);

    // Lấy table thứ 3 từ phần body
    const table3 = $('body table').eq(3);

    // Lấy tất cả các thẻ <tr> trong <tbody>
    const trElements = table3.find('tbody tr');

    // Lưu trữ dữ liệu từ các thẻ <tr>
    const data = [];
    const filter = [];

    trElements.each((index, element) => {
      if (index !== 0) {
        const row = {};
        const tdElements = $(element).find('td');
        const subjectName = $(tdElements[1]).text().trim();
        
        if (! filter.includes(subjectName)) {
            
            tdElements.each((tdIndex, tdElement) => {
                if (tdIndex <= 3) {
                    const key = keyNames[tdIndex];
                    const value = $(tdElement).text().trim();
                    row[key] = value;
                }
            });
            filter.push(subjectName);
            data.push(row);
        }
      }
    });

    // Chuyển đổi thành JSON
    const jsonData = JSON.stringify(data);

    // Ghi dữ liệu table thứ 3 vào tệp tin
    fs.writeFile('./database/result/subject.json', jsonData, 'utf8', (error) => {
      if (error) {
        console.log('Đã xảy ra lỗi:', error);
      } else {
        console.log('Dữ liệu được ghi thành công');
      }
    });
  })
  .catch(error => {
    console.log('Đã xảy ra lỗi:', error);
  });