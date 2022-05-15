import React ,{useState , useEffect} from "react";
import '../../folder_css/css_two.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link , useParams} from "react-router-dom";
import axios from "axios";
import ReactPaginate from 'react-paginate';

export default function DanhSachSanPham() {
  const api ='http://localhost:3001/';
  const { id } = useParams();

  const [listproduct ,setlistproduct] = useState({
    myid:"",
    congnghecpu:"",
    sonhan:"",
    soluong:"",
    tocdocpu:"",
    tocdotoida:"",
    bonhodem:"",
    ram:"",
    loairam:"",
    tocdobusram:"",
    hotroramtoida:"",
    ocung:"",
    manhinh:"",
    dophangiai:"",
    tansoquet:"",
    congnghemanhinh:"",
    cardmanhinh:"",
    congngheamthanh:"",
    conggiaotiep:"",
    ketnoikhongday:"",
    khedocthenho:"",
    webcam:"",
    tinhnangkhac:"",
    denbanphim:"",
    kichthuoctrongluong:"",
    chatlieu:"",
    thongtinpin:"",
    hedieuhanh:"",
    thoigianramat:"",
    soluongsanpham:"",
    uudiem:"",
    hieuqua:"",
    luuy:"",
    huongdansudung:"",
    name_products:"",
    name_trademark:"",
    giaspcu:"",
    origin:"",
    image:"",
    name_category:"",
    giaspmoi:"",
  });

  const {myid , congnghecpu, sonhan ,soluong, tocdocpu, tocdotoida, bonhodem,ram, loairam , tocdobusram,hotroramtoida, ocung ,manhinh, dophangiai,tansoquet,
    congnghemanhinh , cardmanhinh , congngheamthanh , conggiaotiep , ketnoikhongday , khedocthenho, webcam , tinhnangkhac , denbanphim ,
    kichthuoctrongluong , chatlieu , thongtinpin , hedieuhanh , thoigianramat , soluongsanpham , uudiem , hieuqua , luuy , huongdansudung , name_products,
     name_trademark ,giaspcu, origin, image, name_category,giaspmoi} = listproduct;


    //Hiển thị 
    useEffect(() => {
      getsanpham();
    }, []);

//code hiển thị danh sách San Pham
const getsanpham = async() => {
  const base_url = api + 'sanpham/1/' + id ;
  const response = await axios.get(base_url) 
  setlistproduct({
    update: true,
    myid:response.data[0].idsanpham,
    name_products:response.data[0].tensanpham,
    giaspcu:response.data[0].giacu,
    giaspmoi:response.data[0].giamoi,
    image:response.data[0].img,
    name_trademark:response.data[0].idthuonghieu,
    name_category:response.data[0].iddanhmuc,
    origin:response.data[0].xuatxuthuonghieu,
    congnghecpu:response.data[0].congnghecpu,
    sonhan:response.data[0].sonhan,
    soluong:response.data[0].soluong,
    tocdocpu:response.data[0].tocdocpu,
    tocdotoida:response.data[0].tocdotoida,
    bonhodem:response.data[0].bonhodem,
    ram:response.data[0].ram,
    loairam:response.data[0].loairam,
    tocdobusram:response.data[0].tocdobusram,
    hotroramtoida:response.data[0].hotrotoida,
    ocung:response.data[0].ocung,
    manhinh:response.data[0].manhinh,
    dophangiai:response.data[0].dophangiai,
    tansoquet:response.data[0].tansoquet,
    congnghemanhinh:response.data[0].congnghemanhinh,
    cardmanhinh:response.data[0].cardmanhinh,
    congngheamthanh:response.data[0].congngheamthanh,
    conggiaotiep:response.data[0].conggiaotiep,
    ketnoikhongday:response.data[0].ketnoikhongday,
    khedocthenho:response.data[0].khedocthenho,
    webcam:response.data[0].webcam,
    tinhnangkhac:response.data[0].tinhnangkhac,
    denbanphim:response.data[0].denbanphim,
    kichthuoctrongluong:response.data[0].kichthuoctrongluong,
    chatlieu:response.data[0].chatlieu,
    thongtinpin:response.data[0].thongtinpin,
    hedieuhanh:response.data[0].hedieuhanh,
    thoigianramat:response.data[0].thoigianramat,
    soluongsanpham:response.data[0].soluongsanpham,
    uudiem:response.data[0].uudiem,
    hieuqua:response.data[0].hieuqua,
    luuy:response.data[0].luuy,
    huongdansudung:response.data[0].huongdansudung,
  })
}
console.log(listproduct)
    return (
        <section>    
        <div className="container">  
        <h2 className="Text-Name">Thông Tin Chi Tiết</h2>
          <div className="row mt-3">
           <div className="col-sm-11">
           <div className='row-center-add-product'>
              <div className="box p-3 mb-3 mt-5" style={{border:"1px solid #d0d0d0"}}>
                    <h5 className="Text-Name-one1">Tên Sản Phẩm : <h5 style={{color : "#97c9f9"}}> {name_products}</h5> </h5>
                    <h5 className="Text-Name-one1">Giá Cũ : <h5 style={{color : "#97c9f9"}}> {giaspcu}</h5> </h5>
                    <h5 className="Text-Name-one1">Giá Mới : <h5 style={{color : "#97c9f9"}}> {giaspmoi}</h5> </h5>
                    <img className="Text-Name-one1" src={api + 'images/' + image} alt="Chưa có hình ảnh trong file nên không hiển thị" style={{height:"150px" , weight:"100%"}}/>
                    <h5 className="Text-Name-one1">Thương Hiệu : <h5 style={{color : "#97c9f9"}}> {name_trademark}</h5> </h5>
                    <h5 className="Text-Name-one1">Danh Mục : <h5 style={{color : "#97c9f9"}}> {name_category}</h5> </h5>
                    <h5 className="Text-Name-one1">Nơi Xuất Xứ : <h5 style={{color : "#97c9f9"}}> {origin}</h5> </h5>
                    <h5 className="Text-Name-one1">Công Nghệ CPU : <h5 style={{color : "#97c9f9"}}> {congnghecpu}</h5> </h5>
                    <h5 className="Text-Name-one1">Số Nhân : <h5 style={{color : "#97c9f9"}}> {sonhan}</h5> </h5>
                    <h5 className="Text-Name-one1">Số Luồng : <h5 style={{color : "#97c9f9"}}> {soluong}</h5> </h5>
                    <h5 className="Text-Name-one1">Tốc Độ CPU : <h5 style={{color : "#97c9f9"}}> {tocdocpu}</h5> </h5>
                    <h5 className="Text-Name-one1">Tốc Độ Tối Đa : <h5 style={{color : "#97c9f9"}}> {tocdotoida}</h5> </h5>
                    <h5 className="Text-Name-one1">Bộ Nhớ Đệm : <h5 style={{color : "#97c9f9"}}> {bonhodem}</h5> </h5>
                    <h5 className="Text-Name-one1">RAM : <h5 style={{color : "#97c9f9"}}> {ram}</h5> </h5>
                    <h5 className="Text-Name-one1">Loại RAM : <h5 style={{color : "#97c9f9"}}> {loairam}</h5> </h5>
                    <h5 className="Text-Name-one1">Tốc Độ Bus RAM : <h5 style={{color : "#97c9f9"}}> {tocdobusram}</h5> </h5>
                    <h5 className="Text-Name-one1">Hỗ Trợ RAM Tối Đa : <h5 style={{color : "#97c9f9"}}> {hotroramtoida}</h5> </h5>
                    <h5 className="Text-Name-one1">Ổ Cứng : <h5 style={{color : "#97c9f9"}}> {ocung}</h5> </h5>
                    <h5 className="Text-Name-one1">Màn Hình : <h5 style={{color : "#97c9f9"}}> {manhinh}</h5> </h5>
                    <h5 className="Text-Name-one1">Độ Phân Giải : <h5 style={{color : "#97c9f9"}}> {dophangiai}</h5> </h5>
                    <h5 className="Text-Name-one1">Tần Số Quét : <h5 style={{color : "#97c9f9"}}> {tansoquet}</h5> </h5>
                    <h5 className="Text-Name-one1">Công Nghệ Màn Hình : <h5 style={{color : "#97c9f9"}}> {congnghemanhinh}</h5> </h5>
                    <h5 className="Text-Name-one1">Card Màn Hình : <h5 style={{color : "#97c9f9"}}> {cardmanhinh}</h5> </h5>
                    <h5 className="Text-Name-one1">Công Nghệ Âm Thanh : <h5 style={{color : "#97c9f9"}}> {congngheamthanh}</h5> </h5>
                    <h5 className="Text-Name-one1">Cổng Giao Tiếp : <h5 style={{color : "#97c9f9"}}> {conggiaotiep}</h5> </h5>
                    <h5 className="Text-Name-one1">Kết Nối Không Dây : <h5 style={{color : "#97c9f9"}}> {ketnoikhongday}</h5> </h5>
                    <h5 className="Text-Name-one1">Khe Đọc Thẻ Nhớ : <h5 style={{color : "#97c9f9"}}> {khedocthenho}</h5> </h5>
                    <h5 className="Text-Name-one1">WebCAM : <h5 style={{color : "#97c9f9"}}> {webcam}</h5> </h5>
                    <h5 className="Text-Name-one1">Tính Năng Khác : <h5 style={{color : "#97c9f9"}}> {tinhnangkhac}</h5> </h5>
                    <h5 className="Text-Name-one1">Đèn Bàn Phím : <h5 style={{color : "#97c9f9"}}> {denbanphim}</h5> </h5>
                    <h5 className="Text-Name-one1">Kích Thước - Trọng Lượng : <h5 style={{color : "#97c9f9"}}> {kichthuoctrongluong}</h5> </h5>
                    <h5 className="Text-Name-one1">Chất Liệu : <h5 style={{color : "#97c9f9"}}> {chatlieu}</h5> </h5>
                    <h5 className="Text-Name-one1">Thông Tin Pin : <h5 style={{color : "#97c9f9"}}> {thongtinpin}</h5> </h5>
                    <h5 className="Text-Name-one1">Hệ Điều Hành : <h5 style={{color : "#97c9f9"}}> {hedieuhanh}</h5> </h5>
                    <h5 className="Text-Name-one1">Thời Điểm Ra Mắt : <h5 style={{color : "#97c9f9"}}> {thoigianramat}</h5> </h5>
                    <h5 className="Text-Name-one1">Số Lượng Sản Phẩm : <h5 style={{color : "#97c9f9"}}> {soluongsanpham}</h5> </h5>
                    <h5 className="Text-Name-one1">Ưu Điểm : <h5 style={{color : "#97c9f9"}}> {uudiem}</h5> </h5>
                    <h5 className="Text-Name-one1">Hiệu Quả : <h5 style={{color : "#97c9f9"}}> {hieuqua}</h5> </h5>
                    <h5 className="Text-Name-one1">Lưu Ý : <h5 style={{color : "#97c9f9"}}> {luuy}</h5> </h5>
                    <h5 className="Text-Name-one1">Hướng Dẫn Sử Dụng : <h5 style={{color : "#97c9f9"}}> {huongdansudung}</h5> </h5>
              
                    <div className="push-2-product">
                        <Link to={"/Danh-Sach-San-Pham"}>
                            <button className="button2">Danh Sách Sản Phẩm</button>
                        </Link>
                        <Link to={`/Chi-Tiet-San-Pham/${myid}`}>
                            <button className="button1">Sửa Chi Tiết Sản Phẩm</button>
                        </Link>
                    </div>
              
              </div>
            </div>
          </div>
          </div>
        </div>
       </section>
    );
  }