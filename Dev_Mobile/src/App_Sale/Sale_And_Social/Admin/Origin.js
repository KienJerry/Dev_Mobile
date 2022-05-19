import React , { useState } from 'react';
import { TouchableOpacity, View, StyleSheet , Modal , Text , TextInput , ToastAndroid , Pressable, Alert } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import RN from 'react-native-multiple-select'

const api = "http://192.168.250.113:3001/"
export default function XuatXu({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  //State input Xuất xứ
  const [noiXuatXu , setNoiXuatXu] = useState('');
  const [ValidateOrigin, setValidateOrigin] = useState({
    Alerts : '',
    isValiOrigin : true,
});


//code Thêm Xuất Xứ
  const Add_Origin = () => {
    var reg = /^[A-Za-z]+$/;
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
    }if(reg.test(noiXuatXu)==0){
      setValidateOrigin({
          ...ValidateOrigin,
          isValiOrigin: false,
          Alerts : 'Chỉ được nhập chữ cái'
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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: '98%', height: '100%' ,position: 'absolute', backgroundColor : 'red'}}>

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
}
})
