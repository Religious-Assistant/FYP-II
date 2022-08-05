import React from 'react'
import { Share, View, Button } from 'react-native';

export default function ShareApp() {
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'https://www.google.com/',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
                console.log("Shared")
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };
  return (
    <View style={{ marginTop: 50 }}>
      <Button onPress={onShare} title="Share" />
    </View>
  )
}
