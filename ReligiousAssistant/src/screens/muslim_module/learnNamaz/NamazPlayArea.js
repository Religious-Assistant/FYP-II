/**
 * @author Kinza Kiran && Nadir Hussain
 * @version 1.0
 */

import React, {useState, useEffect} from 'react';
import {Button, Image, View, Text, Progress} from 'native-base';
import {StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';

//icons
import Icon from 'react-native-vector-icons/Ionicons';

//theme
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

//import all learn_namaz images
import {
  sunnah2,
  farz2,
  farz4,
  sunnah4,
  nafl2,
  farz3,
  witr3,
} from './LearnNamazAssets';
import {getScene} from './LearnNamazAssets';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getParticularRakatInfo,
  selectHasLearnedParticularRakat,
  selectIsLoadingHasLearnedparticularRakat,
  selectIsLoadingUpdateNamazProgress,
  updateLearnNamazProgress,
} from '../../../redux/slices/muslim_module_slices/learnNamazSlice';
import {selectUserData} from '../../../redux/slices/auth_slices/authSlice';

import Loader from '../../common/Loader';
//for audio
import Sound from 'react-native-sound';

const NamazPlayArea = ({route, navigation}) => {
  const {namazInfo, namazName} = route.params;
  const [playBtn, setPlayBtn] = useState(false);
  const [pauseBtn, setPauseBtn] = useState(true);
  const [resumeBtn, setResumeBtn] = useState(true);
  const [stopBtn, setStopBtn] = useState(true);

  const namaz = checkRakat(namazInfo);
  const [scene, setScene] = useState(getScene(namaz, 0));
  const [progress, setProgress] = useState(1);

  const [audio, setAudio] = useState(null);

  const play = ayatSound => {
    let namazSound = new Sound(ayatSound, Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log('error', err);
        return;
      } else {
        namazSound.play(success => {
          console.log(success);
          setPlayBtn(false);
    setPauseBtn(true);
    setResumeBtn(true);
    setStopBtn(true);
        });
      }
    });
    setAudio(namazSound);
    
  };

  async function renderNextScene() {
    audio?audio.stop():''
    setPlayBtn(false);
    setPauseBtn(true);
    setResumeBtn(true);
    setStopBtn(true);
    if (scene.step < namaz.length) {
      setScene(getScene(namaz, scene.step));
      setProgress(prev => prev + 1);
    }
  }

  function checkRakat(namazInfo) {
    let namaz;
    if (namazName == 'Fajr') {
      if (namazInfo.rakatName == 'Sunnat' && namazInfo.rakats == 2) {
        sunnah2[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 2 رکعت سنت، وقت فجر، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = sunnah2;
      } else if (namazInfo.rakatName == 'Farz' && namazInfo.rakats == 2) {
        farz2[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 2 رکعت فرض، وقت فجر، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = farz2;
      }
    } else if (namazName == 'Duhr') {
      if (namazInfo.rakatName == 'Sunnat' && namazInfo.rakats == 4) {
        sunnah4[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 4 رکعت سنت، وقت ظُهْر، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = sunnah4;
      } else if (namazInfo.rakatName == 'Farz' && namazInfo.rakats == 4) {
        farz4[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 4 رکعت فرض، وقت ظُهْر، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = farz4;
      } else if (namazInfo.rakatName == 'Sunnat' && namazInfo.rakats == 2) {
        sunnah2[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 2 رکعت سنت، وقت ظُهْر، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = sunnah2;
      } else if (namazInfo.rakatName == 'Nafl' && namazInfo.rakats == 2) {
        nafl2[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 2 رکعت نفل، وقت ظُهْر، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = nafl2;
      }
    } else if (namazName == 'Asr') {
      if (namazInfo.rakatName == 'Sunnat' && namazInfo.rakats == 4) {
        sunnah4[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 4 رکعت سنت، وقت عصر، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = sunnah4;
      } else if (namazInfo.rakatName == 'Farz' && namazInfo.rakats == 4) {
        farz4[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 4 رکعت فرض، وقت عصر، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = farz4;
      }
    } else if (namazName == 'Maghrib') {
      if (namazInfo.rakatName == 'Farz' && namazInfo.rakats == 3) {
        farz3[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 3 رکعت فرض، وقت مغرب، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = farz3;
      } else if (namazInfo.rakatName == 'Sunnat' && namazInfo.rakats == 2) {
        sunnah2[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 2 رکعت سنت، وقت مغرب، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = sunnah2;
      } else if (namazInfo.rakatName == 'Nafl' && namazInfo.rakats == 2) {
        nafl2[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 2 رکعت نفل، وقت مغرب، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = nafl2;
      }
    } else if (namazName == 'Isha') {
      if (namazInfo.rakatName == 'Sunnat' && namazInfo.rakats == 4) {
        sunnah4[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 4 رکعت سنت، وقت عِشَاء، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = sunnah4;
      } else if (namazInfo.rakatName == 'Farz' && namazInfo.rakats == 4) {
        farz4[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 4 رکعت فرض، وقت عِشَاء، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = farz4;
      } else if (namazInfo.rakatName == 'Sunnat' && namazInfo.rakats == 2) {
        sunnah2[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 2 رکعت سنت، وقت عِشَاء، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = sunnah2;
      } else if (namazInfo.rakatName == 'Nafl' && namazInfo.rakats == 2) {
        nafl2[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 2 رکعت نفل، وقت عِشَاء، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = nafl2;
      } else if (namazInfo.rakatName == 'Witr' && namazInfo.rakats == 3) {
        namaz = witr3;
      } else if (namazInfo.rakatName == 'Nafl' && namazInfo.rakats == 2) {
        nafl2[0].text =
          'نیت کرتا/ کرتی ہوں نماز کی، 2 رکعت نفل، وقت عِشَاء، واسطے اللہ کے مہ کعبہ شریف کی طرف';
        namaz = nafl2;
      }
    }

    return namaz;
  }
  async function renderPreviousScsne() {
    audio?audio.stop():''
    setPlayBtn(false);
    setPauseBtn(true);
    setResumeBtn(true);
    setStopBtn(true);
    if (scene.step > 1) {
      setScene(getScene(namaz, scene.step - 2));
      setProgress(prev => prev - 1);
    }
  }

  //Redux
  const dispatch = useDispatch();
  const isLoadingUpdateNamazProgress = useSelector(
    selectIsLoadingUpdateNamazProgress,
  );

  const user = useSelector(selectUserData);
  const hasLearnedRakat = useSelector(selectHasLearnedParticularRakat);
  const isLoadingHasLearnedParticularRakat = useSelector(
    selectIsLoadingHasLearnedparticularRakat,
  );

  useEffect(() => {
    dispatch(
      getParticularRakatInfo({
        username: user?.username,
        rakatName: namazInfo?.rakatName,
        namazName: namazName,
        rakats: namazInfo?.rakats,
      }),
    );
  }, []);

  function markAsComplete() {
    const namaz = {...namazInfo, namazName};

    dispatch(
      updateLearnNamazProgress({username: user?.username, namaz, state: true}),
    );
  }

  function markAsIncomplete() {
    const namaz = {...namazInfo, namazName};
    dispatch(
      updateLearnNamazProgress({username: user?.username, namaz, state: false}),
    );
  }

  return (
    <View style={styles.container}>
      {isLoadingUpdateNamazProgress || isLoadingHasLearnedParticularRakat ? (
        <Loader msg="Updating/Loading progress..." />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.infoText}>{scene.desc}</Text>
            <Text style={styles.namazText}>{scene.text}</Text>
          </View>
          <View style={styles.playArea}>
            <Image
              source={scene.image}
              key={scene.step}
              resizeMethod="resize"
              style={{width: 420, height: 420}}
              alt="Could not load step"></Image>
            <Progress
              max={namaz.length}
              value={progress}
              borderRadius={0}
              style={{backgroundColor: colors.cover}}
              colorScheme="emerald"
            />
          </View>

          <View style={styles.controls}>
            <TouchableHighlight onPress={renderPreviousScsne} >
              <View style={styles.iconButton}>
                <Icon name="arrow-back" size={30} style={styles.icon}></Icon>
                <Text style={styles.text}>Back</Text>
              </View>
            </TouchableHighlight>

            {hasLearnedRakat ? (
              <Button
                w={150}
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: colors.success.light,
                    color: colors.primary,
                  },
                ]}
                onPress={markAsIncomplete}
                disabled={true}>
                Completed
              </Button>
            ) : (
              <Button
                w={150}
                style={styles.actionButton}
                onPress={markAsComplete}>
                Mark as Complete
              </Button>
            )}

            <TouchableHighlight onPress={renderNextScene}>
              <View style={styles.iconButton}>
                <Text style={styles.text}>Next</Text>
                <Icon name="arrow-forward" size={30} style={styles.icon}></Icon>
              </View>
            </TouchableHighlight>
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              opacity: scene.sound == '' ? 0 : 1,
              flex: 0.1,
            }}>
              <View style={{alignContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setPlayBtn(true);
                  setStopBtn(true);
                  setPauseBtn(true)
                  setResumeBtn(false);
                  audio.pause();
                }}
                disabled={pauseBtn}>
                <Image
                  source={{
                    uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1665654301/religious-assistant/static_assets/pause_ygmljb.png',
                  }}
                  alt="pause"
                  tintColor={
                    pauseBtn ? colors.tertiary : colors.success.moderate
                  }
                  style={{width: 40, height: 40}}
                />
              </TouchableOpacity>
              <Text style={{fontFamily: fonts.Signika.bold, marginTop: '-15%'}}>
                Pause
              </Text>
            </View>
            <View style={{alignContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setStopBtn(false);
                  setPauseBtn(false);
                  setPlayBtn(true);
                  play(scene.sound);
                }}
                disabled={playBtn}>
                <Image
                  source={{
                    uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1665654301/religious-assistant/static_assets/play-button_nqncok.png',
                  }}
                  alt="play"
                  style={{width: 40, height: 40}}
                  tintColor={playBtn ? colors.muted : colors.success.moderate}
                />
              </TouchableOpacity>
              <Text style={{fontFamily: fonts.Signika.bold, marginTop: '-15%'}}>
                Play
              </Text>
            </View>
            <View style={{alignContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setPlayBtn(false);
                  setPauseBtn(true);
                  setStopBtn(true);
                  setResumeBtn(true);
                  audio.stop();
                }}
                disabled={stopBtn}>
                <Image
                  source={{
                    uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1665654300/religious-assistant/static_assets/stop-button_dlrbat.png',
                  }}
                  alt="stop"
                  tintColor={
                    stopBtn ? colors.tertiary : colors.success.moderate
                  }
                  style={{width: 40, height: 40}}
                />
              </TouchableOpacity>
              <Text style={{fontFamily: fonts.Signika.bold, marginTop: '-15%'}}>
                Stop
              </Text>
            </View>
            <View style={{alignContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setPauseBtn(false);
                  setStopBtn(false);
                  setResumeBtn(true)
                  audio.play();
                }}
                disabled={resumeBtn}>
                <Image
                  source={{
                    uri: 'https://res.cloudinary.com/nadirhussainnn/image/upload/v1665654301/religious-assistant/static_assets/record_rhfimw.png',
                  }}
                  alt="resume"
                  tintColor={
                    resumeBtn ? colors.tertiary : colors.success.moderate
                  }
                  style={{width: 50, height: 40}}
                />
              </TouchableOpacity>
              <Text style={{fontFamily: fonts.Signika.bold, marginTop: '-15%'}}>
                Resume
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default NamazPlayArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.28,
    backgroundColor: colors.primary,
  },

  playArea: {
    flex: 0.6,
  },
  controls: {
    flex: 0.06,
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:'5%',
    marginBottom:'1%'
  },
  iconButton: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 5,
    borderRadius: 8,
  },
  icon: {
    color: colors.white,
  },
  text: {
    fontFamily: fonts.Signika.bold,
    fontSize: 20,
    color: colors.white,
  },
  actionButton: {
    backgroundColor: colors.primary,
  },
  namazText: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  infoText: {
    color: colors.secondary,
    fontSize: 20,
    letterSpacing: 2,
    padding: 10,
    fontFamily: fonts.Signika.bold,
  },
});
