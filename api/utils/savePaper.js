const savePaper = (paperObject, paperEncoded) => {
  if (paperEncoded == null) return;
  const paperUnencoded = JSON.parse(paperEncoded);
  if (paperUnencoded != null) {
    paperObject.file = new Buffer.from(paperUnencoded.data, "base64");
  }
};

module.exports = savePaper;
