import React ,{useState , useEffect} from "react";
import '../../folder_css/css_two.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from 'react-paginate';


export default function ThuongHieu() {
  const[list_Trademark , setlist_Trademark] = useState([]);
  const [search,setSearch] =useState('');
  const api ='http://localhost:3001/';

     //Hiển thị Danh Mục
  useEffect(() => {
      getdanhmuc();
      handePageClick();
  }, []);

//code hiển thị danh sách danh mục 
  const getdanhmuc = async() => {
     const base_url = api + 'thuonghieu/1';
     const response = await axios.get(base_url) 
     setlist_Trademark(response.data);
  }

  //Cũng là hiển thị nhưng phân trang
const handePageClick = async(data) => {
  let currenPage = data.selected + 1;
    const base_url = api + 'thuonghieu/' + currenPage;
    const response = await axios.get(base_url)
    setlist_Trademark(response.data);
}

  //Code Xóa
  const delete_category = data => {
    console.log(data);
    fetch(api + 'deletethuonghieu/', {   
      method: 'POST',
      headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          myid: data,
        })
    })
    .then((response) => {
      if(response === 'okdelete'){
        alert("xóa thành công")
      }
    });
    window.location.reload();
  }

    // Search  
    const searchRecords = () => {
      axios.get(api + `searchthuonghieu/${search}`)
      .then(response => {
        setlist_Trademark(response.data);
      });
      if(search === ""){
        window.location.reload();
      }
  }
  return (
      <div className="giao-dien-product">
        <h2 className="Text-Name">Thương Hiệu Sản Phẩm ADMIN</h2> 
        <div className="push-2-product">
          <Link to={`/Them-Thuong-Hieu`}>
            <button className="button1"><img alt="IMG_1" src={require("../../folder_css/img/10.png")} style={{marginRight: 10 ,width : 20 , height: 20 ,}}></img>Thêm Thương Hiệu</button>
          </Link>
          <Link to={`/List-Thuong-Hieu`}>
            <button className="button2">Danh Sách Thương Hiệu</button>
          </Link>
          <input className="input-search-one" onChange={(e)=>setSearch(e.target.value)} placeholder="Tìm Kiếm..."></input><button onClick={searchRecords} className="btn-search">Tìm Kiếm</button>
          <hr  width="100%" size="5px" align="center" color="red"/>
        </div>
        <div className="List-product">
        <table className="table table-hover table-bordered ml-4 ">
            <thead>
            <tr className="Text-Color">
                <th>ID Thương Hiệu</th>
                <th>Tên Thương Hiệu</th>
                <th>Email Thương Hiệu</th>
                <th>Địa Chỉ Thương Hiệu</th>
                <th>Chức năng</th>
            </tr>
            </thead>
            <tbody>
     
            {list_Trademark.map((name)=>
                <tr className="Text-Color-one"  key={name.idthuonghieu}>
                <td>{name.idthuonghieu}</td>
                <td>{name.tenthuonghieu}</td>
                <td>{name.email}</td>
                <td>{name.diachithuonghieu}</td>
                <td>
                      <Link to={`/Sua-Thuong-Hieu/${name.idthuonghieu}`}>
                          <button className="magin_btn_Edit">
                              <img alt="IMG_1" src={require("../../folder_css/img/12.png")} style={{marginRight: 10 ,width : 20 , height: 20 ,}}></img>  Sửa   
                          </button>
                      </Link>
                      <button className="magin_btn" 
                        onClick={() => { 
                        const confirmBox = window.confirm(
                          "Bạn chắc chắn muốn xóa Tên Thương Hiệu : "+ name.tenthuonghieu +""
                        )
                        if (confirmBox === true) {     
                          delete_category(name.idthuonghieu)                   
                        }
                        
                      }}> 
                          <img alt="IMG_1" src={require("../../folder_css/img/13.png")} style={{marginRight: 10 ,width : 20 , height: 20 ,}}></img>   Xóa    
                      </button>
                </td>
                </tr>
                )} 
            </tbody>
        </table>
        </div>
        <ReactPaginate
           previousLabel={'<<'}
           nextLabel={'>>'}
           breakLabel={'...'}
           pageCount={5}
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
    );
  }