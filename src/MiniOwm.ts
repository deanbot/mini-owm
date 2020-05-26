import getAtts from "./common/getAtts";
import IMiniOwm from "./IMiniOwm";

export class MiniOwm implements IMiniOwm {
  private _apiKey: string;
  private _longitude: number;
  private _latitude: number;
  private _exclude: string;

  constructor(
    apiKey?: string,
    latitude?: number,
    longitude?: number,
    exclude?: string,
  ) {
    this._apiKey = apiKey || '';
    this._latitude = latitude || 0;
    this._longitude = longitude || 0;
    this._exclude = exclude || '';
  }

  public apiKey(value: string) {
    if (value) {
      this._apiKey = value;
    }
    return this;
  }

  public latitude(value: number) {
    if (value) {
      this._latitude = value;
    }
    return this;
  }

  public longitude(value: number) {
    if (value) {
      this._longitude = value;
    }
    return this;
  }

  public exclude(value: string) {
    if (value) {
      this._exclude = value;
    }
    return this;
  }

  public get(attributes?: getAtts) {
    const {
      _latitude,
      _longitude,
      _exclude,
      _apiKey,
    } = this,
      atts = attributes || {},
      key = atts.apiKey || _apiKey,
      lat = atts.coords ? atts.coords.latitude : _latitude,
      lon = atts.coords ? atts.coords.longitude : _longitude,
      part = atts.exclude || _exclude;
    if (!key || !lat || -lon) {
      throw new Error('Missing required parameters for Open Weather Map api call.');
    }
    const uri = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}`;
    return fetch(uri)
      .then((res) => {
        return res.json();
      });
  }
}
export default MiniOwm;
