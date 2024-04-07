import { ActivityIndicator, Image, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DarkTextLarge, DarkTextMedium, FadeTextMedium, ItemContainer, MainContainer } from '../components/StyledComponent'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { THEME_COLOR, globalStyles, width } from '../utils/Style'
import { allInspection, getAdminJobStatus, getAdminJobs } from '../services/Api'
import { useSelector } from 'react-redux'


export default function AdminHome({ navigation }) {
    const [iconsName, setIconsName] = useState(['clipboard-text-clock', 'cellphone-check', 'bank-check']);
    const [statusName, setStatusName] = useState(['Pending', 'Visit Done', 'Work Done'])
    const [StatusColor, setStatusColor] = useState(['#FF605C', '#FFBD44', '#00CA4E'])
    const [StatusLightColor, setStatusLightColor] = useState(['#f7dfdf', '#fcf3e1', '#d3f2df'])
    const [status, setStatus] = useState(0);
    const [branchesCount, setBranchesCount] = useState(0)
    const [jobsCount, setjobsCount] = useState(0)
    const [jobsStatusCount, setjobsStatusCount] = useState({})
    // const theme = useColorScheme();
    const [isDark,setIsDark] = useState(useColorScheme() == 'dark' ? true : false)
    const [loading, setLoading] = useState(true);

    const user_data = useSelector(s => s.global.userDetails);

    // console.log('theme =>',isDark)
    var val = typeof user_data === 'object' ? user_data : JSON.parse(user_data);

    useEffect(() => {
        getBranchCount();
        getJobsCount();
        getStatusCount();
    }, []);

    const getBranchCount = async () => {
        // console.log('aerrrrr => ', val.id);
        try {
            setLoading(true);
            const response = await allInspection({ id: val.id, status: 'total' });
            // console.log('data =>', response.data);

            if (response.data.data.code != undefined && response.data.data.code) {
                setBranchesCount(response.data.data.data.length);
            } else {
            }
        } catch (error) {
            console.log('error ', error);
        } finally {
            setLoading(false);
        }
    };
    const getJobsCount = async () => {
        // console.log('aerrrrr => ', val.id);
        try {
            setLoading(true);
            const response = await getAdminJobs();
            // console.log('data =>', response.data);

            if (response.data.data.code != undefined && response.data.data.code) {
                setjobsCount(response.data.data.data.length);
            } else {
            }
        } catch (error) {
            console.log('error ', error);
        } finally {
            setLoading(false);
        }
    };
    const getStatusCount = async () => {
        // console.log('aerrrrr => ', val.id);
        try {
            setLoading(true);
            const response = await getAdminJobStatus();
            console.log('data =>', response.data.data);

            if (response.data.data.code != undefined && response.data.data.code) {
                setjobsStatusCount(response.data.data);
            } else {
            }
        } catch (error) {
            console.log('error ', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[{ width: width, height: 200 }, globalStyles.flexBox]}>
                <ActivityIndicator size={'large'} color={THEME_COLOR} />
            </View>
        )
    }

    // console.log("sttaus ==>",jobsStatusCount)
    return (
        <MainContainer style={{backgroundColor:''}}>
            {/* <ItemContainer style={[{paddingRight:20,paddingLeft:20}]}>
            <View style={[globalStyles.rowContainer,{backgroundColor:'transparent',justifyContent:'space-between',paddingVertical:10}]}>
                <FontAwesome6 name={'person-dots-from-line'} size={20} color={StatusColor[status]} style={[{backgroundColor:'transparent',justifyContent:'center',paddingHorizontal:10}]} />
                <DarkTextLarge style={[{width:'80%',backgroundColor:'transparent',fontFamily:'monospace',fontWeight:'bold'}]}>Field Officer</DarkTextLarge>
            </View>
            <View style={[{width:'100%'}]}>
                <View style={[globalStyles.rowContainer,{width:'100%',justifyContent:'space-between',paddingVertical:2.5}]}>
                    <FadeTextMedium style={[styles.newCardKeyText]}>Add By</FadeTextMedium>
                    <DarkTextMedium style={[styles.newCardValueText]}>Shivansh manager</DarkTextMedium>
                </View>
                <View style={[globalStyles.rowContainer,{width:'100%',justifyContent:'space-between',paddingVertical:2.5}]}>
                    <FadeTextMedium style={[styles.newCardKeyText]}>Assign To</FadeTextMedium>
                    <DarkTextMedium style={[styles.newCardValueText]}>Harsh pal</DarkTextMedium>
                </View>
                <View style={[globalStyles.rowContainer,{width:'100%',justifyContent:'space-between',paddingVertical:2.5}]}>
                    <FadeTextMedium style={[styles.newCardKeyText]}>Bank Branch </FadeTextMedium>
                    <DarkTextMedium style={[styles.newCardValueText]}>IP Extetion-11</DarkTextMedium>
                </View>
                <View style={[globalStyles.rowContainer,{width:'100%',justifyContent:'space-between',paddingVertical:2.5}]}>
                    <FadeTextMedium style={[styles.newCardKeyText]}>Description </FadeTextMedium>
                    <DarkTextMedium style={[styles.newCardValueText]}>This is the new card UI which is upgrade the UI of App</DarkTextMedium>
                </View>
                <View style={[globalStyles.rowContainer,{width:'100%',justifyContent:'space-between',paddingVertical:2.5}]}>
                    <FadeTextMedium style={[styles.newCardKeyText]}>Created Date</FadeTextMedium>
                    <DarkTextMedium style={[styles.newCardValueText]}>2024-07-09</DarkTextMedium>
                </View>
            </View>
            <View style={[{width:'100%',backgroundColor:'transparent',justifyContent:'space-between',paddingVertical:10},globalStyles.rowContainer,]}>
                <View style={[{flex:0.9,backgroundColor:StatusLightColor[status],justifyContent:'space-around',borderRadius:15},globalStyles.rowContainer,globalStyles.flexBox]}>
                    <MaterialCommunityIcons name={iconsName[status]} size={25} color={StatusColor[status]} />
                    <DarkTextLarge style={[{color:StatusColor[status],fontFamily:'monospace',flex:0.5,paddingHorizontal:10}]}>{statusName[status]}</DarkTextLarge>
                </View>
                <View style={[{backgroundColor:StatusLightColor[status],padding:10,borderRadius:10,borderColor:'lightgrey'}]}>
                    <MaterialCommunityIcons name="arrow-right" size={20} color={StatusColor[status]}  />
                </View>
            </View>
        </ItemContainer> */}
            <ItemContainer style={[globalStyles.rowContainer]} onPress={() => navigation.navigate('bankbranches')} >
                <View style={[styles.imageContainer]}>
                    <FontAwesome name={'bank'} size={50} color={'#AE2827'} />
                </View>
                <View style={[styles.titleAndIconContainer, globalStyles.rowContainer]}>
                    <View style={[styles.titleContainer]}>
                        <Text style={[styles.titleText]} >Bank Branches</Text>
                        <View style={[globalStyles.rowContainer, globalStyles.flexBoxAlign]}>
                            <Text style={[styles.branchCountText]}>Total Banks </Text>
                            <Text style={{ backgroundColor: '#AE2827', borderRadius: 13, color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 10, fontWeight: 'bold', padding: 5 }}>{branchesCount}</Text>
                        </View>
                    </View>
                    <View style={[globalStyles.flexBox]}>
                        <MaterialCommunityIcons name='chevron-right-circle' size={40} color={'#0094DB'} />
                    </View>
                </View>
            </ItemContainer>
            <ItemContainer style={[globalStyles.rowContainer]} onPress={() => navigation.navigate('alljobs')}>
                <View style={[styles.imageContainer]}>
                    <FontAwesome6 name={'person-dots-from-line'} size={50} color={'#AE2827'} />
                </View>
                <View style={[styles.titleAndIconContainer, globalStyles.rowContainer]}>
                    <View style={[styles.titleContainer]}>
                        <Text style={[styles.titleText]} >Field Officer Jobs</Text>
                        <View style={[globalStyles.rowContainer, globalStyles.flexBoxAlign]}>
                            <Text style={[styles.branchCountText]}>Total Jobs </Text>
                            <Text style={{ backgroundColor: '#AE2827', borderRadius: 10, color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 10, fontWeight: 'bold', padding: 5 }}>{jobsCount}</Text>
                        </View>
                    </View>
                    <View style={[globalStyles.flexBox]}>
                        <MaterialCommunityIcons name='chevron-right-circle' size={40} color={'#0094DB'} />
                    </View>
                </View>
            </ItemContainer>
            <ItemContainer style={[globalStyles.rowContainer, { backgroundColor: StatusLightColor[0] }]} onPress={() => navigation.navigate('jobstatus', { status: 'pending' })} >
                <View style={[styles.imageContainer]}>
                    <MaterialIcons name={'pending-actions'} size={50} color={StatusColor[0]} />
                </View>
                <View style={[styles.titleAndIconContainer, globalStyles.rowContainer]}>
                    <View style={[styles.titleContainer]}>
                        <Text style={[styles.titleText, { color: StatusColor[0] }]} >Pending Jobs</Text>
                        <View style={[globalStyles.rowContainer, globalStyles.flexBoxAlign]}>
                            <Text style={[styles.branchCountText, { color: StatusColor[0] }]}>Total  </Text>
                            <Text style={{ backgroundColor: StatusColor[0], borderRadius: 10, color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 10, fontWeight: 'bold', padding: 5 }}>{jobsStatusCount?.pending?.length}</Text>
                        </View>
                    </View>
                    <View style={[globalStyles.flexBox]}>
                        <MaterialCommunityIcons name='chevron-right-circle' size={40} color={StatusColor[0]} />
                    </View>
                </View>
            </ItemContainer>
            <ItemContainer style={[globalStyles.rowContainer, { backgroundColor: StatusLightColor[1] }]} onPress={() => navigation.navigate('jobstatus', { status: 'visits' })} >
                <View style={[styles.imageContainer]}>
                    <FontAwesome6 name={'hourglass-start'} size={50} color={StatusColor[1]} />
                </View>
                <View style={[styles.titleAndIconContainer, globalStyles.rowContainer]}>
                    <View style={[styles.titleContainer]}>
                        <Text style={[styles.titleText, { color: StatusColor[1] }]} >Visits Done</Text>
                        <View style={[globalStyles.rowContainer, globalStyles.flexBoxAlign]}>
                            <Text style={[styles.branchCountText, { color: StatusColor[1] }]}>Total  </Text>
                            <Text style={{ backgroundColor: StatusColor[1], borderRadius: 10, color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 10, fontWeight: 'bold', padding: 5 }}>{jobsStatusCount?.visits?.length}</Text>
                        </View>
                    </View>
                    <View style={[globalStyles.flexBox]}>
                        <MaterialCommunityIcons name='chevron-right-circle' size={40} color={StatusColor[1]} />
                    </View>
                </View>
            </ItemContainer>
            <ItemContainer style={[globalStyles.rowContainer, { backgroundColor: StatusLightColor[2] }]} onPress={() => navigation.navigate('jobstatus', { status: 'startworking' })} >
                <View style={[styles.imageContainer]}>
                    <MaterialCommunityIcons name={'bank-check'} size={50} color={StatusColor[2]} />
                </View>
                <View style={[styles.titleAndIconContainer, globalStyles.rowContainer]}>
                    <View style={[styles.titleContainer]}>
                        <Text style={[styles.titleText, { color: StatusColor[2] }]} >Worked Done</Text>
                        <View style={[globalStyles.rowContainer, globalStyles.flexBoxAlign]}>
                            <Text style={[styles.branchCountText, { color: StatusColor[2] }]}>Total </Text>
                            <Text style={{ backgroundColor: StatusColor[2], borderRadius: 10, color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 10, fontWeight: 'bold', padding: 5 }}>{jobsStatusCount?.startworking?.length}</Text>
                        </View>
                    </View>
                    <View style={[globalStyles.flexBox]}>
                        <MaterialCommunityIcons name='chevron-right-circle' size={40} color={StatusColor[2]} />
                    </View>
                </View>
            </ItemContainer>
            {/* <View style={[{backgroundColor:'#E9313F',width:'90%',borderRadius:15,marginVertical:10},globalStyles.rowContainer]}>
            <View style={[styles.iconContainer]}>
                <MaterialIcons name={'pending-actions'} size={30} color={'white'} />
            </View>
            <View style={[styles.statusTitleAndIconContainer,globalStyles.rowContainer]}>
                <View style={[styles.statusTitleContainer,globalStyles.flexBox,globalStyles.rowContainer,{justifyContent:'flex-start'}]}>
                    <Text style={[styles.statusTitleText]} >Pending Jobs</Text>
                    <MaterialCommunityIcons name='account-alert'  size={20} color={'white'} style={{marginLeft:10}}/>
                </View>
                <View style={[globalStyles.flexBox]}>
                    <MaterialCommunityIcons name='arrow-right-thin'  size={40} color={'white'}/>
                </View>
            </View>
        </View>
        <View style={[{backgroundColor:'#F2BF00',width:'90%',borderRadius:15,marginVertical:10},globalStyles.rowContainer]}>
            <View style={[styles.iconContainer]}>
                <FontAwesome6 name={'hourglass-start'} size={30} color={'white'} />
            </View>
            <View style={[styles.statusTitleAndIconContainer,globalStyles.rowContainer]}>
                <View style={[styles.statusTitleContainer,globalStyles.flexBox,globalStyles.rowContainer,{justifyContent:'flex-start'}]}>
                    <Text style={[styles.statusTitleText]} >Start Working</Text>
                    <MaterialCommunityIcons name='clock-alert'  size={20} color={'white'} style={{marginLeft:10}}/>
                </View>
                <View style={[globalStyles.flexBox]}>
                    <MaterialCommunityIcons name='arrow-right-thin'  size={40} color={'white'}/>
                </View>
            </View>
        </View>
        <View style={[{backgroundColor:'#29A441',width:'90%',borderRadius:15,marginVertical:10},globalStyles.rowContainer]}>
            <View style={[styles.iconContainer]}>
                <MaterialCommunityIcons name={'bank-check'} size={30} color={'white'} />
            </View>
            <View style={[styles.statusTitleAndIconContainer,globalStyles.rowContainer]}>
                <View style={[styles.statusTitleContainer,globalStyles.flexBox,globalStyles.rowContainer,{justifyContent:'flex-start'}]}>
                    <Text style={[styles.statusTitleText]} >Visits Done</Text>
                    <MaterialCommunityIcons name='check-decagram'  size={20} color={'white'} style={{marginLeft:10}}/>
                </View>
                <View style={[globalStyles.flexBox]}>
                    <MaterialCommunityIcons name='arrow-right-thin'  size={40} color={'white'}/>
                </View>
            </View>
        </View> */}
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        // backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        padding: 10
    },
    iconContainer: {
        // backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        padding: 10
    },
    titleAndIconContainer: {
        // backgroundColor:'skyblue',
        flex: 1,
        paddingHorizontal: 5
    },
    statusTitleAndIconContainer: {
        // backgroundColor:'skyblue',
        flex: 1,
        paddingHorizontal: 5
    },
    titleContainer: {
        flex: 1,
        // backgroundColor:'green',
        paddingHorizontal: 5
    },
    statusTitleContainer: {
        flex: 1,
        // backgroundColor:'green',
        paddingHorizontal: 5
    },
    titleText: {
        fontFamily: 'monospace',
        fontSize: 20,
        fontWeight: 'bold',
        color: THEME_COLOR
        // backgroundColor:'yellow',
    },
    statusTitleText: {
        fontFamily: 'monospace',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
        // backgroundColor:'yellow',
    },
    branchCountText: {
        fontSize: 12,
        marginVertical: 10,
        fontWeight: '700',
        fontFamily: 'monospace',
        color:'gray'
    },
    newCardKeyText: { width: 100, backgroundColor: 'transparent', fontFamily: 'monospace', fontSize: 13 },
    newCardValueText: { width: '60%', backgroundColor: 'transparent', fontFamily: 'monospace', fontSize: 13, fontWeight: '800', color: '#4f4f4f' }
})