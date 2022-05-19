import React , { useState } from 'react';
import { TouchableOpacity, View, StyleSheet , Modal , Text , TextInput , Alert , Pressable} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";


export default function DanhMuc({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
                <Text style={styles.modalText}>Thêm Danh Mục Sản Phẩm!</Text>
                <TextInput>abc</TextInput>
                <View>
                  
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Thoát</Text>
                </Pressable>
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
  marginTop: 22
},
modalView: {
  margin: 20,
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
  borderRadius: 20,
  padding: 10,
  elevation: 2
},
buttonOpen: {
  backgroundColor: "#F194FF",
},
buttonClose: {
  backgroundColor: "#2196F3",
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center"
}
})
