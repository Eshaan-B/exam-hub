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

FilePond.parse(document.body);
