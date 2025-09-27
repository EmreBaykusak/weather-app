import request from "request";

type WeatherStackCallback = (error: string | undefined, data: string | undefined) => void;
type WeatherResponse = {
    current: {
        weather_descriptions: string[];
        temperature: number;
        feelslike: number;
        humidity: number;
    };
    error?: any;
}

export const forecast = (lat: string, lon: string, callback: WeatherStackCallback): void => {
    const url: string = "https://api.weatherstack.com/current?access_key=9d84eaa4f849922c91445d7bf9968b9f&query=" + lat + "," + lon + "&units=m"
    request.get({url, json: true}, (error: Error | null, response?: {body: WeatherResponse}) => {
        if (error) {
            callback("Failed to get a response from Weather API, please try again", undefined);
        }
        else if(response?.body.error){
            callback("Invalid input parameter", undefined)
        }
        else{
            const {weather_descriptions, temperature, feelslike, humidity} = response!.body.current;
            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out. The humidity is ' + humidity + 'percent.')
        }
    })
}