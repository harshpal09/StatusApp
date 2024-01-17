import {StyleSheet, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

export const {width, height} = Dimensions.get('screen');

//Monochromatic colors: #1F51FF (base), #5077FF (lighter blue), #0D2E80 (darker blue)
//Split-complementary colors: #1F51FF (base), #FF1F6D (pink/red), #FF1F4E (pinkish-orange)
//Triadic colors: #1F51FF (base), #FF1F69 (pink/red), #69FF1F (green)
//Analogous colors: #1F51FF (base), #3E61FF (lighter blue), #FF691F (orange)
//Complementary color: #FF691F (orange)
export const BASE_URL = 'https://politician.thebharatech.com/api/';
export const THEME_COLOR = '#0080FF';
export const LIGHT_BLUE = '#5481ff';
export const LIGHT_BLUE_BACKGROUND = '#d7dffc';
export const ORANGE_COLOR = '#FF691F';

export const globalStyles = StyleSheet.create({
  flexBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexBoxAlign: {
    // flex:1,
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  flexBoxJustify: {
    // flex:1,
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  childDetailContainer: {
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    height: 40,
    borderRadius: 10,
  },
  container: {
    width: '100%',
    borderColor: '#ccc',
    // margin: 10,
    // marginTop: -5,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
  },

  mainContainer: {
    // flex:1,
    display: 'flex',
    // elevation:19,
    // padding:10,
    width: '100%',

    // height: '100%',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  block: {
    width: 'auto',
    backgroundColor: 'green',
  },
  scrollViewContainer: {
    width: '100%',
    padding: 10,
    paddingBottom: 100,
    // backgroundColor:'green'
  },
  contentContainer: {
    backgroundColor: '#FFF',
    width: '100%',
    //  height:300,
    marginVertical: 10,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'lightgrey',

    shadowColor: '#000', // Shadow color
    shadshowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity (0 to 1)
    shadowRadius: 4, //
  },
  shadow: {
    shadowColor: '#000', // Shadow color
    shadshowOffset: {width: 0, height: -20}, // Shadow offset
    shadowOpacity: 0.4, // Shadow opacity (0 to 1)
    shadowRadius: 8, //
  },
  childDetailContainer: {
    // backgroundColor: LIGHT_BLUE,
    width: '100%',
    height: 40,
    borderRadius: 10,
  },
  profileHeadings: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width:width-50,
    width: '100%',
    paddingHorizontal: 10,
    padding: 10,
    // borderBottomWidth: 0.5,
    // backgroundColor:'blue',
  },
  profileHeadingText: {
    textAlignVertical: 'center',
    marginLeft: 0,
    color: '#6D6D6D',
    // width:DeviceInfo.isTablet()?Dimensions.get('screen').width/2.4: Dimensions.get('screen').width/2.8,
    fontFamily: 'Baskervville-Regular',
    fontSize: 16,
    // backgroundColor:'red'
  },
  profileIcon: {
    color: 'grey',
  },
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    marginVertical: 5,
    // backgroundColor:'yellow'
  },
  cartIncDecContainer: {
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  decBtn: {
    borderWidth: 1,
    borderColor: '#3d3d3d',
    width: 35,
    height: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    // borderBottomLeftRadius: 40,
    // borderTopLeftRadius: 40,
  },
  incBtn: {
    borderWidth: 1,
    borderColor: '#3d3d3d',
    width: 35,
    height: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    // borderBottomLeftRadius: 40,
    // borderTopLeftRadius: 40,
  },
  decButton: {
    color: '#3d3d3d',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 30,
  },
  incButton: {
    color: '#3d3d3d',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 30,
  },
  incDecField: {
    borderColor: '#780000',
    width: 30,
    fontSize: 14,
    // fontWeight: 'bold',
    height: 35,
    lineHeight: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#3d3d3d',
  },
});

// const material = useSelector(s => s.global.material)

// export const data = [
//   {
//       "description": {
//           "icon": "file",
//           "title": "Description",
//           "subfeilds": [
//                       {
//                   "placeholder": "Describe the problem",
//                   "name": "km_driven",
//                   "type": "textarea",
//                   "elements": [],
//                   "value": ''
//               },

//           ]
//       },
//       "material": {
//         "icon": "file",
//         "title": "Material",
//         "subfeilds": material
//     },
//       "payment": [
//           {
//               "icon": "car-child-seat",
//               "title": "Interior",
//               "feilds": [
//                   {
//                       "name": "Interior  + Electrical",
//                       "subfeilds": [
//                           {
//                               "placeholder": "No. Of Power Windows",
//                               "name": "electrical_interior_no_power_window_status",
//                               "type": "text",
//                               "elements": [],
//                               "value": ""
//                           },
//                           {
//                               "placeholder": "Brake Condition",
//                               "name": "steering_suspension_brakes_braks_condition",
//                               "type": "multipleselect",
//                               "elements": [
//                                   "Effective",
//                                   "Not Effective",
//                                   "Noise"
//                               ],
//                               "value": ""
//                           }
//                       ]
//                   }
//               ]
//           }
//       ],
//   }
// ]

const useMaterialData = () => {
  const material = useSelector(state => state.global.material);

  const data = [
    {
      
      material: {
        icon: 'file',
        title: 'Material',
        subfeilds: [
          {
            placeholder: 'Material name',
            name: 'electrical_interior_no_power_window_status',
            type: 'material',
            elements: [],
            value: '',
          },
        ],
      },
      description: {
        icon: 'file',
        title: 'Description',
        subfeilds: [
          {
            placeholder: 'Please describe the problem',
            name: 'description',
            type: 'textarea',
            elements: [],
            value: 'gdshdsdksdj',
          },
        ],
      },
      payment: {
        icon: 'file',
        title: 'Payment',
        subfeilds: [
          {
            placeholder: 'Material name',
            name: 'electrical_interior_no_power_window_status',
            type: 'payment',
            elements: [],
            value: '',
          },   
          // {
          //   placeholder: 'Recieved amount',
          //   name: 'due',
          //   type: 'text',
          //   elements: [],
          //   value: '',
          // },       
          {
            placeholder: 'Please describe the problem',
            name: 'description',
            type: 'textarea',
            elements: [],
            value: 'gdshdsdksdj',
          },
          
          {
            placeholder: 'photo with customer',
            name: 'front_main',
            type: 'file',
            elements: [],
            value: [],
          },
        ],
      },
    },
  ];

  return data;
};

export default useMaterialData;
