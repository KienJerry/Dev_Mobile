import React ,{useState , useEffect} from "react";
import '../../folder_css/css_two.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from 'react-paginate';


export default function XuatXu() {
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
     const base_url = api + 'listxuatxu/1';
     const response = await axios.get(base_url) 
     setlist_Trademark(response.data);
  }

  //Cũng là hiển thị nhưng phân trang
const handePageClick = async(data) => {
  let currenPage = data.selected + 1;
    const base_url = api + 'listxuatxu/' + currenPage;
    const response = await axios.get(base_url)
    setlist_Trademark(response.data);
}

  //Code Xóa
  const delete_category = data => {
    fetch(api + 'deletexuatxu/', {   
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
      axios.get(api + `searchxuatxu/${search}`)
      .then(response => {
        setlist_Trademark(response.data);
      });
      if(search === ""){
        window.location.reload();
      }
  }
  return (
      <div className="giao-dien-product">
        <h2 className="Text-Name">Danh Sách Nơi Xuất Xứ</h2> 
        <div className="push-2-product">
          <Link to={`/Xuat-Xu`}>
            <button className="button1">Nơi Xuất Xứ</button>
          </Link>
          <input className="input-search-one" onChange={(e)=>setSearch(e.target.value)} placeholder="Tìm Kiếm..."></input><button onClick={searchRecords} className="btn-search">Tìm Kiếm</button>
          <hr  width="100%" size="5px" align="center" color="red"/>
        </div>
        <div className="List-product">
        <table className="table table-hover table-bordered ml-4 ">
            <thead>
            <tr className="Text-Color">
                <th>ID Xuất Xứ</th>
                <th>Nơi Xuất Xứ </th>
                <th>Chức năng</th>
            </tr>
            </thead>
            <tbody>
     
            {list_Trademark.map((name)=>
                <tr className="Text-Color-one"  key={name.idxuatxu}>
                <td>{name.idxuatxu}</td>
                <td>{name.noixuatxu}</td>
                <td>
                      <Link to={`/Sua-Noi-Xuat-Xu/${name.idxuatxu}`}>
                          <button className="magin_btn_Edit">
                              <img alt="IMG_1" src={require("../../folder_css/img/12.png")} style={{marginRight: 10 ,width : 20 , height: 20 ,}}></img>  Sửa   
                          </button>
                      </Link>
                      <button className="magin_btn" 
                        onClick={() => { 
                        const confirmBox = window.confirm(
                          "Bạn chắc chắn muốn xóa Nơi Xuất Xứ : "+ name.noixuatxu +""
                        )
                        if (confirmBox === true) {     
                          delete_category(name.idxuatxu)                   
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