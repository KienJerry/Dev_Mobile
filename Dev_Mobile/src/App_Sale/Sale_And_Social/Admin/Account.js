import React , {useEffect , useState ,useCallback} from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios'

const api = "http://192.168.178.113:3001/"
const Account = ({navigation}) => {
  const [account , setAccount] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

    //Code gọi list Thương Hiệu
    const getAccount = async() => {
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

      // Code Refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  //Get lại API Xuất xứ
  const wait = (timeout) => {
    getAccount();
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

    useEffect(() => {
      getAccount();
    },[])
  
  return (
    <View style={{flex: 1 ,alignItems: 'center',}}>
      <View style={styles.background}>
        <FlatList data={account}
                  keyExtractor={item => item.idtaikhoan}
                  refreshControl ={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}/>
                  }
                  renderItem={({item, index}) =>(
                    <TouchableOpacity onPress={() => navigation.navigate("UpdateAccount", {
                      taikhoan : item.taikhoan
                    })}>
                      <View key={index} style={styles.flatlist} >
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{color:'black'}}>Tên người dùng:
                              {item.tennguoidung ? null : <Text style={styles.update}> Chưa cập nhật</Text>}                   
                              {!item.tennguoidung ? null : <Text style={{color: '#0d00ff' , fontWeight:'bold'}}> {item.tennguoidung}</Text>}                   
                          </Text>
                          {!item.phanquyen ? null : <Text style={styles.text}>ADMIN</Text>}
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{color:'black'}}>Tài Khoản : <Text style={{color: '#0d00ff', fontWeight:'bold'}}>{item.taikhoan}</Text></Text>
                          {!item.khoa ? null : <Text style={styles.lock}>LOCK</Text>}
                        </View>
                        <Text style={{color:'black'}}>Năm Sinh:
                            {item.namsinh ? null : <Text style={styles.update}> Chưa cập nhật</Text>}                   
                            {!item.namsinh ? null : <Text style={{color: '#0d00ff' , fontWeight:'bold'}}> {item.namsinh}</Text>}                   
                        </Text>
                        <Text style={{color:'black'}}>Giới Tính:
                            {item.gioitinh ? null : <Text style={styles.update}> Chưa cập nhật</Text>}                   
                            {!item.gioitinh ? null : <Text style={{color: '#0d00ff' , fontWeight:'bold'}}> {item.gioitinh}</Text>}                   
                        </Text>
                        <Text style={{color:'black'}}>Địa Chỉ:
                            {item.diachi ? null : <Text style={styles.update}> Chưa cập nhật</Text>}                   
                            {!item.diachi ? null : <Text style={{color: '#0d00ff' , fontWeight:'bold'}}> {item.diachi}</Text>}                   
                        </Text>
                        <Text style={{color:'black'}}>Thời gian đăng nhập gần đây nhất:
                            {item.thoigiandangnhap ? null : <Text style={styles.update}> Chưa cập nhật</Text>}                   
                            {!item.thoigiandangnhap ? null : <Text style={{color: '#0d00ff' , fontWeight:'bold'}}> {item.thoigiandangnhap}</Text>}                   
                        </Text>
                        <Text style={{color:'black'}}>Thời gian đăng ký: <Text style={{color: '#0d00ff', fontWeight:'bold'}}>{item.thoigiandangky}</Text></Text>
                        <Text style={{color:'black'}}>Số Tiền: <Text style={{color: '#0d00ff', fontWeight:'bold'}}>{item.tien.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VNĐ</Text></Text>
                      </View>
                    </TouchableOpacity>
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
   },
  text:{
    flex:1 ,
    position: 'absolute', 
    right : 1 , 
    fontSize: 10 , 
    borderColor: 'red' , 
    borderWidth: 1 , 
    color: 'red' , 
    backgroundColor:'#ffc7c7',
    fontWeight:'bold'
  },
  lock:{
    flex:1 ,
    position: 'absolute', 
    right :1 , 
    fontSize: 10 , 
    borderColor: '#0000ff' , 
    borderWidth: 1 , 
    color: '#0000ff' , 
    backgroundColor:'#ffa3ff',
    fontWeight:'bold',
    paddingLeft: 2
  },
  update:{
    color: '#ff3c3c' , 
    textDecorationLine: 'underline' , 
    fontSize:13
  }
})