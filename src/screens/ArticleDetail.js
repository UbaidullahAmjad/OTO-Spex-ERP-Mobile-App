import axios from 'axios';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import AuthHeader from '../components/AuthHeader';
import OtrixDivider from '../components/DividerComponent/Divider';
import ScreenWrapper from '../components/ScreenWrapper';
import {API_URL} from '../constants/configs';
import {AddToCart} from '../Store/Actions/Home';
import Colors from '../styles/colors';
import {GlobalStyles} from '../styles/GlobalStyles';

function ArticleDetail(props) {
  const [Article_Array, SetArticleArray] = React.useState(null);
  const [itemCount, setItemCount] = React.useState(1);

  React.useEffect(() => {
    console.log(
      `${API_URL}articles_view?article_id=${props?.route?.params?.item?.legacyArticleId}8&section_id=${props?.route?.params?.item?.section_id}`,
    );

    var config = {
      method: 'get',
      url: `${API_URL}articles_view?article_id=${props?.route?.params?.item?.legacyArticleId}8&section_id=${props?.route?.params?.item?.section_id}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        SetArticleArray(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [expandedCriteria, setexpandedCriteria] = React.useState(false);
  const [expandedOENumber, setexpandedOENumber] = React.useState(false);
  const [expandedLinkedVehicle, setexpandedLinkedVehicle] =
    React.useState(false);
  const [expandedRepairManuals, setexpandedRepairManuals] =
    React.useState(false);
  const [expandedLabour, setexpandedLabour] = React.useState(false);
  const [expandedAdjustment, setexpandedAdjustment] = React.useState(false);
  const [expandedVideos, setexpandedVideos] = React.useState(false);
  const [expandedManufacturer, setexpandedManufacturer] = React.useState(false);

  const handlePressCriteria = () => setexpandedCriteria(!expandedCriteria);
  const handlePressOEnumber = () => setexpandedOENumber(!expandedOENumber);
  const handlePressLinkedVehicle = () =>
    setexpandedLinkedVehicle(!expandedLinkedVehicle);
  const handlePressRepairManuals = () =>
    setexpandedRepairManuals(!expandedRepairManuals);
  const handlePressLabour = () => setexpandedLabour(!expandedLabour);
  const handlePressAdjustmentData = () =>
    setexpandedAdjustment(!expandedAdjustment);
  const handlePressVideos = () => setexpandedVideos(!expandedVideos);
  const handlePressManufacturer = () =>
    setexpandedManufacturer(!expandedManufacturer);

  return (
    <ScreenWrapper>
      <AuthHeader
        onpress={() => props.navigation.goBack()}
        WriteText={'Article Detail'}
      />

      <ScrollView style={{flex: 1}}>
        {Article_Array != null ? (
          <>
            <View
              style={{
                height: wp('75%'),
                backgroundColor: 'rgba(0,0,0,0.1)',
                width: wp('100%'),
              }}></View>

            <OtrixDivider size={'sm'} />

            <View>
              <View style={[styles.bottomButton]}>
                <View
                  style={{
                    marginHorizontal: wp('2%'),
                    width: wp('60%'),
                  }}>
                  <Text
                    style={[
                      styles.bottomLeftTxt,
                      {color: '#000', fontSize: wp('4%')},
                    ]}>
                    {Article_Array?.article?.articleNumber}
                  </Text>
                  {/* <Text
                    style={[
                      styles.bottomLeftTxt,
                      {
                        fontSize: wp('3.4%'),
                      },
                    ]}>
                    {'FAST'}
                  </Text> */}
                  <Text
                    style={[
                      styles.bottomLeftTxt,
                      {
                        fontSize: wp('3.2%'),
                      },
                    ]}>
                    {Article_Array?.article?.additionalDescription}
                  </Text>
                </View>

                <View
                  style={{
                    height: wp('20%'),
                    width: wp('25%'),
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: 5,
                  }}></View>
              </View>
              <OtrixDivider size={'sm'} />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: wp('6%'),
                }}>
                <Text style={[{color: 'grey', fontSize: wp('4%')}]}>
                  Status{' '}
                  {Article_Array?.article?.quantityPerPartPerPackage > 0 ? (
                    <Ionicons
                      name="checkmark-done-circle"
                      color={'green'}
                      size={wp('4%')}
                    />
                  ) : (
                    <Feather
                      name="alert-circle"
                      color={'red'}
                      size={wp('4%')}
                    />
                  )}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={[styles.plusminus, {marginRight: wp('5%')}]}>
                    <TouchableOpacity
                      onPress={() => {
                        if (itemCount > 1) {
                          setItemCount(itemCount - 1);
                        } else {
                          console.log('item not minus');
                        }
                      }}
                      style={{marginRight: wp('2.5%'), padding: 4}}>
                      <Icon name="minus" style={styles.plusminusTxt} />
                    </TouchableOpacity>
                    <Text style={styles.quantityTxt}>{itemCount}</Text>
                    <TouchableOpacity
                      onPress={() => setItemCount(itemCount + 1)}
                      style={{marginLeft: wp('2.5%'), padding: 4}}>
                      <Icon name="plus" style={styles.plusminusTxt} />
                    </TouchableOpacity>
                  </View>
                  <AntDesign
                    onPress={() =>
                      props.AddToCart(Article_Array?.article, itemCount)
                    }
                    name="shoppingcart"
                    color={'white'}
                    size={wp('6%')}
                    style={{
                      backgroundColor: 'black',
                      elevation: 10,
                      padding: wp('2%'),
                      borderRadius: 5,
                    }}
                  />
                </View>
              </View>
              <OtrixDivider size={'md'} />
              <View style={GlobalStyles.horizontalLine}></View>
              <OtrixDivider size={'md'} />

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: wp('6%'),
                  }}>
                  <Text style={{color: '#000', fontSize: hp('1.8%')}}>
                    Brand
                  </Text>
                  <Text style={{fontSize: hp('1.8%')}}>
                    {Article_Array?.brand?.brandName}
                  </Text>
                </View>
                <OtrixDivider size={'sm'} />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: wp('6%'),
                  }}>
                  <Text style={{color: '#000', fontSize: hp('1.8%')}}>
                    Article number
                  </Text>
                  <Text style={{fontSize: hp('1.8%')}}>
                    {Article_Array?.article?.articleNumber}
                  </Text>
                </View>
                <OtrixDivider size={'sm'} />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: wp('6%'),
                  }}>
                  <Text style={{color: '#000', fontSize: hp('1.8%')}}>
                    Product group
                  </Text>
                  <Text style={{fontSize: hp('1.8%')}}>
                    Brake Pad Set, disc brake
                  </Text>
                </View>
                <OtrixDivider size={'sm'} />

                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: wp('6%'),
                  }}>
                  <Text style={{color: '#000', fontSize: hp('1.8%')}}>
                    GTIN/EAN
                  </Text>
                  <Text style={{fontSize: hp('1.8%')}}>4054224163863</Text>
                </View>
                <OtrixDivider size={'sm'} /> */}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: wp('6%'),
                  }}>
                  <Text style={{color: '#000', fontSize: hp('1.8%')}}>
                    Packing unit
                  </Text>
                  <Text style={{fontSize: hp('1.8%'), color: '#000'}}>
                    {Article_Array?.article?.quantityPerPartPerPackage
                      ? Article_Array?.article?.quantityPerPartPerPackage
                      : '0'}
                  </Text>
                </View>
                <OtrixDivider size={'sm'} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: wp('6%'),
                  }}>
                  <Text style={{color: '#000', fontSize: hp('1.8%')}}>
                    Quantity per packing Unit
                  </Text>
                  <Text style={{fontSize: hp('1.8%')}}>
                    {Article_Array?.article?.quantityPerPackage}
                  </Text>
                </View>
                <OtrixDivider size={'sm'} />
              </View>

              <OtrixDivider size={'md'} />
              {/* <View>
            <List.Accordion
              style={{
                borderTopColor: 'rgba(0,0,0,0.1)',
                borderTopWidth: 1,
                paddingHorizontal: wp('6%'),
              }}
              title="Criteria"
              left={props => <List.Icon {...props} icon="ruler" />}
              expanded={expandedCriteria}
              onPress={handlePressCriteria}
              right={props => (
                <List.Icon
                  {...props}
                  icon={expandedCriteria ? 'minus' : 'plus'}
                />
              )}>
              <FlatList
                data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => {
                  return (
                    <View key={index}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginRight: wp('10%'),
                          borderTopColor: 'rgba(0,0,0,0.1)',
                          borderTopWidth: 1,
                          paddingVertical: wp('2%'),
                        }}>
                        <Text style={{color: '#000', fontSize: hp('1.8%')}}>
                          {'length [mm]'}
                        </Text>
                        <Text style={{fontSize: hp('1.8%')}}>99.2</Text>
                      </View>
                      <OtrixDivider size={'sm'} />
                    </View>
                  );
                }}
              />
            </List.Accordion>

            <List.Accordion
              style={{
                borderTopColor: 'rgba(0,0,0,0.1)',
                borderTopWidth: 1,
                paddingHorizontal: wp('6%'),
              }}
              title="OE number"
              left={props => <List.Icon {...props} icon="ticket" />}
              right={props => (
                <List.Icon
                  {...props}
                  icon={expandedOENumber ? 'minus' : 'plus'}
                />
              )}
              expanded={expandedOENumber}
              onPress={handlePressOEnumber}>
              <FlatList
                data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => {
                  return (
                    <View key={index}>
                      <View
                        style={{
                          marginRight: wp('10%'),
                          borderTopColor: 'rgba(0,0,0,0.1)',
                          borderTopWidth: 1,
                          paddingVertical: wp('2%'),
                        }}>
                        <Text style={{color: '#000', fontSize: hp('1.8%')}}>
                          {'FIAT'}
                        </Text>
                        <OtrixDivider size={'sm'} />
                        <Text
                          style={{
                            fontSize: hp('1.8%'),
                            borderColor: 'rgba(0,0,0,0.1)',
                            borderWidth: 1,
                            width: wp('25%'),
                            paddingHorizontal: wp('1%'),
                            textAlign: 'center',
                            borderRadius: 5,
                          }}>
                          600615057
                        </Text>
                      </View>
                      <OtrixDivider size={'sm'} />
                    </View>
                  );
                }}
              />
            </List.Accordion>

            <List.Accordion
              style={{
                borderTopColor: 'rgba(0,0,0,0.1)',
                borderTopWidth: 1,
                paddingHorizontal: wp('6%'),
              }}
              title="Linked vehicles"
              left={props => <List.Icon {...props} icon="link" />}
              right={props => (
                <List.Icon
                  {...props}
                  icon={expandedLinkedVehicle ? 'minus' : 'plus'}
                />
              )}
              expanded={expandedLinkedVehicle}
              onPress={handlePressLinkedVehicle}>
              <FlatList
                data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => {
                  return (
                    <View
                      key={index}
                      style={{
                        marginRight: wp('10%'),
                        borderTopColor: 'rgba(0,0,0,0.1)',
                        borderTopWidth: 1,
                        paddingVertical: wp('2%'),
                      }}>
                      <View style={[styles.bottomButton]}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text style={styles.bottomLeftTxt}>{'BMW'}</Text>
                        </View>
                        <AntDesign
                          name="right"
                          color={'black'}
                          size={wp('4%')}
                        />
                      </View>
                    </View>
                  );
                }}
              />
            </List.Accordion>

            <List.Accordion
              style={{
                borderTopColor: 'rgba(0,0,0,0.1)',
                borderTopWidth: 1,
                paddingHorizontal: wp('6%'),
              }}
              title="Repair Manuals"
              left={props => <List.Icon {...props} icon="toolbox" />}
              right={props => (
                <List.Icon
                  {...props}
                  icon={expandedRepairManuals ? 'minus' : 'plus'}
                />
              )}
              expanded={expandedRepairManuals}
              onPress={handlePressRepairManuals}>
              <Text>
                NOTE: The possibility to purchase the Mechanical Repair Data is
                only avaialble if you're logged in or are subscribed to the
                premium version of the TecDoc App.
              </Text>
              <OtrixDivider size={'md'} />
            </List.Accordion>

            <List.Accordion
              style={{
                borderTopColor: 'rgba(0,0,0,0.1)',
                borderTopWidth: 1,
                paddingHorizontal: wp('6%'),
              }}
              title="Labour"
              left={props => <List.Icon {...props} icon="tools" />}
              right={props => (
                <List.Icon
                  {...props}
                  icon={expandedLabour ? 'minus' : 'plus'}
                />
              )}
              expanded={expandedLabour}
              onPress={handlePressLabour}>
              <Text>
                NOTE: The possibility to purchase the Mechanical Repair Data is
                only avaialble if you're logged in or are subscribed to the
                premium version of the TecDoc App.
              </Text>
              <OtrixDivider size={'md'} />
            </List.Accordion>

            <List.Accordion
              style={{
                borderTopColor: 'rgba(0,0,0,0.1)',
                borderTopWidth: 1,
                paddingHorizontal: wp('6%'),
              }}
              title="Adjustment data"
              left={props => <List.Icon {...props} icon="folder" />}
              right={props => (
                <List.Icon
                  {...props}
                  icon={expandedAdjustment ? 'minus' : 'plus'}
                />
              )}
              expanded={expandedAdjustment}
              onPress={handlePressAdjustmentData}>
              <Text>
                NOTE: The possibility to purchase the Mechanical Repair Data is
                only avaialble if you're logged in or are subscribed to the
                premium version of the TecDoc App.
              </Text>
              <OtrixDivider size={'md'} />
            </List.Accordion>

            <List.Accordion
              style={{
                borderTopColor: 'rgba(0,0,0,0.1)',
                borderTopWidth: 1,
                paddingHorizontal: wp('6%'),
              }}
              title="Videos"
              left={props => <List.Icon {...props} icon="movie" />}
              right={props => (
                <List.Icon
                  {...props}
                  icon={expandedVideos ? 'minus' : 'plus'}
                />
              )}
              expanded={expandedVideos}
              onPress={handlePressVideos}>
              <Text>https://www.youtube.com/embed/XxsLE8ugrfl</Text>
              <OtrixDivider size={'md'} />
            </List.Accordion>

            <List.Accordion
              style={{
                borderTopColor: 'rgba(0,0,0,0.1)',
                borderTopWidth: 1,
                paddingHorizontal: wp('6%'),
              }}
              title="Manufacturer"
              left={props => <List.Icon {...props} icon="map" />}
              right={props => (
                <List.Icon
                  {...props}
                  icon={expandedManufacturer ? 'minus' : 'plus'}
                />
              )}
              expanded={expandedManufacturer}
              onPress={handlePressManufacturer}>
              <FlatList
                data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) => {
                  return (
                    <View key={index}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginRight: wp('10%'),
                          borderTopColor: 'rgba(0,0,0,0.1)',
                          borderTopWidth: 1,
                          paddingVertical: wp('2%'),
                        }}>
                        <Text style={{color: '#000', fontSize: hp('1.8%')}}>
                          {'length [mm]'}
                        </Text>
                        <Text style={{fontSize: hp('1.8%')}}>99.2</Text>
                      </View>
                      <OtrixDivider size={'sm'} />
                    </View>
                  );
                }}
              />
            </List.Accordion>
          </View> */}
            </View>
          </>
        ) : (
          <ActivityIndicator
            size={'large'}
            color="black"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: wp('50%'),
            }}
          />
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const mapStateToProps = ({home}) => ({
  home,
});

export default connect(mapStateToProps, {
  AddToCart,
})(ArticleDetail);

const styles = StyleSheet.create({
  cartContent: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 0.4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
    marginHorizontal: wp('2%'),
    marginBottom: wp('3%'),
    borderRadius: wp('2%'),
  },
  cartBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    flex: 0.9,
  },
  imageView: {
    flex: 0.3,
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: wp('24%'),
    marginVertical: wp('1%'),
    marginHorizontal: wp('2%'),
    borderRadius: wp('1.5%'),
  },
  image: {
    resizeMode: 'contain',
    height: hp('12.5%'),
    width: wp('21.5%'),
  },
  infromationView: {
    flex: 0.7,
    marginBottom: hp('1.4%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  name: {
    textAlign: 'center',
    color: Colors.secondry_text_color,
    fontSize: wp('3.8%'),
  },
  price: {
    textAlign: 'center',
    color: Colors.link_color,
    lineHeight: hp('4%'),
    fontSize: wp('5%'),
  },
  plusminus: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  plusminusTxt: {
    fontSize: wp('3%'),
    color: Colors.secondry_text_color,
    textAlign: 'center',
  },
  quantityTxt: {
    fontSize: wp('4%'),
    color: Colors.text_color,
    marginHorizontal: wp('1%'),
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: wp('2%'),
    borderRadius: 3,
    textAlign: 'center',
  },
  deleteIcon: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: wp('2%'),
    padding: wp('2%'),
  },
  delete: {
    fontSize: wp('3.6%'),
    color: Colors.secondry_text_color,
  },
  bottomButton: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingVertical: wp('2%'),
    marginHorizontal: wp('4%'),
  },
  bottomLeftTxt: {
    textAlign: 'left',
    flex: 0.9,
  },
});
