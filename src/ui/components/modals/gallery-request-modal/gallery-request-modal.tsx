import { FC, memo } from 'react'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Modal } from '@components/shared/modal'
import { TabPanel } from '@components/shared/tab-panel'

import { IRequestMedia } from '@typings/models/requests/request-media'

import { useStyles } from './gallery-request-modal.style'

import { Header } from '../gallery-modal/components'
import { customSwitcherSettings } from '../gallery-modal/gallery-modal.config'
import { SwitcherConditions } from '../gallery-modal/gallery-modal.type'

import { Buttons, RequestDocumentsTab, RequestMediaFilesTab } from './components'
import { IData } from './gallery-request-modal.type'
import { useGalleryRequestModal } from './use-gallery-request-modal'

interface GalleryRequestModalProps {
  data: IData
  openModal: boolean
  mediaFiles: IRequestMedia[]
  onChangeMediaFiles: (mediaFiles: IRequestMedia[]) => void
  onOpenModal: () => void
  maxNumber?: number
}

/**
 * The component copies Header, CustomSwitcher with its settings from GalleryModal, but adds its own functionality, tabs and footer.
 */
export const GalleryRequestModal: FC<GalleryRequestModalProps> = memo(props => {
  const { data, openModal, mediaFiles, onChangeMediaFiles, onOpenModal, maxNumber } = props

  const { classes: styles } = useStyles()

  const {
    tabValue,
    setTabValue,

    mediaFilesStates,
    documentsStates,
    allFilesToAdd,
    filesCounter,

    onToggleFile,
    onResetAllFilesToAdd,
    getCheckboxState,
    getDisabledCheckbox,
  } = useGalleryRequestModal(data, mediaFiles, maxNumber)

  return (
    <Modal
      openModal={openModal}
      setOpenModal={() => {
        onOpenModal()
        onResetAllFilesToAdd()
      }}
    >
      <div className={styles.wrapper}>
        <Header title={filesCounter} />

        <CustomSwitcher
          fullWidth
          switchMode="medium"
          condition={tabValue}
          switcherSettings={customSwitcherSettings}
          changeConditionHandler={setTabValue}
        />

        <TabPanel value={tabValue} index={SwitcherConditions.MEDIA_FILES}>
          <RequestMediaFilesTab
            data={mediaFilesStates}
            getCheckboxState={getCheckboxState}
            getDisabledCheckbox={getDisabledCheckbox}
            onToggleFile={onToggleFile}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={SwitcherConditions.DOCUMENTS}>
          <RequestDocumentsTab
            data={documentsStates}
            getCheckboxState={getCheckboxState}
            getDisabledCheckbox={getDisabledCheckbox}
            onToggleFile={onToggleFile}
          />
        </TabPanel>

        <Buttons
          disabled={!allFilesToAdd.length}
          onClick={() => {
            onChangeMediaFiles(allFilesToAdd)
            onOpenModal()
          }}
        />
      </div>
    </Modal>
  )
})
