const dotenv = require('dotenv');
const { ConfigKeys } = require('./common/configKeys');
const {
    MapHumiditySensorWithFirebase,
    MapWeatherStationWithFirebase,
} = require('./common/fieldsMap');
const { load } = require('./firebase-load');
const { stream } = require('./firebase-stream');

dotenv.config();

// streamData();
loadData();

function streamData() {
    // Field1 - Humidity Sensor
    stream(
        process.env[ConfigKeys.FIREBASE_FIELD1_HUMIDITY_SENSOR_DATA_REF],
        MapHumiditySensorWithFirebase,
        process.env[ConfigKeys.THINGSBOARD_FIELD1_HUMIDITY_SENSOR_ACCESS_TOKEN]
    );
    // Weather Station
    stream(
        process.env[ConfigKeys.FIREBASE_WEATHER_STATION_DATA_REF],
        MapWeatherStationWithFirebase,
        process.env[ConfigKeys.THINGSBOARD_WEATHER_STATION_ACCESS_TOKEN]
    );
}
function loadData() {
    const data = require('./history-data/directionapp-8aee1-default-rtdb-export.json');

    // Field1 - Humidity Sensor
    const humidityData = data.user.field1.humidity_minute;
    load(
        humidityData,
        process.env[ConfigKeys.THINGSBOARD_FIELD1_HUMIDITY_SENSOR_ACCESS_TOKEN],
        MapHumiditySensorWithFirebase
    );

    // Weather Station
    const measuredData = data.user.field1.measured_data;
    load(
        measuredData,
        process.env[ConfigKeys.THINGSBOARD_WEATHER_STATION_ACCESS_TOKEN],
        MapWeatherStationWithFirebase
    );
}
