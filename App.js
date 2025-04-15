import React from 'react';
import weather from "./components/weather2.js"
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  const { location, current } = weather();

  const city = location.name;
  const region = location.region;

  console.log(city, region)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{city}</Text>
      <Text style={styles.text}>{region}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default App;