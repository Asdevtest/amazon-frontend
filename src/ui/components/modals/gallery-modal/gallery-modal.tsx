import { FC, memo } from 'react'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { TabPanel } from '@components/shared/tab-panel'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './gallery-modal.style'

import { Arrows, DocumentsTab, Header, MediaFilesTab } from './components'
import { customSwitcherSettings } from './gallery-modal.config'
import { SwitcherConditions } from './gallery-modal.type'
import { useGalleryModal } from './use-gallery-modal'

interface GalleryModalProps {
  files: Array<string | IUploadFile>
  isOpenModal: boolean
  onOpenModal: () => void
}

export const GalleryModal: FC<GalleryModalProps> = memo(props => {
  const { files, isOpenModal, onOpenModal } = props

  const { classes: styles } = useStyles()

  const {
    tabValue,
    setTabValue,

    visibleSlides,

    currentSlideIndex,
    totalSlides,

    isTransitioning,
    setIsTransitioning,

    onSlideChange,
  } = useGalleryModal(files)

  return (
    <Modal openModal={isOpenModal} setOpenModal={onOpenModal}>
      <div className={styles.wrapper}>
        <Header />

        <CustomSwitcher
          fullWidth
          switchMode="medium"
          condition={tabValue}
          switcherSettings={customSwitcherSettings}
          changeConditionHandler={(condition: string | number | null | undefined) => setTabValue(Number(condition))}
        />

        <TabPanel value={tabValue} index={SwitcherConditions.MEDIA_FILES}>
          <MediaFilesTab slides={visibleSlides} isTransitioning={isTransitioning} />
        </TabPanel>

        <TabPanel value={tabValue} index={SwitcherConditions.DOCUMENTS}>
          <DocumentsTab files={visibleSlides} isTransitioning={isTransitioning} />
        </TabPanel>

        <Arrows
          currentPage={currentSlideIndex + 1}
          pageСount={totalSlides}
          disableArrows={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          onChangeSlide={onSlideChange}
        />
      </div>
    </Modal>
  )
})
