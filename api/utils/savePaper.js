const savePaper = (paperObject, paperEncoded) => {
  console.log("In savePaper");
  if (paperEncoded == null) return;
  const paperUnencoded = JSON.parse(paperEncoded);
  if (paperUnencoded != null) {
    paperObject.file = new Buffer.from(paperUnencoded.data, "base64");
    console.log("File is: ", paperObject.file);
  }
};

module.exports = savePaper;
