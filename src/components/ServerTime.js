import React, { useState, useEffect, useRefgi } from 'react';
import { View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const ServerTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View>
      <Text>서버 시간: {currentTime.toLocaleString()}</Text>
    </View>
  );
};

export default ServerTime;
