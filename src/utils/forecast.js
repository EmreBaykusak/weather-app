import request from "request";
export const forecast = (lat, lon, callback) => {
    const url = "https://api.weatherstack.com/current?access_key=9d84eaa4f849922c91445d7bf9968b9f&query=" + lat + "," + lon + "&units=m";
    request.get({ url, json: true }, (error, response) => {
        if (error) {
            callback("Failed to get a response from Weather API, please try again", undefined);
        }
        else if (response?.body.error) {
            callback("Invalid input parameter", undefined);
        }
        else {
            const { weather_descriptions, temperature, feelslike } = response.body.current;
            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.');
        }
    });
};
//# sourceMappingURL=forecast.js.map