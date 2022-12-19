import React from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
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
import {connect} from 'react-redux';
import {
  GetEngineTypesByModels,
  GetEngineTypesByModelsPagination,
} from '../Store/Actions/Home';
import {RefreshControl} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function ModelTypes(props) {
  const [formData, setData] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    props?.GetEngineTypesByModels(
      props?.route?.params?.item,
      props?.route?.params?.subType,
    );
  }, []);

  const paginatePage = async () => {
    props?.GetEngineTypesByModelsPagination(
      props?.route?.params?.item,
      props?.route?.params?.subType,
    );
  };

  const onRefresh = () => {
    setRefreshing(true);

    props?.GetEngineTypesByModels(
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
          }}
          onPress={() =>
            props.navigation.navigate('Select', {
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
                {item.description}
              </Text>
              {/* <Text
              style={[
                styles.bottomLeftTxt,
                {
                  fontSize: wp('3.5%'),
                },
              ]}>
              {'Body type: Convertible'}
            </Text> */}
              <Text
                style={[
                  styles.bottomLeftTxt,
                  {
                    fontSize: wp('3.5%'),
                  },
                ]}>
                {`${item.beginYearMonth} -- ${
                  item.endYearMonth ? item.endYearMonth : 'NA'
                }`}
              </Text>
              {/* <Text
              style={[
                styles.bottomLeftTxt,
                {
                  fontSize: wp('3.5%'),
                },
              ]}>
              {'Engine Code: 312 A1.000'}
            </Text> */}
              {/* <Text
              style={[
                styles.bottomLeftTxt,
                {
                  fontSize: wp('3.5%'),
                },
              ]}>
              {'Performance: 135 hp / 99 kw'}
            </Text>
            <Text
              style={[
                styles.bottomLeftTxt,
                {
                  fontSize: wp('3.5%'),
                },
              ]}>
              {'Capacity: 1368 cm'}
            </Text>
            <Text
              style={[
                styles.bottomLeftTxt,
                {
                  fontSize: wp('3.5%'),
                },
              ]}>
              {'Engine type: Petrol Engine'}
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
        WriteText={'Types'}
      />
      <OtrixDivider size={'lg'} />
      <View style={{flex: 1, marginHorizontal: wp('6%')}}>
        <FormControl isRequired style={{backgroundColor: '#fff'}}>
          <Input
            variant="outline"
            placeholder="Search Type"
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
              Total {props?.home?.VehicleEngineTypeData?.length}
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
              data={props?.home?.VehicleEngineTypeData}
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
  GetEngineTypesByModels,
  GetEngineTypesByModelsPagination,
})(ModelTypes);

const styles = StyleSheet.create({
  bottomButton: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
