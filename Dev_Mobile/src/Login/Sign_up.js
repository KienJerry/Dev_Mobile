import React , {useState}from 'react';
import { Text, View ,StatusBar , Image , StyleSheet ,Button , ToastAndroid,} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialIcons";
import { SocialIcon } from 'react-native-elements';

const api = "http://10.22.196.167:3001/"
const SignUp = ({ navigation }) => {
    const [phoneNumber, setphoneNumber] = useState("");
    const [passWord, setpassWord] = useState("");
    const [rePassWord, setRePassWord] = useState("");
    //Check account
    const [visible, setVisible] = useState(false);
// tạo const check validate
    const [errorsPhone, setErrorsPhone] = useState({
        Alerts : '',
        isValiPhone : true,
    });
    const [errorsPass, setErrorsPass] = useState({
        Alerts : '',
        isValiPass : true,
    });
    const [errorsRePass, setErrorsRePass] = useState({
        Alerts : '',
        isValiRePass : true,
    });
//btn Đăng Ký
    const Check = () => {
        const reg = /^[0]?[0-9\b]+$/;
        if(phoneNumber === null || phoneNumber === ""){
            setErrorsPhone({
                ...errorsPhone,
                isValiPhone: false,
                Alerts : 'Số điện thoại không được để trống'
            })
            return;
        }if(reg.test(phoneNumber)==0){
            setErrorsPhone({
                ...errorsPhone,
                isValiPhone: false,
                Alerts : 'Số điện thoại sai định dạng'
            })
            return;
        }if(phoneNumber.length < 10 || phoneNumber.length > 11){
            setErrorsPhone({
                ...errorsPhone,
                isValiPhone: false,
                Alerts : 'Số điện thoại phải là 10-11 số'
            })
            return;
        }else{
            setErrorsPhone({
                ...errorsPhone,
                isValiPhone : true
            })
        }if(passWord === null || passWord === ""){
            setErrorsPass({
                ...errorsPass,
                isValiPass: false,
                Alerts : 'Mật khẩu không được để trống'
            })
            return;
        }if(passWord.length < 6){
            setErrorsPass({
                ...errorsPass,
                isValiPass: false,
                Alerts : 'Mật khẩu ít nhất 6 ký tự'
            })
            return;  
        }if(passWord.length >= 30){
            setErrorsPass({
                ...errorsPass,
                isValiPass: false,
                Alerts : 'Mật khẩu nhiều nhất 30 ký tự'
            })
            return;  
        }else{
            setErrorsPass({
                ...errorsPass,
                isValiPass: true
            })
        }if(rePassWord === null || rePassWord === ""){
            setErrorsRePass({
                ...errorsRePass,
                isValiRePass: false,
                Alerts : 'Nhập lại mật khẩu không được để trống'
            })
            return;
        }if(rePassWord != passWord){
            setErrorsRePass({
                ...errorsRePass,
                isValiRePass: false,
                Alerts : 'Nhập lại mật khẩu không đúng'
            })
            return;
        }else{
            setErrorsRePass({
                ...errorsRePass,
                isValiRePass: true
            })
             // đây là checkuser, đăng ký
             const time = new Date().toLocaleTimeString();
             const date = new Date().toLocaleDateString();
            fetch(api + "dangky/", {
                method: "POST",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                tentaikhoans: phoneNumber,
                matkhaus: rePassWord,
                date : time +"_"+ date,
                }),
            })
                .then((response) => response.json())
                .then((res) => {
                if (res.success === true) {
                    setVisible(true);
                    ToastAndroid.showWithGravity(
                        "Đăng ký thành công !",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                      );
                    navigation.navigate("Signin");
                } else {
                    ToastAndroid.showWithGravity(
                        "Tài Khoản đã tồn tại",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                      );
                }})
                .catch((error) => {
                    ToastAndroid.showWithGravity(
                        "Lỗi ! Không thể kết nối",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                      )});
                 setVisible(true);
            }
    }

  return (
    <View style={{backgroundColor : 'white' , width : '100%' , height: '100%'}}>
        <View style={styles.top}>
            <View style={styles.topleft}>
              <View style={{flexDirection: "row" , alignItems: "center" }}>
                <Icon onPress={() => navigation.goBack()} name="chevron-left" size={30} color ="orange"></Icon>
                <Text style={{color : 'orange' , fontSize : 27, fontWeight:'bold'}}>Đăng Ký</Text>
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
                      placeholderTextColor={'#f6ce79'}
                     placeholder="Nhập SĐT của bạn "
                     onChangeText={setphoneNumber}
                     keyboardType="numeric"></TextInput>
                      {errorsPhone.isValiPhone ? null : <Text style={{color: 'red' ,  marginLeft:10}}>{errorsPhone.Alerts}</Text>}
               
                     <TextInput style={styles.textInputCSS}  secureTextEntry
                      placeholderTextColor={'#f6ce79'}
                      onChangeText={setpassWord}
                     placeholder="Tạo mật khẩu mới có ít nhất 6 ký tự "></TextInput>
                    {errorsPass.isValiPass ? null : <Text style={{color: 'red' ,  marginLeft:10}}>{errorsPass.Alerts}</Text>}

                     <TextInput style={styles.textInputCSS}  secureTextEntry
                      placeholderTextColor={'#f6ce79'}
                      onChangeText={setRePassWord}
                     placeholder="Nhập lại mật khẩu"></TextInput>
                     {errorsRePass.isValiRePass ? null : <Text style={{color: 'red' ,  marginLeft:10}}>{errorsRePass.Alerts}</Text>}

                     <View style={styles.textInputCSS}>
                        <Button title="Đăng Ký"
                                color="orange"
                                onPress={Check}
                        ></Button> 
                     </View>

                     <View style={styles.text_forgot}>
                        <Text style={{textAlign: 'center'}}>Bằng việc Đăng ký , bạn đã đồng ý với<Text style={{color : '#7878e6' , textDecorationLine: 'underline' ,fontWeight: 'bold'}}> Điều Khoản Sử Dụng </Text>của Sales-Social</Text>
                     </View>
               
                     <View style={styles.text_or}>
                        <Text style={{textDecorationLine: 'underline'}}>Hoặc</Text>
                     </View>

                     <View style={{flexDirection: "row" , justifyContent: "center"}}>
                        <SocialIcon type='google' />
                        <SocialIcon type='instagram'/>
                        <SocialIcon type='facebook'/>
                     </View>

                     <View style={styles.text_singUp}>
                        <Text style={{color:'black'}}>Bạn đã có tài khoản? </Text>
                        <Text onPress={() => navigation.navigate('Signin')} style={{color:'#7878e6'}}>Đăng nhập</Text>
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

export default SignUp;

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
        borderRadius : 5,
        borderColor : 'orange' ,
        borderWidth : 1 ,
        marginTop : 10,
        marginLeft : 10,
        marginRight : 10 ,
        color : 'orange'
    },
    text_forgot:{
        margin: 10 , justifyContent: "center", alignItems: "center" , 
    },
    text_or:{
        margin: 10 ,justifyContent: "center", alignItems: "center" 
    },
    text_singUp:{
        margin: 10 ,justifyContent: "center", alignItems: "center" , flexDirection: "row",
    }
});