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

document.addEventListener("FilePond:addfile", (e) => {
  console.log("addinggg");
  // get create method reference
  const { create } = e.detail;
  document.getElementById("upload-form").style.height = "40rem";
});

FilePond.parse(document.body);
