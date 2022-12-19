import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AuthHeader from '../components/AuthHeader';
import OtrixDivider from '../components/DividerComponent/Divider';
import ScreenWrapper from '../components/ScreenWrapper';
import Colors from '../styles/colors';
import {GlobalStyles} from '../styles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {
  GetArticlesBySections,
  GetArticlesBySectionsPagination,
  AddToCart,
} from '../Store/Actions/Home';
import {connect} from 'react-redux';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Articles(props) {
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    props.GetArticlesBySections(
      props?.route?.params?.item,
      props?.route?.params?.subType,
    );
  }, []);

  const paginatePage = async () => {
    props.GetArticlesBySectionsPagination(
      props?.route?.params?.item,
      props?.route?.params?.subType,
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    props.GetArticlesBySections(
      props?.route?.params?.item,
      props?.route?.params?.subType,
    );
    wait(2000).then(() => setRefreshing(false));
  };

  const Bookmark = (item, index) => {
    return (
      <View
        style={{marginTop: item.id > 1 ? wp('2%') : 0}}
        key={index}
        activeOpacity={0.7}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('ArticleDetail', {
              item: item,
              subType: props?.route?.params?.subType,
            })
          }
          style={[styles.bottomButton]}>
          <View
            style={{
              height: wp('20%'),
              width: wp('25%'),
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: 5,
            }}></View>
          <View
            style={{
              marginHorizontal: wp('2%'),
              width: wp('60%'),
            }}>
            <Text
              style={[
                styles.bottomLeftTxt,
                {color: 'grey', fontSize: wp('4%')},
              ]}>
              {item.articleNumber}
            </Text>
            {/* <Text
              style={[
                styles.bottomLeftTxt,
                {
                  fontSize: wp('3%'),
                },
              ]}>
              {'FAST'}
            </Text> */}
            <Text
              style={[
                styles.bottomLeftTxt,
                {
                  fontSize: wp('3%'),
                },
              ]}>
              {item?.additionalDescription}
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: wp('2%'),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <View>
              <Text
                style={[
                  {color: 'grey', fontSize: wp('3%'), marginRight: wp('40%')},
                ]}>
                Status{' '}
                {item.quantityPerPartPerPackage > 0 ? (
                  <Ionicons
                    name="checkmark-done-circle"
                    color={'green'}
                    size={wp('3%')}
                  />
                ) : (
                  <Feather name="alert-circle" color={'red'} size={wp('3%')} />
                )}
              </Text>
              <OtrixDivider size={'sm'} />
              <Text
                style={[
                  styles.bottomLeftTxt,
                  {
                    color: '#00aff0',
                    fontSize: wp('3%'),
                  },
                ]}>
                {'Show more'}
              </Text>
            </View> */}
{/* 
            <AntDesign
              name="shoppingcart"
              color={'white'}
              size={wp('6%')}
              onPress={() => props.AddToCart(item, 1)}
              style={{
                backgroundColor: 'black',
                elevation: 10,
                padding: wp('2%'),
                borderRadius: 5,
              }}
            /> */}
          </View>
        </View>

        <OtrixDivider size={'md'} />
        <View style={GlobalStyles.horizontalLine}></View>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <AuthHeader
        onpress={() => props.navigation.goBack()}
        WriteText={'Article search'}
      />

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
              paddingVertical: wp('2%'),
              borderRadius: 2,
            }}>
            Total {props?.home?.VeicleArticleData?.length}
          </Text>
          <OtrixDivider size={'md'} />
          <View style={{flex: 1, marginHorizontal: wp('6%')}}>
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
              data={props?.home?.VeicleArticleData}
              renderItem={({item}, index) => Bookmark(item, index)}
            />
          </View>
        </>
      )}
    </ScreenWrapper>
  );
}

const mapStateToProps = ({home}) => ({
  home,
});

export default connect(mapStateToProps, {
  GetArticlesBySections,
  GetArticlesBySectionsPagination,
  AddToCart,
})(Articles);

const styles = StyleSheet.create({
  bottomButton: {
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingVertical: wp('2%'),
  },
  bottomLeftTxt: {
    textAlign: 'left',
    flex: 0.9,
  },
});
