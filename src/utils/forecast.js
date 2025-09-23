import request from "request";
export const forecast = (lat, lon, callback) => {
    const url = "https://api.weatherstack.com/current?access_key=9d84eaa4f849922c91445d7bf9968b9f&query=" + lat + "," + lon + "&units=m";
    request.get({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Failed to get a response from Weather API, please try again", undefined);
        }
        else if (body.error) {
            callback("Invalid input parameter", undefined);
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.');
        }
    });
};
