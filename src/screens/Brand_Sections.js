import { FormControl, Input } from 'native-base';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import AuthHeader from '../components/AuthHeader';
import OtrixDivider from '../components/DividerComponent/Divider';
import ScreenWrapper from '../components/ScreenWrapper';
import {
  GetBrandSections,
  GetBrandSectionspagination
} from '../Store/Actions/Home';
import Colors from '../styles/colors';
import { GlobalStyles } from '../styles/GlobalStyles';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Brand_Sections(props) {
  const [formData, setData] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    props.GetBrandSections(
      props?.route?.params?.item,
      props?.route?.params?.subType,
    );
  }, []);

  const paginatePage = async () => {
    await props.GetBrandSectionspagination(
      props?.route?.params?.item,
      props?.route?.params?.subType,
    );
  };

  const onRefresh = () => {
    setRefreshing(true);

    props.GetBrandSections(
      props?.route?.params?.item,
      props?.route?.params?.subType,
    );

    wait(500).then(() => setRefreshing(false));
  };

  const Bookmark = (item, index) => {
    return (
      <View key={item?.modelId}>
        <TouchableOpacity
          style={{
            marginTop: item.id > 1 ? wp('2%') : 0,
            marginHorizontal: wp('1%'),
            paddingTop: wp('2%'),
          }}
          onPress={() =>
            props.navigation.navigate('Brand_Articles', {
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
                {item.assemblyGroupName}
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
        WriteText={'Brand sections'}
      />
      <OtrixDivider size={'lg'} />
      <View style={{flex: 1, marginHorizontal: wp('6%')}}>
        <FormControl isRequired style={{backgroundColor: '#fff'}}>
          <Input
            variant="outline"
            placeholder="Search Brand Section"
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
              Total {props?.home?.getBrandSection?.length}
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
              keyExtractor={item => item.id}
              data={props?.home?.getBrandSection}
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
  GetBrandSectionspagination,
  GetBrandSections,
})(Brand_Sections);

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
