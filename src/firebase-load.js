const dotenv = require('dotenv');
const { ConfigKeys } = require('./common/configKeys');
const {
    convertRawData,
    log,
    pushToDevice,
    sleep,
} = require('./common/utinities');

dotenv.config();

exports.load = async (rawData, accessToken, fieldsMap) => {
    const days = Object.keys(rawData);
    for (let i = 0; i < days.length; i++) {
        const hours = Object.keys(rawData[days[i]]);
        for (let j = 0; j < hours.length; j++) {
            const timestamp = new Date(`${days[i]} ${hours[j]}`).getTime();
            const data = convertRawData(rawData[days[i]][hours[j]], fieldsMap);

            log(timestamp, data);

            await pushToDevice(
                process.env[ConfigKeys.SERVER_DOMAIN],
                accessToken,
                { ts: timestamp, values: data }
            );

            await sleep(500);
        }
    }
};
