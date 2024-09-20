import { UploadFileType } from '@typings/shared/upload-file'

import { getAmazonImageUrl } from './get-amazon-image-url'

export const printMedia = (file: UploadFileType) => {
  const imageUrl = getAmazonImageUrl(file, true)
  const printWindow = window.open('', '_blank')

  if (!printWindow) {
    return
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print</title>
      </head>
      <body>
        <img src="${imageUrl}" style="width: 100%; height: auto;" onload="window.print();">
      </body>
    </html>
  `

  printWindow.document.open()
  printWindow.document.write(htmlContent)
  printWindow.document.close()
}
