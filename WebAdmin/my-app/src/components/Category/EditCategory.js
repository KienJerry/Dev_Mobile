import React, { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";

const EditCategoryfuntion = () => {
  const api ='http://localhost:3001/';
  const history = useNavigate(); //hàm history.
  const { id } = useParams();  // children , gọi id của bên màn hình App.js path={"/editdanhmucsanpham/:id"} 
    //useState Hình Ảnh
    const [selectedFile, setSelectedFile] = useState();
 
  //Khởi tạo useState cho danh sách danh mục
  const[list_category, setlist_category] = useState([]);

  // Gắn thông tin lấy từ id vào đây
  const [categoryname ,setcategotypush] = useState({
    name_category:"",
    name_category_parent:"",
  })
  //Truyền dữ liệu id vào đây để hiển thị
  const onInputChange = e => {
    setcategotypush({ ...categoryname,[e.target.name]: e.target.value });
  };
  const { name_category, name_category_parent ,} = categoryname;


  useEffect(() => {
    getdanhmuc();
    getdanhmucfull();
    getimgedit();
  }, []);

  //code update
  const updateEmployee = async e => {
    e.preventDefault();
    fetch(api + 'editdanhmucsanpham/editid', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: id,
          name_category: name_category ,
          name_category_parent:  name_category_parent,
        })
        
    })
    .then((response) => {
      if(response === 'okedit'){
        alert("Cập nhật thành công")
      }
    });
    alert("Update thành công");
    history("/Danh-Muc-San_Pham");
  };
 
  // code hiển thị id danh mục
  const getdanhmuc =  async() => {
            const base_url = api + `editdanhmucsanpham/${id}`;
            const response = await axios.get(base_url);  // lấy dữ liệu ở trên base_url bằng hàm await 
            // setcategory(response.data);  // hiển thị
            console.log(response.data[0].tendanhmuc);
            console.log(response.data[0].danhmuccha);
            setcategotypush({
                    update: true,
                    name_category:response.data[0].tendanhmuc,
                    name_category_parent:response.data[0].danhmuccha,
                  })
  };

  //code hiển thị danh sách danh mục 
  const getdanhmucfull = async() => {
    const base_url = api + 'danhmucsanpham/';
    const response = await axios.get(base_url)  // lấy dữ liệu ở trên base_url bằng hàm await 
    setlist_category(response.data);  // hiển thị
  }

  //Update Hình Ảnh
    const getimgedit = async(e) =>{
      const data = new FormData();
      data.append('file', e.target.files[0]);
      data.append('myid', id);
      axios.post(api + "edituploadFiledanhmuc", data)
           .then(response => {
             console.log("Tên hình ảnh new : " + response.data)
           })
     }
 
  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="Text-Name">Cập Nhật Thông Tin Danh Mục</h4>
       
          <h5 className="text-success">ID Danh Mục: {id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Tên Danh Mục"
              name="name_category"
              value={name_category}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>

          <div >
                  <select value={name_category_parent} name="name_category_parent" onChange= {e => onInputChange(e)}>
                    <option value="0">Chọn Danh Mục</option>
                    {list_category.map((itemfull)=>
                    <option key={itemfull.iddanhmuc} value={itemfull.iddanhmuc}>{itemfull.tendanhmuc}</option>
                    )}
                  </select>
          </div>

          <input type="file" name="file" className="form-control mb-4" onChange={getimgedit}/>
          
          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Cật Nhật</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditCategoryfuntion;
