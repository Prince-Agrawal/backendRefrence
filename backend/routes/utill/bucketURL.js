const uploadFile = require("./upload");

const getUrl = (req, res, formKey) => {
  return new Promise((resolve, reject) => {
    const singleUpload = uploadFile.single(formKey);
    singleUpload(req, res, (err) => {
      if (err) return reject(err);
      if (req.file) return resolve(req.file.location);
      return resolve(undefined);
    });
  });
};

module.exports = getUrl;
