import React, { useState , useEffect } from 'react';
import { Text, View ,ToastAndroid ,TouchableOpacity ,StyleSheet ,Dimensions, Image, FlatList, Alert , Button} from 'react-native';
import axios from 'axios';
import Icon from "react-native-vector-icons/MaterialIcons";

const api = "http://192.168.178.113:3001/"
var deviceWidth = Dimensions.get('window').width * 0.5;
const UpdateAccount = ({route , navigation}) => {
    const [data , setData] = useState([]);
    const {taikhoan , khoa , phanquyen} = route.params;

//code lấy API account
  const getAccount = async() =>{
    axios.get(api + "dangnhap/" + taikhoan)
    .then(response => {
        setData(response.data)
    }).catch((error)=> {
        ToastAndroid.showWithGravity(
          "Lỗi ! Không thể kết nối",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
      })
  }

  useEffect(() => {
    getAccount();
  },[]);

  return (
    <View style={{ flex: 1 , backgroundColor: 'white'}}>
        <View style = {styles.container} >
            <Icon size={30} style = {{marginLeft: 10 ,  color: "orange"}} name="chevron-left" onPress={() => navigation.goBack()}/>
            <Text style = {{ fontSize: 20, fontWeight: "bold" , color: "orange"}}onPress={() => navigation.goBack()}>Cập nhật tài khoản</Text> 
            <Text style = {styles.xong}>XONG</Text>         
        </View>
        <View style={{backgroundColor: 'red' , width: '100%', height: deviceWidth }}>
            <Image style={{height: deviceWidth}} source={{ uri: api + "images/tom.jpg" }}></Image>
           <Image style={styles.avatar}
            source={{ uri: api + "images/girl.jpg" }}></Image>
        </View>
        
        <View style={{alignItems : "flex-end", margin :20 }}>
               {!khoa ? null : <Text style={styles.lock}>LOCK</Text>}
        </View>
        <View style={{marginTop: deviceWidth*0.3 , marginLeft: 20 , marginRight : 20}}>
          <FlatList data={data}
                    keyExtractor={item => item.idtaikhoan}
                    renderItem={({item, index}) =>(
                        <View style={{ alignItems : "center" }} key={index}>
                          <View style={{flexDirection:'row' ,alignItems : "baseline"}}>
                            <Text style={{fontSize: 25 , fontWeight:'bold' , color: 'black' , marginBottom : 10}}>{item.tennguoidung}</Text>
                            <TouchableOpacity onLongPress={() =>{ToastAndroid.showWithGravity(
                                                                  "Huy hiệu xác minh đặc quyền ADMIN",
                                                                  ToastAndroid.LONG,
                                                                  ToastAndroid.BOTTOM
                                                                )}}>
                              {!phanquyen ? null : <Image style={{width:20 , height:20 , marginLeft: 5}} 
                              source={{uri: api + "images/tick.png"}}></Image>}
                            </TouchableOpacity>
                          </View>
                           <Text style={{marginBottom : 10}}>{item.namsinh}</Text>
                           <Text style={{marginBottom : 10}}>Giới tính : {item.gioitinh}</Text>
                           <Text style={{marginBottom : 10}}>Địa Chỉ : {item.diachi}</Text>
                           <Text style={{marginBottom : 10}}>Số tiền trong tài khoản : <Text style={{color: 'blue'}}>{item.tien.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VNĐ</Text></Text>
                           <Text style={{marginBottom : 10}}>Thời gian đăng ký : {item.thoigiandangky}</Text>
                           <Text style={{marginBottom : 10}}>Tình trạng : 
                              {!khoa ? null : <Text style={{color:'red'}}>Khoá</Text>}
                              {khoa ? null : <Text> Bình thường</Text>}
                           </Text>
                        </View>
                    )} 
          />
        </View>
    </View>
  );
}

export default UpdateAccount;

const styles = StyleSheet.create({
    container: {
      height : 50,
      alignItems : "center",
      flexDirection: "row",
    },
    xong:{
      fontSize: 15, 
      fontWeight: "bold" , 
      color: "green" ,  
      position: 'absolute', 
      right: 10
    },
    avatar:{
        backgroundColor: 'white' , 
        width: deviceWidth , 
        height: deviceWidth * 1 , 
        marginLeft: 10 ,
        marginTop :-deviceWidth*0.5 , 
        borderRadius: deviceWidth ,
        borderColor: 'white' , 
        borderWidth: 7
    },
    lock:{
      flex:1 ,
      position: 'absolute', 
      right : 1 , 
      fontSize: 15 , 
      borderColor: 'red' , 
      borderWidth: 1 , 
      color: 'red' , 
      backgroundColor:'#ffc7c7',
      fontWeight:'bold',
      padding: 5
    },
})