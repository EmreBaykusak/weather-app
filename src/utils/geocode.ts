import request from "request";

export interface GeocodeResult {
    latitude: string;
    longitude: string;
    location: string;
}

interface NominatimItem {
    lat: string;
    lon: string;
    display_name: string;
}

type OsmCallback = (error: string | undefined, data: GeocodeResult | undefined) => void;

export const geocode = (city: string, callback: OsmCallback): void => {
    const url: string = "https://nominatim.openstreetmap.org/search?country=&city=" + encodeURIComponent(city) + "&format=json&limit=1"
    const headers = {
        "User-Agent": "MyWeatherApp/1.0 (emre-baykusak@hotmail.com)",
        "Referer": "MyWeatherApp"
    }

    request.get({url, json: true, headers}, (error: Error | null, response?: {body: NominatimItem[]}) => {
        if (error) {
            callback("Failed to get a response from Nominatim API, please try again", undefined);
        }
        else if(!response?.body || response.body.length === 0) {
            callback("Unable to find the given location. Try another search", undefined);
        }
        else{
            const item = response.body[0]!;
            callback(undefined, {
                latitude: item.lat,
                longitude: item.lon,
                location: item.display_name
            });
        }
    })
}
