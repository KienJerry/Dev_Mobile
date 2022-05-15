-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2022 at 04:36 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sale_and_social`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `idtaikhoan` int(200) NOT NULL,
  `taikhoan` varchar(100) NOT NULL,
  `matkhau` varchar(100) NOT NULL,
  `tennguoidung` varchar(200) NOT NULL,
  `phanquyen` varchar(100) NOT NULL,
  `gioitinh` varchar(50) NOT NULL,
  `diachi` varchar(200) NOT NULL,
  `namsinh` varchar(200) NOT NULL,
  `thoigiandangnhap` varchar(200) NOT NULL,
  `thoigiandangky` varchar(200) NOT NULL,
  `khoa` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`idtaikhoan`, `taikhoan`, `matkhau`, `tennguoidung`, `phanquyen`, `gioitinh`, `diachi`, `namsinh`, `thoigiandangnhap`, `thoigiandangky`, `khoa`) VALUES
(1, '0352626013', 'e10adc3949ba59abbe56e057f20f883e', '', '9999', '', '', '', '', '10:39:14_05/05/22', '0'),
(7, '0352626015', 'e10adc3949ba59abbe56e057f20f883e', '', '0', '', '', '', '', 'Sun May  1 22:13:43 2022', '1'),
(8, '1234567896', '27ff2ffe376b2edcc7c2de309173f0d8', '', '0', '', '', '', '', '22:20:3605/01/22', '0'),
(9, '7418520963', '0b4e7a0e5fe84ad35fb5f95b9ceeac79', '', '0', '', '', '', '', '22:21:22_05/01/22', '0'),
(10, '0312347580', 'e10adc3949ba59abbe56e057f20f883e', '', '0', '', '', '', '', '09:54:41_05/05/22', '0'),
(11, '6523434015', 'e10adc3949ba59abbe56e057f20f883e', '', '0', '', '', '', '', '09:56:33_05/05/22', '0'),
(12, '6524373012', 'e10adc3949ba59abbe56e057f20f883e', '', '0', '', '', '', '', '09:58:14_05/05/22', '0'),
(13, '0352626016', 'e10adc3949ba59abbe56e057f20f883e', '', '0', '', '', '', '', '10:29:16_05/05/22', '0');

-- --------------------------------------------------------

--
-- Table structure for table `danhmuc`
--

CREATE TABLE `danhmuc` (
  `iddanhmuc` int(200) NOT NULL,
  `danhmuccha` varchar(200) NOT NULL,
  `tendanhmuc` varchar(200) NOT NULL,
  `hinhanh` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `danhmuc`
--

INSERT INTO `danhmuc` (`iddanhmuc`, `danhmuccha`, `tendanhmuc`, `hinhanh`) VALUES
(1, '0', 'Chuột', ''),
(2, '0', 'LapTop', '1651218389387.jpg'),
(3, '1', 'Chuột Dây', ''),
(4, '0', 'Máy Tính', ''),
(5, '0', 'Phụ Kiện', ''),
(6, '5', 'Tai Nghe', ''),
(7, '5', 'Bàn phím', ''),
(8, '0', 'Ổ Cứng', ''),
(9, '0', 'RAM', '');

-- --------------------------------------------------------

--
-- Table structure for table `hinhanh`
--

CREATE TABLE `hinhanh` (
  `idhinhanh` int(200) NOT NULL,
  `idsanpham` varchar(200) NOT NULL,
  `tenhinhanh` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hinhanh`
--

INSERT INTO `hinhanh` (`idhinhanh`, `idsanpham`, `tenhinhanh`) VALUES
(1, '3', '1651123577706.jpg'),
(2, '3', '1651123577716.jpg'),
(3, '3', '1651123577723.jpg'),
(4, '3', '1651123577742.jpg'),
(6, '1', '1651216811009.jpg'),
(7, '1', '1651216811015.jpg'),
(8, '1', '1651216811029.jpg'),
(9, '2', '1651216816523.jpg'),
(10, '2', '1651216816524.jpg'),
(11, '8', '1651847632932.jpg'),
(12, '8', '1651847632946.jpg'),
(13, '8', '1651847632948.jpg'),
(14, '8', '1651847632953.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `idhoadon` int(200) NOT NULL,
  `tenhoadon` varchar(200) NOT NULL,
  `tensanpham` varchar(200) NOT NULL,
  `soluongsanpham` varchar(200) NOT NULL,
  `tongsotienphaithanhtoan` varchar(200) NOT NULL,
  `soquay` varchar(200) NOT NULL,
  `diachikho` varchar(200) NOT NULL,
  `sdttongdai` varchar(200) NOT NULL,
  `thoigian` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `idsanpham` int(200) NOT NULL,
  `tensanpham` varchar(200) NOT NULL,
  `giacu` varchar(200) NOT NULL,
  `giamoi` varchar(200) NOT NULL,
  `iddanhmuc` varchar(200) NOT NULL,
  `idthuonghieu` varchar(200) NOT NULL,
  `xuatxuthuonghieu` varchar(200) NOT NULL,
  `loaisanpham` varchar(200) NOT NULL,
  `soluongsanpham` varchar(200) NOT NULL,
  `img` varchar(200) NOT NULL,
  `congnghecpu` varchar(200) NOT NULL,
  `sonhan` varchar(500) NOT NULL,
  `soluong` varchar(500) NOT NULL,
  `tocdocpu` varchar(500) NOT NULL,
  `tocdotoida` varchar(500) NOT NULL,
  `bonhodem` varchar(500) NOT NULL,
  `ram` varchar(500) NOT NULL,
  `loairam` varchar(500) NOT NULL,
  `tocdobusram` varchar(500) NOT NULL,
  `hotrotoida` varchar(500) NOT NULL,
  `ocung` varchar(500) NOT NULL,
  `manhinh` varchar(500) NOT NULL,
  `dophangiai` varchar(500) NOT NULL,
  `tansoquet` varchar(500) NOT NULL,
  `congnghemanhinh` varchar(500) NOT NULL,
  `cardmanhinh` varchar(500) NOT NULL,
  `congngheamthanh` varchar(500) NOT NULL,
  `conggiaotiep` varchar(500) NOT NULL,
  `ketnoikhongday` varchar(500) NOT NULL,
  `khedocthenho` varchar(500) NOT NULL,
  `webcam` varchar(500) NOT NULL,
  `tinhnangkhac` varchar(500) NOT NULL,
  `denbanphim` varchar(500) NOT NULL,
  `kichthuoctrongluong` varchar(500) NOT NULL,
  `chatlieu` varchar(500) NOT NULL,
  `thongtinpin` varchar(500) NOT NULL,
  `hedieuhanh` varchar(500) NOT NULL,
  `thoigianramat` varchar(500) NOT NULL,
  `uudiem` text NOT NULL,
  `hieuqua` text NOT NULL,
  `luuy` text NOT NULL,
  `huongdansudung` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`idsanpham`, `tensanpham`, `giacu`, `giamoi`, `iddanhmuc`, `idthuonghieu`, `xuatxuthuonghieu`, `loaisanpham`, `soluongsanpham`, `img`, `congnghecpu`, `sonhan`, `soluong`, `tocdocpu`, `tocdotoida`, `bonhodem`, `ram`, `loairam`, `tocdobusram`, `hotrotoida`, `ocung`, `manhinh`, `dophangiai`, `tansoquet`, `congnghemanhinh`, `cardmanhinh`, `congngheamthanh`, `conggiaotiep`, `ketnoikhongday`, `khedocthenho`, `webcam`, `tinhnangkhac`, `denbanphim`, `kichthuoctrongluong`, `chatlieu`, `thongtinpin`, `hedieuhanh`, `thoigianramat`, `uudiem`, `hieuqua`, `luuy`, `huongdansudung`) VALUES
(1, 'Laptop Masstel E140 Celeron - N4120/4GB/128GB/14\"HD/Win 10', '10490000', '7490000', 'LapTop', 'Masstel', 'Nhật Bản', 'Chiếc', '300', '1651123351878.jpg', ' Apple M1', '8', '1', '1', ' Hãng không công bố', ' Hãng không công bố', ' 16 GB', ' Hãng không công bố', ' Hãng không công bố', 'Không hỗ trợ nâng cấp', '256 GB SSD', ' 13.3 inch', ' Retina (2560 x 1600)', ' Hãng không công bố', ' 400 nits  Công nghệ IPS  LED Backlit  True Tone Technology', 'Card tích hợp - 7 nhân GPU', ' 3 microphones  Headphones  Loa kép (2 kênh)', '2 x Thunderbolt 3 (USB-C)Jack tai nghe 3.5 mm', 'Bluetooth 5.0Wi-Fi 6 (802.11ax)', ' 720p FaceTime Camera', ' Bảo mật vân tay', ' Bảo mật vân tay', ' Có', 'Dài 304.1 mm - Rộng 212.4 mm - Dày 4.1 mm đến 16.1 mm - Nặng 1.29 kg', ' Vỏ kim loại nguyên khối', 'Khoảng 10 tiếng', ' Mac OS', '2020-02-06', 'Một trong những ưu điểm của laptop Dell đó chính là việc hãng sản xuất đưa ra thị trường nhiều dòng laptop khác nhau, với nhiều phân khúc thị trường khác nhau nhằm thỏa mãn mọi nhu cầu của nhiều đối tượng sử dụng khác nhau. Nếu bạn là một doanh nhân, bạn hãy chọn một trong những dòng laptop Dell như:  Dell Vostro, Dell Latitude, Dell Precision, trong đó, laptop Dell Precision chính là dòng máy tính cao cấp nhất, có thiết kế có thể hoạt động như chiếc máy trạm.     Và một số dòng laptop Dell phổ biến hiện nay là: Dell XPS, Dell Inspiron và Dell Alienware. Laptop Dell Inspiron là sự hài hòa giữa thiết kế, cấu hình và giá bán, trong khi Dell XPS lại dành cho người dùng cần sự tinh tế trong thiết kế và một laptop có cấu hình mạnh. Dòng máy Dell Alienware thì vẫn luôn là một trong những máy tính nằm sự lựa chọn dành cho các game thủ hiện nay.', '- Ram là nơi chất chứa dữ liệu mà ứng dụng CPU và GPU xử lí, nếu bạn mở quá nhiều ứng dụng trong cùng một lúc trường hợp dung lượng Ram quá ít thì nó sẻ không đủ không gian để xử lí, gây ra tình trạng laptop load chậm và thậm chí bị treo máy, đơ giật  - Nếu RAM thấp làm laptop chạy chậm thì đừng tiếc tiền mà hãy nâng cấp cho laptop 1 thanh RAM tối thiểu 4GB để máy hoạt động mượt mà hơn nhé.  - Để biết dung lượng RAM hiện tại của laptop, các bạn có thể làm theo cách sau: Click vào Start > Control Panel > System and Security > System.', '1. Không bao giờ đặt laptop trên giường Bạn nên cẩn thận trước khi đặt laptop trên giường, sofa hay bất cứ bề mặt mềm nào. Lý do là vì vật liệu mềm gây ảnh hưởng tới hệ thống thông gió bên dưới laptop. Khi để máy lên bề mặt này sẽ khiến cho không khi không đi qua được phía dưới máy để làm mát thiết bị. Vì vậy, luôn luôn đặt laptop trên bàn hoặc trên bề mặt cứng. 2. Phần mềm diệt virus Bạn nên cẩn thận với virus. Virus dễ dàng thâm nhập vào laptop thông qua các thiết bị lưu trữ ngoài. Khi bị lây nhiễm virus, các tệp tin quan trọng của bạn có thể bị “ăn mất”. Vì vậy, bạn phải có phần mềm diệt virus. Trước khi kết nối bất cứ thiết bị gì với laptop, đầu tiên bạn cần quét thiết bị sau đó mới chuyển tệp tin. Bạn nên quét toàn bộ hệ thống theo chu kỳ 3-4 ngày một lần. Điều này sẽ giúp bảo vệ laptop của bạn. 3. Luôn thoát thiết bị cắm ngoài đúng cách sau khi sử dụng Loại bỏ ổ đĩa như ổ flash, ổ cứng ngoài… không đúng cách có thể gây hại cho các phụ kiện máy tính của bạn. Vì vậy, hãy cẩn thận trong khi rút các ổ lưu trữ ngoài ra khỏi laptop.', 'Các phím cơ bản bao gồm: phím ký tự, phím dấu và phím số. Các phím ký tự là những chữ nằm trong bảng chữ cái Latinh. Dấu và số nằm cùng trên một phím. Mặc định của hệ thống khi gõ vào những phím này sẽ hiển thị số. Để sử dụng dấu, bạn cần nhấn tổ hợp phím Shift + phím dấu.  Phím chức năng: là các phím từ F1 đến F12 nằm ở vị trí trên cùng keyboard.  Phím đặc biệt bao gồm: Esc là phím hủy bỏ lệnh hoặc thoát khỏi một chương trình nào đó. Tab dùng để di chuyển dấu nháy, chuyển cột trong bảng tính. Caps Lock có tác dụng bật hoặc tắt chế độ viết in hoa (đèn sáng là bật, không sáng là tắt). Enter dùng khi cần xuống hàng trong văn bản hoặc chạy chương trình được chọn. Space Bar để tạo khoảng trắng giữa các từ. Ngoài ra còn các phím Backspace, Shift, Alt, Ctrl, Windows và Menu với một số chức năng tương ứng.  Phím điều khiển gồm: Insert, Delete, Home, End, Page Up, Page Down, phím mũi tên.'),
(2, 'Laptop Masstel E116 Celeron N4020/4GB/128GB/11.6\"HD/Win 10 ', '8990000', '5990000', 'LapTop', 'Masstel', 'Kazakhstan', 'Chiếc', '200', '1651123421045.jpg', 'Công Nghệ 1', '4', '4', '9.3', '15', 'Bộ Nhớ Đệm', '16 GB', 'GTX', '90s', 'undefined', 'SSD 528GB', '19 inch', '1900 1080', '19h', 'Công Nghệ New', 'NVDIA', 'Âm Thanh New', 'Có cổng giao tiếp', 'Có', 'Có', 'Có', 'Mô tả Sản Phẩm', 'Leb 7 Màu', 'Lớn', 'Nhôm', '5 tiếng', 'WINDOWS 10 Home', '2020-07-15', 'Hiệu năng ấn tượng đến từ chip M1 Chip M1 được Apple thiết kế dành riêng cho MacBook mang đến hiệu năng vượt trội. Thực hiện tốt các tác vụ văn phòng trên các phần mềm như Word, Excel, Powerpoint,... Thiết kế đồ hoạ cũng chuyên nghiệp không kém, cho phép bạn chỉnh sửa hình ảnh với dung lượng lớn, kết xuất 2D mượt mà trên các phần mềm Photoshop, AI, Figma,...  Card đồ họa GPU 7 nhân đem lại hiệu suất cao đáng kinh ngạc, đồ họa cao hơn gấp 5 lần, thảo sức sáng tạo nội dung, kết xuất 3D ổn định, render video, phát trực tiếp với chất lượng cao với chất ảnh sắc nét cùng độ phân giải lên đến 4K.  Bộ nhớ RAM 16 GB cho phép bạn sử dụng đa nhiệm, bạn có thể thao tác nhiều ứng dụng cùng một lúc thoải mái với những tác vụ như lướt web, soạn thảo văn bản, xem video hay thiết kế hình ảnh bằng Photoshop, Adobe IIIustrator,...', 'Laptop Apple MacBook Air M1 2020 (Z124000DE) là chiếc laptop mỏng nhẹ nhưng có cấu hình mạnh mẽ, nhiều tính năng hiện đại đáng để sở hữu trong phân khúc, thích hợp cho các tác vụ văn phòng thường ngày và thiết kế đồ hoạ.', '1. Không bao giờ đặt laptop trên giường Bạn nên cẩn thận trước khi đặt laptop trên giường, sofa hay bất cứ bề mặt mềm nào. Lý do là vì vật liệu mềm gây ảnh hưởng tới hệ thống thông gió bên dưới laptop. Khi để máy lên bề mặt này sẽ khiến cho không khi không đi qua được phía dưới máy để làm mát thiết bị. Vì vậy, luôn luôn đặt laptop trên bàn hoặc trên bề mặt cứng. 2. Phần mềm diệt virus Bạn nên cẩn thận với virus. Virus dễ dàng thâm nhập vào laptop thông qua các thiết bị lưu trữ ngoài. Khi bị lây nhiễm virus, các tệp tin quan trọng của bạn có thể bị “ăn mất”. Vì vậy, bạn phải có phần mềm diệt virus. Trước khi kết nối bất cứ thiết bị gì với laptop, đầu tiên bạn cần quét thiết bị sau đó mới chuyển tệp tin. Bạn nên quét toàn bộ hệ thống theo chu kỳ 3-4 ngày một lần. Điều này sẽ giúp bảo vệ laptop của bạn. 3. Luôn thoát thiết bị cắm ngoài đúng cách sau khi sử dụng Loại bỏ ổ đĩa như ổ flash, ổ cứng ngoài… không đúng cách có thể gây hại cho các phụ kiện máy tính của bạn. Vì vậy, hãy cẩn thận trong khi rút các ổ lưu trữ ngoài ra khỏi laptop.', 'Các phím cơ bản bao gồm: phím ký tự, phím dấu và phím số. Các phím ký tự là những chữ nằm trong bảng chữ cái Latinh. Dấu và số nằm cùng trên một phím. Mặc định của hệ thống khi gõ vào những phím này sẽ hiển thị số. Để sử dụng dấu, bạn cần nhấn tổ hợp phím Shift + phím dấu.  Phím chức năng: là các phím từ F1 đến F12 nằm ở vị trí trên cùng keyboard.  Phím đặc biệt bao gồm: Esc là phím hủy bỏ lệnh hoặc thoát khỏi một chương trình nào đó. Tab dùng để di chuyển dấu nháy, chuyển cột trong bảng tính. Caps Lock có tác dụng bật hoặc tắt chế độ viết in hoa (đèn sáng là bật, không sáng là tắt). Enter dùng khi cần xuống hàng trong văn bản hoặc chạy chương trình được chọn. Space Bar để tạo khoảng trắng giữa các từ. Ngoài ra còn các phím Backspace, Shift, Alt, Ctrl, Windows và Menu với một số chức năng tương ứng.  Phím điều khiển gồm: Insert, Delete, Home, End, Page Up, Page Down, phím mũi tên.'),
(3, 'MacBook Pro 16\" 2021 M1 Pro 512GB VIPPRO', '69990000', '64990000', 'LapTop', 'Apple ', 'Mỹ', 'Hộp', '200', '1651123507239.jpg', 'Công Nghệ 1', '4', '4', '9.3', '15', 'Bộ Nhớ Đệm', '16 GB', 'GTX', '90s', 'undefined', 'SSD 528GB', '19 inch', '1900 1080', '19h', 'Công Nghệ New', 'NVDIA', 'Âm Thanh New', 'Có cổng giao tiếp', 'Có', 'Có', 'Có', 'Mô tả Sản Phẩm', 'Leb 7 Màu', 'Lớn', 'Nhôm', '5 tiếng', 'WINDOWS 10 Home', '2020-07-15', 'Hiệu năng ấn tượng đến từ chip M1 Chip M1 được Apple thiết kế dành riêng cho MacBook mang đến hiệu năng vượt trội. Thực hiện tốt các tác vụ văn phòng trên các phần mềm như Word, Excel, Powerpoint,... Thiết kế đồ hoạ cũng chuyên nghiệp không kém, cho phép bạn chỉnh sửa hình ảnh với dung lượng lớn, kết xuất 2D mượt mà trên các phần mềm Photoshop, AI, Figma,...  Card đồ họa GPU 7 nhân đem lại hiệu suất cao đáng kinh ngạc, đồ họa cao hơn gấp 5 lần, thảo sức sáng tạo nội dung, kết xuất 3D ổn định, render video, phát trực tiếp với chất lượng cao với chất ảnh sắc nét cùng độ phân giải lên đến 4K.  Bộ nhớ RAM 16 GB cho phép bạn sử dụng đa nhiệm, bạn có thể thao tác nhiều ứng dụng cùng một lúc thoải mái với những tác vụ như lướt web, soạn thảo văn bản, xem video hay thiết kế hình ảnh bằng Photoshop, Adobe IIIustrator,...', 'Laptop Apple MacBook Air M1 2020 (Z124000DE) là chiếc laptop mỏng nhẹ nhưng có cấu hình mạnh mẽ, nhiều tính năng hiện đại đáng để sở hữu trong phân khúc, thích hợp cho các tác vụ văn phòng thường ngày và thiết kế đồ hoạ.', '1. Không bao giờ đặt laptop trên giường Bạn nên cẩn thận trước khi đặt laptop trên giường, sofa hay bất cứ bề mặt mềm nào. Lý do là vì vật liệu mềm gây ảnh hưởng tới hệ thống thông gió bên dưới laptop. Khi để máy lên bề mặt này sẽ khiến cho không khi không đi qua được phía dưới máy để làm mát thiết bị. Vì vậy, luôn luôn đặt laptop trên bàn hoặc trên bề mặt cứng. 2. Phần mềm diệt virus Bạn nên cẩn thận với virus. Virus dễ dàng thâm nhập vào laptop thông qua các thiết bị lưu trữ ngoài. Khi bị lây nhiễm virus, các tệp tin quan trọng của bạn có thể bị “ăn mất”. Vì vậy, bạn phải có phần mềm diệt virus. Trước khi kết nối bất cứ thiết bị gì với laptop, đầu tiên bạn cần quét thiết bị sau đó mới chuyển tệp tin. Bạn nên quét toàn bộ hệ thống theo chu kỳ 3-4 ngày một lần. Điều này sẽ giúp bảo vệ laptop của bạn. 3. Luôn thoát thiết bị cắm ngoài đúng cách sau khi sử dụng Loại bỏ ổ đĩa như ổ flash, ổ cứng ngoài… không đúng cách có thể gây hại cho các phụ kiện máy tính của bạn. Vì vậy, hãy cẩn thận trong khi rút các ổ lưu trữ ngoài ra khỏi laptop.', 'Các phím cơ bản bao gồm: phím ký tự, phím dấu và phím số. Các phím ký tự là những chữ nằm trong bảng chữ cái Latinh. Dấu và số nằm cùng trên một phím. Mặc định của hệ thống khi gõ vào những phím này sẽ hiển thị số. Để sử dụng dấu, bạn cần nhấn tổ hợp phím Shift + phím dấu.  Phím chức năng: là các phím từ F1 đến F12 nằm ở vị trí trên cùng keyboard.  Phím đặc biệt bao gồm: Esc là phím hủy bỏ lệnh hoặc thoát khỏi một chương trình nào đó. Tab dùng để di chuyển dấu nháy, chuyển cột trong bảng tính. Caps Lock có tác dụng bật hoặc tắt chế độ viết in hoa (đèn sáng là bật, không sáng là tắt). Enter dùng khi cần xuống hàng trong văn bản hoặc chạy chương trình được chọn. Space Bar để tạo khoảng trắng giữa các từ. Ngoài ra còn các phím Backspace, Shift, Alt, Ctrl, Windows và Menu với một số chức năng tương ứng.  Phím điều khiển gồm: Insert, Delete, Home, End, Page Up, Page Down, phím mũi tên.'),
(4, 'Laptop Asus TUF Gaming FX506LH-HN188W i5 10300H/8GB/512GB SSD/Nvidia GTX1650 4GB/Win11', '20999000', '18999000', 'LapTop', 'Asus', 'Nga', 'Hộp', '200', '1651124107978.jpg', 'Công Nghệ 1', '4', '4', '9.3', '15', 'Bộ Nhớ Đệm', '16 GB', 'GTX', '90s', 'undefined', 'SSD 528GB', '19 inch', '1900 1080', '19h', 'Công Nghệ New', 'NVDIA', 'Âm Thanh New', 'Có cổng giao tiếp', 'Có', 'Có', 'Có', 'Mô tả Sản Phẩm', 'Leb 7 Màu', 'Lớn', 'Nhôm', '5 tiếng', 'WINDOWS 10 Home', '2020-07-15', 'Laptop Apple MacBook Air M1 2020 có thiết kế đẹp, sang trọng với CPU M1 độc quyền từ Apple cho hiệu năng đồ họa cao, màn hình Retina hiển thị siêu nét cùng với hệ thống bảo mật tối ưu.', 'Hiệu năng ấn tượng đến từ chip M1 Chip M1 được Apple thiết kế dành riêng cho MacBook mang đến hiệu năng vượt trội. Thực hiện tốt các tác vụ văn phòng trên các phần mềm như Word, Excel, Powerpoint,... Thiết kế đồ hoạ cũng chuyên nghiệp không kém, cho phép bạn chỉnh sửa hình ảnh với dung lượng lớn, kết xuất 2D mượt mà trên các phần mềm Photoshop, AI, Figma,...  Card đồ họa GPU 7 nhân đem lại hiệu suất cao đáng kinh ngạc, đồ họa cao hơn gấp 5 lần, thảo sức sáng tạo nội dung, kết xuất 3D ổn định, render video, phát trực tiếp với chất lượng cao với chất ảnh sắc nét cùng độ phân giải lên đến 4K.  Bộ nhớ RAM 16 GB cho phép bạn sử dụng đa nhiệm, bạn có thể thao tác nhiều ứng dụng cùng một lúc thoải mái với những tác vụ như lướt web, soạn thảo văn bản, xem video hay thiết kế hình ảnh bằng Photoshop, Adobe IIIustrator,...', '1. Không bao giờ đặt laptop trên giường Bạn nên cẩn thận trước khi đặt laptop trên giường, sofa hay bất cứ bề mặt mềm nào. Lý do là vì vật liệu mềm gây ảnh hưởng tới hệ thống thông gió bên dưới laptop. Khi để máy lên bề mặt này sẽ khiến cho không khi không đi qua được phía dưới máy để làm mát thiết bị. Vì vậy, luôn luôn đặt laptop trên bàn hoặc trên bề mặt cứng. 2. Phần mềm diệt virus Bạn nên cẩn thận với virus. Virus dễ dàng thâm nhập vào laptop thông qua các thiết bị lưu trữ ngoài. Khi bị lây nhiễm virus, các tệp tin quan trọng của bạn có thể bị “ăn mất”. Vì vậy, bạn phải có phần mềm diệt virus. Trước khi kết nối bất cứ thiết bị gì với laptop, đầu tiên bạn cần quét thiết bị sau đó mới chuyển tệp tin. Bạn nên quét toàn bộ hệ thống theo chu kỳ 3-4 ngày một lần. Điều này sẽ giúp bảo vệ laptop của bạn. 3. Luôn thoát thiết bị cắm ngoài đúng cách sau khi sử dụng Loại bỏ ổ đĩa như ổ flash, ổ cứng ngoài… không đúng cách có thể gây hại cho các phụ kiện máy tính của bạn. Vì vậy, hãy cẩn thận trong khi rút các ổ lưu trữ ngoài ra khỏi laptop.', 'Các phím cơ bản bao gồm: phím ký tự, phím dấu và phím số. Các phím ký tự là những chữ nằm trong bảng chữ cái Latinh. Dấu và số nằm cùng trên một phím. Mặc định của hệ thống khi gõ vào những phím này sẽ hiển thị số. Để sử dụng dấu, bạn cần nhấn tổ hợp phím Shift + phím dấu.  Phím chức năng: là các phím từ F1 đến F12 nằm ở vị trí trên cùng keyboard.  Phím đặc biệt bao gồm: Esc là phím hủy bỏ lệnh hoặc thoát khỏi một chương trình nào đó. Tab dùng để di chuyển dấu nháy, chuyển cột trong bảng tính. Caps Lock có tác dụng bật hoặc tắt chế độ viết in hoa (đèn sáng là bật, không sáng là tắt). Enter dùng khi cần xuống hàng trong văn bản hoặc chạy chương trình được chọn. Space Bar để tạo khoảng trắng giữa các từ. Ngoài ra còn các phím Backspace, Shift, Alt, Ctrl, Windows và Menu với một số chức năng tương ứng.  Phím điều khiển gồm: Insert, Delete, Home, End, Page Up, Page Down, phím mũi tên.'),
(5, 'LapTop HP 15 Pavilon ABC', '29990000', '25990000', 'LapTop', 'HP', 'Việt Nam', 'Hộp', '200', '1651203836240.jpg', 'Công Nghệ 1', '4', '4', '9.3', '15', 'Bộ Nhớ Đệm', '16 GB', 'GTX', '90s', '32 GB', 'SSD 528GB', '19 inch', '1900 1080', '19h', 'Công Nghệ New', 'NVDIA', 'Âm Thanh New', 'Có cổng giao tiếp', 'Có', 'Có', 'Có', 'Mô tả Sản Phẩm', 'Leb 7 Màu', 'Lớn', 'Nhôm', '5 tiếng', 'WINDOWS 10 Home', '2020-07-15', 'Nhiều 1', 'Nhiều2 ', 'Nhiều3', 'Nhiều 4'),
(6, 'Laptop Apple MacBook Air M1 2020 16GB/256GB/7-core GPU (Z124000DE)', '33490000', '28490000', 'LapTop', 'Apple ', 'Việt Nam', 'Hộp', '329', '1651839962901.jpg', 'Apple M1', '8', '3', 'Hãng không công bố', 'Hãng không công bố', 'Hãng không công bố', ' 16 GB', 'Hãng không công bố', 'Hãng không công bố', 'Không hỗ trợ nâng cấp', 'Không hỗ trợ nâng cấp', '13.3 inch', ' Retina (2560 x 1600)', ' Retina (2560 x 1600)', 'Công nghệ IPS', 'Card tích hợp - 7 nhân GPU', '3 microphones', '2 x Thunderbolt 3 (USB-C)Jack tai nghe 3.5 mm', ' Bluetooth 5.0Wi-Fi 6 (802.11ax)', '720p FaceTime Camera', ' Bảo mật vân tay', ' Bảo mật vân tay', 'Có', ' Dài 304.1 mm - Rộng 212.4 mm - Dày 4.1 mm đến 16.1 mm - Nặng 1.29 kg', 'Vỏ kim loại nguyên khối', 'Khoảng 10 tiếng', 'Mac OS', '2021-02-27', 'Một trong những ưu điểm của laptop Dell đó chính là việc hãng sản xuất đưa ra thị trường nhiều dòng laptop khác nhau, với nhiều phân khúc thị trường khác nhau nhằm thỏa mãn mọi nhu cầu của nhiều đối tượng sử dụng khác nhau. Nếu bạn là một doanh nhân, bạn hãy chọn một trong những dòng laptop Dell như:  Dell Vostro, Dell Latitude, Dell Precision, trong đó, laptop Dell Precision chính là dòng máy tính cao cấp nhất, có thiết kế có thể hoạt động như chiếc máy trạm.     Và một số dòng laptop Dell phổ biến hiện nay là: Dell XPS, Dell Inspiron và Dell Alienware. Laptop Dell Inspiron là sự hài hòa giữa thiết kế, cấu hình và giá bán, trong khi Dell XPS lại dành cho người dùng cần sự tinh tế trong thiết kế và một laptop có cấu hình mạnh. Dòng máy Dell Alienware thì vẫn luôn là một trong những máy tính nằm sự lựa chọn dành cho các game thủ hiện nay.', 'Bên cạnh đó, người dùng thường có thể tìm thấy các ứng dụng không cần thiết bằng cách sắp xếp danh sách các ứng dụng đã cài đặt theo tên của nhà sản xuất PC của bạn.  Thêm một cách tìm kiếm khác là sắp xếp theo những ứng dụng gần đây nhất để xem có chương trình nào bạn không biết bạn đã cài đặt không. Ngoài ra, dựa trên kích thước của file ứng dụng mà bạn có thể gỡ các ứng dụng không cần thiết để giải phóng bộ nhớ.  Khi bạn đã tìm thấy các ứng dụng rác mà bạn không mong muốn, chỉ cần chọn chúng và nhấp vào Uninstall để gỡ cài đặt.   Trên Windows 10 có hai loại ứng dụng, ứng dụng trên máy và ứng dụng trên cửa hàng Windows Store. Để gỡ ứng dụng trên Windows Store, vào cửa hàng và tìm kiếm ứng dụng theo các cách trên để gỡ ứng dụng không cần thiết.  Đối với ứng dụng trên máy, vào Control Panel để gỡ cài đặt theo các tìm kiếm ứng dụng tương tự.  3Tăng ', '- Ram là nơi chất chứa dữ liệu mà ứng dụng CPU và GPU xử lí, nếu bạn mở quá nhiều ứng dụng trong cùng một lúc trường hợp dung lượng Ram quá ít thì nó sẻ không đủ không gian để xử lí, gây ra tình trạng laptop load chậm và thậm chí bị treo máy, đơ giật  - Nếu RAM thấp làm laptop chạy chậm thì đừng tiếc tiền mà hãy nâng cấp cho laptop 1 thanh RAM tối thiểu 4GB để máy hoạt động mượt mà hơn nhé.  - Để biết dung lượng RAM hiện tại của laptop, các bạn có thể làm theo cách sau: Click vào Start > Control Panel > System and Security > System.', 'Một trong những ưu điểm của laptop Dell đó chính là việc hãng sản xuất đưa ra thị trường nhiều dòng laptop khác nhau, với nhiều phân khúc thị trường khác nhau nhằm thỏa mãn mọi nhu cầu của nhiều đối tượng sử dụng khác nhau. Nếu bạn là một doanh nhân, bạn hãy chọn một trong những dòng laptop Dell như:  Dell Vostro, Dell Latitude, Dell Precision, trong đó, laptop Dell Precision chính là dòng máy tính cao cấp nhất, có thiết kế có thể hoạt động như chiếc máy trạm.     Và một số dòng laptop Dell phổ biến hiện nay là: Dell XPS, Dell Inspiron và Dell Alienware. Laptop Dell Inspiron là sự hài hòa giữa thiết kế, cấu hình và giá bán, trong khi Dell XPS lại dành cho người dùng cần sự tinh tế trong thiết kế và một laptop có cấu hình mạnh. Dòng máy Dell Alienware thì vẫn luôn là một trong những máy tính nằm sự lựa chọn dành cho các game thủ hiện nay.'),
(7, 'Laptop Acer Nitro 5 Gaming AN515 45 R6EV R5 5600H/8GB/512GB/144Hz/4GB GTX1650/Win11 (NH.QBMSV.006)', '23.990000', '19.190000', 'LapTop', 'Acer', 'Nhật Bản', 'Hộp', '399', '1651846511142.jpg', 'AMD Ryzen 5 - 5600H', '6', '12', ' 3.30 GHz', 'Turbo Boost 4.2 GHz', '16 MB', '8 GB', 'DDR4 2 khe (1 khe 8GB + 1 khe rời)', ' 3200 MHz', '32 GB', '512 GB SSD NVMe PCIe (Có thể tháo ra, lắp thanh khác tối đa 1TB)', '15.6 inch', 'Full HD (1920 x 1080)', '144 Hz', ' Acer ComfyView  , LED Backlit', ' Card rời - NVIDIA GeForce GTX 1650 4 GB', 'Acer TrueHarmonyDTS X:Ultra Audio', '3 x USB 3.2  HDMI', 'Bluetooth 5.0Wi-Fi 6 (802.11ax)', 'Có', ' HD webcam', 'Đèn bàn phím chuyển màu RGB', 'Có', ' Dài 363.4 mm - Rộng 255 mm - Dày 23.9 mm - Nặng 2.2 kg', ' Vỏ nhựa', ' 4-cell Li-ion, 57 Wh', ' Windows 11 Home SL', '2021-07-07', 'Từ menu Start, gõ Disk Cleanup. Điều này mở ra tiện ích Disk Cleanup đáng tin cậy là một phần của Windows trong nhiều thế hệ hệ điều hành Windows.  Disk Cleanup tìm thấy những thứ không mong muốn như các tệp tạm thời, các trang web ngoại tuyến và các tệp cài đặt trên PC của bạn và đề nghị xóa tất cả chúng cùng một lúc.', '- Ram là nơi chất chứa dữ liệu mà ứng dụng CPU và GPU xử lí, nếu bạn mở quá nhiều ứng dụng trong cùng một lúc trường hợp dung lượng Ram quá ít thì nó sẻ không đủ không gian để xử lí, gây ra tình trạng laptop load chậm và thậm chí bị treo máy, đơ giật  - Nếu RAM thấp làm laptop chạy chậm thì đừng tiếc tiền mà hãy nâng cấp cho laptop 1 thanh RAM tối thiểu 4GB để máy hoạt động mượt mà hơn nhé.  - Để biết dung lượng RAM hiện tại của laptop, các bạn có thể làm theo cách sau: Click vào Start > Control Panel > System and Security > System.', 'Các phím cơ bản bao gồm: phím ký tự, phím dấu và phím số. Các phím ký tự là những chữ nằm trong bảng chữ cái Latinh. Dấu và số nằm cùng trên một phím. Mặc định của hệ thống khi gõ vào những phím này sẽ hiển thị số. Để sử dụng dấu, bạn cần nhấn tổ hợp phím Shift + phím dấu.  Phím chức năng: là các phím từ F1 đến F12 nằm ở vị trí trên cùng keyboard.  Phím đặc biệt bao gồm: Esc là phím hủy bỏ lệnh hoặc thoát khỏi một chương trình nào đó. Tab dùng để di chuyển dấu nháy, chuyển cột trong bảng tính. Caps Lock có tác dụng bật hoặc tắt chế độ viết in hoa (đèn sáng là bật, không sáng là tắt). Enter dùng khi cần xuống hàng trong văn bản hoặc chạy chương trình được chọn. Space Bar để tạo khoảng trắng giữa các từ. Ngoài ra còn các phím Backspace, Shift, Alt, Ctrl, Windows và Menu với một số chức năng tương ứng.  Phím điều khiển gồm: Insert, Delete, Home, End, Page Up, Page Down, phím mũi tên.', 'Một trong những ưu điểm của laptop Dell đó chính là việc hãng sản xuất đưa ra thị trường nhiều dòng laptop khác nhau, với nhiều phân khúc thị trường khác nhau nhằm thỏa mãn mọi nhu cầu của nhiều đối tượng sử dụng khác nhau. Nếu bạn là một doanh nhân, bạn hãy chọn một trong những dòng laptop Dell như:  Dell Vostro, Dell Latitude, Dell Precision, trong đó, laptop Dell Precision chính là dòng máy tính cao cấp nhất, có thiết kế có thể hoạt động như chiếc máy trạm.     Và một số dòng laptop Dell phổ biến hiện nay là: Dell XPS, Dell Inspiron và Dell Alienware. Laptop Dell Inspiron là sự hài hòa giữa thiết kế, cấu hình và giá bán, trong khi Dell XPS lại dành cho người dùng cần sự tinh tế trong thiết kế và một laptop có cấu hình mạnh. Dòng máy Dell Alienware thì vẫn luôn là một trong những máy tính nằm sự lựa chọn dành cho các game thủ hiện nay.'),
(8, 'Laptop Lenovo Yoga 9 14ITL5 i7/1185G7/16GB/1TB SSD/Touch/Pen/Win10 (82BG006EVN) ', '49990000', '40090000', 'LapTop', 'Acer', 'Nhật Bản', 'Hộp', '245', '1651846511143.jpg', 'Intel Core i7 Tiger Lake - 1185G7', '4', '8', '3.00 GHz', 'Turbo Boost 4.8 GHz', '12 MB', ' 16 GB', 'LPDDR4 (On board)', ' 4266 MHz', 'Không hỗ trợ nâng cấp', ' 1 TB SSD M.2 PCIe', ' 14 inch', ' 4K/UHD (3840 x 2160)', ' Hãng không công bố', '500 nits Glossy', 'Card tích hợp - Intel Iris Xe Graphics', ' Dolby AtmosStereo speakers', ' 1 x USB 3.2  2 x Thunderbolt 4 USB-C', ' Bluetooth 5.1Wi-Fi 6 (802.11ax)', 'Có', 'HD webcam', 'Bảo mật vân tay  Công tắc khóa camera', 'Có', ' Dài 319.4 mm - Rộng 216.4 mm - Dày 15.7 mm - Nặng 1.37 kg', 'Vỏ kim loại', 'Li-Polymer, 60 Wh', 'Windows 10 Home SL', '2021-03-25', 'Một trong những ưu điểm của laptop Dell đó chính là việc hãng sản xuất đưa ra thị trường nhiều dòng laptop khác nhau, với nhiều phân khúc thị trường khác nhau nhằm thỏa mãn mọi nhu cầu của nhiều đối tượng sử dụng khác nhau. Nếu bạn là một doanh nhân, bạn hãy chọn một trong những dòng laptop Dell như:  Dell Vostro, Dell Latitude, Dell Precision, trong đó, laptop Dell Precision chính là dòng máy tính cao cấp nhất, có thiết kế có thể hoạt động như chiếc máy trạm.     Và một số dòng laptop Dell phổ biến hiện nay là: Dell XPS, Dell Inspiron và Dell Alienware. Laptop Dell Inspiron là sự hài hòa giữa thiết kế, cấu hình và giá bán, trong khi Dell XPS lại dành cho người dùng cần sự tinh tế trong thiết kế và một laptop có cấu hình mạnh. Dòng máy Dell Alienware thì vẫn luôn là một trong những máy tính nằm sự lựa chọn dành cho các game thủ hiện nay.', 'Từ menu Start, gõ Disk Cleanup. Điều này mở ra tiện ích Disk Cleanup đáng tin cậy là một phần của Windows trong nhiều thế hệ hệ điều hành Windows.  Disk Cleanup tìm thấy những thứ không mong muốn như các tệp tạm thời, các trang web ngoại tuyến và các tệp cài đặt trên PC của bạn và đề nghị xóa tất cả chúng cùng một lúc.', '- Ram là nơi chất chứa dữ liệu mà ứng dụng CPU và GPU xử lí, nếu bạn mở quá nhiều ứng dụng trong cùng một lúc trường hợp dung lượng Ram quá ít thì nó sẻ không đủ không gian để xử lí, gây ra tình trạng laptop load chậm và thậm chí bị treo máy, đơ giật  - Nếu RAM thấp làm laptop chạy chậm thì đừng tiếc tiền mà hãy nâng cấp cho laptop 1 thanh RAM tối thiểu 4GB để máy hoạt động mượt mà hơn nhé.  - Để biết dung lượng RAM hiện tại của laptop, các bạn có thể làm theo cách sau: Click vào Start > Control Panel > System and Security > System.', 'Các phím cơ bản bao gồm: phím ký tự, phím dấu và phím số. Các phím ký tự là những chữ nằm trong bảng chữ cái Latinh. Dấu và số nằm cùng trên một phím. Mặc định của hệ thống khi gõ vào những phím này sẽ hiển thị số. Để sử dụng dấu, bạn cần nhấn tổ hợp phím Shift + phím dấu.  Phím chức năng: là các phím từ F1 đến F12 nằm ở vị trí trên cùng keyboard.  Phím đặc biệt bao gồm: Esc là phím hủy bỏ lệnh hoặc thoát khỏi một chương trình nào đó. Tab dùng để di chuyển dấu nháy, chuyển cột trong bảng tính. Caps Lock có tác dụng bật hoặc tắt chế độ viết in hoa (đèn sáng là bật, không sáng là tắt). Enter dùng khi cần xuống hàng trong văn bản hoặc chạy chương trình được chọn. Space Bar để tạo khoảng trắng giữa các từ. Ngoài ra còn các phím Backspace, Shift, Alt, Ctrl, Windows và Menu với một số chức năng tương ứng.  Phím điều khiển gồm: Insert, Delete, Home, End, Page Up, Page Down, phím mũi tên.');
(9, 'Laptop Masstel E140 Celeron - N4120/4GB/128GB/14\"HD/Win 10', '10490000', '7490000', 'LapTop', 'Masstel', 'Nhật Bản', 'Chiếc', '300', '1651216811016.jpg', ' Apple M1', '8', '1', '1', ' Hãng không công bố', ' Hãng không công bố', ' 16 GB', ' Hãng không công bố', ' Hãng không công bố', 'Không hỗ trợ nâng cấp', '256 GB SSD', ' 13.3 inch', ' Retina (2560 x 1600)', ' Hãng không công bố', ' 400 nits  Công nghệ IPS  LED Backlit  True Tone Technology', 'Card tích hợp - 7 nhân GPU', ' 3 microphones  Headphones  Loa kép (2 kênh)', '2 x Thunderbolt 3 (USB-C)Jack tai nghe 3.5 mm', 'Bluetooth 5.0Wi-Fi 6 (802.11ax)', ' 720p FaceTime Camera', ' Bảo mật vân tay', ' Bảo mật vân tay', ' Có', 'Dài 304.1 mm - Rộng 212.4 mm - Dày 4.1 mm đến 16.1 mm - Nặng 1.29 kg', ' Vỏ kim loại nguyên khối', 'Khoảng 10 tiếng', ' Mac OS', '2020-02-06', 'Một trong những ưu điểm của laptop Dell đó chính là việc hãng sản xuất đưa ra thị trường nhiều dòng laptop khác nhau, với nhiều phân khúc thị trường khác nhau nhằm thỏa mãn mọi nhu cầu của nhiều đối tượng sử dụng khác nhau. Nếu bạn là một doanh nhân, bạn hãy chọn một trong những dòng laptop Dell như:  Dell Vostro, Dell Latitude, Dell Precision, trong đó, laptop Dell Precision chính là dòng máy tính cao cấp nhất, có thiết kế có thể hoạt động như chiếc máy trạm.     Và một số dòng laptop Dell phổ biến hiện nay là: Dell XPS, Dell Inspiron và Dell Alienware. Laptop Dell Inspiron là sự hài hòa giữa thiết kế, cấu hình và giá bán, trong khi Dell XPS lại dành cho người dùng cần sự tinh tế trong thiết kế và một laptop có cấu hình mạnh. Dòng máy Dell Alienware thì vẫn luôn là một trong những máy tính nằm sự lựa chọn dành cho các game thủ hiện nay.', '- Ram là nơi chất chứa dữ liệu mà ứng dụng CPU và GPU xử lí, nếu bạn mở quá nhiều ứng dụng trong cùng một lúc trường hợp dung lượng Ram quá ít thì nó sẻ không đủ không gian để xử lí, gây ra tình trạng laptop load chậm và thậm chí bị treo máy, đơ giật  - Nếu RAM thấp làm laptop chạy chậm thì đừng tiếc tiền mà hãy nâng cấp cho laptop 1 thanh RAM tối thiểu 4GB để máy hoạt động mượt mà hơn nhé.  - Để biết dung lượng RAM hiện tại của laptop, các bạn có thể làm theo cách sau: Click vào Start > Control Panel > System and Security > System.', '1. Không bao giờ đặt laptop trên giường Bạn nên cẩn thận trước khi đặt laptop trên giường, sofa hay bất cứ bề mặt mềm nào. Lý do là vì vật liệu mềm gây ảnh hưởng tới hệ thống thông gió bên dưới laptop. Khi để máy lên bề mặt này sẽ khiến cho không khi không đi qua được phía dưới máy để làm mát thiết bị. Vì vậy, luôn luôn đặt laptop trên bàn hoặc trên bề mặt cứng. 2. Phần mềm diệt virus Bạn nên cẩn thận với virus. Virus dễ dàng thâm nhập vào laptop thông qua các thiết bị lưu trữ ngoài. Khi bị lây nhiễm virus, các tệp tin quan trọng của bạn có thể bị “ăn mất”. Vì vậy, bạn phải có phần mềm diệt virus. Trước khi kết nối bất cứ thiết bị gì với laptop, đầu tiên bạn cần quét thiết bị sau đó mới chuyển tệp tin. Bạn nên quét toàn bộ hệ thống theo chu kỳ 3-4 ngày một lần. Điều này sẽ giúp bảo vệ laptop của bạn. 3. Luôn thoát thiết bị cắm ngoài đúng cách sau khi sử dụng Loại bỏ ổ đĩa như ổ flash, ổ cứng ngoài… không đúng cách có thể gây hại cho các phụ kiện máy tính của bạn. Vì vậy, hãy cẩn thận trong khi rút các ổ lưu trữ ngoài ra khỏi laptop.', 'Các phím cơ bản bao gồm: phím ký tự, phím dấu và phím số. Các phím ký tự là những chữ nằm trong bảng chữ cái Latinh. Dấu và số nằm cùng trên một phím. Mặc định của hệ thống khi gõ vào những phím này sẽ hiển thị số. Để sử dụng dấu, bạn cần nhấn tổ hợp phím Shift + phím dấu.  Phím chức năng: là các phím từ F1 đến F12 nằm ở vị trí trên cùng keyboard.  Phím đặc biệt bao gồm: Esc là phím hủy bỏ lệnh hoặc thoát khỏi một chương trình nào đó. Tab dùng để di chuyển dấu nháy, chuyển cột trong bảng tính. Caps Lock có tác dụng bật hoặc tắt chế độ viết in hoa (đèn sáng là bật, không sáng là tắt). Enter dùng khi cần xuống hàng trong văn bản hoặc chạy chương trình được chọn. Space Bar để tạo khoảng trắng giữa các từ. Ngoài ra còn các phím Backspace, Shift, Alt, Ctrl, Windows và Menu với một số chức năng tương ứng.  Phím điều khiển gồm: Insert, Delete, Home, End, Page Up, Page Down, phím mũi tên.'),
(10, 'Laptop Masstel E116 Celeron N4020/4GB/128GB/11.6\"HD/Win 10 ', '8990000', '5990000', 'LapTop', 'Masstel', 'Kazakhstan', 'Chiếc', '200', '1651123421045.jpg', 'Công Nghệ 1', '4', '4', '9.3', '15', 'Bộ Nhớ Đệm', '16 GB', 'GTX', '90s', 'undefined', 'SSD 528GB', '19 inch', '1900 1080', '19h', 'Công Nghệ New', 'NVDIA', 'Âm Thanh New', 'Có cổng giao tiếp', 'Có', 'Có', 'Có', 'Mô tả Sản Phẩm', 'Leb 7 Màu', 'Lớn', 'Nhôm', '5 tiếng', 'WINDOWS 10 Home', '2020-07-15', 'Hiệu năng ấn tượng đến từ chip M1 Chip M1 được Apple thiết kế dành riêng cho MacBook mang đến hiệu năng vượt trội. Thực hiện tốt các tác vụ văn phòng trên các phần mềm như Word, Excel, Powerpoint,... Thiết kế đồ hoạ cũng chuyên nghiệp không kém, cho phép bạn chỉnh sửa hình ảnh với dung lượng lớn, kết xuất 2D mượt mà trên các phần mềm Photoshop, AI, Figma,...  Card đồ họa GPU 7 nhân đem lại hiệu suất cao đáng kinh ngạc, đồ họa cao hơn gấp 5 lần, thảo sức sáng tạo nội dung, kết xuất 3D ổn định, render video, phát trực tiếp với chất lượng cao với chất ảnh sắc nét cùng độ phân giải lên đến 4K.  Bộ nhớ RAM 16 GB cho phép bạn sử dụng đa nhiệm, bạn có thể thao tác nhiều ứng dụng cùng một lúc thoải mái với những tác vụ như lướt web, soạn thảo văn bản, xem video hay thiết kế hình ảnh bằng Photoshop, Adobe IIIustrator,...', 'Laptop Apple MacBook Air M1 2020 (Z124000DE) là chiếc laptop mỏng nhẹ nhưng có cấu hình mạnh mẽ, nhiều tính năng hiện đại đáng để sở hữu trong phân khúc, thích hợp cho các tác vụ văn phòng thường ngày và thiết kế đồ hoạ.', '1. Không bao giờ đặt laptop trên giường Bạn nên cẩn thận trước khi đặt laptop trên giường, sofa hay bất cứ bề mặt mềm nào. Lý do là vì vật liệu mềm gây ảnh hưởng tới hệ thống thông gió bên dưới laptop. Khi để máy lên bề mặt này sẽ khiến cho không khi không đi qua được phía dưới máy để làm mát thiết bị. Vì vậy, luôn luôn đặt laptop trên bàn hoặc trên bề mặt cứng. 2. Phần mềm diệt virus Bạn nên cẩn thận với virus. Virus dễ dàng thâm nhập vào laptop thông qua các thiết bị lưu trữ ngoài. Khi bị lây nhiễm virus, các tệp tin quan trọng của bạn có thể bị “ăn mất”. Vì vậy, bạn phải có phần mềm diệt virus. Trước khi kết nối bất cứ thiết bị gì với laptop, đầu tiên bạn cần quét thiết bị sau đó mới chuyển tệp tin. Bạn nên quét toàn bộ hệ thống theo chu kỳ 3-4 ngày một lần. Điều này sẽ giúp bảo vệ laptop của bạn. 3. Luôn thoát thiết bị cắm ngoài đúng cách sau khi sử dụng Loại bỏ ổ đĩa như ổ flash, ổ cứng ngoài… không đúng cách có thể gây hại cho các phụ kiện máy tính của bạn. Vì vậy, hãy cẩn thận trong khi rút các ổ lưu trữ ngoài ra khỏi laptop.', 'Các phím cơ bản bao gồm: phím ký tự, phím dấu và phím số. Các phím ký tự là những chữ nằm trong bảng chữ cái Latinh. Dấu và số nằm cùng trên một phím. Mặc định của hệ thống khi gõ vào những phím này sẽ hiển thị số. Để sử dụng dấu, bạn cần nhấn tổ hợp phím Shift + phím dấu.  Phím chức năng: là các phím từ F1 đến F12 nằm ở vị trí trên cùng keyboard.  Phím đặc biệt bao gồm: Esc là phím hủy bỏ lệnh hoặc thoát khỏi một chương trình nào đó. Tab dùng để di chuyển dấu nháy, chuyển cột trong bảng tính. Caps Lock có tác dụng bật hoặc tắt chế độ viết in hoa (đèn sáng là bật, không sáng là tắt). Enter dùng khi cần xuống hàng trong văn bản hoặc chạy chương trình được chọn. Space Bar để tạo khoảng trắng giữa các từ. Ngoài ra còn các phím Backspace, Shift, Alt, Ctrl, Windows và Menu với một số chức năng tương ứng.  Phím điều khiển gồm: Insert, Delete, Home, End, Page Up, Page Down, phím mũi tên.'),
(11, 'MacBook Pro 16\" 2021 M1 Pro 512GB VIPPRO', '69990000', '64990000', 'LapTop', 'Apple ', 'Mỹ', 'Hộp', '200', '1651123507239.jpg', 'Công Nghệ 1', '4', '4', '9.3', '15', 'Bộ Nhớ Đệm', '16 GB', 'GTX', '90s', 'undefined', 'SSD 528GB', '19 inch', '1900 1080', '19h', 'Công Nghệ New', 'NVDIA', 'Âm Thanh New', 'Có cổng giao tiếp', 'Có', 'Có', 'Có', 'Mô tả Sản Phẩm', 'Leb 7 Màu', 'Lớn', 'Nhôm', '5 tiếng', 'WINDOWS 10 Home', '2020-07-15', 'Hiệu năng ấn tượng đến từ chip M1 Chip M1 được Apple thiết kế dành riêng cho MacBook mang đến hiệu năng vượt trội. Thực hiện tốt các tác vụ văn phòng trên các phần mềm như Word, Excel, Powerpoint,... Thiết kế đồ hoạ cũng chuyên nghiệp không kém, cho phép bạn chỉnh sửa hình ảnh với dung lượng lớn, kết xuất 2D mượt mà trên các phần mềm Photoshop, AI, Figma,...  Card đồ họa GPU 7 nhân đem lại hiệu suất cao đáng kinh ngạc, đồ họa cao hơn gấp 5 lần, thảo sức sáng tạo nội dung, kết xuất 3D ổn định, render video, phát trực tiếp với chất lượng cao với chất ảnh sắc nét cùng độ phân giải lên đến 4K.  Bộ nhớ RAM 16 GB cho phép bạn sử dụng đa nhiệm, bạn có thể thao tác nhiều ứng dụng cùng một lúc thoải mái với những tác vụ như lướt web, soạn thảo văn bản, xem video hay thiết kế hình ảnh bằng Photoshop, Adobe IIIustrator,...', 'Laptop Apple MacBook Air M1 2020 (Z124000DE) là chiếc laptop mỏng nhẹ nhưng có cấu hình mạnh mẽ, nhiều tính năng hiện đại đáng để sở hữu trong phân khúc, thích hợp cho các tác vụ văn phòng thường ngày và thiết kế đồ hoạ.', '1. Không bao giờ đặt laptop trên giường Bạn nên cẩn thận trước khi đặt laptop trên giường, sofa hay bất cứ bề mặt mềm nào. Lý do là vì vật liệu mềm gây ảnh hưởng tới hệ thống thông gió bên dưới laptop. Khi để máy lên bề mặt này sẽ khiến cho không khi không đi qua được phía dưới máy để làm mát thiết bị. Vì vậy, luôn luôn đặt laptop trên bàn hoặc trên bề mặt cứng. 2. Phần mềm diệt virus Bạn nên cẩn thận với virus. Virus dễ dàng thâm nhập vào laptop thông qua các thiết bị lưu trữ ngoài. Khi bị lây nhiễm virus, các tệp tin quan trọng của bạn có thể bị “ăn mất”. Vì vậy, bạn phải có phần mềm diệt virus. Trước khi kết nối bất cứ thiết bị gì với laptop, đầu tiên bạn cần quét thiết bị sau đó mới chuyển tệp tin. Bạn nên quét toàn bộ hệ thống theo chu kỳ 3-4 ngày một lần. Điều này sẽ giúp bảo vệ laptop của bạn. 3. Luôn thoát thiết bị cắm ngoài đúng cách sau khi sử dụng Loại bỏ ổ đĩa như ổ flash, ổ cứng ngoài… không đúng cách có thể gây hại cho các phụ kiện máy tính của bạn. Vì vậy, hãy cẩn thận trong khi rút các ổ lưu trữ ngoài ra khỏi laptop.', 'Các phím cơ bản bao gồm: phím ký tự, phím dấu và phím số. Các phím ký tự là những chữ nằm trong bảng chữ cái Latinh. Dấu và số nằm cùng trên một phím. Mặc định của hệ thống khi gõ vào những phím này sẽ hiển thị số. Để sử dụng dấu, bạn cần nhấn tổ hợp phím Shift + phím dấu.  Phím chức năng: là các phím từ F1 đến F12 nằm ở vị trí trên cùng keyboard.  Phím đặc biệt bao gồm: Esc là phím hủy bỏ lệnh hoặc thoát khỏi một chương trình nào đó. Tab dùng để di chuyển dấu nháy, chuyển cột trong bảng tính. Caps Lock có tác dụng bật hoặc tắt chế độ viết in hoa (đèn sáng là bật, không sáng là tắt). Enter dùng khi cần xuống hàng trong văn bản hoặc chạy chương trình được chọn. Space Bar để tạo khoảng trắng giữa các từ. Ngoài ra còn các phím Backspace, Shift, Alt, Ctrl, Windows và Menu với một số chức năng tương ứng.  Phím điều khiển gồm: Insert, Delete, Home, End, Page Up, Page Down, phím mũi tên.'),
(12, 'Laptop Asus TUF Gaming FX506LH-HN188W i5 10300H/8GB/512GB SSD/Nvidia GTX1650 4GB/Win11', '20999000', '18999000', 'LapTop', 'Asus', 'Nga', 'Hộp', '200', '1651124107978.jpg', 'Công Nghệ 1', '4', '4', '9.3', '15', 'Bộ Nhớ Đệm', '16 GB', 'GTX', '90s', 'undefined', 'SSD 528GB', '19 inch', '1900 1080', '19h', 'Công Nghệ New', 'NVDIA', 'Âm Thanh New', 'Có cổng giao tiếp', 'Có', 'Có', 'Có', 'Mô tả Sản Phẩm', 'Leb 7 Màu', 'Lớn', 'Nhôm', '5 tiếng', 'WINDOWS 10 Home', '2020-07-15', 'Laptop Apple MacBook Air M1 2020 có thiết kế đẹp, sang trọng với CPU M1 độc quyền từ Apple cho hiệu năng đồ họa cao, màn hình Retina hiển thị siêu nét cùng với hệ thống bảo mật tối ưu.', 'Hiệu năng ấn tượng đến từ chip M1 Chip M1 được Apple thiết kế dành riêng cho MacBook mang đến hiệu năng vượt trội. Thực hiện tốt các tác vụ văn phòng trên các phần mềm như Word, Excel, Powerpoint,... Thiết kế đồ hoạ cũng chuyên nghiệp không kém, cho phép bạn chỉnh sửa hình ảnh với dung lượng lớn, kết xuất 2D mượt mà trên các phần mềm Photoshop, AI, Figma,...  Card đồ họa GPU 7 nhân đem lại hiệu suất cao đáng kinh ngạc, đồ họa cao hơn gấp 5 lần, thảo sức sáng tạo nội dung, kết xuất 3D ổn định, render video, phát trực tiếp với chất lượng cao với chất ảnh sắc nét cùng độ phân giải lên đến 4K.  Bộ nhớ RAM 16 GB cho phép bạn sử dụng đa nhiệm, bạn có thể thao tác nhiều ứng dụng cùng một lúc thoải mái với những tác vụ như lướt web, soạn thảo văn bản, xem video hay thiết kế hình ảnh bằng Photoshop, Adobe IIIustrator,...', '1. Không bao giờ đặt laptop trên giường Bạn nên cẩn thận trước khi đặt laptop trên giường, sofa hay bất cứ bề mặt mềm nào. Lý do là vì vật liệu mềm gây ảnh hưởng tới hệ thống thông gió bên dưới laptop. Khi để máy lên bề mặt này sẽ khiến cho không khi không đi qua được phía dưới máy để làm mát thiết bị. Vì vậy, luôn luôn đặt laptop trên bàn hoặc trên bề mặt cứng. 2. Phần mềm diệt virus Bạn nên cẩn thận với virus. Virus dễ dàng thâm nhập vào laptop thông qua các thiết bị lưu trữ ngoài. Khi bị lây nhiễm virus, các tệp tin quan trọng của bạn có thể bị “ăn mất”. Vì vậy, bạn phải có phần mềm diệt virus. Trước khi kết nối bất cứ thiết bị gì với laptop, đầu tiên bạn cần quét thiết bị sau đó mới chuyển tệp tin. Bạn nên quét toàn bộ hệ thống theo chu kỳ 3-4 ngày một lần. Điều này sẽ giúp bảo vệ laptop của bạn. 3. Luôn thoát thiết bị cắm ngoài đúng cách sau khi sử dụng Loại bỏ ổ đĩa như ổ flash, ổ cứng ngoài… không đúng cách có thể gây hại cho các phụ kiện máy tính của bạn. Vì vậy, hãy cẩn thận trong khi rút các ổ lưu trữ ngoài ra khỏi laptop.', 'Các phím cơ bản bao gồm: phím ký tự, phím dấu và phím số. Các phím ký tự là những chữ nằm trong bảng chữ cái Latinh. Dấu và số nằm cùng trên một phím. Mặc định của hệ thống khi gõ vào những phím này sẽ hiển thị số. Để sử dụng dấu, bạn cần nhấn tổ hợp phím Shift + phím dấu.  Phím chức năng: là các phím từ F1 đến F12 nằm ở vị trí trên cùng keyboard.  Phím đặc biệt bao gồm: Esc là phím hủy bỏ lệnh hoặc thoát khỏi một chương trình nào đó. Tab dùng để di chuyển dấu nháy, chuyển cột trong bảng tính. Caps Lock có tác dụng bật hoặc tắt chế độ viết in hoa (đèn sáng là bật, không sáng là tắt). Enter dùng khi cần xuống hàng trong văn bản hoặc chạy chương trình được chọn. Space Bar để tạo khoảng trắng giữa các từ. Ngoài ra còn các phím Backspace, Shift, Alt, Ctrl, Windows và Menu với một số chức năng tương ứng.  Phím điều khiển gồm: Insert, Delete, Home, End, Page Up, Page Down, phím mũi tên.'),
(13, 'LapTop HP 15 Pavilon ABC', '29990000', '25990000', 'LapTop', 'HP', 'Việt Nam', 'Hộp', '200', '1651203836240.jpg', 'Công Nghệ 1', '4', '4', '9.3', '15', 'Bộ Nhớ Đệm', '16 GB', 'GTX', '90s', '32 GB', 'SSD 528GB', '19 inch', '1900 1080', '19h', 'Công Nghệ New', 'NVDIA', 'Âm Thanh New', 'Có cổng giao tiếp', 'Có', 'Có', 'Có', 'Mô tả Sản Phẩm', 'Leb 7 Màu', 'Lớn', 'Nhôm', '5 tiếng', 'WINDOWS 10 Home', '2020-07-15', 'Nhiều 1', 'Nhiều2 ', 'Nhiều3', 'Nhiều 4'),
(14, 'Laptop Apple MacBook Air M1 2020 16GB/256GB/7-core GPU (Z124000DE)', '33490000', '28490000', 'LapTop', 'Apple ', 'Việt Nam', 'Hộp', '329', '1651839962901.jpg', 'Apple M1', '8', '3', 'Hãng không công bố', 'Hãng không công bố', 'Hãng không công bố', ' 16 GB', 'Hãng không công bố', 'Hãng không công bố', 'Không hỗ trợ nâng cấp', 'Không hỗ trợ nâng cấp', '13.3 inch', ' Retina (2560 x 1600)', ' Retina (2560 x 1600)', 'Công nghệ IPS', 'Card tích hợp - 7 nhân GPU', '3 microphones', '2 x Thunderbolt 3 (USB-C)Jack tai nghe 3.5 mm', ' Bluetooth 5.0Wi-Fi 6 (802.11ax)', '720p FaceTime Camera', ' Bảo mật vân tay', ' Bảo mật vân tay', 'Có', ' Dài 304.1 mm - Rộng 212.4 mm - Dày 4.1 mm đến 16.1 mm - Nặng 1.29 kg', 'Vỏ kim loại nguyên khối', 'Khoảng 10 tiếng', 'Mac OS', '2021-02-27', 'Một trong những ưu điểm của laptop Dell đó chính là việc hãng sản xuất đưa ra thị trường nhiều dòng laptop khác nhau, với nhiều phân khúc thị trường khác nhau nhằm thỏa mãn mọi nhu cầu của nhiều đối tượng sử dụng khác nhau. Nếu bạn là một doanh nhân, bạn hãy chọn một trong những dòng laptop Dell như:  Dell Vostro, Dell Latitude, Dell Precision, trong đó, laptop Dell Precision chính là dòng máy tính cao cấp nhất, có thiết kế có thể hoạt động như chiếc máy trạm.     Và một số dòng laptop Dell phổ biến hiện nay là: Dell XPS, Dell Inspiron và Dell Alienware. Laptop Dell Inspiron là sự hài hòa giữa thiết kế, cấu hình và giá bán, trong khi Dell XPS lại dành cho người dùng cần sự tinh tế trong thiết kế và một laptop có cấu hình mạnh. Dòng máy Dell Alienware thì vẫn luôn là một trong những máy tính nằm sự lựa chọn dành cho các game thủ hiện nay.', 'Bên cạnh đó, người dùng thường có thể tìm thấy các ứng dụng không cần thiết bằng cách sắp xếp danh sách các ứng dụng đã cài đặt theo tên của nhà sản xuất PC của bạn.  Thêm một cách tìm kiếm khác là sắp xếp theo những ứng dụng gần đây nhất để xem có chương trình nào bạn không biết bạn đã cài đặt không. Ngoài ra, dựa trên kích thước của file ứng dụng mà bạn có thể gỡ các ứng dụng không cần thiết để giải phóng bộ nhớ.  Khi bạn đã tìm thấy các ứng dụng rác mà bạn không mong muốn, chỉ cần chọn chúng và nhấp vào Uninstall để gỡ cài đặt.   Trên Windows 10 có hai loại ứng dụng, ứng dụng trên máy và ứng dụng trên cửa hàng Windows Store. Để gỡ ứng dụng trên Windows Store, vào cửa hàng và tìm kiếm ứng dụng theo các cách trên để gỡ ứng dụng không cần thiết.  Đối với ứng dụng trên máy, vào Control Panel để gỡ cài đặt theo các tìm kiếm ứng dụng tương tự.  3Tăng ', '- Ram là nơi chất chứa dữ liệu mà ứng dụng CPU và GPU xử lí, nếu bạn mở quá nhiều ứng dụng trong cùng một lúc trường hợp dung lượng Ram quá ít thì nó sẻ không đủ không gian để xử lí, gây ra tình trạng laptop load chậm và thậm chí bị treo máy, đơ giật  - Nếu RAM thấp làm laptop chạy chậm thì đừng tiếc tiền mà hãy nâng cấp cho laptop 1 thanh RAM tối thiểu 4GB để máy hoạt động mượt mà hơn nhé.  - Để biết dung lượng RAM hiện tại của laptop, các bạn có thể làm theo cách sau: Click vào Start > Control Panel > System and Security > System.', 'Một trong những ưu điểm của laptop Dell đó chính là việc hãng sản xuất đưa ra thị trường nhiều dòng laptop khác nhau, với nhiều phân khúc thị trường khác nhau nhằm thỏa mãn mọi nhu cầu của nhiều đối tượng sử dụng khác nhau. Nếu bạn là một doanh nhân, bạn hãy chọn một trong những dòng laptop Dell như:  Dell Vostro, Dell Latitude, Dell Precision, trong đó, laptop Dell Precision chính là dòng máy tính cao cấp nhất, có thiết kế có thể hoạt động như chiếc máy trạm.     Và một số dòng laptop Dell phổ biến hiện nay là: Dell XPS, Dell Inspiron và Dell Alienware. Laptop Dell Inspiron là sự hài hòa giữa thiết kế, cấu hình và giá bán, trong khi Dell XPS lại dành cho người dùng cần sự tinh tế trong thiết kế và một laptop có cấu hình mạnh. Dòng máy Dell Alienware thì vẫn luôn là một trong những máy tính nằm sự lựa chọn dành cho các game thủ hiện nay.'),
(15, 'Laptop Acer Nitro 5 Gaming AN515 45 R6EV R5 5600H/8GB/512GB/144Hz/4GB GTX1650/Win11 (NH.QBMSV.006)', '23.990000', '19.190000', 'LapTop', 'Acer', 'Nhật Bản', 'Hộp', '399', '1651846511142.jpg', 'AMD Ryzen 5 - 5600H', '6', '12', ' 3.30 GHz', 'Turbo Boost 4.2 GHz', '16 MB', '8 GB', 'DDR4 2 khe (1 khe 8GB + 1 khe rời)', ' 3200 MHz', '32 GB', '512 GB SSD NVMe PCIe (Có thể tháo ra, lắp thanh khác tối đa 1TB)', '15.6 inch', 'Full HD (1920 x 1080)', '144 Hz', ' Acer ComfyView  , LED Backlit', ' Card rời - NVIDIA GeForce GTX 1650 4 GB', 'Acer TrueHarmonyDTS X:Ultra Audio', '3 x USB 3.2  HDMI', 'Bluetooth 5.0Wi-Fi 6 (802.11ax)', 'Có', ' HD webcam', 'Đèn bàn phím chuyển màu RGB', 'Có', ' Dài 363.4 mm - Rộng 255 mm - Dày 23.9 mm - Nặng 2.2 kg', ' Vỏ nhựa', ' 4-cell Li-ion, 57 Wh', ' Windows 11 Home SL', '2021-07-07', 'Từ menu Start, gõ Disk Cleanup. Điều này mở ra tiện ích Disk Cleanup đáng tin cậy là một phần của Windows trong nhiều thế hệ hệ điều hành Windows.  Disk Cleanup tìm thấy những thứ không mong muốn như các tệp tạm thời, các trang web ngoại tuyến và các tệp cài đặt trên PC của bạn và đề nghị xóa tất cả chúng cùng một lúc.', '- Ram là nơi chất chứa dữ liệu mà ứng dụng CPU và GPU xử lí, nếu bạn mở quá nhiều ứng dụng trong cùng một lúc trường hợp dung lượng Ram quá ít thì nó sẻ không đủ không gian để xử lí, gây ra tình trạng laptop load chậm và thậm chí bị treo máy, đơ giật  - Nếu RAM thấp làm laptop chạy chậm thì đừng tiếc tiền mà hãy nâng cấp cho laptop 1 thanh RAM tối thiểu 4GB để máy hoạt động mượt mà hơn nhé.  - Để biết dung lượng RAM hiện tại của laptop, các bạn có thể làm theo cách sau: Click vào Start > Control Panel > System and Security > System.', 'Các phím cơ bản bao gồm: phím ký tự, phím dấu và phím số. Các phím ký tự là những chữ nằm trong bảng chữ cái Latinh. Dấu và số nằm cùng trên một phím. Mặc định của hệ thống khi gõ vào những phím này sẽ hiển thị số. Để sử dụng dấu, bạn cần nhấn tổ hợp phím Shift + phím dấu.  Phím chức năng: là các phím từ F1 đến F12 nằm ở vị trí trên cùng keyboard.  Phím đặc biệt bao gồm: Esc là phím hủy bỏ lệnh hoặc thoát khỏi một chương trình nào đó. Tab dùng để di chuyển dấu nháy, chuyển cột trong bảng tính. Caps Lock có tác dụng bật hoặc tắt chế độ viết in hoa (đèn sáng là bật, không sáng là tắt). Enter dùng khi cần xuống hàng trong văn bản hoặc chạy chương trình được chọn. Space Bar để tạo khoảng trắng giữa các từ. Ngoài ra còn các phím Backspace, Shift, Alt, Ctrl, Windows và Menu với một số chức năng tương ứng.  Phím điều khiển gồm: Insert, Delete, Home, End, Page Up, Page Down, phím mũi tên.', 'Một trong những ưu điểm của laptop Dell đó chính là việc hãng sản xuất đưa ra thị trường nhiều dòng laptop khác nhau, với nhiều phân khúc thị trường khác nhau nhằm thỏa mãn mọi nhu cầu của nhiều đối tượng sử dụng khác nhau. Nếu bạn là một doanh nhân, bạn hãy chọn một trong những dòng laptop Dell như:  Dell Vostro, Dell Latitude, Dell Precision, trong đó, laptop Dell Precision chính là dòng máy tính cao cấp nhất, có thiết kế có thể hoạt động như chiếc máy trạm.     Và một số dòng laptop Dell phổ biến hiện nay là: Dell XPS, Dell Inspiron và Dell Alienware. Laptop Dell Inspiron là sự hài hòa giữa thiết kế, cấu hình và giá bán, trong khi Dell XPS lại dành cho người dùng cần sự tinh tế trong thiết kế và một laptop có cấu hình mạnh. Dòng máy Dell Alienware thì vẫn luôn là một trong những máy tính nằm sự lựa chọn dành cho các game thủ hiện nay.'),
(16, 'Laptop Lenovo Yoga 9 14ITL5 i7/1185G7/16GB/1TB SSD/Touch/Pen/Win10 (82BG006EVN) ', '49990000', '40090000', 'LapTop', 'Acer', 'Nhật Bản', 'Hộp', '245', '1651846511143.jpg', 'Intel Core i7 Tiger Lake - 1185G7', '4', '8', '3.00 GHz', 'Turbo Boost 4.8 GHz', '12 MB', ' 16 GB', 'LPDDR4 (On board)', ' 4266 MHz', 'Không hỗ trợ nâng cấp', ' 1 TB SSD M.2 PCIe', ' 14 inch', ' 4K/UHD (3840 x 2160)', ' Hãng không công bố', '500 nits Glossy', 'Card tích hợp - Intel Iris Xe Graphics', ' Dolby AtmosStereo speakers', ' 1 x USB 3.2  2 x Thunderbolt 4 USB-C', ' Bluetooth 5.1Wi-Fi 6 (802.11ax)', 'Có', 'HD webcam', 'Bảo mật vân tay  Công tắc khóa camera', 'Có', ' Dài 319.4 mm - Rộng 216.4 mm - Dày 15.7 mm - Nặng 1.37 kg', 'Vỏ kim loại', 'Li-Polymer, 60 Wh', 'Windows 10 Home SL', '2021-03-25', 'Một trong những ưu điểm của laptop Dell đó chính là việc hãng sản xuất đưa ra thị trường nhiều dòng laptop khác nhau, với nhiều phân khúc thị trường khác nhau nhằm thỏa mãn mọi nhu cầu của nhiều đối tượng sử dụng khác nhau. Nếu bạn là một doanh nhân, bạn hãy chọn một trong những dòng laptop Dell như:  Dell Vostro, Dell Latitude, Dell Precision, trong đó, laptop Dell Precision chính là dòng máy tính cao cấp nhất, có thiết kế có thể hoạt động như chiếc máy trạm.     Và một số dòng laptop Dell phổ biến hiện nay là: Dell XPS, Dell Inspiron và Dell Alienware. Laptop Dell Inspiron là sự hài hòa giữa thiết kế, cấu hình và giá bán, trong khi Dell XPS lại dành cho người dùng cần sự tinh tế trong thiết kế và một laptop có cấu hình mạnh. Dòng máy Dell Alienware thì vẫn luôn là một trong những máy tính nằm sự lựa chọn dành cho các game thủ hiện nay.', 'Từ menu Start, gõ Disk Cleanup. Điều này mở ra tiện ích Disk Cleanup đáng tin cậy là một phần của Windows trong nhiều thế hệ hệ điều hành Windows.  Disk Cleanup tìm thấy những thứ không mong muốn như các tệp tạm thời, các trang web ngoại tuyến và các tệp cài đặt trên PC của bạn và đề nghị xóa tất cả chúng cùng một lúc.', '- Ram là nơi chất chứa dữ liệu mà ứng dụng CPU và GPU xử lí, nếu bạn mở quá nhiều ứng dụng trong cùng một lúc trường hợp dung lượng Ram quá ít thì nó sẻ không đủ không gian để xử lí, gây ra tình trạng laptop load chậm và thậm chí bị treo máy, đơ giật  - Nếu RAM thấp làm laptop chạy chậm thì đừng tiếc tiền mà hãy nâng cấp cho laptop 1 thanh RAM tối thiểu 4GB để máy hoạt động mượt mà hơn nhé.  - Để biết dung lượng RAM hiện tại của laptop, các bạn có thể làm theo cách sau: Click vào Start > Control Panel > System and Security > System.', 'Các phím cơ bản bao gồm: phím ký tự, phím dấu và phím số. Các phím ký tự là những chữ nằm trong bảng chữ cái Latinh. Dấu và số nằm cùng trên một phím. Mặc định của hệ thống khi gõ vào những phím này sẽ hiển thị số. Để sử dụng dấu, bạn cần nhấn tổ hợp phím Shift + phím dấu.  Phím chức năng: là các phím từ F1 đến F12 nằm ở vị trí trên cùng keyboard.  Phím đặc biệt bao gồm: Esc là phím hủy bỏ lệnh hoặc thoát khỏi một chương trình nào đó. Tab dùng để di chuyển dấu nháy, chuyển cột trong bảng tính. Caps Lock có tác dụng bật hoặc tắt chế độ viết in hoa (đèn sáng là bật, không sáng là tắt). Enter dùng khi cần xuống hàng trong văn bản hoặc chạy chương trình được chọn. Space Bar để tạo khoảng trắng giữa các từ. Ngoài ra còn các phím Backspace, Shift, Alt, Ctrl, Windows và Menu với một số chức năng tương ứng.  Phím điều khiển gồm: Insert, Delete, Home, End, Page Up, Page Down, phím mũi tên.');

-- --------------------------------------------------------

--
-- Table structure for table `thuonghieu`
--

CREATE TABLE `thuonghieu` (
  `idthuonghieu` int(200) NOT NULL,
  `tenthuonghieu` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `diachithuonghieu` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `thuonghieu`
--

INSERT INTO `thuonghieu` (`idthuonghieu`, `tenthuonghieu`, `email`, `diachithuonghieu`) VALUES
(1, 'Asus', 'AsusHCM@gmail.com', '75 Đường số 2, Khu Đô Thị Vạn Phúc, Phường Hiệp Bình Phước, Thành phố Thủ Đức, Thành phố Hồ Chí Minh'),
(2, 'Dell ', 'DellHCM@gmail.com', 'Tầng 14, Tòa nhà Golden King, 15 Nguyễn Lương Bằng, Phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh'),
(3, 'HP', 'HP@gmail.com', '872/13/31 Quang Trung, Phường 8, Quận Gò Vấp, Thành phố Hồ Chí Minh'),
(4, 'MSI', 'MSIHCM@gmai.com', '16-18-20-24/2 Thủ Khoa Huân, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh'),
(5, 'Lenovo', 'LenovoHoChiMinh@gmail.com', '87/44/26 Phan Văn Hớn, Phường Tân Thới Nhất, Quận 12, Thành phố Hồ Chí Minh'),
(6, 'Acer', 'AcerHaNoi@gmail.com', '97 HAO NAM, P.O CHO DUA, DONG DA, HA NOI'),
(7, 'Razer', 'Razer@gmail.com', '101 MAI HAC DE, BUI THI XUAN, H.B.T, HA NOI'),
(8, 'Samsung', 'SamSung@gmail.com', '24B LO DUC, PHAM DINH HO, HAI BA TRUNG, HA NOI '),
(9, 'Alienware', 'Alienware@gmail.com', '26 TUE TINH, BUI THI XUAN, HAI BA TRUNG, HA NOI '),
(10, 'Apple ', 'AppleHaNoi@gmail.com', 'SO19, TRAN QUOC HOAN, D.V.H, CAU GIAY, HA NOI'),
(11, 'Microsoft', 'Microsoft@gmail.com', '8C HOANG NGOC PHACH, LANG HA, DONG DA, HN '),
(12, 'fujitsu', 'fujitsu@gmail.com', '30 HANG BONG, HANG GAI, HOAN KIEM, HA NOI '),
(13, 'Avita', 'Avita@gmail.com', '6 NGACH 371/9 KIM MA, BA DINH, HA NOI'),
(14, 'Gigabyte', 'Gigabyte@gmail.com', 'Số 126 Đường 2, Phường Tăng Nhơn Phú B, Thành phố Thủ Đức, TP Hồ Chí Minh'),
(15, 'Chuwi', 'Chuwi@gmail.com', 'Số 126 Đường 2, Phường Tăng Nhơn Phú B, Thành phố Thủ Đức, TP Hồ Chí Minh'),
(16, 'Masstel', 'Masstel@gmail.com', '3A Điện Biên Phủ, , Phường 25, Quận Bình Thạnh, TP Hồ Chí Minh');

-- --------------------------------------------------------

--
-- Table structure for table `xuatxu`
--

CREATE TABLE `xuatxu` (
  `idxuatxu` int(11) NOT NULL,
  `noixuatxu` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `xuatxu`
--

INSERT INTO `xuatxu` (`idxuatxu`, `noixuatxu`) VALUES
(1, 'Việt Nam'),
(2, 'Trung Quốc'),
(3, 'Mỹ'),
(4, 'Hàn Quốc'),
(5, 'Nhật Bản'),
(6, 'Indonesia'),
(8, 'Ấn Độ'),
(9, 'Nga'),
(10, 'Brasil'),
(11, 'Argentina'),
(12, 'Kazakhstan'),
(13, 'Chile'),
(14, 'Đức');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`idtaikhoan`);

--
-- Indexes for table `danhmuc`
--
ALTER TABLE `danhmuc`
  ADD PRIMARY KEY (`iddanhmuc`);

--
-- Indexes for table `hinhanh`
--
ALTER TABLE `hinhanh`
  ADD PRIMARY KEY (`idhinhanh`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`idhoadon`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`idsanpham`);

--
-- Indexes for table `thuonghieu`
--
ALTER TABLE `thuonghieu`
  ADD PRIMARY KEY (`idthuonghieu`);

--
-- Indexes for table `xuatxu`
--
ALTER TABLE `xuatxu`
  ADD PRIMARY KEY (`idxuatxu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `idtaikhoan` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `danhmuc`
--
ALTER TABLE `danhmuc`
  MODIFY `iddanhmuc` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `hinhanh`
--
ALTER TABLE `hinhanh`
  MODIFY `idhinhanh` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `idhoadon` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `idsanpham` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `thuonghieu`
--
ALTER TABLE `thuonghieu`
  MODIFY `idthuonghieu` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `xuatxu`
--
ALTER TABLE `xuatxu`
  MODIFY `idxuatxu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
