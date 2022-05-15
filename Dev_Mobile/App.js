import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

//Screen 
import StackLogin from './src/Login/Stack_Login'

export default function App() {
  return (
    <NavigationContainer>
      <StackLogin/>
    </NavigationContainer>
  );
}
