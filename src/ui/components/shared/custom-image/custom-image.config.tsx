import { ReactElement } from 'react'
import { GoDesktopDownload } from 'react-icons/go'

import { checkIsDocumentLink, checkIsImageLink, checkIsVideoLink } from '@utils/checks'
import { downloadFileByLink } from '@utils/upload-files'

import { CustomFileIcon } from '../custom-file-icon'

interface PreviewContentInfo {
  image: {
    url: string
  }
}

export const renderPreviewContent = (originalNode: ReactElement, info: PreviewContentInfo) => {
  const url = info.image.url

  if (checkIsVideoLink(url)) {
    return <video muted controls width="60%" src={url} />
  }

  if (checkIsDocumentLink(url)) {
    const documentExtension = url?.split('.')?.slice(-1)?.[0]

    return <CustomFileIcon fileExtension={documentExtension} height="200px" />
  }

  return originalNode
}

export const renderPreviewToolbar = (originalNode: ReactElement, info: PreviewContentInfo) => (
  <div className="ant-render-preview-toolbar">
    {checkIsImageLink(info.image.url) ? originalNode : null}

    <button className="ant-render-preview-toolbar-download-link" onClick={() => downloadFileByLink(info.image.url)}>
      <GoDesktopDownload size={20} />
    </button>
  </div>
)

export const getFallbackImage = (src?: string) => {
  if (checkIsVideoLink(src)) {
    return '/assets/img/defaultVideo.png'
  }

  if (checkIsDocumentLink(src)) {
    return '/assets/img/defaultFile.png'
  }

  return '/assets/img/defaultImage.png'
}
