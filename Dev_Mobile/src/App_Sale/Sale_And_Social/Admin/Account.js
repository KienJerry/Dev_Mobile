import React , {useEffect , useState} from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios'

const api = "http://10.22.200.232:3001/"
const Account = () => {
  const [account , setAccount] = useState([]);
  const [text , settext] = useState("Chưa cập nhật");
  const [hideName , setHideName] = useState({
    text : '',
    tennguoidung : true,
  })
    //Code gọi list Thương Hiệu
    const getTrademark = async() => {
      axios.get(api + "list-account")
      .then(response => {
          setAccount(response.data)
          // const Data = response.data
          // C = A.map( (id, index) => ( { id, value: B[index] } ) )
          // const tennguoidung = Data.map((id) => (id.tennguoidung))
      }).catch((error)=> {
        ToastAndroid.showWithGravity(
          "Lỗi ! Không thể kết nối",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
      })
    }

    useEffect(() => {
      getTrademark();
    },[])
  
  return (
    <View style={{flex: 1 ,alignItems: 'center',}}>
      <View style={styles.background}>
        <FlatList data={account}
                  keyExtractor={item => item.idtaikhoan}
                  renderItem={({item, index}) =>(
                    <View key={index} style={styles.flatlist} >
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color:'black'}}>Tên người dùng:
                            {item.tennguoidung ? null : <Text style={{color: '#ff3c3c' , textDecorationLine: 'underline' , fontSize:13}}> Chưa cập nhật</Text>}                   
                            {!item.tennguoidung ? null : <Text style={{color: '#0d00ff' , fontWeight:'bold'}}> {item.tennguoidung}</Text>}                   
                        </Text>
                        {!item.phanquyen ? null : <Text style={{flex:1 ,position: 'absolute', right : 1 , fontSize: 10 , borderColor: 'red' , borderWidth: 1 , color: 'red' , backgroundColor:'#ffc7c7'}}>ADMIN</Text>}
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color:'black'}}>Tài Khoản : <Text style={{color: '#0d00ff', fontWeight:'bold'}}>{item.taikhoan}</Text></Text>
                        {!item.khoa ? null : <Text style={{flex:1 ,position: 'absolute', right :1 , fontSize: 10 , borderColor: '#0000ff' , borderWidth: 1 , color: '#0000ff' , backgroundColor:'#ffa3ff'}}>LOCK</Text>}
                      </View>
                      <Text style={{color:'black'}}>Năm Sinh:
                          {item.namsinh ? null : <Text style={{color: '#ff3c3c' , textDecorationLine: 'underline' , fontSize:13}}> Chưa cập nhật</Text>}                   
                          {!item.namsinh ? null : <Text style={{color: '#0d00ff' , fontWeight:'bold'}}> {item.namsinh}</Text>}                   
                      </Text>
                      <Text style={{color:'black'}}>Giới Tính:
                          {item.gioitinh ? null : <Text style={{color: '#ff3c3c' , textDecorationLine: 'underline' , fontSize:13}}> Chưa cập nhật</Text>}                   
                          {!item.gioitinh ? null : <Text style={{color: '#0d00ff' , fontWeight:'bold'}}> {item.gioitinh}</Text>}                   
                      </Text>
                      <Text style={{color:'black'}}>Địa Chỉ:
                          {item.diachi ? null : <Text style={{color: '#ff3c3c' , textDecorationLine: 'underline' , fontSize:13}}> Chưa cập nhật</Text>}                   
                          {!item.diachi ? null : <Text style={{color: '#0d00ff' , fontWeight:'bold'}}> {item.diachi}</Text>}                   
                      </Text>
                      <Text style={{color:'black'}}>Thời gian đăng nhập gần đây nhất:
                          {item.thoigiandangnhap ? null : <Text style={{color: '#ff3c3c' , textDecorationLine: 'underline' , fontSize:13}}> Chưa cập nhật</Text>}                   
                          {!item.thoigiandangnhap ? null : <Text style={{color: '#0d00ff' , fontWeight:'bold'}}> {item.thoigiandangnhap}</Text>}                   
                      </Text>
                      <Text style={{color:'black'}}>Thời gian đăng ký: <Text style={{color: '#0d00ff', fontWeight:'bold'}}>{item.thoigiandangky}</Text></Text>
                    </View>
                  )} 
        />
      </View>
    </View>
  );
}

export default Account;

const styles = StyleSheet.create({
  flatlist:{
    marginBottom: 3 , 
    borderWidth : 1 , 
    backgroundColor: 'white',
    padding: 5
  },
  background:{
    width: '98%',
    top : 1,
    marginTop : 10
   },
})