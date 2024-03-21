import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import All from './components/All.js';

export default function App() {
  return (
    <View  style={styles.container}>
      <All/>
    </View>
  );
}

const styles = StyleSheet.create({
//   container: {
//  marginTop:"3cm"
//   },
});
