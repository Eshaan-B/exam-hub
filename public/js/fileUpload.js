FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginPdfPreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode,
  FilePondPluginFileRename
);
FilePond.setOptions({
  allowPdfPreview: true,
  pdfPreviewHeight: 320,
  pdfComponentExtraParams: "toolbar=0&view=fit&page=1",
});
let height = 30;

document.addEventListener("FilePond:addfile", (e) => {
  console.log("addinggg");
  // get create method reference
  const { create } = e.detail;
  document.getElementById("upload-detail").style.height = `auto`;
});

FilePond.parse(document.body);
