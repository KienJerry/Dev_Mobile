import React , {useEffect , useState , useCallback} from 'react';
import { TouchableOpacity, View, StyleSheet , Modal , Text , TextInput , Dimensions , Alert , Image ,RefreshControl , Pressable , ToastAndroid , FlatList} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import RNPickerSelect from "react-native-picker-select";
import axios from 'axios'

const api = "http://192.168.17.113:3001/";
var deviceWidth = Dimensions.get('window').width * 0.3;
export default function DanhMuc({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [categoty , setCategory] = useState([]);
  const [arrName , setArrName] = useState([]);
  const [hideSearch , setHideSearch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [checkVali , setCheckVali] = useState({
    Alerts : '',
    isValiCategory : true,
  });

  //State Thêm Danh Mục
  const [idCategory , setIdCategory] = useState("");
  const [textAddCategory , setTextAddCategory] = useState("");
  const [idAddCategory , setIdAddCategory] = useState("0");
  const [imgAddCategory , setImgAddCategory] = useState("");
  const [idCha , setIdCha] = useState("");

      //Code gọi list Danh Mục
      const getCategory = async() => {
        axios.get(api + "danhmucsanpham")
        .then(response => {
          setCategory(response.data)
          let data = response.data
            let arrDataName = data.map((item) => {   //đặt tên cho các phần tử trong mảng => select
               return {
                label: item.tendanhmuc,
                value: item.iddanhmuc
                }
          })
          setArrName(arrDataName);
        }).catch((error)=> {
          ToastAndroid.showWithGravity(
            "Lỗi ! Không thể kết nối",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
        })
      }

  useEffect(() => {
    getCategory();
  },[]);

    // Code Refresh
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(1000).then(() => setRefreshing(false));
    }, []);
    //Get lại API Danh Mục
    const wait = (timeout) => {
      getCategory();
      return new Promise(resolve => setTimeout(resolve, timeout));
    }

    //Show Alert Chức năng
  const Show_Alert = async(item) => {
         //Lấy ID Cha
         if(item.danhmuccha == "0"){
          setIdCha("Chọn Danh Mục");
          Alert.alert(
            "Chức năng",
            "Bạn muốn chọn",
            [
              {
                text: "Thoát",
                style: "cancel"
              },
              { 
                text: "Sửa", 
                onPress: () => Edit_Category(item)
              },
              { 
                text: "Xoá", 
                onPress: () => del_Category(item)
              },
              
            ]
          )
          // không phải id cha
         }else{
          const response = await fetch(api + "editdanhmucsanpham/" + item.danhmuccha);
          const json = await response.json();
          setIdCha(json[0].tendanhmuc);
          Alert.alert(
            "Chức năng",
            "Bạn muốn chọn",
            [
              {
                text: "Thoát",
                style: "cancel"
              },
              { 
                text: "Sửa", 
                onPress: () => Edit_Category(item)
              },
              { 
                text: "Xoá", 
                onPress: () => del_Category(item)
              },
              
            ]
          )
         }
    
  }

  //Sửa
  const Edit_Category = async(item ) => {
     setshowModalEdit(true);
    setIdCategory(item.iddanhmuc);
    setTextAddCategory(item.tendanhmuc);
    setImgAddCategory(item.hinhanh);
    setIdAddCategory(item.danhmuccha);
  }
//btn Sửa 
  const btn_Edit_Category = () => {
    if(textAddCategory == "" || textAddCategory == null){
      setCheckVali({
        ...checkVali,
        isValiCategory: false,
        Alerts : 'Tên Danh Mục không được để trống'
      })
      return;
    }if(textAddCategory == "Chọn Danh Mục"){
      setCheckVali({
        ...checkVali,
        isValiCategory: false,
        Alerts : 'Nhập dữ liệu không được phép có tên "Chọn Danh Mục"'
      })
      return;
    }if(idCategory == "0"){
      setCheckVali({
        ...checkVali,
        isValiCategory: false,
        Alerts : 'Không được sửa ID = 0'
      })
      return;
    }else{
      setCheckVali({
        ...checkVali,
        isValiCategory: true
      })
      axios.post( api + 'editdanhmucsanpham/editid', {
        name_category: textAddCategory,
        name_category_parent: idAddCategory,
        myid : idCategory
       })
        .then(function (response) {
            if(response.data == "ok"){
              ToastAndroid.showWithGravity(
                "Sửa Danh Mục thành công !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              )
              setshowModalEdit(false);
              getCategory();
            }else{
              ToastAndroid.showWithGravity(
                "Sửa Danh Mục thất bại !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              )
            }
        })
        .catch(function (error) {
          ToastAndroid.showWithGravity(
            "Lỗi ! không có kết nối",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
        });
    }
  }

  //Xoá Danh Mục
  const del_Category = (item) => {
    Alert.alert(
      "Thông Báo",
      "Bạn chắc chắn muốn xoá " + item.tendanhmuc,
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
      if (item.iddanhmuc == '0') {
        ToastAndroid.showWithGravity(
          "Không thể xoá Danh Mục này !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
        return;
      } else {
        axios.post( api + 'deletedanhmucsanpham', {
          myid: item.iddanhmuc,
         })
          .then(function (response) {
              if(response.data == "ok"){
                ToastAndroid.showWithGravity(
                  "Xoá Thành Công !",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                )
                getCategory();
              }else{
                ToastAndroid.showWithGravity(
                  "Xoá thất bại !",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                )
              }
          })
          .catch(function (error) {
            ToastAndroid.showWithGravity(
              "Lỗi ! không có kết nối",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            )
          }); 
      }
     }
  }

  //Thêm Danh Mục 
  const AddCategory = () => {
    if(textAddCategory == "" || textAddCategory == null){
      setCheckVali({
        ...checkVali,
        isValiCategory: false,
        Alerts : 'Tên Danh Mục không được để trống'
      })
      return;
    }if(textAddCategory == "Chọn Danh Mục"){
      setCheckVali({
        ...checkVali,
        isValiCategory: false,
        Alerts : 'Nhập dữ liệu không được phép có tên "Chọn Danh Mục"'
      })
      return;
    }else{
      setCheckVali({
        ...checkVali,
        isValiCategory: true
      })
      axios.post( api + 'adddanhmucsanpham', {
        name_category: textAddCategory,
        name_category_parent: idAddCategory
       })
        .then(function (response) {
            if(response.data == "ok"){
              ToastAndroid.showWithGravity(
                "Thêm Danh Mục thành công !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              )
            }else{
              ToastAndroid.showWithGravity(
                "Thêm Danh Mục thất bại !",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              )
            }
        })
        .catch(function (error) {
          ToastAndroid.showWithGravity(
            "Lỗi ! không có kết nối",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
        });
        setModalVisible(!modalVisible);
     }
      getCategory();
      setTextAddCategory('');
  }

  //Code Tìm kiếm 
  const Search = async() => {
    if(textAddCategory === '' || textAddCategory === null){
      getCategory();
      return;
    }else{
      try {
        const response = await fetch(api + "searchdanhmucsanpham/" + textAddCategory);
        const json = await response.json();
        if(json == '' || json == null){
          ToastAndroid.showWithGravity(
            "Không tìm thấy danh mục tương ứng",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
        setCategory([]);
        }else{
          setCategory(json);
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
            <Text style={styles.Text_List_Trademark}>Danh Sách Danh Mục</Text>  
          </TouchableOpacity> 
          {hideSearch ? ( 
            <View style ={{flexDirection: 'row' ,alignItems: "center" , width: '90%'}}>
                <TextInput placeholder="Tìm Kiếm ..." style={styles.TextSearch} onChangeText={setTextAddCategory} ></TextInput>
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
      </View>
      <View style={{marginTop:50 , width : '98%'}}>
          <FlatList 
          data={categoty}
          keyExtractor={item => item.iddanhmuc} 
          refreshControl ={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}/>
          }
          renderItem={({item , index}) => (
            <TouchableOpacity onPress={() => Show_Alert(item)}>
            <View key={index} style={styles.flatlist}> 
               <Text style={{color: "black"}}>Tên Danh Mục: <Text style={{color: 'green', fontWeight:'bold'}}>{item.tendanhmuc}   </Text>
               {item.danhmuccha != 0 ? null : <Text style={styles.lock}>ID Chính</Text>}</Text>              
            {!item.hinhanh ? null :  <Image style={styles.avatar}
            source={{ uri:api + "images/" + item.hinhanh }}
            ></Image>}
            {item.hinhanh ? null : <Text style={{color:'black'}}>----Chưa có hình ảnh----</Text>}
            </View>
            </TouchableOpacity>
          )} />
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
                            placeholder="Nhập Tên Danh Mục ..."
                            onChangeText={setTextAddCategory}></TextInput>
                            {checkVali.isValiCategory ? null : <Text style={{color: 'red' , marginBottom : 15}}>{checkVali.Alerts}</Text>}
                     <RNPickerSelect
                      placeholderTextColor="red"
                      style={{ 
                        placeholder: {
                          color: 'black'
                        }
                      }}
                      onValueChange={(value) => setIdAddCategory(value)}
                      useNativeAndroidPickerStyle={false}
                      placeholder={{ label: "Chọn Danh Mục", value: 0 }}
                      items={arrName}
                      />
                <View style={{flexDirection: 'row'}}>
                    <Pressable style={[styles.button, styles.buttonClose]}
                              onPress={() => setModalVisible(!modalVisible) == setCheckVali({
                                ...checkVali,
                                isValiCategory: true
                              })}>
                      <Text style={styles.textStyle}>Thoát</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonOpen]}
                              onPress={() => AddCategory()}>
                      <Text style={styles.textStyle}>Thêm</Text>
                    </Pressable>
                </View>
              </View>
            </View>
          </Modal>
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
              <Text style={styles.modalTextID}>ID : {idCategory}</Text>
                  <TextInput style={styles.modalText} 
                              placeholder="Nhập Tên Danh Mục ..."
                              onChangeText={setTextAddCategory}>{textAddCategory}</TextInput>
                              {checkVali.isValiCategory ? null : <Text style={{color: 'red' , marginBottom : 15}}>{checkVali.Alerts}</Text>}
                  <RNPickerSelect
                      placeholderTextColor="red"
                      style={{ 
                        placeholder: {
                          color: 'black'
                        }
                      }}
                      onValueChange={(value) => setIdAddCategory(value)}
                      useNativeAndroidPickerStyle={false}
                      placeholder={{ label: idCha, value: idAddCategory }}
                      items={arrName}
                      />
                    {imgAddCategory ? null : <Text style={{color:'black'}}>----Chưa có hình ảnh----</Text>}
                    {!imgAddCategory ? null :  <Image style={styles.avatar}
                    source={{ uri:api + "images/" + imgAddCategory }}
                    ></Image>}
                       
                <View style={{flexDirection: 'row' , marginTop : 15}}>
                    <Pressable style={[styles.button, styles.buttonClose]}
                              onPress={() =>setshowModalEdit(!showModalEdit) == setCheckVali({
                                ...checkVali,
                                isValiCategory: true
                              })}>
                      <Text style={styles.textStyle}>Thoát</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonOpen]}
                              onPress={() => btn_Edit_Category()}>
                      <Text style={styles.textStyle}>Sửa</Text>
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
  color: "black"
 },
 TextSearch:{
  backgroundColor: 'white',
  flex: 1, 
  margin : 5 , 
  borderRadius: 5, 
  borderWidth : 1 ,
  color: "black"
},
flatlist:{
  marginBottom: 5 , 
  borderWidth : 1 , 
  backgroundColor: 'white',
},
lock:{
  flex:1 ,
  position: 'absolute', 
  right : 1 , 
  fontSize: 10 ,
  color: 'red' ,
  fontWeight:'bold'
},
avatar:{
  width: deviceWidth *1.39, 
  height: deviceWidth  ,
  resizeMode: 'cover'
},
modalTextID: {
  color: 'black',
  fontSize : 18,
  fontWeight: '500',
  marginBottom : 20
},
})
