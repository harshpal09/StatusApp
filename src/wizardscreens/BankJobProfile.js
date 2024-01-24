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
import React, {useEffect, useState} from 'react';
import {InspectionDetails} from '../../export';
import {
  DarkTextLarge,
  DarkTextMedium,
  DarkTextSmall,
  FadeTextMedium,
  ItemContainer,
  MainContainer,
} from '../components/StyledComponent';
import {globalStyles, height, width, THEME_COLOR} from '../utils/Style';
import ImageViewer from 'react-native-image-zoom-viewer';
import {getDetailJob} from '../services/Api';
import { useNavigation } from '@react-navigation/native';

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
export default function BankJobProfile({route}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageName, setImageName] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const {id} = route.params;

  // console.log("id => ",id);
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
      const response = await getDetailJob({id});

      console.log('data =>', response.data.data.data);

      if (response.data.data.code != undefined && response.data.data.code) {
        setData(response.data.data.data);
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
  // console.log('data h=>', data.images);
  const onRefresh = () => {
    // console.log('is ref');
    setRefreshing(true);
    getData();
  };

  return (
    <MainContainer
      style={[
        {backgroundColor: 'transparent', width: '100%'},
        globalStyles.flexBoxJustify,
      ]}>
      <ImageBackground
        source={require('../assets/images/background_logo_medium.jpg')}
        style={{flex: 1}}>
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
            <FlatList
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              ListEmptyComponent={()=>
                <View
                  style={[
                    {
                      flex: 1,
                      backgroundColor: 'transparent',
                      height:100
                    },
                    globalStyles.flexBox,
                  ]}>
                  <DarkTextMedium style={{fontSize:20}}>Job History List Is Empty</DarkTextMedium>
                </View>
              
              }
              ListHeaderComponent={() => (
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
                    <View style={{backgroundColor: 'transparent', padding: 10}}>
                      <Image
                        source={{
                          uri: data.images != undefined ? (data.images.before_images[0] != undefined && data.images.before_images[0] != "") ? data.images.before_images[0] :'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg': 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg' 
                        }}
                        style={{
                          width: width / 2 - 20,
                          height: height / 5,
                          borderRadius: 10,
                          borderWidth:.2,
                          borderColor:'grey'
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
                    <View style={{backgroundColor: 'transparent', padding: 10}}>
                      <Image
                        source={{
                          uri: data.images != undefined ? (data.images.after_images[0] != undefined && data.images.after_images[0] != "") ? data.images.after_images[0] :'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg': 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg' 
                        }}
                        style={{
                          width: width / 2 - 20,
                          height: height / 5,
                          borderRadius: 10,
                          borderWidth:.2,
                          borderColor:'grey'
                        }}
                      />
                    </View>
                  </TouchableOpacity>
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
                    globalStyles.rowContainer,
                  ]}>
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
                    <View style={{backgroundColor: 'transparent', padding: 10}}>
                      <Image
                        resizeMode='contain'
                        source={{
                          uri: data.images != undefined ? (data.images.bill_photo[0] != undefined && data.images.bill_photo[0] != "") ? data.images.bill_photo[0] :'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg': 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg' 
                        }}
                        style={{
                          width: width / 1 - 20,
                          height: height / 5,
                          borderRadius: 10,
                          borderWidth:.2,
                          borderColor:'grey'
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              data={data.history}
              renderItem={({item, index}) => (
                <ItemContainer style={{width: '95%'}} key={index}>
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
                          {width: '100%', backgroundColor: 'transparent'},
                          globalStyles.rowContainer,
                          globalStyles.flexBox,
                        ]}>
                        <View
                          style={[
                            {width: '100%', backgroundColor: 'transparent'},
                            globalStyles.rowContainer,
                          ]}>
                          <FadeTextMedium style={{padding: 5}}>
                            Visit at :
                          </FadeTextMedium>
                          <DarkTextMedium style={{width: '80%', padding: 5}}>
                            {item.visit_at}
                          </DarkTextMedium>
                        </View>
                      </View>
                      <View
                        style={[
                          {width: '100%', backgroundColor: 'transparent'},
                          globalStyles.rowContainer,
                          globalStyles.flexBox,
                        ]}>
                        <View
                          style={[
                            {width: '100%', backgroundColor: 'transparent'},
                            globalStyles.rowContainer,
                          ]}>
                          <FadeTextMedium style={{padding: 5}}>
                            Task :
                          </FadeTextMedium>
                          <DarkTextMedium style={{width: '80%', padding: 5}}>
                            {item.task}
                          </DarkTextMedium>
                        </View>
                      </View>
                      <View
                        style={[
                          {width: '100%', backgroundColor: 'transparent'},
                          globalStyles.rowContainer,
                          globalStyles.flexBox,
                        ]}>
                        <View
                          style={[
                            {width: '100%', backgroundColor: 'transparent'},
                            globalStyles.rowContainer,
                          ]}>
                          <FadeTextMedium style={{padding: 5}}>
                            Description :
                          </FadeTextMedium>
                          <DarkTextMedium style={{width: '80%', padding: 5}}>
                            {item.remark}
                          </DarkTextMedium>
                        </View>
                      </View>
                      <View
                        style={[
                          {width: '100%', backgroundColor: 'transparent'},
                          globalStyles.rowContainer,
                          globalStyles.flexBox,
                        ]}>
                        <View
                          style={[
                            {width: '100%', backgroundColor: 'transparent'},
                            globalStyles.rowContainer,
                          ]}>
                          <FadeTextMedium style={{padding: 5}}>
                            Assign By :
                          </FadeTextMedium>
                          <DarkTextMedium style={{width: '50%', padding: 5}}>
                            {item.assigned_by}
                          </DarkTextMedium>
                        </View>
                      </View>
                      <View
                        style={[
                          {width: '100%', backgroundColor: 'transparent'},
                          globalStyles.rowContainer,
                          globalStyles.flexBox,
                        ]}>
                        <View
                          style={[
                            {width: '100%', backgroundColor: 'transparent'},
                            globalStyles.rowContainer,
                          ]}>
                          <FadeTextMedium style={{padding: 5}}>
                            Visit By :
                          </FadeTextMedium>
                          <DarkTextMedium style={{width: '80%', padding: 5}}>
                            {item.visit_by}
                          </DarkTextMedium>
                        </View>
                      </View>
                    </View>
                  </View>
                </ItemContainer>
              )}
            />
          )
          // <ScrollView style={{width: width}}>
          //   <View
          //     style={[
          //       {width: '100%', backgroundColor: 'transparent', marginTop: 10},
          //       globalStyles.rowContainer,
          //     ]}>
          //     <TouchableOpacity
          //       onPress={()=>toggleModal(0,'before_image')}
          //       style={[
          //         {backgroundColor: 'transparent', width: '50%', padding: 5},
          //         globalStyles.flexBox,
          //       ]}>
          //       <DarkTextLarge>Before Image</DarkTextLarge>
          //       <View style={{backgroundColor: 'transparent', padding: 10}}>
          //         <Image
          //           source={{
          //             uri: data.images != undefined ? data.images.before_images[0]:null,
          //           }}
          //           style={{
          //             width: width / 2 - 20,
          //             height: height / 5,
          //             borderRadius: 10,
          //           }}
          //         />
          //       </View>
          //     </TouchableOpacity>
          //     <TouchableOpacity
          //        onPress={()=>toggleModal(0,'after_image')}
          //       style={[
          //         {backgroundColor: 'transparent', width: '50%', padding: 5},
          //         globalStyles.flexBox,
          //       ]}>
          //       <DarkTextLarge>After Image</DarkTextLarge>
          //       <View style={{backgroundColor: 'transparent', padding: 10}}>
          //         <Image
          //           source={{
          //             uri: data.images != undefined ? data.images.after_images[0]:null,
          //           }}
          //           style={{
          //             width: width / 2 - 20,
          //             height: height / 5,
          //             borderRadius: 10,
          //           }}
          //         />
          //       </View>
          //     </TouchableOpacity>
          //   </View>
          //   {data.history != undefined && data.history.map((item,index)=>(
          //     <ItemContainer
          //       style={{width: '95%'}}
          //       key={index}
          //       >

          //       <View style={[globalStyles.rowContainer]}>
          //         <View
          //           style={[
          //             {
          //               width: '100%',
          //               backgroundColor: 'transparent',
          //               paddingHorizontal: 10,
          //             },
          //           ]}>

          //           <View
          //             style={[
          //               {width: '100%', backgroundColor: 'transparent'},
          //               globalStyles.rowContainer,
          //               globalStyles.flexBox,
          //             ]}>
          //             <View
          //               style={[
          //                 {width: '100%', backgroundColor: 'transparent'},
          //                 globalStyles.rowContainer,
          //               ]}>
          //               <FadeTextMedium style={{padding: 5}}>
          //                 Visit at :
          //               </FadeTextMedium>
          //               <DarkTextMedium style={{width: '80%', padding: 5}}>
          //                 {item.visit_at}
          //               </DarkTextMedium>
          //             </View>
          //           </View>
          //           <View
          //             style={[
          //               {width: '100%', backgroundColor: 'transparent'},
          //               globalStyles.rowContainer,
          //               globalStyles.flexBox,
          //             ]}>
          //             <View
          //               style={[
          //                 {width: '100%', backgroundColor: 'transparent'},
          //                 globalStyles.rowContainer,
          //               ]}>
          //               <FadeTextMedium style={{padding: 5}}>
          //                 Task :
          //               </FadeTextMedium>
          //               <DarkTextMedium style={{width: '80%', padding: 5}}>
          //                 {item.task}
          //               </DarkTextMedium>
          //             </View>
          //           </View>
          //           <View
          //             style={[
          //               {width: '100%', backgroundColor: 'transparent'},
          //               globalStyles.rowContainer,
          //               globalStyles.flexBox,
          //             ]}>
          //             <View
          //               style={[
          //                 {width: '100%', backgroundColor: 'transparent'},
          //                 globalStyles.rowContainer,
          //               ]}>
          //               <FadeTextMedium style={{padding: 5}}>
          //                 Description :
          //               </FadeTextMedium>
          //               <DarkTextMedium style={{width: '80%', padding: 5}}>
          //                 {item.remark}
          //               </DarkTextMedium>
          //             </View>
          //           </View>
          //           <View
          //             style={[
          //               {width: '100%', backgroundColor: 'transparent'},
          //               globalStyles.rowContainer,
          //               globalStyles.flexBox,
          //             ]}>
          //             <View
          //               style={[
          //                 {width: '100%', backgroundColor: 'transparent'},
          //                 globalStyles.rowContainer,
          //               ]}>
          //               <FadeTextMedium style={{padding: 5}}>
          //                 Assign By :
          //               </FadeTextMedium>
          //               <DarkTextMedium style={{width: '50%', padding: 5}}>
          //                 {item.assigned_by}
          //               </DarkTextMedium>
          //             </View>
          //           </View>
          //           <View
          //             style={[
          //               {width: '100%', backgroundColor: 'transparent'},
          //               globalStyles.rowContainer,
          //               globalStyles.flexBox,
          //             ]}>
          //             <View
          //               style={[
          //                 {width: '100%', backgroundColor: 'transparent'},
          //                 globalStyles.rowContainer,
          //               ]}>
          //               <FadeTextMedium style={{padding: 5}}>
          //                 Visit By :
          //               </FadeTextMedium>
          //               <DarkTextMedium style={{width: '80%', padding: 5}}>
          //                 {item.visit_by}
          //               </DarkTextMedium>
          //             </View>
          //           </View>
          //         </View>
          //       </View>
          //     </ItemContainer>
          //     ))}
          //   <View
          //     style={[
          //       {width: '100%', backgroundColor: 'transparent', marginTop: 10},
          //       globalStyles.rowContainer,
          //     ]}>
          //     <TouchableOpacity
          //       onPress={()=>toggleModal(0,'bill_image')}
          //       style={[
          //         {backgroundColor: 'transparent', width: '100%', padding: 5},
          //         globalStyles.flexBox,
          //       ]}>
          //       <DarkTextLarge>Bill Image</DarkTextLarge>
          //       <View style={{backgroundColor: 'transparent', padding: 10}}>
          //         <Image
          //           source={{
          //             uri: data.images != undefined ? data.images.bill_photo[0]:null,
          //           }}
          //           style={{
          //             width: width / 1 - 20,
          //             height: height / 5,
          //             borderRadius: 10,
          //           }}
          //         />
          //       </View>
          //     </TouchableOpacity>
          //   </View>
          //   {isModalVisible && (
          //     <Modal
          //       animationType="slide"
          //       transparent={true}
          //       visible={isModalVisible}>
          //       <ImageViewer
          //         imageUrls={images[imageName].map(img => ({url: img}))}
          //         index={selectedImageIndex}
          //         enableSwipeDown={true}
          //         onCancel={() => toggleModal(null)}
          //       />
          //     </Modal>
          //   )}
          // </ScrollView>
        }
        {isModalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}>
            <ImageViewer
              imageUrls={data.images != undefined  ? data.images[imageName].map(img => ({url: img})):['https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'].map(img => ({url: img}))}
              index={selectedImageIndex}
              enableSwipeDown={true}
              onCancel={() => toggleModal(null)}
            />
          </Modal>
        )}
      </ImageBackground>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
