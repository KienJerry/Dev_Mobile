import React from 'react';
import { Text, View, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Admin = ({navigation}) => {

  const logout = async() => {
    await AsyncStorage.removeItem('luutaikhoanAdmin');
    navigation.navigate('SignIn');
}
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Thêm (User)! 🎉
      </Text>
      <TouchableOpacity>
         <Text onPress={logout} >Đăng Xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Admin;