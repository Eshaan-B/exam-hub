checkExtension = (filename) => {
  const validExtensions = ["pdf", "jpg", "jpeg", "png", "doc", "docx"];
  var a = filename.split(".");
  if (a.length == 1 || (a[0] === "" && a.length === 2)) {
    return null;
  }
  if (validExtensions.includes(a[1])) return a.pop();
  return null;
};

module.exports = checkExtension;
