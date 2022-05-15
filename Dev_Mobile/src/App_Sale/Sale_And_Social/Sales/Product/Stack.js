import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
//Screen
import Tab from '../Tab_bottom/Tab_Sale'
import Cart from './Carts';

const Stack = createStackNavigator();

export default function StackProduct() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Tab" component={Tab} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}