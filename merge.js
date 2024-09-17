import PDFMerger from 'pdf-merger-js';

export const mergePdfs = async (pdfPath1, pdfPath2) => {
  const merger = new PDFMerger();
  await merger.add(pdfPath1);
  await merger.add(pdfPath2);
  const timestamp = new Date().getTime(); // Use a timestamp for unique filenames
  await merger.save(`public/${timestamp}.pdf`);
  return timestamp;
};
