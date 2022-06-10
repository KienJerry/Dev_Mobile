import React, { useState , useEffect } from 'react';
import { Text, View ,ToastAndroid ,TouchableOpacity ,StyleSheet ,Dimensions, Image, FlatList, TextInput , Modal , Pressable} from 'react-native';
import axios from 'axios';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Menu, MenuItem } from 'react-native-material-menu';

const api = "http:192.168.235.113:3001/"
var deviceWidth = Dimensions.get('window').width * 0.5;
const UpdateAccount = ({route , navigation}) => {
    const [data , setData] = useState([]);
    const {taikhoan , khoa , phanquyen } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [checkMenu, setcheckMenu] = useState(false);
    const [checkMenu1, setcheckMenu1] = useState(false);

    //state + validate tiền
    const [money , setMoney] = useState('');
    const [ValidateMoney, setValidateMoney] = useState({
      Alerts : '',
      isValiMoney : true,
    })

//code lấy API account
  const getMoney = async() =>{
    axios.get(api + "dangnhap/" + taikhoan)
    .then(response => {
        setData(response.data)
    }).catch((error)=> {
        ToastAndroid.showWithGravity(
          "Lỗi ! Không thể kết nối",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
      })
  }

  useEffect(() => {
    getMoney();
  },[]);

//Code Cộng thêm tiền
  const btnMoney = () => {
     const reg = /^[0]?[0-9\b]+$/;
        if(money == null || money ==""){
            setValidateMoney({
              ...ValidateMoney,
              isValiMoney : false,
              Alerts : 'không được bỏ trống'
            })
            return;
        }if(reg.test(money)==0){
              setValidateMoney({
                ...ValidateMoney,
                isValiMoney : false,
                Alerts : 'Sai định dạng'
              })
          return;
        }if(khoa == "1"){
              setValidateMoney({
                ...ValidateMoney,
                isValiMoney : false,
                Alerts : 'Tài khoản này đang bị khoá'
              })
          return;
        }else{
              setValidateMoney({
                ...ValidateMoney,
                isValiMoney : true
              })
              const tong_tien = (money * 1) + (data[0].tien);
              axios.post(api + "money-account", {
                myid : data[0].idtaikhoan,
                tien : tong_tien
              })
              .then(response =>{
                  if (response.data == 'sua_thanh_cong') {    
                    ToastAndroid.showWithGravity(
                      "Cộng tiền thành công",
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM
                    );
                    getMoney();  //Gọi lại API
                    setModalVisible(false);  //Tắt Modal
                    setMoney(""); // Reset Money = ""
                    return ;
                  }
                })
              .catch(error => console.error("Lỗi ! không có kết nối"));
        }
        return 0;
  }
//Code Trừ tiền
  const btnMoney_apart = () => {
     const reg = /^[0]?[0-9\b]+$/;
        if(money == null || money ==""){
            setValidateMoney({
              ...ValidateMoney,
              isValiMoney : false,
              Alerts : 'không được bỏ trống'
            })
            return;
        }if(reg.test(money)==0){
              setValidateMoney({
                ...ValidateMoney,
                isValiMoney : false,
                Alerts : 'Sai định dạng'
              })
          return;
        }if(khoa == "1"){
              setValidateMoney({
                ...ValidateMoney,
                isValiMoney : false,
                Alerts : 'Tài khoản này đang bị khoá'
              })
          return;
        }else{
              setValidateMoney({
                ...ValidateMoney,
                isValiMoney : true
              })
              const tong_tien = (data[0].tien) - (money * 1);
              axios.post(api + "money-account", {
                myid : data[0].idtaikhoan,
                tien : tong_tien
              })
              .then(response =>{
                  if (response.data == 'sua_thanh_cong') {    
                    ToastAndroid.showWithGravity(
                      "Trừ tiền thành công",
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM
                    );
                    getMoney();  //Gọi lại API
                    setModalVisible1(false);  //Tắt Modal
                    setMoney(""); // Reset Money = ""
                    return ;
                  }
                })
              .catch(error => console.error("Lỗi ! không có kết nối"));
        }
        return 0;
  }

  return (
    <View style={{ flex: 1 , backgroundColor: 'white'}}>
        <View style = {styles.container} >
            <Icon size={30} style = {{marginLeft: 10 ,  color: "orange"}} name="chevron-left" onPress={() => navigation.goBack()}/>
            <Text style = {{ fontSize: 20, fontWeight: "bold" , color: "orange"}}onPress={() => navigation.goBack()}>Cập nhật tài khoản</Text>
            <View style={styles.more}>
                <Menu
                  visible={checkMenu}
                  anchor={ <Icon size={30} color='orange' name="more-vert" onPress={() => setcheckMenu(true)}/>}
                  onRequestClose={() => setcheckMenu(false)}>
                      <MenuItem onPress={() => setcheckMenu1(true) }>Tiền      ►</MenuItem>
                      <MenuItem onPress={() => setcheckMenu(false)}>Lịch sử mua hàng</MenuItem>
                      <MenuItem onPress={() => setcheckMenu(false)}>Khoá</MenuItem>
                      <MenuItem onPress={() => setcheckMenu(false)}>Cấp quyền Admin</MenuItem>
                </Menu>  
            </View>
            <View style={styles.more1}>
                <Menu
                  visible={checkMenu1}
                  onRequestClose={() => setcheckMenu1(false)}>
                      <MenuItem onPress={() => setModalVisible(true) === setcheckMenu(false) === setcheckMenu1(false)}>Cộng Tiền</MenuItem>
                      <MenuItem onPress={() => setModalVisible1(true) === setcheckMenu(false) === setcheckMenu1(false)}>Trừ Tiền</MenuItem>
                </Menu>  
            </View>
                 
        </View>
        <View style={{backgroundColor: 'red' , width: '100%', height: deviceWidth }}>
            <Image style={{height: deviceWidth}} source={{ uri: api + "images/tom.jpg" }}></Image>
           <Image style={styles.avatar}
            source={{ uri: api + "images/girl.jpg" }}></Image>
        </View>
        
        <View style={{alignItems : "flex-end", margin :20 }}>
               {!khoa ? null : <Text style={styles.lock}>LOCK</Text>}
        </View>
        <View style={{marginTop: deviceWidth*0.3 , marginLeft: 20 , marginRight : 20}}>
          <FlatList data={data}
                    keyExtractor={item => item.idtaikhoan}
                    renderItem={({item, index}) =>(
                        <View style={{ alignItems : "center" }} key={index}>
                          <View style={{flexDirection:'row' ,alignItems : "baseline"}}>
                            <Text style={{fontSize: 25 , fontWeight:'bold' , color: 'black' , marginBottom : 10}}>{item.tennguoidung}</Text>
                            <TouchableOpacity onLongPress={() =>{ToastAndroid.showWithGravity(
                                                                  "Huy hiệu xác minh đặc quyền ADMIN",
                                                                  ToastAndroid.LONG,
                                                                  ToastAndroid.BOTTOM
                                                                )}}>
                              {!phanquyen ? null : <Image style={{width:20 , height:20 , marginLeft: 5}} 
                              source={{uri: api + "images/tick.png"}}></Image>}
                            </TouchableOpacity>
                          </View>
                           <Text style={{marginBottom : 10}}>{item.namsinh}</Text>
                           <Text style={{marginBottom : 10}}>Giới tính : {item.gioitinh}</Text>
                           <Text style={{marginBottom : 10}}>Địa Chỉ : {item.diachi}</Text>
                           <Text style={{marginBottom : 10}}>Số tiền trong tài khoản : <Text style={{color: 'blue'}}>{item.tien.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VNĐ</Text></Text>
                           <Text style={{marginBottom : 10}}>Thời gian đăng ký : {item.thoigiandangky}</Text>
                           <Text style={{marginBottom : 10}}>Tình trạng : 
                              {!khoa ? null : <Text style={{color:'red'}}>Khoá</Text>}
                              {khoa ? null : <Text> Bình thường</Text>}
                           </Text>
                        </View>
                    )} 
          />
        </View>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                
                <TextInput style={styles.modalText} 
                            placeholder="Nhập số tiền muốn cộng thêm ..."
                            keyboardType="numeric"
                            onChangeText={setMoney}></TextInput>
                             {ValidateMoney.isValiMoney ? null : <Text style={{color: 'red' , marginBottom : 15}}>{ValidateMoney.Alerts}</Text>}
                <View style={{flexDirection: 'row' , marginTop : 15}}>
                    <Pressable style={[styles.button, styles.buttonClose]}
                              onPress={() =>setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Thoát</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonOpen]}
                              onPress={btnMoney}>
                      <Text style={styles.textStyle}>Thêm</Text>
                    </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {
              setModalVisible1(!modalVisible1);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                
                <TextInput style={styles.modalText} 
                            placeholder="Nhập số tiền muốn trừ ..."
                            keyboardType="numeric"
                            onChangeText={setMoney}></TextInput>
                             {ValidateMoney.isValiMoney ? null : <Text style={{color: 'red' , marginBottom : 15}}>{ValidateMoney.Alerts}</Text>}
                <View style={{flexDirection: 'row' , marginTop : 15}}>
                    <Pressable style={[styles.button, styles.buttonClose]}
                              onPress={() =>setModalVisible1(!modalVisible1)}>
                      <Text style={styles.textStyle}>Thoát</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonOpen]}
                              onPress={btnMoney_apart}>
                      <Text style={styles.textStyle}>Trừ</Text>
                    </Pressable>
                </View>
              </View>
            </View>
          </Modal>
    </View>
  );
}

export default UpdateAccount;

const styles = StyleSheet.create({
    container: {
      height : 50,
      alignItems : "center",
      flexDirection: "row",
    },
    more:{
      color: "green" ,  
      position: 'absolute', 
      right: 10,
      color : 'orange'
    },
    more1:{
      color: "green" ,  
      position: 'absolute',
      right: 230,
      margin: 40,
      color : 'orange'
    },
    avatar:{
        backgroundColor: 'white' , 
        width: deviceWidth , 
        height: deviceWidth * 1 , 
        marginLeft: 10 ,
        marginTop :-deviceWidth*0.5 , 
        borderRadius: deviceWidth ,
        borderColor: 'white' , 
        borderWidth: 4
    },
    lock:{
      flex:1 ,
      position: 'absolute', 
      right : 1 , 
      fontSize: 15 , 
      borderColor: 'red' , 
      borderWidth: 1 , 
      color: 'red' , 
      backgroundColor:'#ffc7c7',
      fontWeight:'bold',
      padding: 5
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      width: '90%',
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 10,
      padding: 10,
      paddingLeft : 20,
      paddingRight: 20,
      elevation: 2 
    },
    buttonOpen: {
      backgroundColor: "orange",
      left:'100%'
    },
    buttonClose: {
      backgroundColor: "red",
      right: '100%'
    },
    modalText: {
      marginBottom: 5,
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderRadius : 5,
      padding: 10,
      borderColor : 'orange',
    },
})