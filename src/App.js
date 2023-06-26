import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

import ServerTime from './components/ServerTime';

export default function App() {
  const [url, setUrl] = useState('');
  const [serverTime, setServerTime] = useState('');

  const handleUrlChange = (text) => {
    setUrl(text);
  };

  /* 서버타임 가져오기 */
  const fetchServerTime = async () => {
    try {
      const response = await axios.get(url);
      const serverDate = new Date(response.headers.date);
      const serverTime = serverDate.toLocaleTimeString();
      setServerTime(serverTime);
    } catch (error) {
      console.error(error);
      setServerTime('Error fetching server time');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={{ width: 300, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 5 }}
          placeholder="URL을 입력하세요."
          onChangeText={handleUrlChange}
          value={url}
        />
        <Button title="입력" onPress={fetchServerTime} />
      </View>
      <ServerTime />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
