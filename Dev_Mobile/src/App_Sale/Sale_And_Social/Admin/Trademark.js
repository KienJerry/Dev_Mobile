import React, { useState , useEffect ,useCallback} from 'react';
import { Text, View ,StyleSheet, TouchableOpacity , TextInput, FlatList, Modal , Pressable , Alert , ToastAndroid , RefreshControl} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from 'axios'

const api = "http://192.168.17.113:3001/"
const ThuongHieu = () => {
  const [hideSearch , setHideSearch] = useState(false);
  const [showModalAdd, setshowModalAdd] = useState(false);
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [trademark , setTrademark] = useState('');

//State input Thương Hiệu
  const [id , setId] = useState('')
  const [thuonghieu , setthuonghieu] = useState('');
  const [diachi , setdiachi] = useState('');
  const [email , setemail] = useState('');
  const [ValidateTrademark, setValidateTrademark] = useState({
    Alerts : '',
    isValiTrademark : true,
  });
  
  //Code gọi list Thương Hiệu
  const getTrademark = async() => {
    try {
      const response = await fetch(api + "thuonghieu/");
      const json = await response.json();
      setTrademark(json);
    } catch (error) {
      console.error("Lỗi ! Không có kết nối mạng");
    }
  }

  // Code Refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  //Get lại API Xuất xứ
  const wait = (timeout) => {
    getTrademark();
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  useEffect(() => {
    getTrademark();
  },[]);
  
  //Tên ghi chú
  const STT = [
    {
      id : 1 ,
      name : 'Tên '
    },
    {
      id : 2 ,
      name : 'Email'
    },
    {
      id : 3 ,
      name : 'Địa Chỉ'
    },
    {
      id : 4 ,
      name : 'Chức năng'
    },
  ]

  //Thêm Thương Hiệu
  const AddTrademark = () => {
    var check_mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(thuonghieu =='' || thuonghieu == null){
      setValidateTrademark({
        ...ValidateTrademark,
        isValiTrademark: false,
        Alerts : 'Tên Thương Hiệu không được để trống'
      })
      return;
    }if(thuonghieu.length >= 40){
      setValidateTrademark({
        ...ValidateTrademark,
        isValiTrademark: false,
        Alerts:'Tên không được quá 40 ký tự'
      })
      return;
    }if(diachi =='' || diachi == null){
      setValidateTrademark({
        ...ValidateTrademark,
        isValiTrademark: false,
        Alerts: 'Địa chỉ không được bỏ trống'
      })
      return;
    }if(diachi.length <= 5){
      setValidateTrademark({
        ...ValidateTrademark,
        isValiTrademark: false,
        Alerts: 'Địa chỉ bắt buộc phải lớn hơn 5 ký tự'
      })
      return;
    }if(diachi.length >= 30){
      setValidateTrademark({
        ...ValidateTrademark,
        isValiTrademark: false,
        Alerts: 'Địa chỉ phải ít hơn 30 ký tự'
      })
    }if(email =='' || email == null){
      setValidateTrademark({
        ...ValidateTrademark,
        isValiTrademark:false,
        Alerts:'Email không được để trống'
      })
      return;
    }if(email.length <= 5){
        setValidateTrademark({
          ...ValidateTrademark,
          isValiTrademark: false,
          Alerts:'Email phải lớn hơn 5 ký tự'
        })
        return;
    }if(email.length >= 40){
      setValidateTrademark({
        ...ValidateTrademark,
        isValiTrademark: false,
        Alerts:'Email phải nhỏ hơn 40 ký tự'
      })
      return;
    }if(check_mail.test(email) == 0){
       setValidateTrademark({
         ...ValidateTrademark,
         isValiTrademark: false,
         Alerts:'Email sai định dạng'
       })
       return;
    }else{
      setValidateTrademark({
        ...ValidateTrademark,
        isValiTrademark: true
      })
      fetch(api + 'addthuonghieu/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name_category: thuonghieu,
          email_trademark: email,
          address_trademark: diachi,
        })
      })
      .then((response) => {     //gọi để check res
        if (response !== 'ok') {  
          ToastAndroid.showWithGravity(
            "Thêm thành công",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          setshowModalAdd(!showModalAdd)   //tắt modal
          getTrademark();     //Gọi lại list data
        }
      })
      .catch((error) => {
        ToastAndroid.showWithGravity(
          "Lỗi ! Không thể kết nối",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
      )
      });
      return;
    }
  }

//Show Alert Chức năng
  const Show_Alert = (item) => {
    Alert.alert(
      "Chức năng",
      "",
      [
        {
          text: "Thoát",
          style: "cancel"
        },
        { 
          text: "Sửa", 
          onPress: () => Edit_Trademar(item)
        },
        { 
          text: "Xoá", 
          onPress: () => del_Trademark(item)
        },
        
      ]
    )
  }

  //Xoá thương hiệu
  const del_Trademark = (item) => {
    Alert.alert(
      "Thông Báo",
      "Bạn chắc chắn muốn xoá " + item.tenthuonghieu,
      [
        {
          text: "Huỷ",
          style: "cancel"
        },
        { text: "Xoá", 
        onPress : () => Check_Delete()  
        }
      ]
    );
    //Nếu bấm vào xoá thì sẽ nhảy vào hàm này
    const Check_Delete = () => {
      fetch(api + 'deletethuonghieu/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          myid: item.idthuonghieu,
        })
      })
      .then((response) => {
        if (response !== 'xoa_thanh_cong') {    
          ToastAndroid.showWithGravity(
            "Xoá thành công",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          getTrademark();
        }
      })
      .catch((error) => {
        ToastAndroid.showWithGravity(
          "Lỗi ! Không thể kết nối",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
      )
      });
      return;
    }
  }

  //Sửa thương hiệu
  const Edit_Trademar = (item) => {
    setshowModalEdit(true);
    setId(item.idthuonghieu);
    setthuonghieu(item.tenthuonghieu);
    setdiachi(item.diachithuonghieu);
    setemail(item.email);
  }

//Btn_ Sửa thương hiệu
const btn_Edit_Trademark = () => {
  var check_mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if(thuonghieu =='' || thuonghieu == null){
    setValidateTrademark({
      ...ValidateTrademark,
      isValiTrademark: false,
      Alerts : 'Tên Thương Hiệu không được để trống'
    })
    return;
  }if(thuonghieu.length >= 40){
    setValidateTrademark({
      ...ValidateTrademark,
      isValiTrademark: false,
      Alerts:'Tên không được quá 40 ký tự'
    })
    return;
  }if(diachi =='' || diachi == null){
    setValidateTrademark({
      ...ValidateTrademark,
      isValiTrademark: false,
      Alerts: 'Địa chỉ không được bỏ trống'
    })
    return;
  }if(diachi.length <= 5){
    setValidateTrademark({
      ...ValidateTrademark,
      isValiTrademark: false,
      Alerts: 'Địa chỉ bắt buộc phải lớn hơn 5 ký tự'
    })
    return;
  }if(diachi.length >= 30){
    setValidateTrademark({
      ...ValidateTrademark,
      isValiTrademark: false,
      Alerts: 'Địa chỉ phải ít hơn 30 ký tự'
    })
  }if(email =='' || email == null){
    setValidateTrademark({
      ...ValidateTrademark,
      isValiTrademark:false,
      Alerts:'Email không được để trống'
    })
    return;
  }if(email.length <= 5){
      setValidateTrademark({
        ...ValidateTrademark,
        isValiTrademark: false,
        Alerts:'Email phải lớn hơn 5 ký tự'
      })
      return;
  }if(email.length >= 40){
    setValidateTrademark({
      ...ValidateTrademark,
      isValiTrademark: false,
      Alerts:'Email phải nhỏ hơn 40 ký tự'
    })
    return;
  }if(check_mail.test(email) == 0){
     setValidateTrademark({
       ...ValidateTrademark,
       isValiTrademark: false,
       Alerts:'Email sai định dạng'
     })
     return;
  }else{
    setValidateTrademark({
      ...ValidateTrademark,
      isValiTrademark: true
    })
    axios.post(api + "editthuonghieu/editid", {
      name_trademark: thuonghieu,
      name_email: email,
      name_address : diachi,
      myid : id
    })
    .then(response =>{
        if (response.data === 'sua_thanh_cong') {    
          ToastAndroid.showWithGravity(
            "Sửa thành công",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          getTrademark();
          setshowModalEdit(!showModalEdit);
        }
      })
    .catch(error => console.error("Lỗi ! không có kết nối"));

  }
}
  const Search = async() => {
    if(thuonghieu === '' || thuonghieu === null){
      getTrademark();
      return;
    }else{
      try {
        const response = await fetch(api + "searchthuonghieu/" + thuonghieu);
        const json = await response.json();
        if(json == '' || json == null){
          ToastAndroid.showWithGravity(
            "Không tìm thấy thương hiệu tương ứng",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
        setTrademark([]);
        }else{
          setTrademark(json);
        }
      } catch (error) {
        console.error('Lỗi ! Không thể kết nối');
      }
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.background}>
        <View style={styles.background_top}>
          <TouchableOpacity onPress={() => setHideSearch(!hideSearch)}>
            <Text style={styles.Text_List_Trademark}>Danh Sách Thương Hiệu</Text>  
          </TouchableOpacity> 
          {hideSearch ? ( 
            <View style ={{flexDirection: 'row' ,alignItems: "center" , width: '90%'}}>
                <TextInput placeholder="Tìm Kiếm ..." style={styles.TextSearch} onChangeText={setthuonghieu} ></TextInput>
                <Icon style={{flex : 1}} name="search" size={25} color ="black" onPress={() => Search()}></Icon>
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

        <View style={{ flexDirection:'row'}}>
            {STT.map((s , index) => 
                <View style={styles.table} key={index}> 
                  <Text>{s.name}</Text>  
                </View> 
            )} 
        </View>
      </View>
      <View style={{marginTop:85}}>
          <FlatList 
          data={trademark}
          keyExtractor={item => item.idthuonghieu} 
          refreshControl ={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}/>
          }
          renderItem={({item , index}) => (
            <TouchableOpacity onPress={() => Show_Alert(item)}>
            <View key={index} style={styles.flatlist}> 
               <Text>Tên : <Text style={{color: 'green', fontWeight:'bold'}}>{item.tenthuonghieu}</Text></Text>
               <Text>Địa Chỉ : <Text style={{color: 'green', fontWeight:'bold'}}>{item.diachithuonghieu}</Text></Text>
               <Text>Email : <Text style={{color: 'green', fontWeight:'bold'}}>{item.email}</Text></Text>
            </View>
            </TouchableOpacity>
          )} />
      </View>
      <Modal
            animationType="slide"
            transparent={true}
            visible={showModalEdit}
            onRequestClose={() => {
              setshowModalEdit(!showModalEdit);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Text style={styles.modalTextID}>ID : {id}</Text>
                  <TextInput style={styles.modalText} 
                              placeholder="Nhập Tên Thương Hiệu ..."
                              onChangeText={setthuonghieu}>{thuonghieu}</TextInput>
                  <TextInput style={styles.modalText} 
                              placeholder="Nhập Địa Chỉ ..."
                              onChangeText={setdiachi}>{diachi}</TextInput>
                  <TextInput style={styles.modalText} 
                              keyboardType = 'email-address'
                              placeholder="Nhập Email ..."
                              onChangeText={setemail}>{email}</TextInput>
                            {ValidateTrademark.isValiTrademark ? null : <Text style={{color: 'red' , marginBottom : 15}}>{ValidateTrademark.Alerts}</Text>}
                <View style={{flexDirection: 'row' , marginTop : 15}}>
                    <Pressable style={[styles.button, styles.buttonClose]}
                              onPress={() =>setshowModalEdit(!showModalEdit) === setValidateTrademark(!ValidateTrademark)}>
                      <Text style={styles.textStyle}>Thoát</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonOpen]}
                              onPress={() => btn_Edit_Trademark()}>
                      <Text style={styles.textStyle}>Sửa</Text>
                    </Pressable>
                </View>
              </View>
            </View>
      </Modal>
      <Modal
            animationType="slide"
            transparent={true}
            visible={showModalAdd}
            onRequestClose={() => {
              setshowModalAdd(!showModalAdd);
            }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>                  
                  <TextInput style={styles.modalText} 
                              placeholder="Nhập Tên Thương Hiệu ..."
                              onChangeText={setthuonghieu}></TextInput>
                  <TextInput style={styles.modalText} 
                              placeholder="Nhập Địa Chỉ ..."
                              onChangeText={setdiachi}></TextInput>
                  <TextInput style={styles.modalText} 
                              keyboardType = 'email-address'
                              placeholder="Nhập Email ..."
                              onChangeText={setemail}></TextInput>
                   {ValidateTrademark.isValiTrademark ? null : <Text style={{color: 'red' , marginBottom : 15}}>{ValidateTrademark.Alerts}</Text>}
                  <View style={{flexDirection: 'row' , marginTop : 15}}>
                      <Pressable style={[styles.button, styles.buttonClose]}
                                onPress={() =>setshowModalAdd(!showModalAdd) === setValidateTrademark(!ValidateTrademark)}>
                        <Text style={styles.textStyle}>Thoát</Text>
                      </Pressable>
                      <Pressable style={[styles.button, styles.buttonOpen]}
                                onPress={() => AddTrademark()}>
                        <Text style={styles.textStyle}>Thêm</Text>
                      </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
      <TouchableOpacity  style={styles.btn_add}>
        <Icon name='add' size={30} color='orange' onPress={() => setshowModalAdd(true)} />
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
  },
  table:{
    flex: 1 , 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth:  1
  },
  flatlist:{
    marginBottom: 5 , 
    borderWidth : 1 , 
    backgroundColor: 'white'
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
  modalText: {
    marginBottom: 5,
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius : 5,
    padding: 10,
    borderColor : 'orange',
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTextID: {
    color: 'black',
    fontSize : 18,
    fontWeight: '500',
    marginBottom : 20
  },
})