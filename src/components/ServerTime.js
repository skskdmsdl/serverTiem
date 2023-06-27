import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const ServerTime = (serverTime) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // notification
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      clearInterval(timer);

      // notification
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    }}>
    <Text>Your expo push token: {expoPushToken}</Text>
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Title: {notification && notification.request.content.title} </Text>
      <Text>Body: {notification && notification.request.content.body}</Text>
      <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
    </View>
    <View>
      <Text>서버 시간: {currentTime.toLocaleString()}</Text>
      <Text>서버 시간: {serverTime.toLocaleString()}</Text>
    </View>
    <Button title="Press to schedule a notification"
            onPress={async () => {
              await schedulePushNotification(currentTime.toLocaleString());
            }}
    />
   </View>
  );
};

async function schedulePushNotification(currentTime) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "서버 시간 푸쉬 📬",
      body: currentTime,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: ''
   })).data;  // TODO: 추후 앱 등록하고 projectId 추가할 것
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default ServerTime;
