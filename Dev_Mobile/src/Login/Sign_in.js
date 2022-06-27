import React , {useState} from 'react';
import { Text, View ,StatusBar , Image , StyleSheet ,Button, ToastAndroid , Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SocialIcon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = "http://192.168.17.113:3001/"
const SignIn = ({ navigation }) => {
    const [passdangnhap, onChangepassdangnhap] = useState("");
    const [numberPhone, setnumberPhone] = useState("");
    const [hidepass , sethidepass] = useState(true);
    const [isSelected, setSelection] = useState(false);
// const validate
    const [errors, setErrors] = useState({
        Alerts : '',
        isValiPassWord : true,
    });
    const [errorsPhone, setErrorsPhone] = useState({
        Alerts : '',
        isValiPhone : true,
    });

//btn đăng nhập
    const Check = () => {
        const reg = /^[0]?[0-9\b]+$/;
        if(numberPhone === null || numberPhone === ""){
            setErrorsPhone({
                ...errorsPhone,
                isValiPhone: false,
                Alerts : 'Số điện thoại không được để trống'
            })
            return;
        }if(numberPhone.length < 10 || numberPhone.length > 11){
            setErrorsPhone({
                ...errorsPhone,
                isValiPhone: false,
                Alerts : 'Số điện thoại phải là 10-11 số'
            })
            return;
        }if(reg.test(numberPhone)==0){
            setErrorsPhone({
                ...errorsPhone,
                isValiPhone: false,
                Alerts : 'Số điện thoại sai định dạng'
            })
            return;
        }else{
            setErrorsPhone({
                ...errorsPhone,
                isValiPhone : true
            })
        }if(passdangnhap === null || passdangnhap === ""){
            setErrors({
                ...errors,
                isValiPassWord: false,
                Alerts : 'Mật khẩu không được để trống'
            })
            return;
        }if(passdangnhap.length < 6){
            setErrors({
                ...errors,
                isValiPassWord: false,
                Alerts : 'Mật khẩu ít nhất 6 ký tự'
            })
            return;  
        }if(passdangnhap.length >= 30){
            setErrors({
                ...errors,
                isValiPassWord: false,
                Alerts : 'Mật khẩu nhiều nhất 30 ký tự'
            })
            return;  
        }else{
            setErrors({
                ...errors,
                isValiPassWord: true
            })
            fetch(api + "dangnhap", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: numberPhone,
                  password: passdangnhap,
                }),
              })
                .then((response) => response.json())
                .then(async(res) => {
                    if (res.success === true) {
                        //Hàm lấy thông tin user
                        const response = await fetch(api + "dangnhap/" + numberPhone);
                        const json = await response.json();

                        //Hàm update new login
                        const time = new Date().toLocaleTimeString();
                        const date = new Date().toLocaleDateString();
                        
                        axios.post( api + "new-login/", {
                        datetime: date + ' ' + time,
                        taikhoan: numberPhone
                        });
                          //ban tài khoản
                        if(json.map( check =>(check.khoa)) == "1"){
                            Alert.alert(
                                "Thông báo",
                                "Tài khoản "+numberPhone+" đã bị khóa ! Liên hệ ADMIN để biết thêm thông tin",
                                [
                                  {
                                    text: "Thoát",
                                    style: "cancel",
                                  },
                                  { text: "Thông tin", onPress: () => Alert.alert("Tài khoản "+numberPhone+" có hành vi vi phạm Điều Khoản của Sales & Social nên chúng tôi quyết định cấm tài khoản trên hệ thống của chúng tôi ! Xin Cảm Ơn !!!")
                                  }
                                ]
                              );
                              return;
                        }if(json.map( check =>(check.phanquyen)) == "9999"){
                            //check lưu tài khoản Admin
                            if (isSelected === true) {
                               await AsyncStorage.setItem("luutaikhoanAdmin", numberPhone);
                               navigation.navigate("Admin");
                           ToastAndroid.showWithGravity(
                               "Trang Admin !",
                               ToastAndroid.SHORT,
                               ToastAndroid.BOTTOM
                             );
                           return;
                           } else {
                               navigation.navigate("Admin");
                           ToastAndroid.showWithGravity(
                               "Trang Admin !",
                               ToastAndroid.SHORT,
                               ToastAndroid.BOTTOM
                             );
                           return;
                           }
                           //Tai Khoan client
                       }else{
                             //check lưu tài khoản
                            if (isSelected === true) {
                                await AsyncStorage.setItem("luutaikhoan", numberPhone);
                                navigation.navigate("Drawer");
                            } else {
                                navigation.navigate("Drawer");
                            }
                        }
                    } else {
                        ToastAndroid.showWithGravity(
                            "Sai Tài Khoản Hoặc Mật Khẩu",
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                          );    
                    }})
                .catch((error) => {
                    ToastAndroid.showWithGravity(
                        "Lỗi ! Không thể kết nối",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    )
                    // Alert.alert("Cảnh báo", "" + res.message)
                   
                });
            return;

        }
        
      };


  return (
    <View style={{backgroundColor : 'white' , width : '100%' , height: '100%'}}>
        <View style={styles.top}>
            <View style={styles.topleft}>
              <View style={{flexDirection: "row" , alignItems: "center" }}>
                <Text style={{color : 'orange' , fontSize : 27, fontWeight:'bold'}}>Đăng Nhập</Text>
              </View>
              <Text style={{color : '#a6abaf',paddingTop: 10 , marginStart : 10}}>Chào mừng bạn đến với </Text>
            </View>
            <View style={styles.topright}>
                <Image style={{width: '100%' , height: '70%'}}
                    source={require('../image_folder/Logo_orange.png')}
                ></Image>
            </View>
        </View>
        <View style={styles.mid}>
            <View style={{ width : '90%' , height: '100%' , borderWidth : 3 , borderRadius : 5 , borderColor : 'orange'}}>
                <ScrollView  showsVerticalScrollIndicator={false}
                             showsHorizontalScrollIndicator={false}>
                
                    <TextInput style={styles.textInputCSS} 
                    placeholder="Nhập SĐT của bạn "
                    placeholderTextColor={'#f6ce79'}
                    onChangeText={setnumberPhone}
                    keyboardType="numeric"></TextInput>
                    {errorsPhone.isValiPhone ? null : <Text style={{color: 'red' ,  marginLeft:10}}>{errorsPhone.Alerts}</Text>}

                        <TextInput style={styles.textInputCSS} 
                            onChangeText={onChangepassdangnhap}
                            secureTextEntry = {hidepass}
                            placeholderTextColor={'#f6ce79'}
                            placeholder="Nhập mật khẩu của bạn ">
                        </TextInput>
                        <TouchableOpacity onPress={() => sethidepass((hidepass) => !hidepass)}>
                            <Text style={styles.hide}>{hidepass?"Hiện":"Ẩn"}</Text>
                        </TouchableOpacity>               
                     {errors.isValiPassWord ? null : <Text style={{color: 'red' ,  marginLeft:10}}>{errors.Alerts}</Text>}

                        <View style={styles.checkboxContainer}>
                            <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={styles.checkbox}
                            tintColors={{ true: 'orange', false: '#fed575' }}
                            />
                            <Text style={styles.label} onPress={()=>setSelection(!isSelected)}>Lưu Tài Khoản</Text>
                        </View>
                     <View style={styles.textInputCSS}>
                        <Button title="Đăng Nhập"
                                color="orange"
                                onPress={Check}
                        ></Button> 
                     </View>

                     <View style={styles.text_forgot}>
                        <Text style={{ color : '#7878e6',textDecorationLine: 'underline' ,fontWeight: 'bold'}}>Quên Mật Khẩu ?</Text>
                     </View>
               
                     <View style={styles.text_or}>
                        <Text style={{textDecorationLine: 'underline'}}>Hoặc</Text>
                     </View>

                     <View style={{flexDirection: "row" , justifyContent: "center"}}>
                        <SocialIcon type='google' />
                        <SocialIcon onPress={() => navigation.navigate('Admin')} type='instagram'/>
                        <SocialIcon type='facebook'/>
                     </View>

                     <View style={styles.text_singUp}>
                        <Text style={{color:'black'}}>Bạn chưa có tài khoản? </Text>
                        <Text onPress={() => navigation.navigate('Signup')} style={{color:'#7878e6'}}>Đăng Ký</Text>
                     </View>
                </ScrollView>              
            </View>
        </View>
        <View style={styles.bot}>
                <Image style={{width: '100%' , height: '100%' ,}} blurRadius={1}
                    source={require('../image_folder/background_login_1.jpg')}
                ></Image>
        </View>
      
      <StatusBar
        backgroundColor="white"/>
    </View>
  );
}

export default SignIn;

const styles = StyleSheet.create({
    top:{
        flex: 0.5 , flexDirection: "row", 
    },
    topleft:{
        flex: 1, justifyContent: "center", alignItems: "flex-start" , paddingStart : 20 
    },
    topright:{
        flex: 1, justifyContent: "flex-end", alignItems: "flex-start" 
    },
    mid:{
        flex: 2 ,justifyContent: "center", alignItems: "center" 
    },
    bot:{
        flex: 1 
    },
    textInputCSS:{
        flex : 1,
        borderRadius : 5,
        borderColor : 'orange' ,
        borderWidth : 1 ,
        marginTop : 10,
        marginLeft : 10,
        marginRight : 10,
        color : 'orange',
    },
    text_forgot:{
        margin: 10 , justifyContent: "center", alignItems: "flex-end" , 
    },
    text_or:{
        margin: 10 ,justifyContent: "center", alignItems: "center" 
    },
    text_singUp:{
        margin: 10 ,justifyContent: "center", alignItems: "center" , flexDirection: "row",
    },
    hide:{
        alignSelf:'flex-end' ,
        marginRight : 15, 
        color:'orange', 
        fontSize: 15, 
        fontWeight: "bold",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginLeft : 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 5,
        color : 'orange'
    },
});