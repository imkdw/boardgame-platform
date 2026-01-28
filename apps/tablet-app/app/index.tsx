import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useState, useRef, useCallback } from 'react';
import { useDeviceId } from '../hooks/use-device-id';
import { BRIDGE_MESSAGE_TYPE, type BridgeMessage } from '../types/bridge.types';

const WEB_APP_PORT = 3001;
const PRODUCTION_URL = 'https://your-production-url.com';
const ANDROID_EMULATOR_LOCALHOST = '10.0.2.2';
const DEV_MACHINE_IP = '172.30.1.87';

const getWebAppUrl = () => {
  if (!__DEV__) {
    return PRODUCTION_URL;
  }

  if (Platform.OS === 'android') {
    return `http://${ANDROID_EMULATOR_LOCALHOST}:${WEB_APP_PORT}`;
  }

  return `http://${DEV_MACHINE_IP}:${WEB_APP_PORT}`;
};

const INJECTED_SCRIPT = `
(() => {
  if (window.__injectedScriptRan) return true;
  window.__injectedScriptRan = true;

  const style = document.createElement('style');
  style.textContent = 'html, body, * { touch-action: manipulation; -webkit-touch-callout: none; -webkit-user-select: none; user-select: none; }';
  document.head.appendChild(style);

  let meta = document.querySelector('meta[name="viewport"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'viewport';
    document.head.appendChild(meta);
  }
  meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';

  document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
  document.addEventListener('gesturechange', (e) => e.preventDefault(), { passive: false });
  document.addEventListener('gestureend', (e) => e.preventDefault(), { passive: false });
  
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
  }, { passive: false });

  let easterEggTaps = 0;
  let easterEggTimeout = null;

  document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    if (!touch) return;
    
    const isTopRight = touch.clientX > window.innerWidth - 100 && touch.clientY < 100;
    if (!isTopRight) return;
    
    if (easterEggTimeout) clearTimeout(easterEggTimeout);
    easterEggTaps++;
    
    if (easterEggTaps >= 7) {
      easterEggTaps = 0;
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'EASTER_EGG_TRIGGERED' }));
    } else {
      easterEggTimeout = setTimeout(() => {
        easterEggTaps = 0;
      }, 2000);
    }
  }, true);

  return true;
})();
`;

export default function Index() {
  const [url] = useState(getWebAppUrl());
  const webViewRef = useRef<WebView>(null);
  const { deviceId, isLoading } = useDeviceId();

  const sendMessageToWebView = useCallback((type: string, data: unknown) => {
    const message: BridgeMessage = { type: type as BridgeMessage['type'], data };
    const script = `
      (function() {
        window.dispatchEvent(new CustomEvent('fromRN', { 
          detail: ${JSON.stringify(message)} 
        }));
      })();
      true;
    `;
    webViewRef.current?.injectJavaScript(script);
  }, []);

  const handleWebViewMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const message = JSON.parse(event.nativeEvent.data);

        switch (message.type) {
          case 'EASTER_EGG_TRIGGERED':
            sendMessageToWebView(BRIDGE_MESSAGE_TYPE.RN_OPEN_ADMIN, {});
            break;

          case BRIDGE_MESSAGE_TYPE.WEB_READY:
            if (deviceId) {
              sendMessageToWebView(BRIDGE_MESSAGE_TYPE.RN_INIT, {
                deviceId,
                appVersion: '1.0.0',
              });
            }
            break;

          case BRIDGE_MESSAGE_TYPE.WEB_REQUEST_DEVICE_ID:
            if (deviceId) {
              sendMessageToWebView(BRIDGE_MESSAGE_TYPE.RN_DEVICE_INFO, { deviceId });
            }
            break;
        }
      } catch {
        // eslint-disable-next-line no-console
        console.log('Failed to parse WebView message');
      }
    },
    [deviceId, sendMessageToWebView]
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webview}
        source={{ uri: url }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsInlineMediaPlayback={true}
        mixedContentMode="compatibility"
        bounces={false}
        overScrollMode="never"
        scalesPageToFit={false}
        injectedJavaScript={INJECTED_SCRIPT}
        onMessage={handleWebViewMessage}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
