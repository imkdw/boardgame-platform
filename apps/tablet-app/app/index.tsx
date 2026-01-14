import { Platform, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState, useEffect } from 'react';

const WEB_APP_PORT = 3001;
const PRODUCTION_URL = 'https://your-production-url.com';
const ANDROID_EMULATOR_LOCALHOST = '10.0.2.2';

// TODO: 실제 배포 시 환경변수로 변경 필요
const DEV_MACHINE_IP = '172.30.1.87';

const getWebAppUrl = () => {
  if (!__DEV__) {
    return PRODUCTION_URL;
  }

  if (Platform.OS === 'android') {
    return `http://${ANDROID_EMULATOR_LOCALHOST}:${WEB_APP_PORT}`;
  }

  // iOS: 항상 개발 머신 IP 사용 (실제 디바이스와 시뮬레이터 모두)
  return `http://${DEV_MACHINE_IP}:${WEB_APP_PORT}`;
};

export default function Index() {
  const [url] = useState(getWebAppUrl());

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('WebView URL:', url);
  }, [url]);

  return (
    <WebView
      style={styles.container}
      source={{ uri: url }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      allowsInlineMediaPlayback={true}
      mixedContentMode="compatibility"
      bounces={false}
      overScrollMode="never"
      onError={syntheticEvent => {
        const { nativeEvent } = syntheticEvent;
        // eslint-disable-next-line no-console
        console.log('WebView error:', JSON.stringify(nativeEvent));
      }}
      onHttpError={syntheticEvent => {
        const { nativeEvent } = syntheticEvent;
        // eslint-disable-next-line no-console
        console.log('WebView HTTP error:', JSON.stringify(nativeEvent));
      }}
      renderError={errorName => (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {errorName}</Text>
          <Text style={styles.errorText}>URL: {url}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});
