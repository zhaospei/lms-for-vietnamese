import Cua1 from "@/public/images/chang-1/cua-1.png";
import Cua2 from "@/public/images/chang-1/cua-2.png";
import Cua3 from "@/public/images/chang-1/cua-3.png";
import Cua4 from "@/public/images/chang-1/cua-4.png";
import Skh from "@/public/images/chang-1/san-khau-hoa.jpg";
import Tttt from "@/public/images/chang-1/tho-truyen-tieu-thuyet.jpg";
import Vhdg from "@/public/images/chang-1/van-hoc-dan-gian.jpg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";



export type ChuyenDe = 'Văn học dân gian' | 'Sân khấu hoá' | 'Thơ, truyện, tiểu thuyết';
export type ChuyenDeSlug = 'van-hoc-dan-gian' | 'san-khau-hoa' | 'tho-truyen-tieu-thuyet';
export const DEFAULT_CHUYENDE_SLUG: ChuyenDeSlug = 'san-khau-hoa';
export const chuyenDeSlug2Name: Record<ChuyenDeSlug, ChuyenDe> = {
    'san-khau-hoa': 'Sân khấu hoá',
    'van-hoc-dan-gian': 'Văn học dân gian',
    'tho-truyen-tieu-thuyet': 'Thơ, truyện, tiểu thuyết'
};
export interface ThongTinChuyenDe {
    id: string;
    ten: ChuyenDe;
    mota: string;
    img: StaticImport;
}

export const cacChuyenDe: ThongTinChuyenDe[] = [{
    id: "1",
    ten: "Văn học dân gian",
    mota: "Tập nghiên cứu và báo báo về một vấn đề văn học dân gian",
    img: Vhdg
}, {
    id: "2",
    ten: 'Sân khấu hoá',
    mota: "Sân khấu hoá tác phẩm văn học",
    img: Skh
}, {
    id: "3",
    ten: "Thơ, truyện, tiểu thuyết",
    mota: "Đọc, viết và giới thiệu một tập thơ, một tập truyện hoặc một tiểu thuyết",
    img: Tttt
}];

export interface AssetInfo {
    name: string;
    type: 'pdf' | 'img' | 'video' | 'other';
}
;export const Cửa: {
  name: DoorName;
  img: StaticImport;
  mota: string;
}[] = [{
  name: 'Tri thức nền tảng',
  img: Cua1,
  mota: 'Cửa 1 thuộc chặng 1 sẽ cung cấp tri thức nền tảng, cơ bản để HS học tập chuyên đề. Hệ thống tri thức này vừa kế thừa sách giáo khoa chuyên đề Ngữ văn 10 vừa có sự phát triển về nội dung và hình thức. Đặc biệt, với cách trình bày dưới dạng tài liệu đa phương thức thú vị và bắt mắt, cửa 1 sẽ giúp cho HS hiểu và ghi nhớ nhanh chóng, dễ dàng.'
}, {
  name: 'Gợi mở',
  img: Cua2,
  mota: 'Cửa 2 thuộc chặng 1 sẽ hướng dẫn cụ thể cho học sinh phương pháp, cách thực hiện các chuyên đề. Nội dung kiến thức của cửa 2 bám sát sách giáo khoa chuyên đề của từng bộ sách nhưng được triển khai dưới dạng tài liệu đa phương thức thú vị và bắt mắt. Hoàn thành cửa 2, học sinh về cơ bản đã có được những tri thức cần thiết của chuyên đề.'
}, {
  name: 'Tài liệu tham khảo',
  img: Cua3,
  mota: 'Cửa 3 thuộc chặng 1 cung cấp cho HS các nguồn tài liệu tham khảo để học tập các chuyên đề. Nguồn tài liệu này sử dụng cho cả ba bộ sách. Các tài liệu này sẽ định hướng, hỗ trợ cho học sinh học tập các chuyên đề.'
}, {
  name: 'Bài mẫu',
  img: Cua4,
  mota: 'Cửa 4 thuộc chặng 1 cung cấp cho HS các mẫu sản phẩm để tham khảo. Về cơ bản, các bài mẫu đã được kiểm định chất lượng. Do đó, thông qua các bài mẫu học sinh sẽ học tập được cách làm, cách triển khai các vấn đề. Đối với Chuyên đề 2, các mẫu sân khấu hóa sẽ là các ví dụ minh họa về cách diễn xuất, cách tổ chức sân khấu cho học sinh.'
},];
export type DoorName = 'Tri thức nền tảng' | 'Gợi mở' | 'Tài liệu tham khảo' | 'Bài mẫu';
export type DoorSlug = 'tri-thuc-nen-tang' | 'goi-mo' | 'tai-lieu-tham-khao' | 'bai-mau';
export const DEFAULT_DOOR_SLUG: DoorSlug = 'tri-thuc-nen-tang';
export const doorSlugName: Record<DoorSlug, DoorName> = {
    'tri-thuc-nen-tang': 'Tri thức nền tảng',
    'goi-mo': 'Gợi mở',
    'tai-lieu-tham-khao': 'Tài liệu tham khảo',
    'bai-mau': 'Bài mẫu'
};

