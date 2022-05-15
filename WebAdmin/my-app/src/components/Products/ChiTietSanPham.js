import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
 
const EditProduct = () => {
  const api ='http://localhost:3001/';
  let history = useNavigate(); //hàm history.
  const { id } = useParams();  // children , gọi id của bên màn hình App.js path={"/editdanhmucsanpham/:id"} 

  //Tạo useState id cha và tên
  const [trademarkname ,settrademarkname] = useState({
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
  })
  //input 
  const onInputChange = e => {
    settrademarkname({ ...trademarkname,[e.target.name]: e.target.value });
  };
  const { congnghecpu, sonhan ,soluong, tocdocpu, tocdotoida, bonhodem,ram, loairam , tocdobusram,hotroramtoida, ocung ,manhinh, dophangiai,tansoquet,
    congnghemanhinh , cardmanhinh , congngheamthanh , conggiaotiep , ketnoikhongday , khedocthenho, webcam , tinhnangkhac , denbanphim ,
    kichthuoctrongluong , chatlieu , thongtinpin , hedieuhanh , thoigianramat , soluongsanpham , uudiem , hieuqua , luuy , huongdansudung} = trademarkname;

  useEffect(() => {
    getlistsanpham();
  }, []);

  //code update
  const updateEmployee = async e => {
    e.preventDefault();
    fetch(api + 'editchitietsanpham/editid', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: id,
          congnghecpu: congnghecpu ,
          sonhan:  sonhan,
          soluong: soluong,
          tocdocpu:tocdocpu,
          tocdotoida:tocdotoida,
          bonhodem:bonhodem,
          ram:ram,
          loairam: loairam ,
          tocdobusram:  tocdobusram,
          hotroramtoida: hotroramtoida,
          ocung:ocung,
          manhinh:manhinh,
          dophangiai:dophangiai,
          tansoquet:tansoquet,
          congnghemanhinh: congnghemanhinh ,
          cardmanhinh:  cardmanhinh,
          congngheamthanh: congngheamthanh,
          conggiaotiep:conggiaotiep,
          ketnoikhongday:ketnoikhongday,
          khedocthenho:khedocthenho,
          webcam:webcam,
          tinhnangkhac: tinhnangkhac ,
          denbanphim:  denbanphim,
          kichthuoctrongluong: kichthuoctrongluong,
          chatlieu:chatlieu,
          thongtinpin:thongtinpin,
          hedieuhanh:hedieuhanh,
          thoigianramat:thoigianramat,
          soluongsanpham:soluongsanpham,
          uudiem:uudiem,
          hieuqua:hieuqua,
          luuy:luuy,
          huongdansudung:huongdansudung,
        })    
    })
    .then((response) => {
      if(response === 'okedit'){
        alert("thành công")
      }
    });
    history("/San-Pham");
  };

  // code hiển thị id sanpham
  const getlistsanpham =  async() => {
            const base_url = api + `editsanpham/${id}`;
            const response = await axios.get(base_url);  // lấy dữ liệu ở trên base_url bằng hàm await 
            console.log( response.data[0]); 
            settrademarkname({
                    update: true,
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
                  
  };

  return (
    <div className="container">
      <div className="row mt-4">
       <div>
        <h4 className="Text-Name">Cập Nhật Chi Tiết Sản Phẩm</h4>    
          <h5 className="Text-Name-one">ID Sản Phẩm: {id} </h5>

          <h5 className="Text-Name-two">Số Lượng Sản Phẩm</h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Số lượng Sản Phâm"
              name="soluongsanpham"
              value={soluongsanpham}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>

          <h5 className="Text-Name-two">Bộ Xử Lý </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Công Nghệ CPU"
              name="congnghecpu"
              value={congnghecpu}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Số Nhân"
              name="sonhan"
              value={sonhan}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Số Luồng"
              name="soluong"
              value={soluong}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Tốc Độ CPU"
              name="tocdocpu"
              value={tocdocpu}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Tốc Độ Tối Đa"
              name="tocdotoida"
              value={tocdotoida}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Bộ Nhớ Đệm"
              name="bonhodem"
              value={bonhodem}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>

          <h5 className="Text-Name-two">Bộ Nhớ RAM - Ổ Cứng </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="RAM"
              name="ram"
              value={ram}
              onChange={e => onInputChange(e)}> 
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Loại RAM"
              name="loairam"
              value={loairam}
              onChange={e => onInputChange(e)}> 
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Tốc Độ Bus RAM"
              name="tocdobusram"
              value={tocdobusram}
              onChange={e => onInputChange(e)}> 
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Hỗ Trợ RAM Tối Đa"
              name="hotroramtoida"
              value={hotroramtoida}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Ổ Cứng"
              name="ocung"
              value={ocung}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>

          <h5 className="Text-Name-two">Màn Hình </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Màn Hình"
              name="manhinh"
              value={manhinh}
              onChange={e => onInputChange(e)}> 
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Độ Phân Giải"
              name="dophangiai"
              value={dophangiai}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Tần Số Quét"
              name="tansoquet"
              value={tansoquet}
              onChange={e => onInputChange(e)}>
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Công Nghệ Màn Hình"
              name="congnghemanhinh"
              value={congnghemanhinh}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>

          <h5 className="Text-Name-two">Đồ Họa - Âm Thanh</h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Card Màn Hình"
              name="cardmanhinh"
              value={cardmanhinh}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Công Nghệ Âm Thanh"
              name="congngheamthanh"
              value={congngheamthanh}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>

          <h5 className="Text-Name-two">Cổng Kết Nối và Tính Năng Mở Rộng</h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Cổng Giao Tiếp"
              name="conggiaotiep"
              value={conggiaotiep}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Kết Nối Không Dây"
              name="ketnoikhongday"
              value={ketnoikhongday}
              onChange={e => onInputChange(e)}>
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Khe Đọc Thẻ Nhớ"
              name="khedocthenho"
              value={khedocthenho}
              onChange={e => onInputChange(e)}>
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Webcam"
              name="webcam"
              value={webcam}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Tính Năng Khác"
              name="tinhnangkhac"
              value={tinhnangkhac}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Đèn Bàn Phím"
              name="denbanphim"
              value={denbanphim}
              onChange={e => onInputChange(e)}>
            </input>
          </div>

          <h5 className="Text-Name-two">Kích Thước - Trọng Lượng</h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Kích Thước , Trọng Lượng"
              name="kichthuoctrongluong"
              value={kichthuoctrongluong}
              onChange={e => onInputChange(e)}> 
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Chất Liệu"
              name="chatlieu"
              value={chatlieu}
              onChange={e => onInputChange(e)}> 
            </input>
          </div>

          <h5 className="Text-Name-two">Thông Tin Khác</h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Thông Tin Pin"
              name="thongtinpin"
              value={thongtinpin}
              onChange={e => onInputChange(e)}> 
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Hệ Điều Hành"
              name="hedieuhanh"
              value={hedieuhanh}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Thời điểm ra mắt"
              name="thoigianramat"
              value={thoigianramat}
              onChange={e => onInputChange(e)}> 
            </input>
          </div>

          <h5 className="Text-Name-two">Mô Tả Sản Phẩm</h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Ưu Điểm"
              name="uudiem"
              value={uudiem}
              onChange={e => onInputChange(e)}> 
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Hiệu Quả"
              name="hieuqua"
              value={hieuqua}
              onChange={e => onInputChange(e)}>  
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Lưu Ý"
              name="luuy"
              value={luuy}
              onChange={e => onInputChange(e)}> 
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Hướng Dẫn Sử Dụng"
              name="huongdansudung"
              value={huongdansudung}
              onChange={e => onInputChange(e)}> 
            </input>
          </div>


          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Cật Nhật</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditProduct;