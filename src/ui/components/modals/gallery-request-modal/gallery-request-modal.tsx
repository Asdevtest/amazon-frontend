import { FC, memo } from 'react'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { TabPanel } from '@components/shared/tab-panel'

import { useStyles } from './gallery-request-modal.style'

import { Header } from '../gallery-modal/components'

import { customSwitcherSettings } from './gallery-request-modal.config'
import { IData, SwitcherConditions } from './gallery-request-modal.type'
import { MediaFilesTab } from './media-files-tab'
import { useGalleryRequestModal } from './use-gallery-request-modal'

interface GalleryRequestModalProps {
  data: IData
  isOpenModal: boolean
  onOpenModal: () => void
}

export const GalleryRequestModal: FC<GalleryRequestModalProps> = memo(props => {
  const { data, isOpenModal, onOpenModal } = props

  const { classes: styles } = useStyles()

  const {
    tabValue,
    setTabValue,

    mediaFilesStates,
    documentsStates,

    allFilesToAdd,
    setAllFilesToAdd,
  } = useGalleryRequestModal(data)

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
          <MediaFilesTab data={mediaFilesStates} />
        </TabPanel>

        <TabPanel value={tabValue} index={SwitcherConditions.DOCUMENTS}>
          {/* <DocumentsTab files={documents} /> */}
        </TabPanel>
      </div>
    </Modal>
  )
})
