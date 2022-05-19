var express = require('express');
var app = express();
var mysql = require('mysql');
var fs = require('fs');
var cors = require('cors');
const multer = require('multer');

//đây là cors
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// express
app.use(express.static('public'));

//kết nối csdl
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:'sale_and_social',
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Lưu hình ảnh vào file public/images và edit tên ảnh
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'public/images')  //Đường link uploads ảnh 
  },
  filename: (req, file, callBack) => {
  const myArray = file.originalname.split(".");
  let imgname = new Date().getTime().toString() + "."+myArray[myArray.length-1];  // Đặt lại tên image thành date + time + .(đuôi ảnh)
  callBack(null, `${imgname}`)
     // callBack(null, imgname+`${file.originalname}`)
  }
})
let upload = multer({ storage: storage})

// Hiện thị hình ảnh mục image
app.set('view engine', 'ejs');   /// npm install ejs@3.1.6 lên gg tìm hiểu 

/////////////////////////////////////////////////////////////////////////////
//Trang home
app.get('/', (req, res) => {
  res.send('Hello World Babe!')
})
 //Fix hình ảnh :D
 app.get('/images', function (req, res) {
  res.send('hình ảnh!');
});

//Hiển thị danh mục Sản Phẩm
app.get('/danhmucsanpham', function (req, res) {
  con.query("SELECT * FROM `danhmuc` order by iddanhmuc desc", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});
//Thêm danh mục sản phẩm
app.post('/adddanhmucsanpham', function (req, res) {
  var sql = "insert into danhmuc (tendanhmuc , danhmuccha) values ('"+req.body.name_category+"' , '"+req.body.name_category_parent+"')";
      con.query(sql , function(err, result, fields){
        if(err) throw err;
        if(result.affectedRows == 1){
          res.send('ok');
        }
      });
})
//Hiển thị chi tiết Danh Mục Sản Phẩm lấy theo ID 
app.get('/editdanhmucsanpham/:idsp', function (req, res) {
  var page = req.params.idsp;
  var sql = "SELECT * FROM danhmuc WHERE iddanhmuc = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    res.send(result);
    });
});
//Sửa Danh Mục Sản Phẩm
app.post('/editdanhmucsanpham/editid', function(req, res){
  var sql = "UPDATE danhmuc SET tendanhmuc = ('"+req.body.name_category+"'), danhmuccha =('"+req.body.name_category_parent+"') where iddanhmuc = ("+req.body.myid+")";
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okedit'){
      result.send('okedit');
    }
  });
})
//Sửa hình ảnh trong Danh Mục
app.post('/edituploadFiledanhmuc', upload.single('file'), (req, res, next) => {   //upload.single('file') , 'file' lấy từ bên react js qua 
  const file = req.file;
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }else{
  var imgsrc = 'http://localhost:3001/images/' + file.filename;
  var sql = "UPDATE danhmuc SET hinhanh = ('"+file.filename+"') where iddanhmuc = ("+req.body.myid+")";
  con.query(sql, [imgsrc] , function(err, result, fields){
    if(err) throw err;
    console.log(file.path);
    res.send(file.filename);
  })
  }
 })
//Xóa Danh Mục Sản Phẩm
app.post('/deletedanhmucsanpham', function(req, res){
  var sql = "delete from danhmuc where iddanhmuc = ("+req.body.myid+")";
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okdelete'){
      result.send('okdelete');
    }
  });
})
//phân trang DanhMucSanPham + id
app.get('/danhmucsanpham/:idphantrang',(req, res) =>{
  var page = req.params.idphantrang;
  var limit = 7;
  var offset = (page -1)*limit;
  var sql = "SELECT * FROM danhmuc order by iddanhmuc desc  limit "+ offset + ", " + limit ;
  con.query(sql, function(err, result, fields){
      if(err) throw err;
      // console.log(result);
      res.send(result);
  })
})
//Cũng là phân trang DanhMucSanPham + id nhưng là dạng List :D
app.get('/listdanhmucsanpham/:idphantrang',(req, res) =>{
  var page = req.params.idphantrang;
  var limit = 25;
  var offset = (page -1)*limit;
  var sql = "SELECT * FROM danhmuc order by iddanhmuc desc  limit "+ offset + ", " + limit ;
  con.query(sql, function(err, result, fields){
      if(err) throw err;
      // console.log(result);
      res.send(result);
  })
})
//Search Danh Mục Sản Phẩm
app.get('/searchdanhmucsanpham/:nameCategory',function(req, res){
  var ten = req.params.nameCategory
  con.query("SELECT * FROM danhmuc where tendanhmuc = '"+ ten +"' or danhmuccha = '"+ ten +"' or iddanhmuc = '"+ ten +"' ", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});

//Hiển thị Thương Hiệu Sản Phẩm
app.get('/thuonghieu', function (req, res) {
  con.query("SELECT * FROM `thuonghieu` order by idthuonghieu desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    });
});
//Thêm thương hiệu
app.post('/addthuonghieu', function (req, res) {
  var sql = "insert into thuonghieu (tenthuonghieu , email , diachithuonghieu)  values ('"+req.body.name_category+"' , '"+req.body.email_trademark+"' , '"+req.body.address_trademark+"')";
      con.query(sql , function(err, result, fields){
        if(err) throw err;
        if(result.affectedRows == 1){
          res.send('ok');
        }
      });
})
//Hiển thị chi tiết Thương Hiệu lấy theo ID 
app.get('/editthuonghieu/:idsp', function (req, res) {
  var page = req.params.idsp;
  var sql = "SELECT * FROM thuonghieu WHERE idthuonghieu = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    res.send(result);
    });
});
//Sửa Thương Hiệu
app.post('/editthuonghieu/editid', function(req, res){
  var sql = "UPDATE thuonghieu SET tenthuonghieu = ('"+req.body.name_trademark+"'), email =('"+req.body.name_email+"'), diachithuonghieu =('"+req.body.name_address+"') where idthuonghieu = ("+req.body.myid+")";
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okedit'){
      result.send('okedit');
    }
  });
})
//Xóa Thương Hiệu
app.post('/deletethuonghieu', function(req, res){
  var sql = "delete from thuonghieu where idthuonghieu = ("+req.body.myid+")";
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okdelete'){
      result.send('okdelete');
    }
  });
})
//Search Thương Hiệu
app.get('/searchthuonghieu/:nameTrademark',function(req, res){
  var ten = req.params.nameTrademark
  con.query("SELECT * FROM thuonghieu where tenthuonghieu = '"+ ten +"' or email = '"+ ten +"' or diachithuonghieu = '"+ ten +"' or idthuonghieu = '"+ ten +"' ", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    });
});
//phân trang Thương Hiệu + id
app.get('/thuonghieu/:idphantrang',(req, res) =>{
  var page = req.params.idphantrang;
  var limit = 7;
  var offset = (page -1)*limit;
  var sql = "SELECT * FROM thuonghieu order by idthuonghieu desc  limit "+ offset + ", " + limit ;
  con.query(sql, function(err, result, fields){
      if(err) throw err;
      // console.log(result);
      res.send(result);
  })
})
//Cũng là phân trang Thương Hiệu + id nhưng là dạng List :D
app.get('/listthuonghieu/:idphantrang',(req, res) =>{
  var page = req.params.idphantrang;
  var limit = 25;
  var offset = (page -1)*limit;
  var sql = "SELECT * FROM thuonghieu order by idthuonghieu desc  limit "+ offset + ", " + limit ;
  con.query(sql, function(err, result, fields){
      if(err) throw err;
      // console.log(result);
      res.send(result);
  })
})


//Hiển thị Nơi Xuất Xứ
app.get('/xuatxu', function (req, res) {
  con.query("SELECT * FROM `xuatxu` order by idxuatxu desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    });
});
//Thêm Nơi Xuất Xứ
app.post('/addxuatxu', function (req, res) {
  var sql = "insert into xuatxu (noixuatxu)  values ('"+req.body.name_origin+"')";
      con.query(sql , function(err, result, fields){
        if(err) throw err;
        if(result.affectedRows == 1){
          res.send("ok");
        }
      });
})
//Hiển thị chi tiết Xuất Xứ lấy theo ID 
app.get('/editxuatxu/:idsp', function (req, res) {
  var page = req.params.idsp;
  var sql = "SELECT * FROM xuatxu WHERE idxuatxu = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    res.send(result);
    });
});
//Sửa Xuất Xứ
app.post('/editxuatxu/editid', function(req, res){
  var sql = "UPDATE xuatxu SET noixuatxu = ('"+req.body.name_category+"') where idxuatxu = ("+req.body.myid+")";
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okedit'){
      result.send('okedit');
    }
  });
})
//Xóa Xuất Xứ
app.post('/deletexuatxu', function(req, res){
  var sql = "delete from xuatxu where idxuatxu = ("+req.body.myid+")";
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okdelete'){
      result.send('okdelete');
    }
  });
})
//Search Xuất Xứ
app.get('/searchxuatxu/:nameTrademark',function(req, res){
  var ten = req.params.nameTrademark
  con.query("SELECT * FROM xuatxu where idxuatxu = '"+ ten +"' or noixuatxu = '"+ ten +"' ", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    });
});
//phân trang Xuất Xứ + id
app.get('/xuatxu/:idphantrang',(req, res) =>{
  var page = req.params.idphantrang;
  var limit = 7;
  var offset = (page -1)*limit;
  var sql = "SELECT * FROM xuatxu order by idxuatxu desc  limit "+ offset + ", " + limit ;
  con.query(sql, function(err, result, fields){
      if(err) throw err;
      // console.log(result);
      res.send(result);
  })
})
//Cũng là phân trang Xuất Xứ + id nhưng là dạng List :D
app.get('/listxuatxu/:idphantrang',(req, res) =>{
  var page = req.params.idphantrang;
  var limit = 25;
  var offset = (page -1)*limit;
  var sql = "SELECT * FROM xuatxu order by idxuatxu desc  limit "+ offset + ", " + limit ;
  con.query(sql, function(err, result, fields){
      if(err) throw err;
      // console.log(result);
      res.send(result);
  })
})

//Hiển thị Sản Phẩm
app.get('/sanpham', function (req, res) {
  con.query("SELECT * FROM `sanpham` order by idsanpham desc", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    });
});
//Thêm Sản Phẩm
app.post('/addsanpham', upload.single('file') , (req, res, next) => {
  const file = req.file;
  console.log(req.file.path);
  if (!file) {
    const error = new Error('Chưa thêm hình ảnh !')
    error.httpStatusCode = 400
    return next(error)
  }else{
     var imgsrc = 'http://localhost:3001/images/' + file.filename;
     var sql = "insert into sanpham (tensanpham , loaisanpham , giacu , giamoi , iddanhmuc, img , idthuonghieu , xuatxuthuonghieu)  values ('"+req.body.ten+"' , '"+req.body.loaisanpham+"' , '"+req.body.giacu+"', '"+req.body.giasanpham+"', '"+req.body.danhmucsanpham+"','"+ file.filename +"' ,'"+req.body.thuonghieu+"', '"+req.body.xuatxu+"')";
    con.query(sql , [imgsrc] , function(err, result, fields){
      if(err) throw err;
      if(result.affectedRows == 1){
        res.send(file);
      }
    });
  }   
});
//Hiển thị chi tiết Sản Phẩm lấy theo ID 
app.get('/editsanpham/:idsp', function (req, res) {
  var page = req.params.idsp;
  var sql = "SELECT * FROM sanpham WHERE idsanpham = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    });
});
//Sửa Sản Phẩm
app.post('/editsanpham/editid', function(req, res){
  var sql = "UPDATE sanpham SET tensanpham = ('"+req.body.name_products+"') , giacu =('"+req.body.giaspcu+"') , giamoi =('"+req.body.giaspmoi+"') , iddanhmuc =('"+req.body.name_category+"') , idthuonghieu =('"+req.body.name_trademark+"') , xuatxuthuonghieu =('"+req.body.origin+"')  where idsanpham = ("+req.body.myid+")";
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okedit'){
      result.send('okedit');
    }
  });
})
//Sửa hình ảnh trong sản phẩm
app.post('/edituploadFileSanPham', upload.single('file'), (req, res, next) => {   //upload.single('file') , 'file' lấy từ bên react js qua 
  const file = req.file;
  const deletefile = req.body.deletefile;
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }else{
  var imgsrc = 'http://localhost:3001/images/' + file.filename;
  var sql = "UPDATE sanpham SET img = ('"+file.filename+"') where idsanpham = ("+req.body.myid+")";
  //Xóa ảnh cũ khi ảnh mới đc cập nhật
  fs.unlink('public/images/'+ deletefile , (err) => {
    if (err) throw err;
    console.log('public/images/ đã xóa thành công');
  });
  con.query(sql, [imgsrc] , function(err, result, fields){
    if(err) throw err;
    // console.log(file);
    console.log(file.path);
    res.send(file.filename);
  })
  }
 })
//Xóa Sản Phẩm
app.post('/deletesanpham',upload.single('file'), function(req, res){
  console.log(req.body.hinhanh)
  var sql = "delete from sanpham where idsanpham = ("+req.body.myid+")";
    //Xóa ảnh trong folder 
    fs.unlink('public/images/'+ req.body.hinhanh , (err) => {
      if (err) throw err;
      console.log('public/images/ đã xóa thành công');
    });
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okdelete'){
      result.send('okdelete');
    }
  });
})
//Cập nhật chi tiết sản phẩm
app.post('/editchitietsanpham/editid', function(req, res){
  var sql = "UPDATE sanpham SET soluongsanpham = ('"+req.body.soluongsanpham+"') , congnghecpu =('"+req.body.congnghecpu+"') , sonhan =('"+req.body.sonhan+"') , soluong =('"+req.body.soluong+"') , tocdocpu =('"+req.body.tocdocpu+"') , tocdotoida =('"+req.body.tocdotoida+"') , bonhodem = ('"+req.body.bonhodem+"') , ram =('"+req.body.ram+"') , loairam =('"+req.body.loairam+"') , tocdobusram =('"+req.body.tocdobusram+"') , hotrotoida =('"+req.body.hotroramtoida+"') , ocung =('"+req.body.ocung+"') ,manhinh = ('"+req.body.manhinh+"') , dophangiai =('"+req.body.dophangiai+"') , tansoquet =('"+req.body.tansoquet+"') , congnghemanhinh =('"+req.body.congnghemanhinh+"') , cardmanhinh =('"+req.body.cardmanhinh+"') , congngheamthanh =('"+req.body.congngheamthanh+"') , conggiaotiep = ('"+req.body.conggiaotiep+"') , ketnoikhongday =('"+req.body.ketnoikhongday+"') , khedocthenho =('"+req.body.khedocthenho+"') , webcam =('"+req.body.webcam+"') , tinhnangkhac =('"+req.body.tinhnangkhac+"') , denbanphim =('"+req.body.denbanphim+"') ,  kichthuoctrongluong =('"+req.body.kichthuoctrongluong+"') , chatlieu =('"+req.body.chatlieu+"') , thongtinpin =('"+req.body.thongtinpin+"') , hedieuhanh =('"+req.body.hedieuhanh+"') , thoigianramat =('"+req.body.thoigianramat+"') , uudiem =('"+req.body.uudiem+"') , hieuqua =('"+req.body.hieuqua+"') , luuy =('"+req.body.luuy+"') , huongdansudung =('"+req.body.huongdansudung+"') where idsanpham = ("+req.body.myid+")";
  con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result =='okedit'){
      result.send('okedit');
    }
  });
})
//tìm Kiếm Sản Phẩm
app.get('/searchsanpham/:nameProduct',function(req, res){
  var ten = req.params.nameProduct
  con.query("SELECT * FROM sanpham where idsanpham = '"+ ten +"' or tensanpham = '"+ ten +"' or loaisanpham = '"+ ten +"' or giamoi = '"+ ten +"' or xuatxuthuonghieu = '"+ ten +"' ", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    });
});
//phân trang Sản Phẩm + id
app.get('/sanpham/:idphantrang',(req, res) =>{
  var page = req.params.idphantrang;
  var limit = 10;
  var offset = (page -1)*limit;
  var sql = "SELECT * FROM sanpham order by idsanpham desc  limit "+ offset + ", " + limit ;
  con.query(sql, function(err, result, fields){
      if(err) throw err;
      res.send(result);
  })
})
// hiển thị chi tiết phan trang Sản Phẩm
app.get('/sanpham/:idphantrang/:idsp', function (req, res) {
  var page = req.params.idsp;
  var sql = "SELECT * FROM sanpham WHERE idsanpham = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    });
});
//Cũng là phân trang Sản Phẩm + id nhưng là dạng List :D
app.get('/listsanpham/:idphantrang',(req, res) =>{
  var page = req.params.idphantrang;
  var limit = 25;
  var offset = (page -1)*limit;
  var sql = "SELECT * FROM sanpham order by idsanpham desc  limit "+ offset + ", " + limit ;
  con.query(sql, function(err, result, fields){
      if(err) throw err;
      res.send(result);
  })
})

//Code thêm nhiều hình ảnh
app.post('/upload-multiple-images', upload.array('file', 5) , (req, res ) => {
  const file = req.files;
  var i;
  for(i=0;i<file.length;i++){
    console.log("tên new : " + file[i].filename)
    var imgsrc = 'http://localhost:3001/images/' + file.filename;
    var sql = "insert into hinhanh (tenhinhanh , idsanpham )  values ('"+file[i].filename+"' , '"+req.body.idsanpham+"')";
    console.log(sql);
    con.query(sql, [imgsrc] , function(err, result, fields){
      if(err) throw err;
      res.send(file[i])
    })
    // console.log(file[i].filename)
    }
});
//Hiển thị nhiều hình ảnh trong Sản Phẩm theo ID
app.get('/hienthi-image-id/:idsp', function (req, res) {
    var page = req.params.idsp;
    var sql = "SELECT * FROM hinhanh WHERE idsanpham = " + page;
    con.query(sql , function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    });
});
// hiển thị chi tiết hình ảnh
app.get('/hienthi-id-image/:idsp', function (req, res) {
  var page = req.params.idsp;
  var sql = "SELECT * FROM hinhanh WHERE idhinhanh = " + page;
  con.query(sql , function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    });
});
//Xóa hình ảnh trong mục sản phẩm ID
app.post('/deleteimgsp', function(req, res){
    var sql = "delete from hinhanh where idhinhanh = ("+req.body.myid+")";
  // Xóa ảnh trong folder 
      fs.unlink('public/images/'+ req.body.delimg , (err) => {
        if (err) throw err;
        console.log('public/images/ đã xóa thành công');
      });
    con.query(sql, function(err, result, fields){
    if(err) throw err;
    if(result == 1){
      result.send('okdelete');
    }
    });
})


//React Native 
//SignUp
 app.post("/dangky", (req, res) => {
  var sql = "SELECT * FROM account WHERE taikhoan= '" + req.body.tentaikhoans + "' ";
 con.query(sql, function (err, result, fields) {
   if (err) {
     res.send({ success: false, message: "Database không có kết nối!" });
   }
   if (result.length > 0) {
     res.send({ success: false });
   } else {
     res.send({ success: true });
     var sql = "INSERT INTO account ( taikhoan, matkhau, phanquyen, khoa , thoigiandangky) values('" + req.body.tentaikhoans + "' ,  MD5('"+req.body.matkhaus +"'),'" + 0 + "' , '" + 0 + "' , '"+ req.body.date +"' );"
     con.query(sql, function (err, result, fields) {
       if (err) throw err;
     });
   }
 });
});

// SignIn
app.post("/dangnhap", (req, res) => {
 var sql ="SELECT * FROM account WHERE taikhoan= '" +req.body.username +"' AND matkhau= MD5('" +req.body.password +"')";
 con.query(sql, function (err, result, fields) {
   if (err) {
     res.send({ success: false, message: "Database không có kết nối!" });
   }
   if (result.length > 0) {
     res.send({ success: true });;
   } else {
     res.send({ success: false, message: "Sai tài khoản!" });
   }
 });
});
//Thông tin Tài Khoản
app.get('/dangnhap/:nameProduct',function(req, res){
  var ten = req.params.nameProduct
  con.query("SELECT * FROM account where taikhoan = '"+ ten +"' ", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
    });
});

//Danh mục sản phẩm , chỉ lấy ID cha
app.get('/danhmucsanphamidcha', function (req, res) {
  con.query("SELECT * FROM `danhmuc` WHERE danhmuccha = '0'", function (err, result, fields) {
    // console.log(result);
    if (err) throw err;
    res.send(result);
    });
});

// ERR 404
app.use(function(req, res, next) {
    res.status(404);
    res.send('404: err');
});

//server
app.listen(3001, function () {
    console.log('Example app listening on port 3001! "http://localhost:3001"  ');
});
