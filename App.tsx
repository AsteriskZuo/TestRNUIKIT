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
  GlobalContainer as UIKitContainer,
  ChatFragment,
  TextInput,
  useChatSdkContext,
} from 'react-native-agora-chat-uikit';

const appKey = 'easemob#easeim';
const userId = 'du004';
const userPs = '1';
const peerId = 'du005';

function SendMessage() {
  const [page, setPage] = React.useState(0);
  const [id, setId] = React.useState(userId);
  const [ps, setPs] = React.useState(userPs);
  const [peer, setPeer] = React.useState(peerId);
  const {login, logout} = useChatSdkContext();

  if (page === 0) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TextInput
          placeholder="Please Login ID."
          value={id}
          onChangeText={setId}
        />
        <TextInput
          placeholder="Please Login token or password."
          value={ps}
          onChangeText={setPs}
        />
        <TextInput
          placeholder="Please peer ID."
          value={peer}
          onChangeText={setPeer}
        />
        <Pressable
          onPress={() => {
            console.log('test:zuoyu:login', id, ps);
            login({
              id: id,
              pass: ps,
              type: 'easemob',
              onResult: res => {
                console.log('test:zuoyu:login', res);
                if (res.result) {
                  setPage(1);
                }
              },
            });
          }}>
          <Text>{'Login'}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            logout({
              onResult: res => {
                console.log('test:zuoyu:logout', res);
                if (res.result) {
                  setPage(0);
                }
              },
            });
          }}>
          <Text>{'Logout'}</Text>
        </Pressable>
      </SafeAreaView>
    );
  } else if (page === 1) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Pressable
          onPress={() => {
            logout({
              onResult: res => {
                console.log('test:zuoyu:logout', res);
                if (res.result) {
                  setPage(0);
                }
              },
            });
          }}>
          <Text>{'Logout'}</Text>
        </Pressable>
        <ChatFragment
          screenParams={{
            params: {
              chatId: peer,
              chatType: 0,
            },
          }}
        />
      </SafeAreaView>
    );
  } else {
    return <View />;
  }
}

function App(): React.JSX.Element {
  return (
    <UIKitContainer
      option={{
        appKey: appKey,
        autoLogin: false,
        debugModel: true,
        pushConfig: undefined,
        requireAck: undefined,
        requireDeliveryAck: undefined,
      }}>
      <SendMessage />
    </UIKitContainer>
  );
}

export default App;
