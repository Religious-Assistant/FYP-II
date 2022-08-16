import React from 'react';
import {StyleSheet, View, TouchableOpacity, StatusBar} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {
  Text,
  Center,
  Box,
} from 'native-base';

import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

const Calander = () => {
  
  const locItems = {
    '2022-01-01': [{name: 'Satguru Swami Devprakashji Maharajs 83rd Birthday'}],
    '2022-01-02': [{name: 'Amavasya'}],
    '2022-01-04': [{name: 'Chand'}],
    '2022-01-06': [{name: 'Ganesh Chaturthi'}],
    '2022-01-09': [{name: 'Guru Gobind Singh Jayanti'}],
    '2022-01-12': [{name: 'Swami Vivekanand Birthday'}],
    '2022-01-13': [{name: 'Lohri (Lal Loi) and Ekadashi'}],
    '2022-01-14': [{name: 'Makarsankranti (Utran)'}],
    '2022-01-16': [{name: 'Sadhu T.L. Vaswani 56th Anniverdary'}],
    '2022-01-17': [{name: 'Satya Narayan and Martin Luther King Day'}],
    '2022-01-21': [{name: 'Ganesh Chaturthi'}],
    '2022-01-28': [{name: 'Shattila Ekadashi'}],

    '2022-02-01': [{name: 'Bhagwanti Navani Birthday and Amavasya'}],
    '2022-02-02': [{name: 'Chand'}],
    '2022-02-04': [{name: 'Ganesh Chaturthi'}],
    '2022-02-05': [{name: 'Vasant Panchami'}],
    '2022-02-07': [{name: 'Ratha Saptami'}],
    '2022-02-08': [{name: 'Bishma Ashtami'}],
    '2022-02-12': [{name: 'Jaya Ekdashi'}],
    '2022-02-13': [{name: 'Kumba Sankranti'}],
    '2022-02-16': [{name: 'Satya Narayan and Guru Ravidas Jayanti'}],
    '2022-02-19': [{name: 'Chatrapati Shivaji Jayanti'}],
    '2022-02-20': [{name: 'Ganesh Chaturthi'}],
    '2022-02-26': [{name: 'Vijaya Ekadashi'}],
    '2022-02-27': [{name: 'Guana Vijaya Ekadashi'}],

    '2022-03-01': [{name: 'Maha Shivaratri'}],
    '2022-03-02': [{name: 'Amavasya'}],
    '2022-03-04': [{name: 'Ram Krishna Parmhans Jayanti'}],
    '2022-03-06': [{name: 'Ganesh Chaturthi'}],
    '2022-03-14': [{name: 'Amalaki Ekadashi'}],
    '2022-03-17': [{name: 'Satya Narayan and Holika Dahan'}],
    '2022-03-18': [{name: 'Holi'}],
    '2022-03-21': [{name: 'Ganesh Chaturthi'}],
    '2022-03-25': [{name: 'Sheetala Ashtami'}],
    '2022-03-28': [{name: 'Papmochani Ekadashi'}],

    '2022-04-01': [{name: 'Amavasya'}],
    '2022-04-02': [{name: 'Gudi Purva and Chaitra Navratri'}],
    '2022-04-04': [{name: 'Gauri Purwa and Gangaur'}],
    '2022-04-05': [{name: 'Ganesh Chaturthi'}],
    '2022-04-07': [{name: 'Yamuna Chhath'}],
    '2022-04-09': [{name: 'Durgashtami (Kanya Pujan)'}],
    '2022-04-10': [{name: 'Rama Navami'}],
    '2022-04-12': [{name: 'Kamada Ekadashi'}],
    '2022-04-14': [{name: 'Vaisakhi and Mahavir Jayanti'}],
    '2022-04-16': [{name: 'Satya Narayan and Hanuman Jayanti'}],
    '2022-04-19': [{name: 'Ganesh Chaturthi'}],
    '2022-04-23': [{name: 'Guru Arjundev Jayanti'}],
    '2022-04-26': [{name: 'Varunithi Ekadashi'}],
    '2022-04-30': [{name: 'Amavasya'}],

    '2022-05-01': [{name: 'Surya Grahan'}],
    '2022-05-03': [{name: 'Akhar Teej (Akshaya Tritiya)'}],
    '2022-05-04': [{name: 'Ganesh Chaturthi'}],
    '2022-05-06': [{name: 'Shankaracharya Jayanti'}],
    '2022-05-08': [{name: 'Ganga Saptami'}],
    '2022-05-10': [{name: 'Sita Navami'}],
    '2022-05-12': [{name: 'Mohini Ekadashi'}],
    '2022-05-14': [{name: 'Narsingh Jayanti'}],
    '2022-05-16': [{name: 'Buddha Purnima'}],
    '2022-05-17': [{name: 'Narad Jayanti'}],
    '2022-05-19': [{name: 'Ganesh Chaturthi'}],
    '2022-05-26': [{name: 'Apara Ekadashi'}],
    '2022-05-30': [{name: 'Vat Savitri Vrat'}],

    '2022-06-03': [{name: 'Ganesh Chaturthi'}],
    '2022-06-09': [{name: 'Ganga Dashami'}],
    '2022-06-10': [{name: 'Nirjala Ekadashi'}],
    '2022-06-11': [{name: 'Gayatri Jayanti'}],
    '2022-06-14': [{name: 'Satya Narayan'}],
    '2022-06-15': [{name: 'Mithuna Sankranti'}],
    '2022-06-24': [{name: 'Yogini Ekadashi'}],
    '2022-06-25': [{name: 'Guru Hargovind Singh Jayanti'}],
    '2022-06-28': [{name: 'Amavasya'}],
    '2022-06-30': [{name: 'Chand'}],

    '2022-07-01': [{name: 'Jagannath Rathyatra'}],
    '2022-07-03': [{name: 'Ganesh Chaturthi'}],
    '2022-07-10': [{name: 'Devshayani Ekadashi'}],
    '2022-07-13': [{name: 'Guru Purnima'}],
    '2022-07-16': [{name: 'Karka Sankranti'}],
    '2022-07-18': [{name: 'Sravan Somwar Vrat Starts'}],
    '2022-07-22': [{name: 'Chalio Starts'}],
    '2022-07-24': [{name: 'Kamika Ekadashi'}],
    '2022-07-28': [{name: 'Amavasya'}],
    '2022-07-31': [{name: 'Hariyali Teej'}],

    '2022-08-01': [{name: 'Ganesh Chaturthi'}],
    '2022-08-02': [{name: 'Nag Panchami'}],
    '2022-08-04': [{name: 'Thadri Small (Nandi Satahi)'}],
    '2022-08-08': [
      {name: 'Shravana Putrada Ekadashi and Sravan Somwar Vrat Ends'},
    ],
    '2022-08-11': [{name: 'Raksha Bandhan'}],
    '2022-08-12': [{name: 'Varalakshmi Vrat'}],
    '2022-08-14': [{name: 'Teejri'}],
    '2022-08-15': [{name: 'Ganesh Chaturthi'}],
    '2022-08-17': [{name: 'Simha Sankranti'}],
    '2022-08-18': [{name: 'Thadri Big (Vadi Satai)'}],
    '2022-08-19': [{name: 'Krishna Janmashtami'}],
    '2022-08-22': [{name: 'Aja Ekadashi'}],
    '2022-08-24': [{name: 'Chalio Ends'}],
    '2022-08-27': [{name: 'Amavasya'}],
    '2022-08-28': [{name: 'Chand'}],
    '2022-08-31': [{name: 'Ganesh Jayanti'}],

    '2022-09-01': [{name: 'Rishi Panchami'}],
    '2022-09-03': [{name: 'Mahalaxmi Sagra Begins'}],
    '2022-09-04': [{name: 'Radha Ashtami'}],
    '2022-09-06': [{name: 'Parsva Ekadashi'}],
    '2022-09-07': [{name: 'Vaman Jayanti'}],
    '2022-09-09': [{name: 'Anant Chaturdashi, Ganapati Visarjan'}],
    '2022-09-10': [{name: 'Satya Narayan and Shradh begins'}],
    '2022-09-13': [{name: 'Ganesh Chaturthi'}],
    '2022-09-18': [{name: 'Mahalaxmi Sagra Ends'}],
    '2022-09-21': [{name: 'Indira Ekadashi'}],
    '2022-09-25': [{name: 'Shradh Ends'}],
    '2022-09-26': [{name: 'Navratri Starts'}],
    '2022-09-27': [{name: 'Chand'}],

    '2022-10-03': [{name: 'Durgashtami'}],
    '2022-10-04': [{name: 'Navratri Ends'}],
    '2022-10-05': [{name: 'Vijaya Dashami/Dusshera'}],
    '2022-10-06': [{name: 'Papankusha Ekadashi'}],
    '2022-10-09': [{name: 'Valmiki Jayanti'}],
    '2022-10-13': [{name: 'Ganesh Chaturthi and Karva Chauth'}],
    '2022-10-21': [{name: 'Rama Ekadashi'}],
    '2022-10-22': [{name: 'Dhanteras'}],
    '2022-10-23': [{name: 'Roop Chaudas'}],
    '2022-10-24': [{name: 'Diwali'}],
    '2022-10-25': [{name: 'Amavasya'}],
    '2022-10-26': [{name: 'Annkut - Goverdhan Puja'}],
    '2022-10-28': [{name: 'Ganesh Chaturthi'}],
    '2022-10-30': [{name: 'Chhath puja'}],

    '2022-11-01': [{name: 'Gopastami'}],
    '2022-11-04': [{name: 'Tulsi Vivah and Devuthana Ekadashi'}],
    '2022-11-08': [{name: 'Guru Nanak Jayanti'}],
    '2022-11-12': [{name: 'Ganesh Chaturthi'}],
    '2022-11-20': [{name: 'Utpanna Ekadashi'}],
    '2022-11-23': [{name: 'Amavasya'}],
    '2022-11-25': [{name: 'Chand'}],
    '2022-11-27': [{name: 'Ganesh Chaturthi'}],
    '2022-11-28': [{name: 'Ram Sita Wedding'}],

    '2022-12-03': [{name: 'Gita Jayanti and Mokshada Ekadashi'}],
    '2022-12-08': [{name: 'Satya Narayan'}],
    '2022-12-11': [{name: 'Ganesh Chaturthi'}],
    '2022-12-19': [{name: 'Saphala Ekadashi'}],
    '2022-12-23': [{name: 'Amavasya'}],
    '2022-12-24': [{name: 'Chand'}],
    '2022-12-26': [{name: 'Ganesh Chaturthi'}],
  };
  
  const renderItem = item => {
    return (
      <TouchableOpacity style={styles.item}>
        <Center flex={1} px="3">
          <Box
            bg={colors.white}
            style={{justifyContent: 'center'}}
            height={150}
            width={300}
            rounded="lg">
            <Text style={styles.text}>{item.name}</Text>
          </Box>
        </Center>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={locItems}
        //loadItemsForMonth={loadItems}
        selected={new Date()}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        renderItem={renderItem}
        minDate={'2022-01-01'}
        maxDate={'2022-12-31'}
        renderEmptyData={() => {
          return <View />;
        }}
        theme={{
          agendaDayTextColor: colors.success.deep,
          agendaDayNumColor: colors.primary,
          agendaTodayColor: colors.primary,
          agendaKnobColor: colors.red,
        }}
        style={{
          backgroundColor: colors.white,
        }}
      />
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: colors.white,
    backgroundColor: colors.white,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  Maincontainer: {
    flex: 1,
    width: '100%',
  },
  text: {
    fontFamily: fonts.Signika.regular,
    color: colors.primary,
    marginTop: '5%',
    fontSize: 20,
    alignSelf: 'center',
  },
});
export default Calander;
