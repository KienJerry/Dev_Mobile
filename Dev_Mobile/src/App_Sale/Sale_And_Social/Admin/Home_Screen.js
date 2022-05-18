import React from 'react';
import { Text, View , StatusBar , StyleSheet , TouchableOpacity , Image , FlatList} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

const api = "http://10.22.196.167:3001/"
const Home_Admin = ({ navigation }) => {
  const Data =[
    {
      id : 1,
      name : 'Sản Phẩm',
      img : api + "images/1.png",
      stack : 'Product'
    },
    {
      id : 2,
      name : 'Danh Mục',
      img : api + "images/2.png",
      stack : 'Category'
    },
    {
      id : 3,
      name : 'Thương Hiệu',
      img : api + "images/5.png",
      stack : 'Trademark'
    },
    {
      id : 4,
      name : 'Xuất Xứ',
      img : api + "images/3.png",
      stack : 'Origin'
    },
    {
      id : 5,
      name : 'Tài Khoản',
      img : api + "images/8.png",
      stack : 'Account'
    },
    {
      id : 6,
      name : 'Thông báo',
      img : api + "images/7.png",
      stack : 'Notification'
    },
    {
      id : 7,
      name : 'Tin nhắn',
      img : api + "images/6.png",
      stack : 'Chat'
    }
  ]
  return (
    <View style={{ flex: 1}}>
      <View style={styles.topMenu}>
        <View style={styles.TopIcon}>
          <Icon onPress={() => navigation.openDrawer()} name="menu" size={30} color ="orange"></Icon>   
          <Text onPress={() => navigation.openDrawer()} style={styles.TopInput}>Admin</Text>
        </View>
      </View>

      <FlatList
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  data={Data}
                  keyExtractor={item => item.id}
                  renderItem={({ item ,index}) => (
                    <TouchableOpacity style={styles.mid_bgr} onPress={() => navigation.navigate(item.stack)}>
                          <View style={{flexDirection: 'row',}} key ={index}>                        
                              <Image
                                      style={{height : 25 , width : 25 , marginStart: 10 , marginEnd: 10}}
                                      source={{ uri: item.img }}
                                />
                              <Text style={{color : 'black' , fontWeight:'400', fontSize:15 }}>{item.name}</Text>                    
                          </View>
                    </TouchableOpacity>
                
                  )}
            />
      <StatusBar
        backgroundColor="orange"/>
    </View>
  );
}

export default Home_Admin;

const styles = StyleSheet.create({
  topMenu:{
    backgroundColor:'white',
    flexDirection: 'row',
    width:'100%',
    padding : 10
  },
  TopIcon:{
    marginStart : 5,
    marginEnd : 10 ,
    borderRadius: 5,
    flexDirection: 'row',   
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor : 'white',
  },
  TopInput: {
    marginStart : 10 , 
    fontSize:20 , 
    fontWeight:'bold' , 
    color: 'orange'
  },
  mid_bgr:{
    alignItems: "center", 
    justifyContent: "center", 
    width: '50%' , height: 50 , 
    backgroundColor: 'white' , 
    borderColor: 'orange' , 
    borderTopEndRadius : 50 , 
    borderBottomStartRadius: 50 , 
    borderWidth :1 , 
    marginTop: 5 , 
    marginBottom : 10
  }
})