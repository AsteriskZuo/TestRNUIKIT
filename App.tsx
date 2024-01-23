/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {
  Container,
  ConversationDetail,
  TextInput,
  useChatContext,
} from 'react-native-chat-uikit';

function SendMessage() {
  // 0. Login
  // 1. Send message
  const [page, setPage] = React.useState(0);
  const im = useChatContext();
  const userId = 'du004';
  const userPs = '1';
  const peerId = 'du005';

  if (page === 0) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TextInput placeholder="Please Login ID." />
        <TextInput placeholder="Please Login token or password." />
        <Pressable
          onPress={() => {
            im.login({
              userId: userId,
              userToken: userPs,
              usePassword: true,
              result: res => {
                console.log('login result', res);
                if (res.isOk === true) {
                  setPage(1);
                }
              },
            });
          }}>
          <Text>{'Login'}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            im.logout({
              result: () => {},
            });
          }}>
          <Text>{'Logout'}</Text>
        </Pressable>
      </SafeAreaView>
    );
  } else if (page === 1) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ConversationDetail
          convId={peerId}
          convType={0}
          onBack={() => {
            setPage(0);
          }}
        />
      </SafeAreaView>
    );
  } else {
    return <View />;
  }
}

function App(): React.JSX.Element {
  const appKey = 'easemob#easeim';
  return (
    <Container options={{appKey: appKey}}>
      <SendMessage />
    </Container>
  );
}

export default App;
