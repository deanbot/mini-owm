import getAtts from "./getAtts";

export interface IMiniOwm {
  // required params
  apiKey: (value: string) => IMiniOwm;
  latitude: (value: number) => IMiniOwm;
  longitude: (value: number) => IMiniOwm;
  exclude: (value: string) => IMiniOwm;

  // make request
  get:(atts?: getAtts) => Promise<any>;

  // units
  standard:() => IMiniOwm;
  metric:() => IMiniOwm;
  imperial:() => IMiniOwm;

  // language
  language:(value: string) => IMiniOwm;
}
export default IMiniOwm;
