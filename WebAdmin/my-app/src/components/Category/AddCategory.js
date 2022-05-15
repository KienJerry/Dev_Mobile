import React, { useState ,useEffect } from "react";
import '../../folder_css/css_two.css'
import { useForm } from "react-hook-form";
import { useNavigate  } from "react-router-dom";
import axios from "axios";

export default function ThemDanhMucSanPham() {
    const api ='http://localhost:3001/';
    const history = useNavigate(); //Hàm History
    const { register, handleSubmit,} = useForm();
    const[list_category , setlist_category] = useState([]);

    //Thêm Danh Mục
    const onSubmit = data =>{ 
        axios.post(api +'adddanhmucsanpham/', data)
          .then(response => {
            if(response.data ==='ok'){
                alert("thêm thành công")
                history("/Danh-Muc-San_Pham");
            }
          });
    }

    //Hiển thị Danh Mục
    useEffect(() => {
        getdanhmuc();
    }, []);

 //code hiển thị danh sách danh mục 
    const getdanhmuc = async() => {
       const base_url = api + 'danhmucsanpham/';
       const response = await axios.get(base_url)
       console.log(response.data); 
       setlist_category(response.data);
    }
    return (
        <div className="form_add_cate">
            <h2 className="Text-Name">Thêm Danh Mục Sản Phẩm</h2> 
            <div className="form_nhap_thon_tin_danh_muc">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className="Input-AddCategory" placeholder="Tên Danh Mục" {...register("name_category")} />
                    <select className="Input-AddCategory" {...register("name_category_parent")}>
                        <option value="0">Chọn Danh Mục</option>
                        {list_category.map((item)=>
                            <option key={item.iddanhmuc} value={item.iddanhmuc}>{item.tendanhmuc}</option>
                        )}
                    </select>
                    <div className="Btn-Add">
                        <button className="button3" onSubmit={handleSubmit(onSubmit)}>Thêm </button>
                    </div>
                </form>
                
            </div>
       </div>
    );
  }