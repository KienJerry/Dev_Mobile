import React, { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";

const EditTrademarkfuntion = () => {
    const api ='http://localhost:3001/';
    let history = useNavigate(); //hàm history.
    const { id } = useParams();  // children , gọi id của bên màn hình App.js path={"/editdanhmucsanpham/:id"} 
  
    //Tạo useState id cha và tên
    const [categoryname ,setcategotypush] = useState({
      name_trademark:"",
      name_email:"",
      name_address:"",
    })
    const onInputChange = e => {
      setcategotypush({ ...categoryname,[e.target.name]: e.target.value });
    };
    const { name_trademark, name_email,name_address } = categoryname;
  
  //code update
  const updateEmployee = async e => {
    e.preventDefault();
    fetch(api + 'editthuonghieu/editid', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: id,
          name_trademark: name_trademark ,
          name_email:  name_email,
          name_address : name_address
        })
        
    })
    .then((response) => {
      if(response === 'okedit'){
        alert("Cập nhật thành công")
      }
    });
    alert("Update thành công");
    history("/Thuong-Hieu");
  };

    useEffect(() => {
      getdanhmuc();
    }, []); 
   
    // code hiển thị id danh mục
    const getdanhmuc =  async() => {
      console.log(id);
              const base_url = api + `editthuonghieu/${id}`;
              const response = await axios.get(base_url);  // lấy dữ liệu ở trên base_url bằng hàm await 
              console.log(response.data); 
              // setcategory(response.data);  // hiển thị
              console.log(response.data[0].tenthuonghieu);
              console.log(response.data[0].email);
              setcategotypush({
                      update: true,
                      name_trademark:response.data[0].tenthuonghieu,
                      name_email:response.data[0].email,
                      name_address: response.data[0].diachithuonghieu,
                    })
    };
  
  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="Text-Name">Cập Nhật Thông Tin Thương Hiệu</h4>
       
          <h5 className="text-success">ID Thương Hiệu : {id} </h5>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Tên Thương hiệu"
              name="name_trademark"
              value={name_trademark}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Nhập Email"
              name="name_email"
              value={name_email}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập Địa Chỉ Thương Hiệu"
              name="name_address"
              value={name_address}
              onChange={e => onInputChange(e)}>   
            </input>
          </div>
          
          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Cật Nhật</button>
       
       </div>
      </div> 
    </div>
  );
};
 
export default EditTrademarkfuntion;
