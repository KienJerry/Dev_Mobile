import React ,{useState , useEffect} from "react";
import '../../folder_css/css_two.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from 'react-paginate';


export default function ListDanhMucSanPham() {
  const[list_category , setlist_category] = useState([]);
  const [search,setSearch] =useState('');
  const api ='http://localhost:3001/';

     //Hiển thị Danh Mục
  useEffect(() => {
      getdanhmuc();
      handePageClick();
  }, []);

//code hiển thị danh sách danh mục 
  const getdanhmuc = async() => {
     const base_url = api + 'listdanhmucsanpham/1';
     const response = await axios.get(base_url) 
     setlist_category(response.data);
  }
//Cũng là hiển thị nhưng phân trang
const handePageClick = async(data) => {
  let currenPage = data.selected + 1;
    const base_url = api + 'listdanhmucsanpham/' + currenPage;
    const response = await axios.get(base_url)
    setlist_category(response.data);
}

//Code Xóa
  const delete_category = data => {
    console.log(data);
    fetch(api + 'deletedanhmucsanpham/', {   
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

  // Search name 
  const searchRecords = () => {
      axios.get(api + `searchdanhmucsanpham/${search}`)
      .then(response => {
        setlist_category(response.data);
      });
      if(search === ""){
        window.location.reload();
      }
  }

  return (
      <div className="giao-dien-product">
        <h2 className="Text-Name">Danh Sách Danh Mục Sản Phẩm ADMIN</h2> 
        <div className="push-2-product">
            <Link to={`/Danh-Muc-San_Pham`}>
                <button className="button1">Danh Mục Sản Phẩm</button>
            </Link>
          <input className="input-search-one" onChange={(e)=>setSearch(e.target.value)} placeholder="Tìm Kiếm..."></input><button  className="btn-search"  onClick={searchRecords}>Tìm Kiếm</button>
          <hr  width="100%" size="5px" align="center" color="red"/>
        </div>
        <div className="List-product">
        <table className="table table-hover table-bordered ml-4 ">
            <thead>
            <tr className="Text-Color">
                <th>ID Danh Mục</th>
                <th>Tên Danh Mục</th>
                <th>Danh Mục Cha</th>
                <th>Hình Ảnh Danh Mục</th>
                <th>Chức năng</th>
            </tr>
            </thead>
            <tbody>
     
            {list_category.map((name)=>
                <tr className="Text-Color-one"  key={name.iddanhmuc}>
                <td>{name.iddanhmuc}</td>
                <td>{name.tendanhmuc}</td>
                <td>{name.danhmuccha}</td>
                <td>
                <img className="card-img-top hover-shadow" src={""} alt="Chưa Update Ảnh nên chưa hiển thị" style={{width:"120px", height:"100%"}}/>
                </td>
                <td>
                      <Link to={`/Sua-Danh-Muc-San-Pham/${name.iddanhmuc}`}>
                          <button className="magin_btn_Edit">
                              <img alt="IMG_1" src={require("../../folder_css/img/12.png")} style={{marginRight: 10 ,width : 20 , height: 20 ,}}></img>  Sửa   
                          </button>
                      </Link>
                      <button className="magin_btn" 
                        onClick={() => { 
                        const confirmBox = window.confirm(
                          "Bạn chắc chắn muốn xóa Tên Danh Mục : "+ name.tendanhmuc +""
                        )
                        if (confirmBox === true) {     
                          delete_category(name.iddanhmuc)                   
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
           pageCount={3}
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