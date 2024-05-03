import { FC, memo } from 'react'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './gallery-modal.style'

import { DocumentsTab, Header, MediaFilesTab } from './components'
import { customSwitcherSettings } from './gallery-modal.config'
import { SwitcherConditions } from './gallery-modal.type'
import { useGalleryModal } from './use-gallery-modal'

interface GalleryModalProps {
  files: UploadFileType[]
}

export const GalleryModal: FC<GalleryModalProps> = memo(({ files }) => {
  const { classes: styles } = useStyles()
  const { tabValue, setTabValue, visibleSlides } = useGalleryModal(files)

  return (
    <div className={styles.wrapper}>
      <Header />

      <CustomSwitcher
        fullWidth
        switchMode="medium"
        condition={tabValue}
        switcherSettings={customSwitcherSettings}
        changeConditionHandler={setTabValue}
      />

      <TabPanel value={tabValue} index={SwitcherConditions.MEDIA_FILES}>
        <MediaFilesTab slides={visibleSlides} />
      </TabPanel>

      <TabPanel value={tabValue} index={SwitcherConditions.DOCUMENTS}>
        <DocumentsTab files={visibleSlides} />
      </TabPanel>
    </div>
  )
})
