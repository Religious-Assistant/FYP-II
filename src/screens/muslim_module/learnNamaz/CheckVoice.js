import {Button, View} from 'native-base';
import React, {useState} from 'react';
import Tts from 'react-native-tts';
import Sound from 'react-native-sound';

export default function CheckVoice() {
  const [music, setMusic] = useState(null);

  const play = () => {
    let namazSound = new Sound('azan2.mp3', Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log('error', err);
        return;
      } else {
        namazSound.play(success => {
          console.log(success);
        });
      }
    });
    setMusic(namazSound);
  };
  return (
    <View>
      <Button
        onPress={() => {
          play();
        }}>
        Start
      </Button>

      <Button
        onPress={() => {
          music.pause();
        }}>
        Pause
      </Button>
      <Button
        onPress={() => {
          music.play();
        }}>
        Resume
      </Button>
      <Button
        onPress={() => {
          music.stop();
        }}>
        Stop
      </Button>
    </View>
  );
}
