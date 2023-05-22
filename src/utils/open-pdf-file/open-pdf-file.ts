export const openPdfFile = (url: string): void => {
  const pdfWindow = window.open('')

  if (pdfWindow) {
    pdfWindow.document.write(`<iframe width='100%' height='1000%' src='${url}'></iframe>`)
  } else {
    throw new Error('Failed to open a window for a PDF file.')
  }
}
