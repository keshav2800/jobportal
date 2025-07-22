import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  if (!file) throw new Error("No file passed to getDataUri");

  // extname already returns a string like ".png" – no need for toString()
  const extName = path.extname(file.originalname);

  const parser = new DataUriParser();
  return parser.format(extName, file.buffer);   // => { mime, buffer, base64, content, ... }
};

export default getDataUri;
