import request from "request";
export const geocode = (city, callback) => {
    const url = "https://nominatim.openstreetmap.org/search?country=&city=" + encodeURIComponent(city) + "&format=json&limit=1";
    const headers = {
        "User-Agent": "MyWeatherApp/1.0 (emre-baykusak@hotmail.com)",
        "Referer": "MyWeatherApp"
    };
    request.get({ url, json: true, headers }, (error, { body }) => {
        if (error) {
            callback("Failed to get a response from Nominatim API, please try again", undefined);
        }
        else if (body.error) {
            callback("Invalid input parameter", undefined);
        }
        else if (body.length === 0) {
            callback("Unable to find the given location. Try another search", undefined);
        }
        else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].display_name
            });
        }
    });
};
