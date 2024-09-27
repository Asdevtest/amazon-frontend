import { FC, memo } from 'react'

import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { TabPanel } from '@components/shared/tab-panel'

import { UploadFileType } from '@typings/shared/upload-file'

import { DocumentsTab, Header, MediaFilesTab } from './components'
import { customSwitcherSettings } from './gallery-modal.config'
import { SwitcherConditions } from './gallery-modal.type'
import { useGalleryModal } from './use-gallery-modal'

interface GalleryModalProps {
  files: UploadFileType[]
}

export const GalleryModal: FC<GalleryModalProps> = memo(({ files }) => {
  const { tabValue, setTabValue, visibleSlides } = useGalleryModal(files)

  return (
    <>
      <Header />

      <CustomRadioButton
        size="large"
        options={customSwitcherSettings}
        value={tabValue}
        onChange={e => setTabValue(e.target.value)}
      />

      <TabPanel value={tabValue} index={SwitcherConditions.MEDIA_FILES}>
        <MediaFilesTab slides={visibleSlides} />
      </TabPanel>

      <TabPanel value={tabValue} index={SwitcherConditions.DOCUMENTS}>
        <DocumentsTab files={visibleSlides} />
      </TabPanel>
    </>
  )
})
