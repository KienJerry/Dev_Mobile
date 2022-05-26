import React, { useState , useEffect } from 'react';
import { Text, View ,ToastAndroid ,TouchableOpacity ,StyleSheet ,Dimensions, Image } from 'react-native';
import axios from 'axios';
import Icon from "react-native-vector-icons/MaterialIcons";

const api = "http://192.168.178.113:3001/"
var deviceWidth = Dimensions.get('window').width * 0.5;
const UpdateAccount = ({route , navigation}) => {
    const [data , setData] = useState([]);
    const {taikhoan} = route.params;

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
    <View style={{ flex: 1}}>
        <View style = {styles.container} >
            <Icon size={30} style = {{marginLeft: 10 ,  color: "orange"}} name="chevron-left" onPress={() => navigation.goBack()}/>
            <Text style = {{ fontSize: 20, fontWeight: "bold" , color: "orange"}}onPress={() => navigation.goBack()}>Cập nhật tài khoản</Text> 
            <Text style = {{ fontSize: 15, fontWeight: "bold" , color: "green" ,  position: 'absolute', right: 10}}>XONG</Text>         
        </View>
        <View style={{backgroundColor: 'red' , width: '100%', height: deviceWidth }}>
            <Image style={{height: deviceWidth}} source={{ uri: api + "images/girl.jpg" }}></Image>
           <Image style={{backgroundColor: 'white' , width: deviceWidth , height: deviceWidth * 1 , marginLeft: 10 ,marginTop :-deviceWidth*0.5 , borderRadius: deviceWidth }}
            source={{ uri: api + "images/Logo_orange.png" }}></Image>
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
})