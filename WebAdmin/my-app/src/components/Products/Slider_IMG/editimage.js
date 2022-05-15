import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
 
const EditImage = () => {
  let history = useNavigate(); //hàm history.
  const api ='http://localhost:3001/';
  const { id } = useParams();  // children , gọi id của bên màn hình App.js path={"/editdanhmucsanpham/:id"} 
 
    //reload dữ liệu :D
    const refreshPage = ()=>{
      window.location.reload();
   }

  const[list_trademark, setlist_trademark] = useState([]);
  //Tạo useState id cha và tên
  const [trademarkname ,settrademarkname] = useState({
    image:"",
    name_trademark:"",
    name_trademark_email:"",
    name_trademark_address:"",
  })
  const { image, name_trademark } = trademarkname;

      //code xóa hình ảnh
  const deleteImage = async(data) => {
    console.log(data);
    const base_url = api + 'hienthi-id-image/' + data;
    const response = await axios.get(base_url)
    fetch(api + 'deleteimgsp/', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: data,
          delimg : response.data[0].tenhinhanh,
        })
    })
    .then((response) => {
      if(response === 1){
        alert("xóa thành công")
      }
    });
    refreshPage();
  }

    //code update hình ảnh 
    const getimgedit = (e) =>{
     const data = new FormData();
     data.append('idsanpham', id);
     for(var i = 0 ; i < e.target.files.length; i++){
        data.append('file', e.target.files[i]);
     }
     axios.post(api + "upload-multiple-images", data) 
     .then(response => {
       console.log("Tên hình ảnh new : " + response)
    })
    // refreshPage(); 
    }

  useEffect(() => {
    getsanpham();
    getimageidsanpham();
  }, []);

  //code update
  const updateEmployee = async e => {
    history("/Slider-Hinh-Anh-San-Pham");
  };

  // code hiển thị id sản phẩm
  const getsanpham =  async() => {
    const base_url = api + `editsanpham/${id}`;
    const response = await axios.get(base_url);  // lấy dữ liệu ở trên base_url bằng hàm await 
        settrademarkname({
            update: true,
            name_trademark:response.data[0].tensanpham,
            image:response.data[0].img,
            })
  };

      //code hiển thị id hình ảnh
      const getimageidsanpham = async() => {
        const base_url_2 = api + `hienthi-image-id/${id}` ;
        const response_2 = await axios.get(base_url_2)  // lấy dữ liệu ở trên base_url bằng hàm await 
        setlist_trademark(response_2.data);  // hiển thị
      }

 
  return (
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="Text-Name">Cập Nhật Thông Tin</h4>
       
          <h5 className="text-success">Tên Sản Phẩm: {name_trademark} </h5>
          <h6 className="text">ID Hình Ảnh: {id} </h6>
           <div className="form-group mb-3">
              <img className="card-img-top hover-shadow" src={api + 'images/' + image} alt="Chưa có hình ảnh trong file nên không hiển thị" style={{width:"210px", height:"100%"}}/>
          </div>
           
              <div className="form-group">
                   <input type="file" name="file" className="form-control mb-4" onChange={getimgedit}  multiple />
              </div>

              <button onClick={updateEmployee} style={{background: "rgb(216, 21, 21)"}} className="btn btn-secondary btn-block">Xong</button>
       </div>
      </div> 
      

  
      <div className="container" style={{marginTop: "50px"}}>
      <div className="row">
            {list_trademark.map((name) => (
              <div className="col-sm-3" key={name.idhinhanh}>
                <div className="card mb-3" style={{width:"12rem"}}>

                    <h5><a  href="#0" onClick={() => { 
                                          const confirmBox = window.confirm(
                                            "Bạn chắc chắn muốn xóa Hình Ảnh có ID : "+ name.idhinhanh +""
                                          )
                                          if (confirmBox === true) {
                                              deleteImage(name.idhinhanh)                       
                                          }
                                      }}
                                      style={{textDecoration:"none",marginLeft:"162px"}}>

                      <span aria-hidden="true" className="text-danger">&times;</span>

                    </a></h5>
                   
                    <img className="card-img-top hover-shadow" src={api + 'images/' + name.tenhinhanh} alt="Chưa có hình ảnh trong file nên không hiển thị" style={{height:"110px"}}/>
                    <div className="card-body" >
                      <span className="card-text">ID SANPHAM : {name.idhinhanh}</span>
                    </div>
                  </div>
                </div>
              ))}
           </div>
           </div>



    </div>
    
    
  );
};
 
export default EditImage;