import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
 
const EditProduct = () => {
  const api ='http://localhost:3001/';
  let history = useNavigate(); //hàm history.
  const { id } = useParams();  // children , gọi id của bên màn hình App.js path={"/editdanhmucsanpham/:id"} 

      //Khởi tạo useState cho danh sách danh mục
  const[list_category, setlist_category] = useState([]);
      //Khởi tạo useState cho danh sách danh mục
  const[list_trademark, setlist_trademark] = useState([]);
    //Khởi tạo useState cho Nơi Xuất Xứ
    const[list_origin, setlist_origin] = useState([]);
 
  //Tạo useState id cha và tên
  const [trademarkname ,settrademarkname] = useState({
    name_products:"",
    name_trademark:"",
    giaspcu:"",
    origin:"",
    image:"",
    name_category:"",
    giaspmoi:"",
  })
  const onInputChange = e => {
    settrademarkname({ ...trademarkname,[e.target.name]: e.target.value });
  };
  const { name_products, name_trademark ,giaspcu, origin, image, name_category,giaspmoi} = trademarkname;

  useEffect(() => {
    getlistsanpham();
    getdanhmucfull();
    getthuonghieufull();
    getxuatxufull();
    getimgedit();
  }, []);

  //code update
  const updateEmployee = async e => {
    e.preventDefault();
    fetch(api + 'editsanpham/editid', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: id,
          name_products: name_products ,
          name_trademark:  name_trademark,
          giaspcu: giaspcu,
          origin:origin,
          image:image,
          name_category:name_category,
          giaspmoi:giaspmoi,
        })    
    })
    .then((response) => {
      if(response === 'okedit'){
        alert("thành công")
      }
    });
    history("/San-Pham");
  };

  //code update hình ảnh 
  const getimgedit = async(e) =>{
   const data = new FormData();
   data.append('file', e.target.files[0]);
   data.append('myid', id);
   data.append('deletefile',image);
   axios.post(api + "edituploadFileSanPham", data)
        .then(response => {
          console.log("Tên hình ảnh new : " + response.data)
        })
  }
 
  // code hiển thị id sanpham
  const getlistsanpham =  async() => {
            const base_url = api + `editsanpham/${id}`;
            const response = await axios.get(base_url);  // lấy dữ liệu ở trên base_url bằng hàm await 
            console.log( response.data[0]); 
            settrademarkname({
                    update: true,
                    name_products:response.data[0].tensanpham,
                    giaspcu:response.data[0].giacu,
                    giaspmoi:response.data[0].giamoi,
                    image:response.data[0].img,
                    name_trademark:response.data[0].idthuonghieu,
                    name_category:response.data[0].iddanhmuc,
                    origin:response.data[0].xuatxuthuonghieu,
                  })
                  
  };

    //code hiển thị danh sách danh mục 
    const getdanhmucfull = async() => {
      const base_url = api + 'danhmucsanpham/';
      const response = await axios.get(base_url)  // lấy dữ liệu ở trên base_url bằng hàm await 
      setlist_category(response.data);  // hiển thị
    }

    //code hiển thị danh sách thương hiệu 
    const getthuonghieufull = async() => {
      const base_url_th = api + 'thuonghieu/';
      const response_th = await axios.get(base_url_th)  // lấy dữ liệu ở trên base_url bằng hàm await 
      setlist_trademark(response_th.data);  // hiển thị
    }
    
    //code hiển thị nơi xuất xứ
    const getxuatxufull = async() => {
        const base_url_th = api + 'xuatxu/';
        const response_th = await axios.get(base_url_th)  // lấy dữ liệu ở trên base_url bằng hàm await 
        setlist_origin(response_th.data);  // hiển thị
      }

  return (
    <div className="container">
      <div className="row mt-4">
       <div>
        <h4 className="Text-Name">Cập Nhật Thông Tin Sản Phẩm</h4>
       
          <h5 className="text-success">ID Sản Phẩm: {id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Tên Sản Phẩm"
              name="name_products"
              value={name_products}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>

          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Nhập Giá Cũ"
              name="giaspcu"
              value={giaspcu}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>

          <div className="form-group mb-3">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Nhập Giá Mới"
              name="giaspmoi"
              value={giaspmoi}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>

          <div className="form-group mb-3">
              <select className="form-control form-control-lg" value={name_category} name="name_category" onChange= {e => onInputChange(e)}>
                    {list_category.map((itemfull)=>
                    <option key={itemfull.iddanhmuc} value={itemfull.tendanhmuc}>{itemfull.tendanhmuc}</option>
                    )}
              </select>
          </div>
                        
          <div className="form-group mb-3">
            <select className="form-control form-control-lg" value={name_trademark} name="name_trademark" onChange= {e => onInputChange(e)}>
                    {list_trademark.map((itemfull)=>
                    <option key={itemfull.mathuonghieu} value={itemfull.tenthuonghieu}>{itemfull.tenthuonghieu}</option>
                    )}
              </select>
          </div>

          <div className="form-group mb-3">
            <select className="form-control form-control-lg" value={origin} name="origin" onChange= {e => onInputChange(e)}>
                    {list_origin.map((itemfull)=>
                    <option key={itemfull.idxuatxu} value={itemfull.tenxuatxu}>{itemfull.noixuatxu}</option>
                    )}
              </select>
          </div>

          <div className="form-group mb-3">
            <input
              type="file"
              className="form-control form-control-lg"
              placeholder="Mã hình ảnh (sau này update thêm)"
              name="file"
              onChange={getimgedit}> 
            </input>
          </div>

          <div className="form-group mb-3">
            <h5 value = {image} onChange={e => onInputChange(e)} name = "image" className="form-control form-control-lg">tên ID Hình Ảnh: {image} </h5>
            <img className="" src={api + 'images/' + image} alt="Chưa có hình ảnh trong file nên không hiển thị" style={{height:"230px" , weight:"100%"}}/>
          </div>
          
          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Cật Nhật</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditProduct;