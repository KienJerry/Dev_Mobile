import React , {useState , useEffect} from 'react';
import { TextInput, View ,Image , StatusBar , StyleSheet , Text , FlatList , Dimensions, Animated } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import Icon from "react-native-vector-icons/MaterialIcons";
import Swiper from "react-native-swiper";

const api = "http://192.168.250.113:3001/"

let timer = () => {};
//Mục Giá Sốc Hôm nay
const MyTime = () => {
  const [CountDownTime, setCountDownTime] = useState(99);
  const [listProductHot , SetListProductHot] = useState([]);
  const [abcd , abc] = useState([]);

  const startTimer = () => {
      timer = setTimeout(async() => {
        //Reset Thời Gian
            const reset = () => {
              setCountDownTime(99);
            }
          
            //Check thời gian nhỏ hơn or bằng 0 
          if(CountDownTime <= 0){
              clearTimeout(timer);
              var RandomNumber = Math.floor(Math.random() * 5) + 1 ;
              try {
                const response = await fetch(api + "sanpham/" + RandomNumber);
                const json = await response.json();

                 // Kết quả giảm giá => Obj -> Mảng
                // for (let i = 0; i < json.length; i++) {
                //   const tinh_phan_tram = 100 - ([( json[i].giamoi / json[i].giacu ) * 100]) ;
                //   const obj = {
                //     abc: (tinh_phan_tram.toFixed(0)),
                //   }
                //   const array = {}
                //   Object.keys(obj).forEach((key) => {array[key] = [obj[key]]})
                //   console.log(array);
                // } 
                
                SetListProductHot((json));
              } catch (error) {
                console.error(error);
              }
              return reset();
          }
          setCountDownTime(CountDownTime-1);
      }, 1000)
   }

   useEffect(() => {
       startTimer();
       return () => clearTimeout(timer);
   });     
 

  return (
     <View style={styles.container}>
        <View style={styles.container_full}>
        <View style={styles.container_full_one}>
              <View style={{flex:3, flexDirection: 'row', width: "auto"}}>
                    <Image
                          style={{height : 20 , width : 20}}
                          source={require('../../../../image_folder/hot-sale.png')}
                    />
                  <Text style={styles.textthuonghieunoitieng}>Giá Sốc🔥Hôm nay <Text style={styles.thuonghieunoitiengxuatxu}>{CountDownTime}s</Text></Text> 
              </View>
              <View style={{flex : 1}}>
                    <Text style={styles.XemThemthuonghieunoitieng}>Xem Thêm</Text>
              </View>
        </View>
        <View style={{ flex : 1 , flexDirection: 'row',}}>
              <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={7}
                  data={listProductHot}
                  keyExtractor={item => item.idsanpham}
                  renderItem={({ item }) => (
                      <View style={styles.container_item_giasochomnay_slider}>
                        <View style={{marginLeft:10 , marginTop: 20}}>
                            <Image
                              style={{ width: 105, height: 70}}
                              source={{ uri: api + "images/" + item.img }}
                            />
                        </View>
                        <View style={styles.container_item_giasochomnay}>
                          <View style={{alignItems: "center" , marginTop : -30}}>
                             <Text style={styles.thuonghieunoitiengproducthot}>{item.giamoi.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}  ₫</Text>
                             <Text style={{fontWeight:'400', fontSize : 10, color : '#355ef5'}}>Còn lại : {item.soluongsanpham}</Text>
                          </View>
                        </View>
                      </View>
                  )}
            />  
          </View>
      </View>
     </View>
)}

// Screen
const Products = ({ navigation }) => {
  const [DanhMuc , SetDanhMuc] = useState([]);
  const [ListThuongHieu , SetListThuongHieu] = useState([]);
  const [ListProduct_one , SetListProduct_one] = useState([]);


// code gọi Danh Mục Sản Phẩm
  const getCategory = async () => {
    try {
      const response = await fetch(api + "danhmucsanphamidcha/");
      const json = await response.json();
      SetDanhMuc((json));
      // SetDanhMuc(DanhMuc.concat(json));// concat để gắn dữ liệu cũ của Danh Mục và dữ liệu mới Set Danh Mục
    } catch (error) {
      console.error(error);
    }
  };

// code gọi Danh Mục Sản Phẩm
  const ListProduct_category = async () => {
    try {
      const response = await fetch(api + "listsanpham/1");
      const json = await response.json();
      SetListThuongHieu((json));
    } catch (error) {
      console.error(error);
    }
  };

  //code gọi list Sản Phẩm
  const ListProduct = async () => {
    try {
      const response = await fetch(api + "sanpham/1");
      const json = await response.json();
      SetListProduct_one((json));
    } catch (error) {
      console.error(error);
    }
  };


  //Slider Image
  const image_lider = [
    api + 'images/slider1.png',
    api + 'images/slider2.jpg',
    api + 'images/slider3.png',
    api + 'images/slider4.png',
    api + 'images/slider5.png',
    api + 'images/slider6.jpg',
    api + 'images/slider7.jpg',
    api + 'images/slider8.jpg',
    api + 'images/slider9.png',
    api + 'images/slider10.png',
  ];

  //Slider Thương hiệu
  const slider_trademark = [
    api + 'images/thuonghieu1.png',
    api + 'images/thuonghieu2.png',
    api + 'images/thuonghieu3.png',
    api + 'images/thuonghieu4.png',
    api + 'images/thuonghieu5.png',
    api + 'images/thuonghieu6.png',
    api + 'images/thuonghieu7.png',
    api + 'images/thuonghieu8.png',
    api + 'images/thuonghieu9.png',
    api + 'images/thuonghieu10.png',
  ];

   //Image HomNayCoGiHot
   const image_Today = [
    api + 'images/homnaycogihot1.png',
    api + 'images/homnaycogihot2.png',
  ];

  useEffect(() => {
    getCategory();
    ListProduct_category();
    ListProduct();
  }, []);

  return (
    <View style={{alignItems: "center" }}>

      <View style={styles.toplogo}>
        <View style={styles.topsearch}>
          <Icon name="search" size={30} color ="orange"></Icon>
          <TextInput
            style={styles.input}
            placeholder="Tìm Kiếm trên Sales & Social"
            placeholderTextColor={'#f6ce79'}
          />       
        </View>
        <View style={{justifyContent: "center", alignItems: "flex-end"}}>
          <Icon onPress={() => navigation.navigate("Cart")} name="add-shopping-cart" size={30} color ="white"></Icon>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollViewDanhMuc}>
          <View style={{marginTop: 15 , width:'90%' }}>
              <FlatList         
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={DanhMuc}
                    keyExtractor={item => item.tendanhmuc}
                    renderItem={({ item ,index}) => (
                      <Text style={styles.textscrollViewDanhMuc} key ={index}>
                      {item.tendanhmuc}
                  </Text>
                    )}
              />  
          </View>
          <Icon name="grid-view" size={25} color ="white"></Icon>
        </View>
        <View style={{ width: '100%' , height : 150}}>
          <Swiper autoplay
                  showsPagination={true}
                  paginationStyle={{ left: null,}}>
              {image_lider.map((s , index) => 
                  <Image
                      key={index}
                      style={styles.image}
                      source={{
                        uri: s,
                      }}
                  /> )}
          </Swiper>
        </View>

        <View style={styles.thuonghieunoitieng}>
            <View style={styles.thuonghieunoitieng_container}>
               <View style={{flex:3, flexDirection: 'row', width: "auto"}}>
                    <Image
                          style={{height : 20 , width : 20}}
                          source={require('../../../../image_folder/trademark.png')}
                    />
                   <Text style={styles.textthuonghieunoitieng}>Thương Hiệu Nổi Tiếng</Text> 
               </View>
               <View style={{flex : 1}}>
                    <Text style={styles.XemThemthuonghieunoitieng}>Xem Thêm</Text>
               </View>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", borderRadius : 100}}>
              <View style={{ width: '90%' , height : 80 , borderRadius : 100 }}>
                <Swiper showsPagination={false}
                        paginationStyle={{ left: null,}}>
                    {slider_trademark.map((s , index) => 
                        <Image
                            key={index}
                            style={styles.image1}
                            source={{
                              uri: s,
                            }}
                        /> )}
                </Swiper>
              </View>
            </View>
            <View style={{ flex : 1 , flexDirection: 'row'}}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    initialNumToRender={7}
                    data={ListThuongHieu}
                    keyExtractor={item => item.idsanpham}
                    renderItem={({ item }) => (
                        <View style={{elevation: 3 , width : 120 , margin : 10 , borderRadius : 5}}>
                          <View style={{marginLeft:10 , marginTop: 20}}>
                              <Image
                                style={{ width: 105, height: 70}}
                                source={{ uri: api + "images/" + item.img }}
                              />
                          </View>
                          <View style={{flex: 1 , width:'90%' , marginLeft:'5%' , backgroundColor:'#f3fdfc' , borderTopLeftRadius: 40, borderTopRightRadius:40 , marginTop : 25}}>
                            <View style={{alignItems: "center" , marginTop : -10}}>
                               <Text style={{fontWeight:'800', fontSize : 18, color : '#484848'}}>{item.idthuonghieu}</Text>
                               <Text style={styles.thuonghieunoitiengxuatxu}>{item.xuatxuthuonghieu}</Text>
                            </View>
                          </View>
                        </View>
                    )}
              />  
            </View>
        </View>
    
        <MyTime/>

        <View style={styles.hom_nay_co_gi_hot}>
            <View style={{ height:40, alignItems: "center", paddingStart : 10 , flexDirection: 'row'}}>
                <View style={{flex:3, flexDirection: 'row', width: "auto"}}>
                    <Text style={styles.texthomnaycogihot}>Hôm nay có gì hot</Text> 
                </View>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", borderRadius : 100}}>
              <View style={{ width: '90%' , height : 80 , borderRadius : 100 }}>
                <Swiper showsPagination={false}
                        paginationStyle={{ left: null,}}>
                    {slider_trademark.map((s , index) => 
                        <Image
                            key={index}
                            style={styles.image1}
                            source={{
                              uri: s,
                            }}
                        /> )}
                </Swiper>
              </View>
              <View style={{ width : '90%', height: 100, margin : 10 , flexDirection: 'row',}}>
                    {image_Today.map((s , index) => 
                        <Image
                            key={index}
                            style={styles.image2}
                            source={{
                              uri: s,
                            }}
                        /> )}
              </View>
            </View>
        </View>

        <View style={styles.goi_y_hom_nay}>
          {/* Tạm thời chưa update sliverappbar react native */}
            <View style={styles.goi_y_hom_nay_container}> 
                <View style={{flex:3, flexDirection: 'row', width: "auto"}}>
                    <Image
                          style={{height : 20 , width : 20}}
                          source={require('../../../../image_folder/delivery.png')}
                    />
                   <Text style={styles.texthomnaycogihot}>Gợi ý hôm nay 🆘</Text> 
                </View>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", borderRadius : 100}}>
              <View style={[{ width: '96%' , height : 50 , flexDirection: 'row', backgroundColor: '#ffe9e9' }]}>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    <View style={styles.styles_danh_cho_ban}>
                            <View style={{width: 16 , height: 16 }}>
                                <Image
                                  style={{flex : 1}}
                                  source={require('../../../../image_folder/add-user.png')}
                                />
                            </View>
                            <Text style={styles.texthomnaycogihot_three}>Dành Cho Bạn</Text>
                    </View>
                    <View style={styles.styles_deal_sieu_hot}>
                            <View style={{width: 16 , height: 16 }}>
                                <Image
                                  style={{flex : 1}}
                                  source={require('../../../../image_folder/fire.png')}
                                />
                            </View>
                            <Text style={styles.texthomnaycogihot_three}>Deal Siêu Hot</Text>
                    </View>
                    <View style={styles.styles_mua_1_tang_nhieu}>
                            <View style={{width: 16 , height: 16 }}>
                                <Image
                                  style={{flex : 1}}
                                  source={require('../../../../image_folder/promotional-items.png')}
                                />
                            </View>
                            <Text style={styles.texthomnaycogihot_three}>Mua 1 tặng nhiều</Text>
                    </View>
                    <View style={styles.styles_re_vo_doi}>
                            <View style={{width: 16 , height: 16 }}>
                                <Image
                                  style={{flex : 1}}
                                  source={require('../../../../image_folder/saving.png')}
                                />
                            </View>
                            <Text style={styles.texthomnaycogihot_three}>Rẻ vô đối</Text>
                    </View>
                    <View style={styles.styles_san_sale}>
                            <View style={{width: 16 , height: 16 }}>
                                <Image
                                  style={{flex : 1}}
                                  source={require('../../../../image_folder/sales.png')}
                                />
                            </View>
                            <Text style={styles.texthomnaycogihot_three}>Săn Sale</Text>
                    </View>
                    <View style={styles.styles_deal_sieu_hot}>
                            <View style={{width: 16 , height: 16 }}>
                                <Image
                                  style={{flex : 1}}
                                  source={require('../../../../image_folder/new.png')}
                                />
                            </View>
                            <Text style={styles.texthomnaycogihot_three}>Hàng mới</Text>
                    </View>
                </ScrollView>
              </View>
            </View>
              <ScrollView>
                  <View style={{flex : 1 , marginTop: 5}}>
                        <FlatList 
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                data={ListProduct_one}
                                keyExtractor={item => item.idsanpham}
                                renderItem={({ item }) => (
                                    <View style={{width: '49%' , height : 150 , backgroundColor:'white', margin :1 ,alignItems: "center",}}>
                                          <View style={{ marginTop: 5}}>
                                              <Image
                                                style={{ width: 105 , height: 70}}
                                                source={{ uri: api + "images/" + item.img }}
                                              />
                                          </View>
                                    </View>
                                )}
                          />  
                  </View>
              </ScrollView>
           </View>
        

        <View style={styles.bottom}></View>
      </ScrollView>

      <StatusBar backgroundColor="orange"/>
    </View>
  );
}

export default Products;
const styles = StyleSheet.create({
  toplogo:{
    backgroundColor:'orange',
    flexDirection: 'row',
    width:'100%',
    padding : 10
  },
  topsearch:{
    marginStart : 5,
    marginEnd : 10 ,
    borderRadius: 5,
    flexDirection: 'row',   
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor : 'white',
  },
  input: {
    height: 40,
    width: '80%',
    color : 'orange',
  },
  image: {
    width: '100%',
    flex: 1,
  },
  image1: {
    width: '100%',
    flex: 1,
    borderRadius : 20
  },
  scrollViewDanhMuc:{
    height:50 ,
    flexDirection: 'row',
    backgroundColor :'orange',
    alignItems: "center", 
  },
  textscrollViewDanhMuc:{
    color: 'white',
    marginStart : 15,
    marginEnd : 15,
    fontWeight: "bold"
  },
  thuonghieunoitieng:{
    backgroundColor: 'white', 
    height : 320,
    marginTop : 10,
  },
  textthuonghieunoitieng:{
    fontWeight: "normal",
    fontSize : 15,
    color : 'black',
    marginStart: 10 ,
    fontFamily :'Cochin',
    width: '60%',
  },
  XemThemthuonghieunoitieng:{
    fontWeight: 'bold',
    fontSize : 13,
    color : '#355ef5',
    fontFamily :'Cochin',
  },
  thuonghieunoitiengxuatxu:{
    fontWeight:'400', 
    fontSize : 15, 
    color : 'red', 
    borderWidth: 1.5, 
    paddingLeft : 10, 
    paddingRight : 10 , 
    borderColor: 'red', 
    marginTop: 10 , 
    backgroundColor:'#ffe3e3',
    elevation: 8
  },
  thuonghieunoitiengproducthot:{
    fontWeight:'400', 
    fontSize : 15, 
    color : 'red', 
    marginTop: 10 , 
    elevation: 8
  },
  bottom:{
    backgroundColor:'#ffe49f' , 
    width: '100%', 
    height: 125 , 
    marginTop : 15,
    borderTopLeftRadius: 90 , 
    borderTopRightRadius: 90 
  },
  hom_nay_co_gi_hot:{
    flex : 1 , 
    height : 250 , 
    backgroundColor : 'white' , 
    marginTop : 10
  },
  texthomnaycogihot:{
    fontWeight:'bold',
    fontSize : 17,
    color : '#5b5b5b',
    marginStart: 10 ,
    fontFamily :'Cochin',
    width: '60%',
  },
  image2: {
    width: '100%',
    flex: 1,
    margin : 5
  },
  goi_y_hom_nay:{
    flex : 1 ,
    marginTop : 10
  },
  container_full:{
    backgroundColor:'white' , 
    width: '100%', 
    height: 200 , 
    marginTop : 10
  },
  container_full_one:{
    height:40, 
    alignItems: "center", 
    paddingStart : 10 , 
    flexDirection: 'row'
  },
  container_item_giasochomnay:{
    flex: 1, 
    width:'90%' , 
    marginLeft:'5%', 
    backgroundColor:'#fff8e9' , 
    borderTopLeftRadius: 40, 
    borderTopRightRadius:40 , 
    marginTop : 25
  },
  container_item_giasochomnay_slider:{
    elevation: 3 , 
    width : 120 , 
    margin : 10 , 
    borderRadius : 5
  },
  thuonghieunoitieng_container:{
    height:40, 
    alignItems: "center", 
    paddingStart : 10 , 
    flexDirection: 'row'
  },
  goi_y_hom_nay_container:{
    height:40, 
    alignItems: "center", 
    paddingStart : 10 , 
    flexDirection: 'row'
  },
  texthomnaycogihot_one:{
    fontWeight:'bold',
    fontSize : 8,
    color : '#5de6fe',
    marginTop: 5
  },
  texthomnaycogihot_two:{
    fontWeight:'bold',
    fontSize : 8,
    color : 'orange',
    marginTop: 5
  },
  texthomnaycogihot_three:{
    fontWeight:'bold',
    fontSize : 8,
    color : 'black',
    marginTop: 5
  },
  texthomnaycogihot_for:{
    fontWeight:'bold',
    fontSize : 8,
    color : '#015b67',
    marginTop: 5
  },
  texthomnaycogihot_five:{
    fontWeight:'bold',
    fontSize : 8,
    color : '#a252b9',
    marginTop: 5
  },
  styles_danh_cho_ban:{
    height : '100%' , 
    width : 80 , 
    backgroundColor :'#f7feff' , 
    borderRadius : 5 , 
    borderColor : '#5de6fe' , 
    borderWidth: 1 , 
    alignItems: 'center' ,
    justifyContent : 'center' 
  },
  styles_deal_sieu_hot:{
    height : '100%' , 
    width : 80 , 
    backgroundColor :'#fffaeb' , 
    marginLeft : 2 , 
    borderRadius : 5 , 
    borderColor : 'orange' , 
    borderWidth: 1 , 
    alignItems: 'center' ,
    justifyContent : 'center' 
  },
  styles_hangmoi:{
    height : '100%' , 
    width : 80 , 
    backgroundColor :'fffaeb' , 
    marginLeft : 2 , 
    borderRadius : 5 , 
    borderColor : 'yellow' , 
    borderWidth: 1 , 
    alignItems: 'center' ,
    justifyContent : 'center' 
  },
  styles_mua_1_tang_nhieu:{
    height : '100%' , 
    width : 80 , 
    backgroundColor :'#f7feff' , 
    marginLeft : 2 , 
    borderRadius : 5 , 
    borderColor : 'black' , 
    borderWidth: 1 , 
    alignItems: 'center' ,
    justifyContent : 'center' 
  },
  styles_san_sale:{
    height : '100%' , 
    width : 80 , 
    backgroundColor :'#f7feff' ,
    marginLeft : 2 , 
    borderRadius : 5 , 
    borderColor : '#a252b9' , 
    borderWidth: 1 , 
    alignItems: 'center' ,
    justifyContent : 'center' 
  },
  styles_re_vo_doi:{
    height : '100%' , 
    width : 80 , 
    backgroundColor :'#fffaeb' , 
    marginLeft : 2 , 
    borderRadius : 5 , 
    borderColor : '#0a7c89' , 
    borderWidth: 1 , 
    alignItems: 'center' ,
    justifyContent : 'center'
  }
  

})