const https = require('https');

const API_KEY = '85e3205ed0e54a5ead7133014251504';
const CITY = 'Magnitogorsk';
const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=yes`;

https.get(URL, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Ошибка HTTP: ${res.statusCode}`);
        return;
    }

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const weatherData = JSON.parse(data);
            
            if (weatherData.error) {
                console.error('Ошибка API:', weatherData.error.message);
                return;
            }

            const { location, current } = weatherData;
            
            console.log('┌───────────────────────────┐');
            console.log(`│ Город: ${location.name.padEnd(24)}│`);
            console.log(`│ Температура: ${current.temp_c.toString().padEnd(17)}°C │`);
            console.log(`│ Ощущается как: ${current.feelslike_c.toString().padEnd(13)}°C │`);
            console.log(`│ Погодные условия: ${current.condition.text.padEnd(10)}│`);
            console.log('└───────────────────────────┘');
            
            return { location, current };

        } catch (error) {
            console.error('Ошибка парсинга ответа:', error);
        }
    });
}).on('error', (error) => {
    console.error('Ошибка запроса:', error.message);
});