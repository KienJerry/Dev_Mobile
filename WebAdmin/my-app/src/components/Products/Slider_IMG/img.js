import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
function UpdateNhieuHinhAnh() {
  const [record,setRecord] = useState([]);
  const api ='http://localhost:3001/';
 
  useEffect(() => {
    loadEmployeeDetail();
    handePageClick();
  }, []);

    // Code load dữ liệu Sản Phẩm
    const loadEmployeeDetail = async() => {
      const base_url = api + 'listsanpham/1';
      const response = await axios.get(base_url)  // lấy dữ liệu ở trên base_url bằng hàm await 
      console.log(response.data); 
      setRecord(response.data);  // hiển thị
    }
      //Cũng là hiển thị nhưng phân trang
  const handePageClick = async(data) => {
    let currenPage = data.selected + 1;
      const base_url = api + 'listsanpham/' + currenPage;
      const response = await axios.get(base_url)
      setRecord(response.data);
  }
  return (
    <div className="container">
      <h4 className="text-center text-success  ml-4 mb-4 mt-4">Mục Hình Ảnh</h4>
          <div className="row">
            {record.map((name) => (
              <div className="col-sm-3" key={name.idsanpham}>
                <div className="card mb-3" style={{width:"12rem"}}>
                    <Link to={`/Edit-Slider-Hinh-Anh-San-Pham/${name.idsanpham}`}>
                    <img className="card-img-top hover-shadow" src={api + 'images/' + name.img} alt="Chưa có hình ảnh trong file nên không hiển thị" style={{height:"110px"}}/>
                    </Link>
                    <div className="card-body" >
                    <textarea 
                        className="lined"
                        rows="5"
                        value={name.tensanpham} 
                      />
                      <span className="card-text">ID SANPHAM : {name.idsanpham}</span>
                    </div>
                  </div>
                </div>
              ))}
           </div>
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
  );
}
export default UpdateNhieuHinhAnh;