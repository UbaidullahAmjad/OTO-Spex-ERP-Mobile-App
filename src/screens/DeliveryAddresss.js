import React from 'react';
import {StyleSheet} from 'react-native';
import AddAdressComponent from '../components/AddAdressComponent';
import AuthHeader from '../components/AuthHeader';
import OtrixDivider from '../components/DividerComponent/Divider';
import ScreenWrapper from '../components/ScreenWrapper';

export default function DeliveryAddress(props) {
  return (
    <ScreenWrapper>
      <AuthHeader
        onpress={() => props.navigation.goBack()}
        WriteText={'Delivery Address'}
      />
      <OtrixDivider size={'sm'} />

      <AddAdressComponent navigation={props.navigation} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
