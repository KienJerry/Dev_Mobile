import * as React from 'react';
import {StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
//Screen
import Sales from '../Sale_And_Social/Sales/Product/Stack'
import Social from '../Sale_And_Social/Social/Home'


const Drawer = createDrawerNavigator();
export default function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Sale" component={Sales} />
      <Drawer.Screen name="Socials" component={Social} />
    </Drawer.Navigator>
    
  );
}

