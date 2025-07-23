import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  if (!file) throw new Error("No file passed to getDataUri");

  const extName = path.extname(file.originalname);

  const parser = new DataUriParser();
  return parser.format(extName, file.buffer);
};

export default getDataUri;
