'use client';

import Image from "next/image";
import HomeImage from '../../../public/images/teacher_with_student.png';
import CommentHomeImage from '../../../public/images/comment.png';
import { Typography } from "antd";
import ScheduleIcon from "@/components/common/(Icons)/NavIcons/ScheduleIcon";
import MySubjectIcon from "@/components/common/(Icons)/NavIcons/MySubjectIcon";
import Main from "@/components/layouts/Main";
import PersonalStat from "@/components/statistic/personal/PersonalStat";
const { Text, Title } = Typography;

const headerText = "text-[#143601]";

export default function NotSignedInHomePage() {
  return (
    <Main className="flex flex-col gap-[50px]" title='Trang chủ'>
      <AboutScheduleAndMySubjects />

      {/* <AboutAllSubjects />

      <AboutStats /> */}
    </Main>
  );
}

function AboutScheduleAndMySubjects() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center w-full">
        <div className="flex">
          <Image src={HomeImage} alt="Dược" width={500} height={500} />
        </div>
        <div className="flex-1 p-4">
        <div className="flex flex-col flex-1">
          <Title className={headerText}>
            <div className="whitespace-nowrap text-[#1A4301] font-bold">Chinh phục chuyên đề Ngữ văn 10</div>
          </Title>
          <Text type="secondary" className="mb-[20px] text-xl">Chinh phục chuyên đề Ngữ văn 10 là website hỗ trợ HS và GV dạy và học các
chuyên đề Ngữ văn lớp 10. Với 3 chặng: <span className="text-[#245501]">Dữ liệu đa phương thức</span> - <span className="text-[#245501]">Trò chơi kiểm tra
tri thức </span> - <span className="text-[#245501]">Diễn đàn trao đổi</span>, website hỗ trợ cho học sinh tự học các chuyên đề ở nhà
đồng thời giáo viên có thể tạo các lớp học ảo để học sinh nhận nhiệm vụ và nộp
sản phẩm.</Text>
<Title className={headerText}>
            <div className="whitespace-nowrap text-[#1A4301]">Hướng dẫn sử dụng Website</div>
          </Title>
          <Text type="secondary" className="mb-[20px] text-xl">Học sinh đăng nhập, chọn bộ sách đang học.
    <ul>
      <li>
      Lựa chọn chặng 1: Dữ liệu đa phương thức. Học sinh lần lượt hoàn thành 4 cửa
trong chặng 1: Tri thức nền tảng - Gợi mở - Tài liệu tham khảo - Bài mẫu.
      </li>
      <li>
      Lựa chọn chặng 2: Trò chơi kiểm tra tri thức.
      </li>
      <li>
      Chặng 3: Diễn đàn trao đổi. Học sinh hoàn thành 3 cửa trong chặng 3: Chia sẻ
sản phẩm - Câu hỏi và giải đáp - Phòng thực hành nói.
      </li>
    </ul>
 </Text>
        </div>
        </div>
        
      </div>
    </div>
  );
}

