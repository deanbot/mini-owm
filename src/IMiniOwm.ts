import getAtts from "./getAtts";

export interface IMiniOwm {
  apiKey: (value: string) => IMiniOwm;
  latitude: (value: number) => IMiniOwm;
  longitude: (value: number) => IMiniOwm;
  exclude: (value: string) => IMiniOwm;
  get:(atts?: getAtts) => Promise<any>;
}
export default IMiniOwm;
