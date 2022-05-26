import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
//Screen
import HomeScreen from './Home_Screen'
import Account from './Account'
import Product from './Product'
import Notification from './Notification'
import Trademark from './Trademark'
import Category from './Category'
import Origin from './Origin'
import Chat from './Chat'
import Admin from './Admin'
import AddCategory from './Add_Full_Screen/Add_Category'
import UpdateAccount from './Add_Full_Screen/Update_Account'

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen}  options={{title: 'Trang Home' , headerShown : false}}/>
      <Stack.Screen name="Account" component={Account}  options={{title: 'Quản lý tài khoản', headerTintColor :'orange'}}/>
      <Stack.Screen name="Product" component={Product}  options={{title: 'Quản lý Sản Phẩm', headerTintColor :'orange'}}/>
      <Stack.Screen name="Notification" component={Notification}  options={{title: 'Quản lý Thông báo', headerTintColor :'orange'}}/>
      <Stack.Screen name="Category" component={Category}  options={{title: 'Quản lý Danh Mục', headerTintColor :'orange'}}/>
      <Stack.Screen name="Trademark" component={Trademark}  options={{title: 'Quản lý Thương Hiệu', headerTintColor :'orange'}}/>
      <Stack.Screen name="Chat" component={Chat}  options={{title: 'Tin Nhắn', headerTintColor :'orange'}}/>
      <Stack.Screen name="Origin" component={Origin}  options={{title: 'Quản Lý Xuất Xứ', headerTintColor :'orange'}}/>
      <Stack.Screen name="Admin" component={Admin}  options={{title: 'Trang Admin', headerTintColor :'orange'}}/>
      <Stack.Screen name="AddCategory" component={AddCategory}  options={{headerShown : false}}/>
      <Stack.Screen name="UpdateAccount" component={UpdateAccount}  options={{headerShown : false}}/>
    </Stack.Navigator>
  );
}