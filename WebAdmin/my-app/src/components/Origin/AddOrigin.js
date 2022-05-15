import React, { useState ,useEffect } from "react";
import '../../folder_css/css_two.css'
import { useForm } from "react-hook-form";
import { useNavigate  } from "react-router-dom";
import axios from "axios";

export default function ThemNoiXuatXu() {
    const api ='http://localhost:3001/';
    const history = useNavigate(); //Hàm History
    const { register, handleSubmit,} = useForm();

    //Thêm Danh Mục
    const onSubmit = data =>{ 
        axios.post(api +'addxuatxu/', data)
          .then(response => {
            if(response.data ==='ok'){
                alert("thêm thành công")
                history("/Xuat-Xu");
            }
          });
    }
    return (
        <div className="form_add_cate">
            <h2 className="Text-Name">Thêm Nơi Xuất Xứ</h2> 
            <div className="form_nhap_thon_tin_danh_muc">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className="Input-AddCategory" placeholder="Nhập Nơi Xuất Xứ" {...register("name_origin")} />
                    <div className="Btn-Add">
                        <button className="button3" onSubmit={handleSubmit(onSubmit)}>Thêm </button>
                    </div>
                </form>
                
            </div>
       </div>
    );
  }