import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
//Screen
import Stack_Admin from '../Sale_And_Social/Admin/Stack_Admin';


const Drawer = createDrawerNavigator();
export default function MyDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="Home_Admin" component={Stack_Admin} options={{title: 'Admin', headerTintColor :'orange' , headerShown: false}} />
    </Drawer.Navigator>
    
  );
}

