import React, {useState} from 'react';
import { Image, View , StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const YourApp = ({ navigation }) => {
  setTimeout(() => {
    //Check lưu tài khoản
    const tokenlogin = async() => {
      const value = await AsyncStorage.getItem('luutaikhoan')
      if (value !== null) {
          navigation.navigate('Drawer')  
      }else{
        navigation.navigate('Signin')
      }
    }
    tokenlogin();
}, 1500);  //Chuyển sang màn hình khác sau 1.5s



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