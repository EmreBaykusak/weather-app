export interface GeocodeResult {
    latitude: string;
    longitude: string;
    location: string;
}
type OsmCallback = (error: string | undefined, data: GeocodeResult | undefined) => void;
export declare const geocode: (city: string, callback: OsmCallback) => void;
export {};
//# sourceMappingURL=geocode.d.ts.map