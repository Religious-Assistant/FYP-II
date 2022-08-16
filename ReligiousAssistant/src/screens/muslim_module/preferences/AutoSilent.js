/**
 * @author Kinza
 * @version 1.0
 */

import {StyleSheet} from 'react-native';
import React from 'react';

import { View, Text, Button } from 'react-native';
import { useRingerMode,
  RINGER_MODE,
  checkDndAccess,
  requestDndAccess,
  RingerModeType, } from 'react-native-ringer-mode';

const modeText = {
  [RINGER_MODE.silent]: 'Silent',
  [RINGER_MODE.normal]: 'Normal',
  [RINGER_MODE.vibrate]: 'Vibrate',
};
const AutoSilent = () => {
  const { mode, setMode } = useRingerMode();

  const changeMode = async (newMode) => {
    // From N onward, ringer mode adjustments that would toggle Do Not Disturb
    // are not allowed unless the app has been granted Do Not Disturb Access.
    // @see https://developer.android.com/reference/android/media/AudioManager#setRingerMode(int)
    if (newMode === RINGER_MODE.silent || mode === RINGER_MODE.silent) {
      const hasDndAccess = await checkDndAccess();
      if (hasDndAccess === false) {
        // This function opens the DND settings.
        // You can ask user to give the permission with a modal before calling this function.
        requestDndAccess();
        return;
      }
    }

    setMode(newMode);
  };
  return (
    <View>
      <Text>{mode}</Text>
      <Button title="Silent" onPress={() => changeMode(RINGER_MODE.silent)} />
      <Button title="Vibrate" onPress={() => changeMode(RINGER_MODE.vibrate)} />
      <Button title="Normal" onPress={() => changeMode(RINGER_MODE.normal)} />
      
    </View>
  );
};
export default AutoSilent;

const styles = StyleSheet.create({});
