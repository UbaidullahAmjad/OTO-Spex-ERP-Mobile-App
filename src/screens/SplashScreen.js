import React, {useEffect} from 'react';
import {View, Animated, Easing, LogBox, Image} from 'react-native';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../styles/colors';

function SplashScreen(props) {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('BottomTab');
    }, 3000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/images/new_logo.jpeg')}
        resizeMode="contain"
        style={{height: wp('10%')}}
      />
    </View>
  );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(SplashScreen);
