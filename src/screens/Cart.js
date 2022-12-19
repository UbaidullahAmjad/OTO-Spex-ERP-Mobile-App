import {Button} from 'native-base';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import AuthHeader from '../components/AuthHeader';
import CartView from '../components/CartView';
import OtrixDivider from '../components/DividerComponent/Divider';
import ScreenWrapper from '../components/ScreenWrapper';
import Colors from '../styles/colors';
import {GlobalStyles} from '../styles/GlobalStyles';

function Cart(props) {
  React.useEffect(() => {}, [props.home.addToCart]);
  return (
    <ScreenWrapper>
      <AuthHeader
        onpress={() => props.navigation.goBack()}
        WriteText={'Shopping cart'}
        backButtonOff
        cart
        onpressNext={() => props.navigation.navigate('deliveryAddress')}
      />
      <OtrixDivider size={'sm'} />

      <ScrollView style={{flex: 1, marginHorizontal: wp('2%')}}>
        <CartView
          navigation={props.navigation}
          data={props?.home?.addToCart?.cartProducts}
        />
      </ScrollView>

      {props?.home?.addToCart?.cartProducts.length == 0 ||
        (props?.home?.addToCart == null && (
          <View style={styles.noRecord}>
            <Text style={styles.emptyTxt}>Cart is empty!</Text>
            <Button
              size="lg"
              variant="solid"
              bg={'#004AAC'}
              onPress={() => props.navigation.navigate('HomeScreen')}
              style={[
                GlobalStyles.button,
                {
                  marginHorizontal: wp('2%'),
                  marginBottom: hp('2.5%'),
                  marginTop: hp('1%'),
                },
              ]}>
              <Text style={GlobalStyles.buttonText}>
                <Icon
                  name={'md-cart-sharp'}
                  color={Colors.white}
                  style={{fontSize: wp('4.5%')}}
                />{' '}
                Shop Now
              </Text>
            </Button>
          </View>
        ))}
    </ScreenWrapper>
  );
}

const mapStateToProps = ({home}) => ({
  home,
});

export default connect(mapStateToProps, {})(Cart);

const styles = StyleSheet.create({
  noRecord: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 20,
  },
  emptyTxt: {
    fontSize: wp('6%'),
    marginVertical: hp('1.5%'),
    color: Colors.secondry_text_color,
  },
});
