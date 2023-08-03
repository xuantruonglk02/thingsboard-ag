const { default: axios } = require('axios');

exports.convertRawData = (rawData, fieldsMap) => {
    const data = {};
    Object.entries(fieldsMap).forEach(([key, value]) => {
        if (rawData[value] !== undefined) {
            data[key] = rawData[value];
        }
    });
    return data;
};

exports.getDataAndTimestamp = (snapshot, fieldsMap) => {
    const day = Object.keys(snapshot.val()).at(-1);
    const hour = Object.keys(snapshot.val()[day]).at(-1);

    const rawData = snapshot.val()[day][hour];
    const data = this.convertRawData(rawData, fieldsMap);
    const timestamp = new Date(`${day} ${hour}`).getTime();

    return {
        data,
        timestamp,
    };
};

exports.log = (timestamp, data) => {
    console.log({
        ts: timestamp,
        date: new Date(timestamp),
        data,
    });
};

exports.pushToDevice = (host, accessToken, data) => {
    return axios.post(`${host}/api/v1/${accessToken}/telemetry`, data);
};

exports.sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
