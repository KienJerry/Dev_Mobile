import React ,{useState , useEffect} from "react";
import '../../folder_css/css_two.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from 'react-paginate';

export default function SanPham() {
  const api ='http://localhost:3001/';
  const [listproduct , setlistproduct] = useState([]);
  const [search,setSearch] =useState('');

    //Hiển thị 
    useEffect(() => {
      getsanpham();
      handePageClick();
    }, []);

//code hiển thị danh sách San Pham
const getsanpham = async() => {
  const base_url = api + 'sanpham/1';
  const response = await axios.get(base_url) 
  setlistproduct(response.data);
  console.log(response.data);
}
  //Cũng là hiển thị nhưng phân trang
  const handePageClick = async(data) => {
    let currenPage = data.selected + 1;
      const base_url = api + 'sanpham/' + currenPage;
      const response = await axios.get(base_url)
      setlistproduct(response.data);
  }

    // Search  
    const searchRecords = () => {
      axios.get(api + `searchsanpham/${search}`)
      .then(response => {
        setlistproduct(response.data);
      });
      if(search === ""){
        window.location.reload();
      }
  }

  //Code Xóa
  const delete_product = async(data) => {
    console.log(data);
      const base_url = api + 'sanpham/' + data + "/" + data;
      const response = await axios.get(base_url)
      console.log(response.data[0].img);
    fetch(api + 'deletesanpham/', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: data,
          hinhanh : response.data[0].img
        })
    })
    .then((response) => {
      if(response === 'okdelete'){
        alert("xóa thành công")
      }
    });
    window.location.reload();
  }

    return (
      <div className="giao-dien-product">
        <h2 className="Text-Name">Sản Phẩm ADMIN</h2> 
        <div className="push-2-product">
          <Link to={"/Them-San-Pham"}>
            <button className="button1"><img alt="IMG_1" src={require("../../folder_css/img/10.png")} style={{marginRight: 10 ,width : 20 , height: 20 ,}}></img>Thêm Sản Phẩm</button>
          </Link>
          <Link to={"/Danh-Sach-San-Pham"}>
              <button className="button2">Danh Sách Sản Phẩm</button>
          </Link>
          <input className="input-search"  placeholder="Tìm Kiếm..." onChange={(e)=>setSearch(e.target.value)}></input><button onClick={searchRecords}>Tìm Kiếm</button>
          <hr  width="100%" size="5px" align="center" color="red"/>
        </div>
        <div className="List-product">
        <table className="table table-hover table-bordered ">
            <thead>
            <tr className="Text-Color">
                <th>ID Sản Phẩm</th>
                <th>Tên Sản Phẩm</th>
                <th>Loại Sản Phẩm</th>
                <th>Giá Sản Phẩm</th>
                <th>Hãng Sản Xuất</th>  
                <th>Hình ảnh</th>
                <th>Chức năng</th>
            </tr>
            </thead>
            <tbody>
     
            {listproduct.map((name)=>
                <tr className="Text-Color-one" key={name.idsanpham}>
                <td>{name.idsanpham}</td>
                <td>{name.tensanpham}</td>
                <td>{name.loaisanpham}</td>
                <td>{name.giamoi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                <td>{name.xuatxuthuonghieu}</td>
                <td>
                <img className="card-img-top hover-shadow" src={api + "images/" + name.img} alt="Chưa có hình ảnh trong file nên không hiển thị" style={{width:"120px", height:"100%"}}/>
                </td>
                <td>
                      <Link to={`/Sua-San-Pham/${name.idsanpham}`}>
                          <button className="magin_btn_Edit">
                              <img alt="IMG_1" src={require("../../folder_css/img/12.png")} style={{marginRight: 10 ,width : 20 , height: 20 ,}}></img>  Sửa   
                          </button>
                      </Link>
                      <button className="magin_btn" 
                        onClick={() => { 
                        const confirmBox = window.confirm(
                          "Bạn chắc chắn muốn xóa Sản Phẩm : "+ name.tensanpham +""
                        )
                        if (confirmBox === true) {     
                          delete_product(name.idsanpham)                   
                        }
                        
                      }}> 
                          <img alt="IMG_1" src={require("../../folder_css/img/13.png")} style={{marginRight: 10 ,width : 20 , height: 20 ,}}></img>   Xóa    
                      </button>
                      <Link to={`/Chi-Tiet-San-Pham/${name.idsanpham}`}>
                          <button className="button6">Cập Nhật Chi Tiết SP</button>
                      </Link>
                </td>
                </tr>
                )} 
            </tbody>
        </table>
        <ReactPaginate
           previousLabel={'<<'}
           nextLabel={'>>'}
           breakLabel={'...'}
           pageCount={8}
           marginPagesDisplayed={2}
           pageRangeDisplayed={3}
           onPageChange={handePageClick}
           containerClassName={'pagination justify-content-center'}
           pageClassName={'page-item'}
           pageLinkClassName={'page-link'}
           previousClassName={'page-item'}
           previousAriaLabel={'page-link'}
           nextClassName={'page-item'}
           nextLinkClassName={'page-link'}
           previousLinkClassName={'page-link'}
           breakClassName={'page-item'}
           breakLinkClassName={'page-link'}
           activeClassName={'active'}
        ></ReactPaginate>
        </div>      
      </div>
    );
  }