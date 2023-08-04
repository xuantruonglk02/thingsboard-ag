const dotenv = require('dotenv');
const { ConfigKeys } = require('./common/configKeys');
const {
    MapHumiditySensorWithFirebase,
    MapWeatherStationWithFirebase,
} = require('./common/fieldsMap');
const { stream } = require('./firebase-stream');

dotenv.config();

streamData();

function streamData() {
    // Field1 - Humidity Sensor
    stream(
        process.env[ConfigKeys.FIREBASE_FIELD1_HUMIDITY_SENSOR_DATA_REF],
        MapHumiditySensorWithFirebase,
        process.env[ConfigKeys.THINGSBOARD_FIELD1_HUMIDITY_SENSOR_ACCESS_TOKEN]
    );
    // Field2 - Humidity Sensor
    stream(
        process.env[ConfigKeys.FIREBASE_FIELD2_HUMIDITY_SENSOR_DATA_REF],
        MapHumiditySensorWithFirebase,
        process.env[ConfigKeys.THINGSBOARD_FIELD2_HUMIDITY_SENSOR_ACCESS_TOKEN]
    );
    // Field3 - Humidity Sensor
    stream(
        process.env[ConfigKeys.FIREBASE_FIELD3_HUMIDITY_SENSOR_DATA_REF],
        MapHumiditySensorWithFirebase,
        process.env[ConfigKeys.THINGSBOARD_FIELD3_HUMIDITY_SENSOR_ACCESS_TOKEN]
    );
    // Field4 - Humidity Sensor
    stream(
        process.env[ConfigKeys.FIREBASE_FIELD4_HUMIDITY_SENSOR_DATA_REF],
        MapHumiditySensorWithFirebase,
        process.env[ConfigKeys.THINGSBOARD_FIELD4_HUMIDITY_SENSOR_ACCESS_TOKEN]
    );
    // Weather Station
    stream(
        process.env[ConfigKeys.FIREBASE_WEATHER_STATION_DATA_REF],
        MapWeatherStationWithFirebase,
        process.env[ConfigKeys.THINGSBOARD_WEATHER_STATION_ACCESS_TOKEN]
    );
}
