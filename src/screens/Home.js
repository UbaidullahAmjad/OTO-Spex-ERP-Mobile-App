import React from 'react';
import {
  Dimensions,
  FlatList,
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
import {FormControl, Input} from 'native-base';
import {connect} from 'react-redux';
import {getVehicleData, getVehiclePagination} from '../Store/Actions/Home';
import {ActivityIndicator} from 'react-native';
import {RefreshControl} from 'react-native';

const {width} = Dimensions.get('window');

const headers = ['PC', 'LVC', 'Motorcycle'];

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Home(props) {
  const [refreshing, setRefreshing] = React.useState(false);

  const [formData, setData] = React.useState({});
  const [active, setActive] = React.useState(0);

  const headerScrollView = React.useRef();
  const itemScrollView = React.useRef();
  React.useEffect(() => {
    headerScrollView.current.scrollToIndex({index: active, viewPosition: 0.5});
  }, [active]);
  const onPressHeader = index => {
    itemScrollView.current.scrollToIndex({index});
    setActive(index);
  };
  const onMomentumScrollEnd = e => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (active != newIndex) {
      setActive(newIndex);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);

    let dataType = 'V';
    if (active == 0) {
      dataType = 'V';
    } else if (active == 1) {
      dataType = 'L';
    } else {
      dataType = 'B';
    }

    props.getVehicleData(dataType);

    wait(2000).then(() => setRefreshing(false));
  };

  React.useEffect(() => {
    let dataType = 'V';
    if (active == 0) {
      dataType = 'V';
    } else if (active == 1) {
      dataType = 'L';
    } else {
      dataType = 'B';
    }

    props.getVehicleData(dataType);
  }, [active]);

  const paginatePage = async () => {
    let dataType = 'V';
    if (active == 0) {
      dataType = 'V';
    } else if (active == 1) {
      dataType = 'L';
    } else {
      dataType = 'B';
    }

    await props.getVehiclePagination(dataType);
  };

  const Bookmark = (item, index) => {
    return (
      <View
        key={index}
        style={{
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Model', {
              item: item,
              subType: active == 0 ? 'V' : active == 1 ? 'L' : 'B',
            })
          }
          activeOpacity={0.7}>
          <View style={[styles.bottomButton]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.bottomLeftTxt}>{item?.manuName}</Text>
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
        WriteText={'Vehicle search'}
        backButtonOff
      />

      <FlatList
        data={headers}
        ref={headerScrollView}
        keyExtractor={item => item}
        horizontal
        style={styles.headerScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View kye={index}>
            <TouchableOpacity
              onPress={() => onPressHeader(index)}
              key={item}
              style={[
                styles.headerItem,
                {
                  borderBottomColor: '#000',
                  borderBottomWidth: active == index ? 3 : 0,
                  borderRadius: 5,
                },
              ]}>
              <Text style={{color: active == index ? 'white' : '#B6B5B6'}}>
                {item}
              </Text>
            </TouchableOpacity>
            {active == index && <View style={styles.headerBar} />}
          </View>
        )}
      />

      <FlatList
        data={headers}
        ref={itemScrollView}
        keyExtractor={item => item}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({item, index}) => (
          <View key={index} style={styles.mainItem}>
            <FormControl isRequired style={{backgroundColor: '#fff'}}>
              <Input
                variant="outline"
                placeholder="Search Vehicles"
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
                  Total {props?.home?.getVehicleData?.length}
                </Text>

                <FlatList
                  nestedScrollEnabled
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
                  data={props?.home?.getVehicleData}
                  renderItem={({item}, index) => Bookmark(item, index)}
                />
              </>
            )}
          </View>
        )}
      />
    </ScreenWrapper>
  );
}

const mapStateToProps = ({home}) => ({
  home,
});

export default connect(mapStateToProps, {
  getVehicleData,
  getVehiclePagination,
})(Home);

const styles = StyleSheet.create({
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingVertical: wp('2%'),
    paddingBottom: wp('4%'),
  },
  bottomLeftTxt: {
    color: '#000',
    textAlign: 'left',
    fontSize: wp('4%'),
    flex: 0.9,
  },
  headerScroll: {
    flexGrow: 0,
    paddingHorizontal: 5,
    paddingLeft: wp('5%'),
    backgroundColor: '#004AAC',
  },
  headerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingVertical: wp('4%'),
    paddingHorizontal: 10,
  },
  mainItem: {
    marginTop: wp('5%'),
    width: width,
    paddingHorizontal: wp('4%'),
  },
  headerBar: {
    height: 2,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
  },
});
