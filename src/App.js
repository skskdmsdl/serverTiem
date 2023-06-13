import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';

import ServerTime from './components/ServerTime';

export default function App() {
  const [url, setUrl] = useState('');

  const handleUrlChange = (text) => {
    setUrl(text);
  };

  const handlePress = () => {
    // URL 처리 로직을 추가할 수 있습니다.
    Alert.alert('입력한 URL: ', url);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 5 }}
          placeholder="URL을 입력하세요."
          onChangeText={handleUrlChange}
          value={url}
        />
        <Button title="입력" onPress={handlePress} />
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
