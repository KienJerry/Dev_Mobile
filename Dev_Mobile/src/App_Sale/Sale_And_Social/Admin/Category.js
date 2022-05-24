import React , { useState } from 'react';
import { TouchableOpacity, View, StyleSheet , Modal , Text , TextInput , Alert , Pressable } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import RNPickerSelect from "react-native-picker-select";

export default function DanhMuc({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleone, setModalVisibleone] = useState(false);
  const [ language, setLanguage ] = useState("");

  const Data = [
    { label: "JavaScript", value: "JavaScript" },
    { label: "TypeScript", value: "TypeScript" },
    { label: "Python", value: "Python" },
    { label: "Java", value: "Java" },
    { label: "C++", value: "C++" },
    { label: "C", value: "C" },
    { label: "C", value: "ABC" },
  ]
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <RNPickerSelect
      style={{color: 'black' , backgroundColor: 'black'}}
      onValueChange={(value) => console.log(value)}
      useNativeAndroidPickerStyle={false}
      placeholder={{ label: "Select your favourite language", value: 0 }}
      items={Data}
       />
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
                            placeholder="Nhập Tên Danh Mục ..."></TextInput>
                <Text onPress={() => setModalVisible(true)} style={styles.modalTextone}>Chọn Danh Mục</Text>
                <View style={{flexDirection: 'row'}}>
                    <Pressable style={[styles.button, styles.buttonClose]}
                              onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Thoát</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonOpen]}
                              onPress={() => setModalVisible(!modalVisible)}>
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
  marginBottom: 15,
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
