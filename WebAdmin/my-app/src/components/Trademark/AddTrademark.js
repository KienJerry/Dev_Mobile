import React, { useState ,useEffect } from "react";
import '../../folder_css/css_two.css'
import { useForm } from "react-hook-form";
import { useNavigate  } from "react-router-dom";
import axios from "axios";

export default function ThemThuongHieuSanPham() {
    const api ='http://localhost:3001/';
    const history = useNavigate(); //Hàm History
    const { register, handleSubmit,} = useForm();

    //Thêm Danh Mục
    const onSubmit = data =>{ 
        axios.post(api +'addthuonghieu/', data)
          .then(response => {
            if(response.data ==='ok'){
                alert("thêm thành công")
                history("/Thuong-Hieu");
            }
          });
    }

    return (
        <div className="form_add_cate">
            <h2 className="Text-Name">Thêm Thương Hiệu Sản Phẩm</h2> 
            <div className="form_nhap_thon_tin_danh_muc">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type={"text"} className="Input-AddCategory" placeholder="Tên Thương Hiệu" {...register("name_category")} />
                    <input type="email" className="Input-AddCategory" placeholder="Email" {...register("email_trademark")} />
                    <input className="Input-AddCategory" placeholder="Địa Chỉ" {...register("address_trademark")} /> 
                    <div className="Btn-Add">
                        <button className="button3" onSubmit={handleSubmit(onSubmit)}>Thêm </button>
                    </div>
                </form>
                
            </div>
       </div>
    );
  }