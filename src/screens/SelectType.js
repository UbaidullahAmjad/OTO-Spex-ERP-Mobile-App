import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AuthHeader from '../components/AuthHeader';
import OtrixDivider from '../components/DividerComponent/Divider';
import ScreenWrapper from '../components/ScreenWrapper';
import Colors from '../styles/colors';
import {GlobalStyles} from '../styles/GlobalStyles';
import {FormControl, Input} from 'native-base';
import {List} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  GetSectionsByEngine,
  GetSectionsByEnginePagination,
  GetBrands,
  GetBrandspaginationCount,
} from '../Store/Actions/Home';
import {RefreshControl} from 'react-native';

const {width} = Dimensions.get('window');

const headers = ['Assembly group', 'Brand'];

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function SelectType(props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

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
    if (active == 0) {
      props?.GetSectionsByEngine(
        props?.route?.params?.item,
        props?.route?.params?.subType,
      );
    } else {
      props.GetBrands();
    }
    wait(2000).then(() => setRefreshing(false));
  };

  React.useEffect(() => {
    if (active == 0) {
      props?.GetSectionsByEngine(
        props?.route?.params?.item,
        props?.route?.params?.subType,
      );
    } else {
      props.GetBrands();
    }
  }, [active]);

  const paginatePage = async () => {
    props?.GetSectionsByEnginePagination(
      props?.route?.params?.item,
      props?.route?.params?.subType,
    );
  };

  const getBrandsPaginatION = async () => {
    props.GetBrandspaginationCount();
  };

  const Bookmark1 = (item, index) => {
    return (
      <View
        key={index}
        style={{
          marginTop: 10,
          borderRadius: 5,
        }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Brand_Section', {
              item: item,
              subType: props?.route?.params?.subType,
            })
          }
          activeOpacity={0.7}>
          <View style={[styles.bottomButton]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.bottomLeftTxt}>{item.brandName}</Text>
            </View>
            <AntDesign
              name="right"
              color={'black'}
              size={widthPercentageToDP('4%')}
            />
          </View>
          <View style={GlobalStyles.horizontalLine}></View>
        </TouchableOpacity>
      </View>
    );
  };

  const Bookmark = (item, index) => {
    return (
      <View
        key={index}
        style={{
          marginTop: 10,
          borderRadius: 5,
        }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Articles', {
              item: item,
              subType: props?.route?.params?.subType,
            })
          }
          activeOpacity={0.7}>
          <View style={[styles.bottomButton]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.bottomLeftTxt}>{item.assemblyGroupName}</Text>
            </View>
            <AntDesign
              name="right"
              color={'black'}
              size={widthPercentageToDP('4%')}
            />
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
        WriteText={'Select'}
      />
      <FlatList
        data={headers}
        ref={headerScrollView}
        keyExtractor={item => item}
        horizontal
        style={styles.headerScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={item => item}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={
          ({item, index}) =>
            active == 1 ? (
              <View key={item} style={styles.mainItem}>
                <FormControl isRequired style={{backgroundColor: '#fff'}}>
                  <Input
                    variant="outline"
                    placeholder="Search ..."
                    borderRadius={10}
                    style={[
                      GlobalStyles.textInputStyle,
                      {height: widthPercentageToDP('10%')},
                    ]}
                    onChangeText={value =>
                      setData({...formData, password: value})
                    }
                    InputLeftElement={
                      <AntDesign
                        name={'search1'}
                        size={widthPercentageToDP('4%')}
                        color={Colors.secondry_text_color}
                        style={{marginLeft: widthPercentageToDP('2%')}}
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
                        paddingVertical: widthPercentageToDP('1%'),
                        borderRadius: 2,
                      }}>
                      Total {props?.home?.getBrands?.length}
                    </Text>

                    <FlatList
                      nestedScrollEnabled
                      onEndReached={() => {
                        getBrandsPaginatION();
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
                      data={props?.home?.getBrands}
                      renderItem={({item}, index) => Bookmark1(item, index)}
                    />
                  </>
                )}
              </View>
            ) : (
              <View key={item} style={styles.mainItem}>
                <FormControl isRequired style={{backgroundColor: '#fff'}}>
                  <Input
                    variant="outline"
                    placeholder="Search ..."
                    borderRadius={10}
                    style={[
                      GlobalStyles.textInputStyle,
                      {height: widthPercentageToDP('10%')},
                    ]}
                    onChangeText={value =>
                      setData({...formData, password: value})
                    }
                    InputLeftElement={
                      <AntDesign
                        name={'search1'}
                        size={widthPercentageToDP('4%')}
                        color={Colors.secondry_text_color}
                        style={{marginLeft: widthPercentageToDP('2%')}}
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
                        paddingVertical: widthPercentageToDP('1%'),
                        borderRadius: 2,
                      }}>
                      Total {props?.home?.VehicleSectionData?.length}
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
                      keyExtractor={(item, index) => index}
                      data={props?.home?.VehicleSectionData}
                      renderItem={({item}, index) => Bookmark(item, index)}
                    />
                  </>
                )}
              </View>
            )

          // <View key={item} style={styles.mainItem}>
          //   <List.Accordion
          //     title="Controlled Accordion"
          //     left={props => (
          //       <List.Icon
          //         {...props}
          //         icon={expanded ? 'minus' : 'plus'}
          //         color={expanded ? 'black' : 'white'}
          //         style={{
          //           backgroundColor: expanded ? 'white' : 'black',
          //           borderRadius: 5,
          //           borderColor: 'black',
          //           borderWidth: expanded ? 0.5 : 0,
          //         }}
          //       />
          //     )}
          //     onPress={handlePress}
          //     right={props => null}
          //     expanded={expanded}>
          //     <List.Item
          //       onPress={() => props.navigation.navigate('Articles')}
          //       title="First item"
          //     />
          //     <List.Item
          //       onPress={() => props.navigation.navigate('Articles')}
          //       title="Second item"
          //     />
          //   </List.Accordion>
          // </View>
        }
      />
    </ScreenWrapper>
  );
}

const mapStateToProps = ({home}) => ({
  home,
});

export default connect(mapStateToProps, {
  GetSectionsByEngine,
  GetSectionsByEnginePagination,
  GetBrands,
  GetBrandspaginationCount,
})(SelectType);

const styles = StyleSheet.create({
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingVertical: widthPercentageToDP('2%'),
    paddingBottom: widthPercentageToDP('4%'),
  },
  bottomLeftTxt: {
    textAlign: 'left',
    color: '#000',
    fontSize: widthPercentageToDP('4%'),
    flex: 0.9,
  },
  headerScroll: {
    flexGrow: 0,
    paddingHorizontal: 5,
    paddingLeft: widthPercentageToDP('5%'),
    backgroundColor: '#004AAC',
  },
  headerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingVertical: widthPercentageToDP('4%'),
    paddingHorizontal: 10,
  },
  mainItem: {
    marginTop: widthPercentageToDP('5%'),
    width: width,
    paddingHorizontal: 20,
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
