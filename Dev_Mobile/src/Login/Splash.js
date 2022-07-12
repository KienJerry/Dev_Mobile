import React from 'react';
import { Image, View , StatusBar , LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ignoreWarnings  from 'ignore-warnings';
import axios from 'axios';

const api = "http://10.22.211.7:3001/"
const YourApp = ({ navigation }) => {
    
  setTimeout(() => {
    //Check lưu tài khoản
    const tokenlogin = async() => {

      //API 
      await AsyncStorage.setItem("local_API", api);

      const value = await AsyncStorage.getItem('luutaikhoan')
      const valueAdmin = await AsyncStorage.getItem('luutaikhoanAdmin')
      const time = new Date().toLocaleTimeString();
      const date = new Date().toLocaleDateString();
      if (value !== null) {
        //hàm cập nhật thời gian đăng nhập gần nhất
          axios.post( api + "new-login/", {
            datetime: date + ' ' + time,
            taikhoan: value
          })
          .catch(error => console.log('Lỗi không có kết nối mạng' + error));
          navigation.navigate('Drawer')  
          return;
      }if (valueAdmin !== null) {
        //hàm cập nhật thời gian đăng nhập gần nhất
        axios.post( api + "new-login/", {
          datetime: date + ' ' + time,
          taikhoan: valueAdmin
        })
        .catch(error => console.log('Lỗi không có kết nối mạng' + error));
          navigation.navigate('Admin')  
          return;
      }else{
        navigation.navigate('Signin')
      }
    }
    tokenlogin();
}, 1500);  //Chuyển sang màn hình khác sau 1.5s

//Fix warning ViewPropTypes bị xoá khỏi react-native :)) Mặc dù chưa install lần nào 
ignoreWarnings('warn',['ViewPropTypes','[react-native-gesture-handler]'])
LogBox.ignoreLogs([
    'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
    'NativeBase: The contrast ratio of',
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , backgroundColor  : 'orange' }}>
      <Image style={{width: '100%' , height: '30%'}}
              source={require('../image_folder/Logo.png')}
      ></Image>
      <StatusBar
        backgroundColor="orange"/>
    </View>
  );
}

export default YourApp;