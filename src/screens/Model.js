import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import AuthHeader from '../components/AuthHeader';
import OtrixDivider from '../components/DividerComponent/Divider';
import ScreenWrapper from '../components/ScreenWrapper';
import {FormControl, Input} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GlobalStyles} from '../styles/GlobalStyles';
import Colors from '../styles/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  GetModelByManufacture,
  GetModelByManufacturePagination,
} from '../Store/Actions/Home';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Model(props) {
  const [formData, setData] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    props.GetModelByManufacture(
      props?.route?.params?.item,
      props?.route?.params?.subType,
    );
  }, []);

  const paginatePage = async () => {
    await props.GetModelByManufacturePagination(
      props?.route?.params?.item,
      props?.route?.params?.subType,
    );
  };

  const onRefresh = () => {
    setRefreshing(true);

    props.GetModelByManufacture(
      props?.route?.params?.item,
      props?.route?.params?.subType,
    );

    wait(500).then(() => setRefreshing(false));
  };

  const Bookmark = (item, index) => {
    return (
      <View key={index}>
        <TouchableOpacity
          style={{
            marginTop: item.id > 1 ? wp('2%') : 0,
            marginHorizontal: wp('1%'),
            paddingTop: wp('2%'),
          }}
          onPress={() =>
            props.navigation.navigate('Types', {
              item: item,
              subType: props?.route?.params?.subType,
            })
          }
          activeOpacity={0.7}>
          <View style={[styles.bottomButton]}>
            <View>
              <Text
                style={[
                  styles.bottomLeftTxt,
                  {fontSize: wp('4%'), color: '#000'},
                ]}>
                {item.modelname}
              </Text>
              {/* <Text
              style={[
                styles.bottomLeftTxt,
                {
                  fontSize: wp('3.4%'),
                },
              ]}>
              {'2016 - present'}
            </Text> */}
            </View>
            <AntDesign name="right" color={'black'} size={wp('4%')} />
          </View>
          <View style={GlobalStyles.horizontalLine}></View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <AuthHeader
        onpress={() => props.navigation.goBack()}
        WriteText={'Model'}
      />
      <OtrixDivider size={'lg'} />
      <View style={{flex: 1, marginHorizontal: wp('6%')}}>
        <FormControl isRequired style={{backgroundColor: '#fff'}}>
          <Input
            variant="outline"
            placeholder="Search Model"
            borderRadius={10}
            style={[GlobalStyles.textInputStyle, {height: wp('10%')}]}
            onChangeText={value => setData({...formData, password: value})}
            InputLeftElement={
              <AntDesign
                name={'search1'}
                size={wp('4%')}
                color={Colors.secondry_text_color}
                style={{marginLeft: wp('2%')}}
              />
            }
          />
          <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
            Error Name
          </FormControl.ErrorMessage>
        </FormControl>

        <OtrixDivider size={'md'} />

        {props.home.LoaderValue ? (
          <ActivityIndicator
            size={'large'}
            color="black"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        ) : (
          <>
            <Text
              style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                textAlign: 'center',
                paddingVertical: wp('1%'),
                borderRadius: 2,
              }}>
              Total {props?.home?.VehicleModelData?.length}
            </Text>
            <OtrixDivider size={'md'} />

            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              onEndReached={() => {
                paginatePage();
              }}
              contentContainerStyle={{paddingBottom: 40}}
              ListFooterComponent={() => {
                return props?.home?.LoaderFooterPagination ? (
                  <>
                    <OtrixDivider size={'md'} />
                    <ActivityIndicator size={'small'} color="black" />
                    <OtrixDivider size={'md'} />
                  </>
                ) : null;
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              data={props?.home?.VehicleModelData}
              renderItem={({item}, index) => Bookmark(item, index)}
            />
          </>
        )}
      </View>
    </ScreenWrapper>
  );
}

const mapStateToProps = ({home}) => ({
  home,
});

export default connect(mapStateToProps, {
  GetModelByManufacturePagination,
  GetModelByManufacture,
})(Model);

const styles = StyleSheet.create({
  bottomButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingVertical: wp('2%'),
    paddingBottom: wp('4%'),
  },
  bottomLeftTxt: {
    textAlign: 'left',
    flex: 0.9,
  },
});
