import getAtts from "./getAtts";
import IMiniOwm from "./IMiniOwm";
import Units from "./Units";

export class MiniOwm implements IMiniOwm {
  private _apiKey: string;
  private _longitude: number;
  private _latitude: number;
  private _exclude: string;
  private _units: string;
  private _language: string;

  constructor(
    apiKey?: string,
    latitude?: number,
    longitude?: number,
    exclude?: string,
    units?: string,
    language?: string,
  ) {
    this._apiKey = apiKey || '';
    this._latitude = latitude || 0;
    this._longitude = longitude || 0;
    this._exclude = exclude || '';
    this._units = (units && units.trim()) ? units.trim().toLowerCase() : Units.Metric;
    if (this._units === Units.Standard) {
      this._units = '';
    }
    this._language = (language && language.trim()) ? language.trim().toLowerCase() : '';
  }

  public apiKey(value: string) {
    this._apiKey = value;
    return this;
  }

  public latitude(value: number) {
    this._latitude = value;
    return this;
  }

  public longitude(value: number) {
    this._longitude = value;
    return this;
  }

  public exclude(value: string) {
    this._exclude = value;
    return this;
  }

  // temperature in Kelvin
  // wind in meter/sec
  public standard() {
    this._units = Units.Standard;
    return this;
  }

  // temperature in Celsius
  // wind in meter/sec
  public metric() {
    this._units = Units.Metric;
    return this;
  }

  // temperature in Fahrenheit
  // wind in miles/hour
  public imperial() {
    this._units = Units.Imperial;
    return this;
  }

  // set output of description field
  // see possible values here: https://openweathermap.org/api/one-call-api
  public language(value:string) {
    this._language = (value && value.trim()) ? value.trim().toLowerCase() : '';
    return this;
  }

  public get(attributes?: getAtts) {
    const {
      _latitude,
      _longitude,
      _exclude,
      _apiKey,
      _units,
      _language,
    } = this,
      atts = attributes || {},
      key = atts.apiKey || _apiKey,
      lat = atts.coords ? atts.coords.latitude : _latitude,
      lon = atts.coords ? atts.coords.longitude : _longitude,
      lang = (atts.language && atts.language.trim()) ? atts.language.trim().toLowerCase() : _language,
      units = (atts.units && atts.units.trim()) ? atts.units.trim().toLowerCase() : _units,
      part = atts.exclude || _exclude;
    if (!key || !lat || !lon) {
      throw new Error('Missing required parameters for Open Weather Map api call.');
    }
    let uri = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}`;
    if (units && units !== Units.Standard) {
      uri = `${uri}&units=${units}`
    }
    if (lang) {
      uri = `${uri}&lang=${lang}`
    }

    return fetch(uri)
      .then(res => res.json())
      .then(res => {
        if (res.current) {
          res.current.rain = this.getPrecipitation(res.current.rain);
          res.current.snow = this.getPrecipitation(res.current.snow);
        }
        if (res.daily) {
          res.daily = res.daily.map(item => {
            item.rain = this.getPrecipitation(item.rain);
            item.snow = this.getPrecipitation(item.snow);
            return item;
          });
        }
        if (res.hourly) {
          res.hourly = res.hourly.map(item => {
            item.rain = this.getPrecipitation(item.rain);
            item.snow = this.getPrecipitation(item.snow);
            return item;
          });
        }
        return res;
      });
  }

  // owm puts precip amount on a nested property
  private getPrecipitation(value:any): number {
    return !value
      ? 0
      : (value['1h']
        ? value['1h']
        : 0);
  }
}
export default MiniOwm;
