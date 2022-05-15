import React , { useEffect, useRef }from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';


//srceen
import Category from '../Category/Categorys'
import Chat from '../Chat/Chats'
import More from '../More/Mores'
import Notification from '../Notification/Notifications'
import Product from '../Product/Products'

const Tab = createBottomTabNavigator();

export default function Tab_Sales() {
    return (
      <Tab.Navigator screenOptions={{tabBarActiveTintColor: 'orange' , headerShown: false  , tabBarStyle: {
        height: 60,
        position: 'absolute',
        bottom: 16,
        right: 16,
        left: 16,
        borderRadius: 16
      }, }}>
        <Tab.Screen name="Sản Phẩm" component={Product}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              ),
            }} 
        />
        <Tab.Screen name="Danh Mục" component={Category} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="th-large" color={color} size={size} />
              ),
            }}/>
        <Tab.Screen name="Chat" component={Chat} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="comments-o" color={color} size={size} />
              ),
            }}/>
        <Tab.Screen name="Thông Báo" component={Notification} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="bell-o" color={color} size={size} />
              ),
            }}/>
        <Tab.Screen name="Thêm" component={More} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="ellipsis-h" color={color} size={size} />
              ),
            }}/>
      </Tab.Navigator>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })