import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
// import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import '../../folder_css/css_two.css'

const api ='http://localhost:3001/';
 
function ThemSanPham(){
  const history = useNavigate(); //Hàm History

  //Khởi tạo useState cho danh sách danh mục
  const[list_category, setlist_category] = useState([]);
  //Khởi tạo useState cho thương hiệu
  const[list_trademark, setlist_trademark] = useState([]);
    //Khởi tạo useState cho Nơi Xuất Xứ
    const[list_origin, setlist_origin] = useState([]);
  //useState Hình Ảnh
  const [selectedFile, setSelectedFile] = useState();
  //State Add
  const [tensanpham , settensanpham] = useState('');
  const [loaisanpham , setloaisanpham] = useState('');
  const [danhmucsanpham , setdanhmucsanpham] = useState('');
  const [giasanpham , setgiasanpham] = useState('');
  const [thuonghieu , setthuonghieu] = useState('');
  const [xuatxu , setxuatxu] = useState('');
  const [giacu , setgiacu] = useState('');

    //code hiển thị danh sách danh mục 
    const getdanhmuc = async() => {
      const base_url_1 = api + 'danhmucsanpham/';
      const response_1 = await axios.get(base_url_1)  // lấy dữ liệu ở trên base_url bằng hàm await 
      // console.log(response.data); 
      setlist_category(response_1.data);  // hiển thị
    }

    //code hiển thị các thương hiệu
    const getthuonghieu = async() => {
      const base_url_2 = api + 'thuonghieu/';
      const response_2 = await axios.get(base_url_2)  // lấy dữ liệu ở trên base_url bằng hàm await 
      setlist_trademark(response_2.data);  // hiển thị
    }

    //Code Hiển thị nơi xuất xứ
    const getxuatxu = async() => {
      const base_url = api + 'xuatxu';
      const response = await axios.get(base_url) 
      setlist_origin(response.data);
   }

    useEffect(() => {
      getdanhmuc();
      getthuonghieu();
      getxuatxu();
    }, []);

    //code thêm sản phẩm
    const submitEmployeeRecord = async (e) =>{ 
      const formData = new FormData(); 
      formData.append('ten', tensanpham);
      formData.append('loaisanpham', loaisanpham);
      formData.append('danhmucsanpham', danhmucsanpham);
      formData.append('giasanpham', giasanpham);
      formData.append('file', selectedFile);
      formData.append('xuatxu', xuatxu);
      formData.append('thuonghieu', thuonghieu);
      formData.append('giacu', giacu);

      console.log( "Tên đã nhập" +tensanpham);
        axios.post(api +'addsanpham/',  formData )
        .then(res =>{
            if(res.data ==='ok'){
              alert("thêm thành công")
          }
          console.log(res);
          history("/San-Pham");
        })   
    }
  return(
    <section>    
    <div className="container">  
    <h2 className="Text-Name">THÊM SẢN PHẨM</h2>
      <div className="row mt-3">
       <div className="col-sm-11">
       <div className='row-center-add-product'>
          <div className="box p-3 mb-3 mt-5" style={{border:"1px solid #d0d0d0"}}>
            <form onSubmit={submitEmployeeRecord}>
                <div className="form-group">
                   <input type="text" name='tensanpham' className="form-control  mb-4" placeholder="Tên Sản Phẩm" onChange={(e) => settensanpham(e.target.value)}/>
                </div>
                  
                <div className="form-group">
                <select onChange={(e) => setdanhmucsanpham(e.target.value)} className="form-control  mb-4">
                  {list_category.map((item)=>
                    <option key={item.tendanhmuc} value={item.tendanhmuc}>{item.tendanhmuc}</option>
                  )}
                </select>
                </div>

                <div className="form-group">
                   <input type="text" name='loaisanpham' className="form-control  mb-4" placeholder="Loại Sản Phẩm" onChange={(e) => setloaisanpham(e.target.value)}/>
                </div>

                <div className="form-group">
                <select onChange={(e) => setthuonghieu(e.target.value)} className="form-control  mb-4">
                  {list_trademark.map((item)=>
                    <option key={item.tenthuonghieu} value={item.tenthuonghieu}>{item.tenthuonghieu}</option>
                  )}
                </select>
                </div>

                <div className="form-group">
                <select onChange={(e) => setxuatxu(e.target.value)} className="form-control  mb-4">
                  {list_origin.map((item)=>
                    <option key={item.noixuatxu} value={item.noixuatxu}>{item.noixuatxu}</option>
                  )}
                </select>
                </div>
              
                <div className="form-group">
                   <input type="number" name='giacu' className="form-control mb-4"  placeholder="Giá Sản Phẩm Cũ" onChange={(e) => setgiacu(e.target.value)}/>
                </div>

                <div className="form-group">
                   <input type="number" name='gia' className="form-control mb-4"  placeholder="Giá Sản Phẩm Mới" onChange={(e) => setgiasanpham(e.target.value)}/>
                </div>

                <div className="form-group">
                   <input type="file" name="file" className="form-control mb-4" onChange={(e) => setSelectedFile(e.target.files[0])}/>
                </div>
                </form> 
                <input className='button5' type="submit" value={"Thêm"} onClick={submitEmployeeRecord}>
                </input>
        </div>
      </div>
      </div>
      </div>
    </div>
   </section>
  )
}
 
export default ThemSanPham;
