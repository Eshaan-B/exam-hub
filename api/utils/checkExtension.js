const path = require("path");

checkExtension = (filename) => {
  const validExtensions = ["pdf", "jpg", "jpeg", "png", "doc", "docx", "mp4"];
  var a = filename.split(".");
  let l = a.length;
  if (a.length == 1 || (a[0] === "" && a.length === 2)) {
    return null;
  }
  if (validExtensions.includes(a[l - 1])) return a.pop();
  return null;
};

module.exports = checkExtension;
