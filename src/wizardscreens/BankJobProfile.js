import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Linking,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { InspectionDetails } from '../../export';
import {
  Container,
  DarkTextLarge,
  DarkTextMedium,
  DarkTextSmall,
  FadeTextMedium,
  ItemContainer,
  MainContainer,
} from '../components/StyledComponent';
import { globalStyles, height, width, THEME_COLOR } from '../utils/Style';
import ImageViewer from 'react-native-image-zoom-viewer';
import { getDetailJob } from '../services/Api';
import { useNavigation } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const images = {
  before_image: [
    'https://www.craftslane.com/image/cache/catalog/home-accents/5LS03BJ18G/5LS03BJ18G_1-400x400.png',
  ],
  after_image: [
    'https://www.craftslane.com/image/cache/catalog/home-accents/5LS03GP04G/5LS03GP04G_1-400x400.png',
    'https://www.craftslane.com/image/cache/catalog/home-accents/1015W12/1015W12_1-400x400.png',
  ],
  bill_image: [
    'https://www.craftslane.com/image/cache/catalog/home-accents/5LS03CD14G/5LS03CD14G_1-400x400.png',
    'https://www.craftslane.com/image/cache/catalog/home-accents/5LS03BJ18G/5LS03BJ18G_1-400x400.png',
  ],
};
export default function BankJobProfile({ route }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageName, setImageName] = useState('');
  const [data, setData] = useState([]);
  const [estimateTotal, setEstimateTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { id } = route.params;

  const [iconsName, setIconsName] = useState(['clipboard-text-clock','cellphone-check','bank-check']);
  const [ statusName, setStatusName] = useState(['Pending','Visit Done','Work Done'])
  const [ StatusColor, setStatusColor] = useState(['#FF605C','#FFBD44','#00CA4E'])
  const [ StatusLightColor, setStatusLightColor] = useState(['#f7dfdf','#fcf3e1','#d3f2df'])
  const [status,setStatus] = useState(0);

  console.log("id => ", id);
  const openBrowser = url => {
    // Check if the URL is not empty
    if (url && url.trim() !== '') {
      // Check if the Linking module is supported
      if (Linking.canOpenURL(url)) {
        // Open the URL in the default browser
        Linking.openURL(url);
      } else {
        // Handle the case where the URL cannot be opened
        console.log(`Cannot open URL: ${url}`);
      }
    } else {
      // Handle the case where the URL is empty
      console.log('URL is empty');
    }
  };

  const toggleModal = (index, name) => {
    setImageName(name);
    setSelectedImageIndex(index);
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getData();

  }, []);

  const getData = async () => {
    // console.log('aerrrrr => ', val.id);
    try {
      setLoading(true);
      const response = await getDetailJob({ id });

      // console.log('data =>', response.data.data.data);

      if (response.data.data.code != undefined && response.data.data.code) {
        setData(response.data.data.data);
        const total_price = calculateTotalCost(response.data.data.data.material);
        setEstimateTotal(total_price);
      } else {
      }
    } catch (error) {
      console.log('error ', error);
    } finally {
      // console.log('finally...............');
      setLoading(false);
      setRefreshing(false);
    }
  };
  const calculateTotalCost = (data) => {
    let totalCost = 0;

    data.forEach(item => {
      const price = parseFloat(item.price); // Convert price to float
      const quantity = item.quantity;
      totalCost += price * quantity;
    });

    return totalCost;
  }
  // console.log('data h=>', data.images);
  const onRefresh = () => {
    // console.log('is ref');
    setRefreshing(true);
    getData();
  };

  return (
    <MainContainer
      style={[
        { backgroundColor: 'transparent', width: '100%' },
        globalStyles.flexBoxJustify,
      ]}>
      {/* <ImageBackground
        source={require('../assets/images/background_logo_medium.jpg')}
        style={{ flex: 1 }}> */}
      {
        loading ? (
          <View
            style={[
              {
                backgroundColor: 'transparent',
                flex: 1,
                width: width,
                height: width,
              },
              globalStyles.flexBox,
            ]}>
            <ActivityIndicator size={'large'} color={THEME_COLOR} />
            <Text>Loading...</Text>
          </View>
        ) : (
          <View>
            <FlatList
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              ListEmptyComponent={() =>
                <View
                  style={[
                    {
                      flex: 1,
                      backgroundColor: 'transparent',
                      height: 100
                    },
                    globalStyles.flexBox,
                  ]}>
                  <DarkTextMedium >Job History List Is Empty!</DarkTextMedium>
                </View>

              }
              ListHeaderComponent={() => (
                <View
                  style={[
                    {
                      width: '100%',
                      backgroundColor: 'transparent',

                    },
                  ]}>
                  <View
                    style={[
                      {
                        width: '100%',
                        backgroundColor: 'transparent',
                        marginTop: 10,
                      },
                      globalStyles.rowContainer,
                    ]}>
                    <TouchableOpacity
                      onPress={() => toggleModal(0, 'before_images')}
                      style={[
                        {
                          backgroundColor: 'transparent',
                          width: '50%',
                          padding: 5,
                        },
                        globalStyles.flexBox,
                      ]}>
                      <DarkTextLarge>Before Image</DarkTextLarge>
                      <View style={{ backgroundColor: 'transparent', padding: 10 }}>
                        <Image
                          source={{
                            uri: data.images != undefined ?
                              (data.images.before_images != undefined && data.images.before_images[0] != undefined && data.images.before_images[0] != "") ? data.images?.before_images[0] :
                                'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg' : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
                          }}
                          style={{
                            width: width / 2 - 20,
                            height: height / 5,
                            borderRadius: 10,
                            borderWidth: .2,
                            borderColor: 'grey'
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => toggleModal(0, 'after_images')}
                      style={[
                        {
                          backgroundColor: 'transparent',
                          width: '50%',
                          padding: 5,
                        },
                        globalStyles.flexBox,
                      ]}>
                      <DarkTextLarge>After Image</DarkTextLarge>
                      <View style={{ backgroundColor: 'transparent', padding: 10 }}>
                        <Image
                          source={{
                            uri: data.images != undefined ? (data.images.after_images != undefined && data.images.after_images[0] != undefined && data.images.after_images[0] != "") ? data.images.after_images[0] : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg' : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
                          }}
                          style={{
                            width: width / 2 - 20,
                            height: height / 5,
                            borderRadius: 10,
                            borderWidth: .2,
                            borderColor: 'grey'
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={[{ width: '100%', backgroundColor: THEME_COLOR, padding: 10 }, globalStyles.flexBoxJustify]}><DarkTextLarge style={{ color: 'white', marginLeft: 10 }}>Job History</DarkTextLarge></View>
                </View>
              )}
              ListFooterComponent={() => (
                <View
                  style={[
                    {
                      width: '100%',
                      backgroundColor: 'transparent',
                      marginTop: 10,
                    },
                  ]}>
                  <FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListEmptyComponent={() =>
                      <View
                        style={[
                          {
                            flex: 1,
                            backgroundColor: 'transparent',
                            height: 100
                          },
                          globalStyles.flexBox,
                        ]}>
                        <DarkTextMedium >Estimate List Is Empty!</DarkTextMedium>
                      </View>
                    }
                    ListHeaderComponent={() => (
                      <View
                        style={[
                          {
                            width: '100%',
                            backgroundColor: 'transparent',

                          },
                        ]}>
                        <View style={[{ width: '100%', backgroundColor: THEME_COLOR, padding: 10 }, globalStyles.flexBoxJustify]}><DarkTextLarge style={{ color: 'white', marginLeft: 10 }}>Rough Estimate</DarkTextLarge></View>
                      </View>
                    )}
                    ListFooterComponent={() => (
                      <Container>
                        <View style={{ width: '90%', backgroundColor: 'transparent' }}>
                          <DarkTextLarge>Total : {"₹ " + parseInt(estimateTotal)}</DarkTextLarge>
                        </View>
                      </Container>
                    )}
                    data={data?.material}
                    renderItem={({ item, index }) => (
                      <ItemContainer style={{ width: '95%' }} key={index}>
                        <View style={[globalStyles.rowContainer]}>
                          <View
                            style={[
                              {
                                width: '100%',
                                backgroundColor: 'transparent',
                                paddingHorizontal: 10,
                              },
                            ]}>
                            <View
                              style={[
                                { width: '100%', backgroundColor: 'transparent' },
                                globalStyles.rowContainer,
                                globalStyles.flexBox,
                              ]}>
                              <View
                                style={[
                                  { width: '100%', backgroundColor: 'transparent' },
                                  globalStyles.rowContainer,
                                ]}>
                                <FadeTextMedium style={{ padding: 5 }}>
                                  Estimate :
                                </FadeTextMedium>
                                <DarkTextMedium style={{ width: '80%', padding: 5 }}>
                                  {item.estimate}
                                </DarkTextMedium>
                              </View>
                            </View>
                            <View
                              style={[
                                { width: '100%', backgroundColor: 'transparent' },
                                globalStyles.rowContainer,
                                globalStyles.flexBox,
                              ]}>
                              <View
                                style={[
                                  { width: '100%', backgroundColor: 'transparent' },
                                  globalStyles.rowContainer,
                                ]}>
                                <FadeTextMedium style={{ padding: 5 }}>
                                  Price :
                                </FadeTextMedium>
                                <DarkTextMedium style={{ width: '80%', padding: 5 }}>
                                  {item.price}
                                </DarkTextMedium>
                              </View>
                            </View>
                            <View
                              style={[
                                { width: '100%', backgroundColor: 'transparent' },
                                globalStyles.rowContainer,
                                globalStyles.flexBox,
                              ]}>
                              <View
                                style={[
                                  { width: '100%', backgroundColor: 'transparent' },
                                  globalStyles.rowContainer,
                                ]}>
                                <FadeTextMedium style={{ padding: 5 }}>
                                  Quantity :
                                </FadeTextMedium>
                                <DarkTextMedium style={{ width: '80%', padding: 5 }}>
                                  {item.quantity}
                                </DarkTextMedium>
                              </View>
                            </View>
                          </View>
                        </View>
                      </ItemContainer>
                    )}
                  />
                  <TouchableOpacity
                    onPress={() => toggleModal(0, 'bill_photo')}
                    style={[
                      {
                        backgroundColor: 'transparent',
                        width: '100%',
                        padding: 5,
                      },
                      globalStyles.flexBox,
                    ]}>
                    <DarkTextLarge>Bill Image</DarkTextLarge>
                    <View style={{ backgroundColor: 'transparent', padding: 10 }}>
                      <Image
                        resizeMode='contain'
                        source={{
                          uri: data.images != undefined ? (data.images.bill_photo != undefined && data.images?.bill_photo[0] != undefined && data.images?.bill_photo[0] != "") ? data.images?.bill_photo[0] : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg' : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
                        }}
                        style={{
                          width: width / 1 - 20,
                          height: height / 5,
                          borderRadius: 10,
                          borderWidth: .2,
                          borderColor: 'grey'
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              data={data.history}
              renderItem={({ item, index }) => (
                // <ItemContainer style={{ width: '95%' }} key={index}>

                //   <View style={[globalStyles.rowContainer]}>
                //     <View
                //       style={[
                //         {
                //           width: '100%',
                //           backgroundColor: 'transparent',
                //           paddingHorizontal: 10,
                //         },
                //       ]}>
                //       <View
                //         style={[
                //           { width: '100%', backgroundColor: 'transparent' },
                //           globalStyles.rowContainer,
                //           globalStyles.flexBox,
                //         ]}>
                //         <View
                //           style={[
                //             { width: '100%', backgroundColor: 'transparent' },
                //             globalStyles.rowContainer,
                //           ]}>
                //           <FadeTextMedium style={{ padding: 5 }}>
                //             Visit at :
                //           </FadeTextMedium>
                //           <DarkTextMedium style={{ width: '80%', padding: 5 }}>
                //             {item.visit_at}
                //           </DarkTextMedium>
                //         </View>
                //       </View>
                //       <View
                //         style={[
                //           { width: '100%', backgroundColor: 'transparent' },
                //           globalStyles.rowContainer,
                //           globalStyles.flexBox,
                //         ]}>
                //         <View
                //           style={[
                //             { width: '100%', backgroundColor: 'transparent' },
                //             globalStyles.rowContainer,
                //           ]}>
                //           <FadeTextMedium style={{ padding: 5 }}>
                //             Task :
                //           </FadeTextMedium>
                //           <DarkTextMedium style={{ width: '80%', padding: 5 }}>
                //             {item.task}
                //           </DarkTextMedium>
                //         </View>
                //       </View>
                //       <View
                //         style={[
                //           { width: '100%', backgroundColor: 'transparent' },
                //           globalStyles.rowContainer,
                //           globalStyles.flexBox,
                //         ]}>
                //         <View
                //           style={[
                //             { width: '100%', backgroundColor: 'transparent' },
                //             globalStyles.rowContainer,
                //           ]}>
                //           <FadeTextMedium style={{ padding: 5 }}>
                //             Description :
                //           </FadeTextMedium>
                //           <DarkTextMedium style={{ width: '80%', padding: 5 }}>
                //             {item.remark}
                //           </DarkTextMedium>
                //         </View>
                //       </View>
                //       <View
                //         style={[
                //           { width: '100%', backgroundColor: 'transparent' },
                //           globalStyles.rowContainer,
                //           globalStyles.flexBox,
                //         ]}>
                //         <View
                //           style={[
                //             { width: '100%', backgroundColor: 'transparent' },
                //             globalStyles.rowContainer,
                //           ]}>
                //           <FadeTextMedium style={{ padding: 5 }}>
                //             Assign By :
                //           </FadeTextMedium>
                //           <DarkTextMedium style={{ width: '50%', padding: 5 }}>
                //             {item.assigned_by}
                //           </DarkTextMedium>
                //         </View>
                //       </View>
                //       <View
                //         style={[
                //           { width: '100%', backgroundColor: 'transparent' },
                //           globalStyles.rowContainer,
                //           globalStyles.flexBox,
                //         ]}>
                //         <View
                //           style={[
                //             { width: '100%', backgroundColor: 'transparent' },
                //             globalStyles.rowContainer,
                //           ]}>
                //           <FadeTextMedium style={{ padding: 5 }}>
                //             Visit By :
                //           </FadeTextMedium>
                //           <DarkTextMedium style={{ width: '80%', padding: 5 }}>
                //             {item.visit_by}
                //           </DarkTextMedium>
                //         </View>
                //       </View>
                //     </View>
                //   </View>
                // </ItemContainer>
                <ItemContainer style={[{ paddingRight: 20, paddingLeft: 20 }]} key={index} >
                  <View style={[globalStyles.rowContainer, { backgroundColor: 'transparent', justifyContent: 'space-between', paddingVertical: 10 }]}>
                    <FontAwesome6 name={'person-dots-from-line'} size={20} color={StatusColor[status]} style={[{ backgroundColor: 'transparent', justifyContent: 'center', paddingHorizontal: 10 }]} />
                    <DarkTextLarge style={[{ width: '80%', backgroundColor: 'transparent', fontFamily: 'monospace', fontWeight: 'bold' }]}> {item.visit_by}</DarkTextLarge>
                  </View>
                  <View style={[{ width: '100%' }]}>
                    <View style={[globalStyles.rowContainer, { width: '100%', justifyContent: 'space-between', paddingVertical: 2.5 }]}>
                      <FadeTextMedium style={[styles.newCardKeyText]}>Visit at</FadeTextMedium>
                      <DarkTextMedium style={[styles.newCardValueText]}>{item.visit_at}</DarkTextMedium>
                    </View>
                    <View style={[globalStyles.rowContainer, { width: '100%', justifyContent: 'space-between', paddingVertical: 2.5 }]}>
                      <FadeTextMedium style={[styles.newCardKeyText]}>Task</FadeTextMedium>
                      <DarkTextMedium style={[styles.newCardValueText]}>{item.task}</DarkTextMedium>
                    </View>
                    <View style={[globalStyles.rowContainer, { width: '100%', justifyContent: 'space-between', paddingVertical: 2.5 }]}>
                      <FadeTextMedium style={[styles.newCardKeyText]}>Description </FadeTextMedium>
                      <DarkTextMedium style={[styles.newCardValueText]}>{item.remark}</DarkTextMedium>
                    </View>
                    <View style={[globalStyles.rowContainer, { width: '100%', justifyContent: 'space-between', paddingVertical: 2.5 }]}>
                      <FadeTextMedium style={[styles.newCardKeyText]}>Assign By</FadeTextMedium>
                      <DarkTextMedium style={[styles.newCardValueText]}>{item.assigned_by}</DarkTextMedium>
                    </View>
                  </View>
                </ItemContainer>
              )}
            />
          </View>
        )

      }
      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}>
          <ImageViewer
            imageUrls={data.images != undefined && data.images[imageName] != undefined && data.images[imageName].length > 0 ? data.images[imageName].map(img => ({ url: img })) : ['https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'].map(img => ({ url: img }))}
            index={selectedImageIndex}
            enableSwipeDown={true}
            onCancel={() => toggleModal(null)}
          />
        </Modal>
      )}
      {/* </ImageBackground> */}
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  newCardKeyText:{width:100,backgroundColor:'transparent',fontFamily:'monospace',fontSize:13},
  newCardValueText:{width:'60%',backgroundColor:'transparent',fontFamily:'monospace',fontSize:13,fontWeight:'800',color:'#4f4f4f'}

});
