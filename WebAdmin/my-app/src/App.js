import './App.css';
import logo from './logo.svg';
import React from "react";
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from "react-router-dom";

import Tab from './components/Tab'
import Err from './components/Err404'
import Product from './components/Products/Product'
import AddProduct from './components/Products/AddProduct'
import EditProduct from './components/Products/editProduct'
import ListProduct from './components/Products/Listproduct'
import Category from './components/Category/Category'
import Trademark from './components/Trademark/Trademark'
import Slider from './components/Products/Slider_IMG/img'
import Origin from './components/Origin/Origin'
import History from './components/History/History'
import Notification from './components/Notification/Notification'
import Account from './components/Account/Account'
import AddCategory from './components/Category/AddCategory'
import ListCategory from './components/Category/ListCategory'
import EditCategory from './components/Category/EditCategory'
import AddReademark from './components/Trademark/AddTrademark'
import EditReademark from './components/Trademark/EditTrademark'
import ListReademark from './components/Trademark/ListTrademark'
import AddOrigin from './components/Origin/AddOrigin'
import EditOrigin from './components/Origin/EditOrigin'
import ListOrigin from './components/Origin/ListOrigin'
import EditImage from './components/Products/Slider_IMG/editimage'
import ChiTietSanPham from './components/Products/ChiTietSanPham'
import ListChiTietSanPham from './components/Products/ListChiTietSanPham'

export default function BasicExample() {
  return (
    <Router>
      <div className='background'>
        
        <div className="CSS-Tab">
                <img alt="Logo_APP" src={require("./folder_css/img/Logo_orange.png")} width="200" height="100"></img>
                <li> <a href="/San-Pham" ><img alt="IMG_1" src={require("./folder_css/img/1.png")} style={{marginRight: 20 }}></img> Sản Phẩm </a> </li>
                <li> <a href="/Danh-Muc-San_Pham"><img alt="IMG_2" src={require("./folder_css/img/2.png")} style={{marginRight: 20 }}></img>Danh Mục</a> </li>
                <li> <a href="/Thuong-Hieu"><img alt="IMG_3" src={require("./folder_css/img/3.png")} style={{marginRight: 20 }}></img>Thương Hiệu</a> </li>
                <li> <a href="/Slider-Hinh-Anh-San-Pham"><img alt="IMG_4" src={require("./folder_css/img/4.png")} style={{marginRight: 20 }}></img>Nhiều Hình Ảnh </a> </li>
                <li> <a href="/Xuat-Xu"><img alt="IMG_5" src={require("./folder_css/img/5.png")} style={{marginRight: 20 }}></img>Xuất Xứ</a> </li>
                <li> <a href="/Lich-Su"><img alt="IMG_6" src={require("./folder_css/img/6.png")} style={{marginRight: 20 }}></img>Lịch Sử</a> </li>
                <li> <a href="/Thong-Bao"><img alt="IMG_7" src={require("./folder_css/img/7.png")} style={{marginRight: 20 }}></img>Thông Báo</a> </li>
                <li> <a href="/Tai-Khoan"><img alt="IMG_8" src={require("./folder_css/img/8.png")} style={{marginRight: 20 }}></img>Tài Khoản</a> </li>
                <li> <a href="/"><img alt="IMG_9" src={require("./folder_css/img/9.png")} style={{marginRight: 20 }}></img>Thoát</a> </li>
        </div>
        
        <div className='ABC'>
        <Routes>
        <Route path="/" element={<KhongCoGi/>} />
        <Route path="/San-Pham" element={<Product/>} />
        <Route path="/Them-San-Pham" element={<AddProduct/>} />
        <Route path="/Sua-San-Pham/:id" element={<EditProduct/>} />
        <Route path="/Danh-Sach-San-Pham" element={<ListProduct/>} />
        <Route path="/Chi-Tiet-San-Pham/:id" element={<ChiTietSanPham/>} />
        <Route path="/List-Chi-Tiet-San-Pham/:id" element={<ListChiTietSanPham/>} />
        <Route path="/Danh-Muc-San_Pham" element={<Category/>} />
        <Route path="/Them-Danh-Muc-San_Pham" element={<AddCategory/>} />
        <Route path="/Danh-Sach-Danh-Muc-San-Pham" element={<ListCategory/>}/>
        <Route path="/Sua-Danh-Muc-San-Pham/:id" element={<EditCategory/>}/>
        <Route path="/Thuong-Hieu" element={<Trademark/>} />
        <Route path="/Them-Thuong-Hieu" element={<AddReademark/>} />
        <Route path="/Sua-Thuong-Hieu/:id" element={<EditReademark/>} />
        <Route path="/List-Thuong-Hieu" element={<ListReademark/>} />
        <Route path="/Slider-Hinh-Anh-San-Pham" element={<Slider/>} />
        <Route path="/Edit-Slider-Hinh-Anh-San-Pham/:id" element={<EditImage/>} />
        <Route path="/Xuat-Xu" element={<Origin/>} />
        <Route path="/Them-Noi-Xuat-Xu" element={<AddOrigin/>} />
        <Route path="/Sua-Noi-Xuat-Xu/:id" element={<EditOrigin/>} />
        <Route path="/List-Noi-Xuat-Xu" element={<ListOrigin/>} />
        <Route path="/Lich-Su" element={<History/>} />
        <Route path="/Thong-Bao" element={<Notification/>} />
        <Route path="/Tai-Khoan" element={<Account/>} />
        <Route path="/Tab" element={<Tab/>} />
        <Route path="*" element={<Err/>} />
        </Routes>
</div>
        

       
      </div>
    </Router>
  );
}

function KhongCoGi() {
  return (
        <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                REACTJS <code>--ADMIN-- </code> Sales and Social
              </p>
              <li style={{}}>
                  <Link to="/San-Pham">Bắt Đầu (Sales APP)</Link>
                  <Link to="/Tab">Bắt Đầu(Social APP)</Link>
                </li>
            </header>
        </div> 
      
  );
}

