import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const API_KEY = '85e3205ed0e54a5ead7133014251504';
const CITY = 'Magnitogorsk';
const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=yes&lang=ru`;

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true); // Начинаем загрузку
      try {
        const response = await fetch(URL);
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
          setError(null); // Clear any previous errors
        } else {
          setError(data.error?.message || 'Не удалось получить данные о погоде');
          setWeatherData(null);
        }
      } catch (err) {
        setError('Ошибка при запросе к API: ' + err.message);
        setWeatherData(null);
      } finally {
        setLoading(false); // Заканчиваем загрузку, независимо от результата
      }
    };

    fetchWeather();
  }, []);

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
}

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