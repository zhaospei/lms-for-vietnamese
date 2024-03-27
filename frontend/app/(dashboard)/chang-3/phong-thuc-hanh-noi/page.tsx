"use client";

// Import necessary modules and components
import { useEffect, useState, useRef } from "react";


// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

import Image from "next/image";
import BK1 from '@/public/images/bang-kiem/1.png'
import BK2 from '@/public/images/bang-kiem/2-1.png'
import BK3 from '@/public/images/bang-kiem/2-2.png'

// Export the MicrophoneComponent function component
export default function MicrophoneComponent() {
  // State variables to manage recording status, completion, and transcript
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [data, setData] = useState<any[]>();

  // Reference to store the SpeechRecognition instance
  const recognitionRef = useRef<any>(null);

  // Function to start recording
  const startRecording = () => {
    setIsRecording(true);
    // Create a new SpeechRecognition instance and configure it
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.lang = 'vi-VN';
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];

      // Log the recognition results and update the transcript state
      console.log(event.results);
      setTranscript(transcript);
    };

    // Start the speech recognition
    recognitionRef.current.start();
  };


  // Cleanup effect when the component unmounts
  useEffect(() => {
    return () => {
      // Stop the speech recognition if it's active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Function to stop recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      // Stop the speech recognition and mark recording as complete
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
  };

  // Toggle recording state and manage recording actions
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  // Render the microphone component with appropriate UI based on recording state
  return (
    <main className='min-h-screen'>
        <div className='flex items-center justify-center m-12 mb-24'>
            <div className='bg-[#AAD576] font-bold text-3xl rounded-full inline-block px-3'>
              Phòng thực hành nói
            </div>
        </div>
       
    <div className="w-full flex flex-col h-full gap-16 mb-16">
      <div className="fixed bottom-0 right-0 p-16 z-[10000]">
        <button
              onClick={handleToggleRecording}
              className="flex items-center justify-center bg-[#538D22] hover:bg-[#245501] rounded-full w-20 h-20 focus:outline-none"
            >
              <svg
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white"
              >
                <path
                  fill="currentColor" // Change fill color to the desired color
                  d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                />
              </svg>
            </button>
            </div>
          <div className="max-w-5xl mx-auto flex flex-col gap-16">
          <table>
            <caption className="caption-top mb-8 font-bold text-xl">Bảng kiểm kỹ năng trình bày giới thiệu 
một tập thơ/ một tập truyện ngắn hoặc một tiểu thuyết 
</caption>
<thead>
  <tr>
    <th>Nội dung</th>
    <th style={{width: '10%'}}>Đạt </th>
    <th style={{width: '10%'}}>Chưa đạt </th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><br />Chào hỏi trước khi bắt đầu, giới thiệu tên mình và chào trước khi kết thúc, cảm ơn người nghe.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="1" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="1" value="30"/></td>
  </tr>
  <tr>
    <td><br />Bài giới thiệu có đủ các phần mở đầu, nội dung chính và kết thúc. </td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="2" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="2" value="30"/></td>
  </tr>
  <tr>
    <td style={{"borderRightWidth": '0', textAlign: 'center', fontWeight: 'bold'}}>Mở đầu</td>
  </tr>
  <tr>
    <td>Tạo được ấn tượng, sự chú ý từ phía người nghe.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="3" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="3" value="30"/></td>
  </tr>
  <tr>
    <td>Giới thiệu thông tin cơ bản của tập thơ, tập truyện ngắn hay tiểu thuyết: thể loại, tác giả, nhan đề, chủ đề chung, nhà xuất bản. </td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="4" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="4" value="30"/></td>
  </tr>
  <tr>
    <td>Nhận xét, đánh giá khái quát về nội dung, nghệ thuật của  tập thơ, tập truyện ngắn hay tiểu thuyết</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="5" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="5" value="30"/></td>
  </tr>
  <tr>
  <td style={{"borderRightWidth": '0', textAlign: 'center', fontWeight: 'bold'}}>Nội dung chính</td>
  </tr>
  <tr>
    <td>Tóm tắt được nội dung chính của tập thơ tập truyện ngắn hay tiểu thuyết </td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="6" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="6" value="30"/></td>
  </tr>
  <tr>
    <td>Làm nổi bật được nội dung nghệ thuật của tác phẩm </td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="7" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="7" value="30"/></td>
  </tr>
  <tr>
    <td>Chỉ ra một vài điểm tương đồng và khác biệt giữa nội dung và cách viết giữa bài thơ/ các truyện và giữa các tác giả ( nếu là tập thơ/ tập truyện của nhiều tác giả).</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="8" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="8" value="30"/></td>
  </tr>
  <tr>
    <td>Thể hiện cảm nhận/ đánh giá về một số nét đặc biệt trong nội dung tác phẩm và cách viết của tác giả.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="9" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="9" value="30"/></td>
  </tr>
  <tr>
  <td style={{"borderRightWidth": '0', textAlign: 'center', fontWeight: 'bold'}}>Kết thúc</td>
  </tr>
  <tr>
    <td>Nêu bình luận chung về tác phẩm, thể hiện sự yêu thích tác phẩm.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="10" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="10" value="30"/></td>
  </tr>
  <tr>
    <td>Đề xuất mọi người tìm đọc và lý do nên đọc tác phẩm.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="11" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="11" value="30"/></td>
  </tr>
  <tr>
    <td>Sử dụng giọng điệu, cử chỉ, nét mặt, ánh mắt phù hợp.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="12" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="12" value="30"/></td>
  </tr>
  <tr>
    <td>Ngôn ngữ nói ngắn gọn, trong sáng, khúc chiết, truyền cảm.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="13" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="13" value="30"/></td>
  </tr>
  <tr>
    <td>Tự tin và có tương tác với người nghe khi trình bày.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="14" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="14" value="30"/></td>
  </tr>
  <tr>
    <td>Sử dụng hiệu quả các phương tiện trực quan để làm rõ nội dung giới thiệu.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="15" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="15" value="30"/></td>
  </tr>
</tbody>
</table>

<table className="cc">
<caption className="caption-top mb-8 font-bold text-xl">Bảng kiểm kỹ năng trình bày báo cáo về một vấn đề văn học dân gian
</caption>
<thead>
  <tr>
    <th></th>
    <th>Hình thức </th>
    <th style={{width: '10%'}}></th>
    <th style={{width: '10%'}}></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>STT</td>
    <td>Tiêu chí </td>
    <td className="text-center">Đạt</td>
    <td className="text-center">Không đạt</td>
  </tr>
  <tr>
    <td>1</td>
    <td>Cấu trúc và bố cục:<br />Báo cáo được trình bày theo cấu trúc chuẩn, logic, khoa học, dễ theo dõi. (theo quy định bài báo cáo)<br />Bố cục rõ ràng, cân đối, phân chia các phần, mục, tiểu mục hợp lý.<br />Mục lục đầy đủ, chính xác, thể hiện rõ cấu trúc của báo cáo</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="21" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="21" value="30"/></td>
  </tr>
  <tr>
    <td>2</td>
    <td>Trình bày:<br />Sử dụng font chữ, cỡ chữ phù hợp, dễ đọc (theo quy định bài báo cáo).<br />Chữ in rõ ràng, sắc nét, không lem nhem, nhòe nhoẹt.<br />Canh lề, giãn dòng hợp lý, đảm bảo bố cục đẹp mắt, khoa học.<br />Sử dụng bảng biểu, hình ảnh, sơ đồ minh họa khoa học, rõ ràng, có chú thích đầy đủ.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="22" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="22" value="30"/></td>
  </tr>
  <tr>
    <td>3</td>
    <td>Trích dẫn tài liệu:<br />Trích dẫn tài liệu theo đúng quy định, thống nhất trong toàn bộ báo cáo.<br />Ghi rõ nguồn gốc tài liệu tham khảo, đảm bảo tính minh bạch.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="23" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="23" value="30"/></td>
  </tr>
  <tr>
    <td>4</td>
    <td>Bìa báo cáo:<br />Bìa báo cáo được thiết kế đẹp mắt, khoa học, thể hiện đầy đủ thông tin về bài báo cáo.<br />Bìa báo cáo phải có đầy đủ thông tin: Tên đề tài; Tên tác giả; Tên trường, lớp; Địa danh, ngày tháng năm</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="24" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="24" value="30"/></td>
  </tr>
  <tr>
    <td>5</td>
    <td>Chữ viết và ngữ pháp:<br />Sử dụng ngôn ngữ khoa học, chính xác, rõ ràng, dễ hiểu.<br />Cấu trúc câu văn chặt chẽ, logic, không mắc lỗi ngữ pháp.<br />Chữ viết đúng chính tả, không lỗi chính tả, lỗi dùng từ.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="25" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="25" value="30"/></td>
  </tr>
  <tr>
    <td>6</td>
    <td>Một số tiêu chí khác: <br />Báo cáo cần được trình bày gọn gàng, sạch đẹp, không nhăn nhúm, rách nát.<br />Số trang được đánh máy liên tục, rõ ràng.<br />Báo cáo có thể được đóng gáy hoặc đóng bìa mềm.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="26" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="26" value="30"/></td>
  </tr>
  <tr>
    <td>Nội dung</td>
  </tr>
  <tr>
    <td>7</td>
    <td>Tính chính xác và khoa học về vấn đề văn học dân gian:<br />Nội dung nghiên cứu được trình bày một cách chính xác, khách quan, khoa học.<br />Dữ liệu nghiên cứu được thu thập và sử dụng một cách hợp lý, có căn cứ.<br />Phương pháp nghiên cứu được áp dụng phù hợp với mục tiêu nghiên cứu.<br />Kết quả nghiên cứu được trình bày rõ ràng, logic, có ý nghĩa khoa học.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="27" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="27" value="30"/></td>
  </tr>
  <tr>
    <td>8</td>
    <td>Tính độc đáo và sáng tạo:<br />Nghiên cứu đề cập đến vấn đề mới hoặc có góc nhìn mới, độc đáo.<br />Kết quả nghiên cứu có đóng góp mới cho lĩnh vực nghiên cứu.<br />Thể hiện tư duy sáng tạo, độc lập của người nghiên cứu.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="28" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="29" value="30"/></td>
  </tr>
  <tr>
    <td>9</td>
    <td>Tính logic và chặt chẽ:<br />Nội dung nghiên cứu được trình bày một cách logic, chặt chẽ, có sự liên kết giữa các phần.<br />Lập luận khoa học, dẫn chứng rõ ràng, thuyết phục.<br />Kết luận nghiên cứu được rút ra một cách hợp lý từ dữ liệu và phân tích.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="30" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="30" value="30"/></td>
  </tr>
  <tr>
    <td>10</td>
    <td>Tính ứng dụng và giá trị thực tiễn:<br />Kết quả nghiên cứu có thể áp dụng vào thực tế để giải quyết vấn đề hoặc cải thiện tình trạng hiện tại.<br />Nghiên cứu có giá trị khoa học và thực tiễn cao.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="31" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="31" value="30"/></td>
  </tr>
  <tr>
    <td>11</td>
    <td>Khả năng trình bày:<br />Báo cáo được trình bày rõ ràng, dễ hiểu, thu hút người đọc.<br />Hình ảnh, biểu đồ được sử dụng hiệu quả để minh họa cho nội dung.<br />Người trình bày có kiến thức sâu rộng về nội dung nghiên cứu, trả lời các câu hỏi một cách tự tin, thuyết phục.</td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="32" value="30"/></td>
    <td><input className='mx-auto w-full' type="radio" id="age1" name="33" value="30"/></td>
  </tr>
</tbody>
</table>

          </div>
    </div>
    </main>
  );
}