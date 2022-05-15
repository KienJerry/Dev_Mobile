import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
//Screen
import Splash from './Splash';
import Signin from './Sign_in';
import Signpup from './Sign_up';
import OTP from './OTP';
import DrawerNa from '../App_Sale/Drawer_Navigation/StackNavigation';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signpup} />
      <Stack.Screen name="Drawer" component={DrawerNa} />
      <Stack.Screen name="OTP" component={OTP} />
    </Stack.Navigator>
  );
}