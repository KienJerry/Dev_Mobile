import React , { useState , useEffect , useCallback} from 'react';
import { TouchableOpacity, View, StyleSheet , Modal , Text , TextInput , ToastAndroid , Pressable, Alert, FlatList, RefreshControl , toy } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

const api = "http://10.22.198.177:3001/"
export default function XuatXu({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible_Edit, setModalVisible_Edit] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [origin , setOrigin] = useState('');
  const [idOrigin , setIdOrigin] = useState('');
  const [nameOrigin , setNameOrigin] = useState('');
  const [hideSearch , setHideSearch] = useState(false);

  //State input Xuất xứ
  const [noiXuatXu , setNoiXuatXu] = useState('');
  const [ValidateOrigin, setValidateOrigin] = useState({
    Alerts : '',
    isValiOrigin : true,
  });

//Gọi API Xuất xứ
const getOrigin = async () => {
  try {
    const response = await fetch(api + "xuatxu/");
    const json = await response.json();
    setOrigin(json);
  } catch (error) {
    console.error('Lỗi ! Không có kết nối');
  }
};

// Code Refresh
const onRefresh = useCallback(() => {
  setRefreshing(true);
  wait(1000).then(() => setRefreshing(false));
}, []);
//Get lại API Xuất xứ
const wait = (timeout) => {
  getOrigin();
  return new Promise(resolve => setTimeout(resolve, timeout));
}

useEffect(() => {
  getOrigin();
},[]);


//code Thêm Xuất Xứ
  const Add_Origin = () => {
    if(noiXuatXu === null || noiXuatXu === ""){
      setValidateOrigin({
        ...ValidateOrigin,
        isValiOrigin: false,
        Alerts : 'Tên không được để trống'
      })
    return;
    }if(noiXuatXu.length >= 30){
      setValidateOrigin({
        ...ValidateOrigin,
        isValiOrigin: false,
        Alerts : 'Không được quá 30 ký tự'
      })
    return;
    }else{
      setValidateOrigin({
          ...ValidateOrigin,
          isValiPassWord: true
      })
      fetch(api + 'addxuatxu/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name_origin: noiXuatXu,
        })
      })
      .then((response) => {
        if (response !== 'ok') {          // Check response trả về
          ToastAndroid.showWithGravity(
            "Thêm thành công",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          setModalVisible(!modalVisible)
          getOrigin();
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

//Code Show Alert Sửa và Xoá
  const showAlert = (item) =>
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
        onPress: () => edit_Origin(item)
      },
      { 
        text: "Xoá", 
        onPress: () => del_Origin(item)
      },
      
    ]
  );

//Code Xoá Xuất Xứ
  const del_Origin = (item) => {
    Alert.alert(
      "Thông Báo",
      "Bạn chắc chắn muốn xoá " + item.noixuatxu,
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
     //Nếu như Alert đồng ý xoá thì sẽ chạy vào hàm này
    const Check_Delete = () => {
      fetch(api + 'deletexuatxu/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          myid: item.idxuatxu,
        })
      })
      .then((response) => {
        if (response !== 'xoa_thanh_cong') {    
          ToastAndroid.showWithGravity(
            "Xoá thành công",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          getOrigin();  //getOrigin để gọi lại APi :)) ko mất thêm bước reload
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

//Code Sửa Xuất Xứ (P/s : Alert)
  const edit_Origin = (item) => {
    setModalVisible_Edit(true)
    setIdOrigin(item.idxuatxu)
    setNameOrigin(item.noixuatxu)
  }
//Code Sửa Xuất Xứ (P/s : Btn Sửa)
  const btn_edit_Origin = () => {
    //var reg = /^[A-Za-z]+$/;
    if(noiXuatXu === null || noiXuatXu === ""){
      setValidateOrigin({
        ...ValidateOrigin,
        isValiOrigin: false,
        Alerts : 'Tên không được để trống'
      })
    return;
    }if(noiXuatXu.length >= 30){
      setValidateOrigin({
        ...ValidateOrigin,
        isValiOrigin: false,
        Alerts : 'Không được quá 30 ký tự'
      })
    return;
    }else{
      setValidateOrigin({
          ...ValidateOrigin,
          isValiPassWord: true
      })
      fetch(api + 'editxuatxu/editid', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name_category: noiXuatXu,
          myid : idOrigin
        })
      })
      .then((response) => {
        if (response !== 'sua_thanh_cong') {  
          ToastAndroid.showWithGravity(
            "Sửa thành công",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          setModalVisible_Edit(!modalVisible_Edit)
          getOrigin();
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

  //Tìm Kiếm
  const Search = async() => {
    if(noiXuatXu === null || noiXuatXu ===""){
      getOrigin();
      return;
    }else{
        try {
          const response = await fetch(api + "searchxuatxu/" + noiXuatXu);
          const json = await response.json();
          if(json == '' || json == null){
            ToastAndroid.showWithGravity(
              "Không tìm thấy Xuất Xứ tương ứng",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
          );
          setOrigin([]);
          }else{
            setOrigin(json);
          }
        } catch (error) {
          console.error(error);
        }
    }
  }

  return (
    <View style={{ flex: 1,alignItems: "center" }}>
      <View style={styles.backgroundList}>
         <View style={styles.top_backgroundList}>
            <TouchableOpacity onPress={() => setHideSearch(!hideSearch)}>
                <Text style={{marginLeft: 10 , fontSize:18 , fontWeight: 'bold'}} >Danh Sách Xuất Xứ</Text>
            </TouchableOpacity> 
            {hideSearch ? (
              <View style ={{flexDirection: 'row' ,alignItems: "center" }}>
              <TextInput placeholder="Tìm Kiếm ..." style={styles.TextSearch} onChangeText={setNoiXuatXu}></TextInput>
              <Icon style={{flex : 1}} name="search" size={25} color ="black" onPress={() => Search()}></Icon>
              </View>
            ) : null}           
            {!hideSearch ? (
              <View style={{ fontWeight: 'bold', position: 'absolute' , right : 10}}>
                <TouchableOpacity onPress={() => setHideSearch(!hideSearch)}>
                  <Icon name="search" size={25} color ="black"></Icon>
                </TouchableOpacity>
              </View>
            ) : null}            
         </View>
      </View>

      <View style={styles.background_Flatlist}>
               <FlatList data={origin}
                         refreshControl ={
                           <RefreshControl
                           refreshing={refreshing}
                           onRefresh={onRefresh}/>
                         }
                         keyExtractor={item => item.idxuatxu}
                         renderItem={({item, index}) => (
                           <View>
                              <TouchableOpacity onPress={() => showAlert(item)}>
                                  <View style={styles.View_FlatList} key={index}>
                                      <Text>{item.idxuatxu}.</Text>
                                      <Text>{item.noixuatxu}</Text>
                                  </View>
                                </TouchableOpacity>
                            </View>
                         )}>

               </FlatList>
         </View>

         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible_Edit}
            onRequestClose={() => {
              setModalVisible_Edit(!modalVisible_Edit);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Text style={styles.modalTextID}>ID : {idOrigin}</Text>
                <TextInput style={styles.modalText} 
                            placeholder="Nhập Nơi Xuất Xứ ..."
                            onChangeText={setNoiXuatXu}>{nameOrigin}</TextInput>
                            {ValidateOrigin.isValiOrigin ? null : <Text style={{color: 'red' , marginBottom : 15}}>{ValidateOrigin.Alerts}</Text>}
                <View style={{flexDirection: 'row' , marginTop : 15}}>
                    <Pressable style={[styles.button, styles.buttonClose]}
                              onPress={() =>setModalVisible_Edit(!modalVisible_Edit) ===setValidateOrigin(!ValidateOrigin)}>
                      <Text style={styles.textStyle}>Thoát</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonOpen]}
                              onPress={btn_edit_Origin}>
                      <Text style={styles.textStyle}>Sửa</Text>
                    </Pressable>
                </View>
              </View>
            </View>
          </Modal>

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
                            placeholder="Nhập Nơi Xuất Xứ ..."
                            onChangeText={setNoiXuatXu}></TextInput>
                            {ValidateOrigin.isValiOrigin ? null : <Text style={{color: 'red' , marginBottom : 15}}>{ValidateOrigin.Alerts}</Text>}
                <View style={{flexDirection: 'row' , marginTop : 15}}>
                    <Pressable style={[styles.button, styles.buttonClose]}
                              onPress={() =>setValidateOrigin(!ValidateOrigin) === setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Thoát</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonOpen]}
                              onPress={Add_Origin}>
                      <Text style={styles.textStyle}>Thêm</Text>
                    </Pressable>
                </View>
              </View>
            </View>
          </Modal>
      <TouchableOpacity  style={styles.btn_add} onPress={() => setModalVisible(true)}>
        <Icon name='add' size={30} color='orange' />
      </TouchableOpacity>
    </View>
  );
}

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
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
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
modalTextone: {
  width: '100%',
  height: 50,
  padding: 10,
},
backgroundList:{
  width: '98%',
  top : 1,
  position: 'absolute'
},
top_backgroundList:{
  height: 50 , 
  width : '100%' ,
  alignItems: "center" ,
  flexDirection: 'row'
},
background_Flatlist:{
  borderRadius: 3 , 
  borderWidth: 1 , 
  borderColor: '#797979' , 
  flexDirection:'row' , 
  marginTop : 50
},
View_FlatList:{
  borderWidth: 1 , 
  borderColor: '#797979', 
  padding: 10 , 
  flexDirection:'row'
},
modalTextID: {
  color: 'black',
  fontSize : 18,
  fontWeight: '500',
  marginBottom : 20
},
TextSearch:{
  backgroundColor: 'white',
  flex: 1, 
  margin : 5 , 
  borderRadius: 5, 
  borderWidth : 1 
}
})
