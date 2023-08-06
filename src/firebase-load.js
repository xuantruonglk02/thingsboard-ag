const dotenv = require('dotenv');
const { ConfigKeys } = require('./common/configKeys');
const {
    MapHumiditySensorWithFirebase,
    MapWeatherStationWithFirebase,
} = require('./common/fieldsMap');
const {
    convertRawData,
    log,
    pushToDevice,
    sleep,
} = require('./common/utinities');

dotenv.config();

loadData();

function loadData() {
    const data = require('../data-firebase/directionapp-8aee1-default-rtdb-export.json');

    // // Field1 - Humidity Sensor
    // const humidityData = data.user.field1.humidity_minute;
    // load(
    //     humidityData,
    //     process.env[ConfigKeys.THINGSBOARD_FIELD1_HUMIDITY_SENSOR_ACCESS_TOKEN],
    //     MapHumiditySensorWithFirebase
    // );

    // Field2 - Humidity Sensor
    const humidityData2 = data.user.field2.humidity_minute;
    load(
        humidityData2,
        process.env[ConfigKeys.THINGSBOARD_FIELD2_HUMIDITY_SENSOR_ACCESS_TOKEN],
        MapHumiditySensorWithFirebase
    );

    // Field3 - Humidity Sensor
    const humidityData3 = data.user.field3.humidity_minute;
    load(
        humidityData3,
        process.env[ConfigKeys.THINGSBOARD_FIELD3_HUMIDITY_SENSOR_ACCESS_TOKEN],
        MapHumiditySensorWithFirebase
    );

    // Field4 - Humidity Sensor
    const humidityData4 = data.user.field4.humidity_minute;
    load(
        humidityData4,
        process.env[ConfigKeys.THINGSBOARD_FIELD4_HUMIDITY_SENSOR_ACCESS_TOKEN],
        MapHumiditySensorWithFirebase
    );

    // // Weather Station
    // const measuredData = data.user.field1.measured_data;
    // load(
    //     measuredData,
    //     process.env[ConfigKeys.THINGSBOARD_WEATHER_STATION_ACCESS_TOKEN],
    //     MapWeatherStationWithFirebase
    // );
}

async function load(rawData, accessToken, fieldsMap) {
    const days = Object.keys(rawData);
    for (let i = 0; i < days.length; i++) {
        const hours = Object.keys(rawData[days[i]]);
        for (let j = 0; j < hours.length; j++) {
            const timestamp = new Date(`${days[i]} ${hours[j]}`).getTime();
            // if (timestamp < new Date('2023-08-06 00:00:00').getTime()) continue;

            const data = convertRawData(rawData[days[i]][hours[j]], fieldsMap);

            log(timestamp, data);

            await pushToDevice(
                process.env[ConfigKeys.SERVER_DOMAIN],
                accessToken,
                { ts: timestamp, values: data }
            );

            await sleep(700);
        }
    }
}
