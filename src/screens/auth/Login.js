import {Button, FormControl, Input} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import OtrixDivider from '../../components/DividerComponent/Divider';
import ScreenWrapper from '../../components/ScreenWrapper';
import {Colors, PRIMARY_COLOR} from '../../styles/colors';
import {GlobalStyles} from '../../styles/GlobalStyles';

function Login(props) {
  const [formData, setData] = React.useState({
    email: 'atiwef@gmail.com',
    password: 'adminadminadmin',
  });
  const [state, setDatapassword] = React.useState({secureEntry: true});

  const _handleLogin = async () => {
    const {email, password} = formData;
    const apiData = {
      email: email,
      password: password,
    };

    if (email != undefined && password != undefined) {
    }
  };

  return (
    <ScreenWrapper>
      <OtrixDivider size={'lg'} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: wp('10%'),
        }}>
        <Text style={[GlobalStyles.authtabbarText]}>Log in</Text>
        <OtrixDivider size={'sm'} />
        <Text style={GlobalStyles.authSubText}>
          Please login with your user data
        </Text>
        <OtrixDivider size={'lg'} />
        <OtrixDivider size={'lg'} />
        <View style={{flex: 1}}>
          {/* Login Form Start from here */}
          <FormControl isRequired>
            <Input
              value={formData.email}
              variant="outline"
              placeholder="Email / User ID"
              style={[GlobalStyles.textInputStyle]}
              onChangeText={value => setData({...formData, email: value})}
            />
            <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
              Username is Required
            </FormControl.ErrorMessage>
          </FormControl>
          <OtrixDivider size={'md'} />
          <FormControl isRequired style={{backgroundColor: '#fff'}}>
            <Input
              value={formData.password}
              variant="outline"
              placeholder="Password"
              style={[GlobalStyles.textInputStyle]}
              onChangeText={value => setData({...formData, password: value})}
              secureTextEntry={state.secureEntry}
              InputRightElement={
                <TouchableOpacity
                  onPress={() =>
                    setDatapassword({
                      ...state,
                      secureEntry: !state.secureEntry,
                    })
                  }
                  style={[
                    {
                      padding: wp('3%'),
                      backgroundColor: '#F7F9F8',
                    },
                  ]}>
                  <Icon
                    name={state.secureEntry == true ? 'eye' : 'eye-off'}
                    size={wp('3%')}
                    color={Colors.secondry_text_color}
                  />
                </TouchableOpacity>
              }
            />
            <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
              Password is Required
            </FormControl.ErrorMessage>
          </FormControl>

          <OtrixDivider size={'md'} />
          <OtrixDivider size={'md'} />

          {/* <CustomeButton title={'Log In'} onpress={() => _handleLogin()} /> */}
          <Button
            size="md"
            variant="solid"
            bg={'rgba(0,0,0,0.8)'}
            onPress={() => props.navigation.navigate('BottomStack')}
            style={GlobalStyles.button}>
            <Text style={GlobalStyles.buttonText}>Login in</Text>
          </Button>
          <OtrixDivider size={'md'} />
          <OtrixDivider size={'md'} />

          <View style={GlobalStyles.horizontalLine}></View>
          <TouchableOpacity style={[styles.bottomButton]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome
                style={{marginRight: wp('2%')}}
                name="user"
                color={'black'}
                size={wp('6%')}
              />
              <Text style={styles.bottomLeftTxt}>
                Register to the TecDoc WebCatalogue
              </Text>
            </View>
            <AntDesign name="right" color={'black'} size={wp('3%')} />
          </TouchableOpacity>
          <View style={GlobalStyles.horizontalLine}></View>

          <OtrixDivider size={'md'} />
        </View>
        <OtrixDivider size={'md'} />
      </View>
    </ScreenWrapper>
  );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Login);

const styles = StyleSheet.create({
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingVertical: wp('2%'),
  },
  bottomLeftTxt: {
    textAlign: 'left',
    fontSize: wp('3.8%'),
    flex: 0.9,
  },
  forgotPassword: {
    fontSize: hp('1.4%'),
    textAlign: 'right',
    color: '#FF3B30',
    padding: 5,
    fontFamily: 'Poppins-Regular',
  },
  registerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerTxt: {
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: hp('1.6%'),
  },
  signupTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp('1.6%'),
    textAlign: 'right',
    color: PRIMARY_COLOR,
  },
});
