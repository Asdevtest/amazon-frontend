import { FC, memo } from 'react'

import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Modal } from '@components/shared/modal'
import { TabPanel } from '@components/shared/tab-panel'

import { IProductMedia } from '@typings/models/clients/product-media'
import { IRequestMedia } from '@typings/models/requests/request-media'

import { useStyles } from './gallery-request-modal.style'

import { Header } from '../gallery-modal/components'
import { customSwitcherSettings } from '../gallery-modal/gallery-modal.config'
import { SwitcherConditions } from '../gallery-modal/gallery-modal.type'

import { Buttons, RequestDocumentsTab, RequestMediaFilesTab } from './components'
import { useGalleryRequestModal } from './use-gallery-request-modal'

interface GalleryRequestModalProps {
  data: IProductMedia
  openModal: boolean
  mediaFiles: IRequestMedia[]
  onChangeMediaFiles: (mediaFiles: IRequestMedia[]) => void
  onOpenModal: () => void
  maxNumber?: number
  buttonText?: string
}

/**
 * The component copies Header, CustoRadioButton with its settings from GalleryModal, but adds its own functionality, tabs and footer.
 */
export const GalleryRequestModal: FC<GalleryRequestModalProps> = memo(props => {
  const { data, openModal, mediaFiles, onChangeMediaFiles, onOpenModal, maxNumber, buttonText } = props

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
    onSelectAllFiles,
    isAllSelected,
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
        <div className={styles.headerContainer}>
          <Header title={filesCounter} />

          <CustomCheckbox checked={isAllSelected} onChange={onSelectAllFiles}>
            Select all
          </CustomCheckbox>
        </div>

        <CustomRadioButton
          block
          size="large"
          options={customSwitcherSettings}
          value={tabValue}
          onChange={e => setTabValue(e.target.value)}
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
          buttonText={buttonText}
          onClick={() => {
            onChangeMediaFiles(allFilesToAdd)
            onOpenModal()
          }}
        />
      </div>
    </Modal>
  )
})
