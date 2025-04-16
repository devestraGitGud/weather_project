import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export const WeatherDisplay = ({ weatherData, loading, error }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Загрузка данных о погоде...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Ошибка: {error}</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Нет данных о погоде.</Text>
      </View>
    );
  }

  const { location, current } = weatherData;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Погода в городе {location.name}</Text>
      <Text style={styles.text}>Температура: {current.temp_c}°C</Text>
      <Text style={styles.text}>Ощущается как: {current.feelslike_c}°C</Text>
      <Text style={styles.text}>Погодные условия: {current.condition.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});