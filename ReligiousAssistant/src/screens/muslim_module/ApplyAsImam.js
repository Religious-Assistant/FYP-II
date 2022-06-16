/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React from 'react';
import {View, Text} from 'react-native';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Heading, Image} from 'native-base';
import timeICon from '../../../assets/images/applyAsImam_ic.png';

import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import CustomButton from '../../components/CustomButton';

export default function ApplyAsImam() {
  const [serverData, setServerData] = React.useState([]);

  React.useEffect(() => {
    fetch('https://aboutreact.herokuapp.com/demosearchables.php')
      .then(response => response.json())
      .then(responseJson => {
        //Successful response from the API Call
        setServerData(responseJson.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View
          style={{
            flex: 0.17,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            alignItems: 'center',
          }}>
          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <Image
              source={timeICon}
              style={{
                marginTop: '10%',
                marginRight: '5%',
                marginBottom: '5%',
                height: 100,
                width: 100,
              }}
              alt="icon .."
            />
          </View>
          <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%'}}>
            <Heading color={colors.secondary} marginLeft="10%" marginTop={'5%'}>
              <Text style={{fontFamily: fonts.Signika.bold}}>Apply as </Text>
            </Heading>
            <Heading color={colors.white} marginLeft="10%">
              <Text style={{fontFamily: fonts.Signika.bold}}>Imaam</Text>
            </Heading>
          </View>
        </View>
        <View
          style={{flex: 0.83, marginTop: '70%', marginLeft: '5%'}}
          width="90%">
          <SearchableDropdown
            maxW="90%"
            width="100"
            onTextChange={text => console.log(text)}
            onItemSelect={item => alert(JSON.stringify(item))}
            containerStyle={{padding: 5}}
            textInputStyle={{
              padding: 12,
              borderWidth: 1,
              borderColor: colors.white,
              backgroundColor: colors.tertiary,
              fontFamily: fonts.Signika.medium,
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: colors.cover,
              borderColor: '#bbb',
              borderWidth: 1,
            }}
            itemTextStyle={{
              color: colors.black,
              fontFamily: fonts.Signika.medium,
            }}
            itemsContainerStyle={{
              maxHeight: '50%',
            }}
            items={serverData}
            defaultIndex={2}
            placeholder="Select Mosque"
            placeholderTextColor={colors.white}
            resetValue={false}
            underlineColorAndroid="transparent"
          />
          <CustomButton
            title="Apply As Imaam"
            variant="solid"
            mt="8%"
            color="white"
            base="99%"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
