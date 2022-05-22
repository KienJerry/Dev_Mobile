import React, { useState } from 'react';
import { Text, View ,StyleSheet, TouchableOpacity , TextInput} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

const ThuongHieu = () => {
  const [hideSearch , setHideSearch] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.background}>
        <View style={styles.background_top}>
          <TouchableOpacity onPress={() => setHideSearch(!hideSearch)}>
            <Text style={styles.Text_List_Trademark}>Danh Sách Thương Hiệu</Text>  
          </TouchableOpacity> 
          {hideSearch ? ( 
            <View style ={{flexDirection: 'row' ,alignItems: "center" , width: '90%'}}>
                <TextInput placeholder="Tìm Kiếm ..." style={styles.TextSearch} ></TextInput>
                <Icon style={{flex : 1}} name="search" size={25} color ="black" ></Icon>
            </View>
          ) : null}  
          {!hideSearch ? (    
            <View style={{ fontWeight: 'bold', position: 'absolute' , right : 5}}>
              <TouchableOpacity onPress={() => setHideSearch(!hideSearch)}>
                  <Icon name="search" size={25} color ="black"></Icon>
              </TouchableOpacity>             
            </View>
          ) : null} 
        </View>
      </View>
      <TouchableOpacity  style={styles.btn_add}>
        <Icon name='add' size={30} color='orange' />
      </TouchableOpacity>
    </View>
  );
}

export default ThuongHieu;

const styles = StyleSheet.create({
  btn_add:{
    borderWidth: 1,
    borderColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
   },
   background:{
    width: '98%',
    top : 1,
    position: 'absolute',
   },
   background_top:{
    height: 50 , 
    width : '100%' ,
    alignItems: "center" ,
    flexDirection: 'row'
   },
   Text_List_Trademark:{
    marginLeft: 10 , 
    fontSize:16 , 
    fontWeight: 'bold',
   },
   TextSearch:{
    backgroundColor: 'white',
    flex: 1, 
    margin : 5 , 
    borderRadius: 5, 
    borderWidth : 1 
  }
})