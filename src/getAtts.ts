import coords from "./coords";

export type getAtts = {
  apiKey?: string;
  coords?: coords;
  exclude?: string;
  language?: string;
  units?: string;
};
export default getAtts;
