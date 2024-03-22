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
}[] = [{
  name: 'Tri thức nền tảng',
  img: Cua1
}, {
  name: 'Gợi mở',
  img: Cua2
}, {
  name: 'Tài liệu tham khảo',
  img: Cua3
}, {
  name: 'Bài mẫu',
  img: Cua4
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

