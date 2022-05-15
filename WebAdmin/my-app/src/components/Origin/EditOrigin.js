import React, { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";

const EditOriginfuntion = () => {
  const api ='http://localhost:3001/';
  const history = useNavigate(); //hàm history.
  const { id } = useParams();  // children , gọi id của bên màn hình App.js path={"/editdanhmucsanpham/:id"} 

  // Gắn thông tin lấy từ id vào đây
  const [categoryname ,setcategotypush] = useState({
    name_category:"",
  })
  //Truyền dữ liệu id vào đây để hiển thị
  const onInputChange = e => {
    setcategotypush({ ...categoryname,[e.target.name]: e.target.value });
  };
  const { name_category} = categoryname;


  useEffect(() => {
    getorigin();
  }, []);

  //code update
  const updateEmployee = async e => {
    e.preventDefault();
    fetch(api + 'editxuatxu/editid', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: id,
          name_category: name_category ,
        })
        
    })
    .then((response) => {
      if(response === 'okedit'){
        alert("Cập nhật thành công")
      }
    });
    alert("Update thành công");
    history("/Xuat-Xu");
  };
 
  // code hiển thị id danh mục
  const getorigin =  async() => {
            const base_url = api + `editxuatxu/${id}`;
            const response = await axios.get(base_url);  // lấy dữ liệu ở trên base_url bằng hàm await 
            // setcategory(response.data);  // hiển thị
            console.log(response.data[0].noixuatxu);
            setcategotypush({
                    update: true,
                    name_category:response.data[0].noixuatxu,
                  })
  };
 
  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="Text-Name">Cập Nhật Thông Tin Xuất Xứ</h4>
       
          <h5 className="text-success">ID Xuất Xứ: {id} </h5>
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
          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Cật Nhật</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditOriginfuntion;
