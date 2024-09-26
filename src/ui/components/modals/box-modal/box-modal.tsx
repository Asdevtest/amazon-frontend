import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Modal } from '@components/shared/modal'
import { TabPanel } from '@components/shared/tab-panel'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './box-modal.style'

import { EditHSCodeModal } from '../edit-hs-code-modal'

import { BoxTabs, switcherSettings } from './box-modal.config'
import { BoxModalModel } from './box-modal.model'
import { Box, Comments, Footer, Header, Info, Order, Quantities } from './components'

interface BoxModalProps {
  boxId: string
  onToggleModal: () => void
  onUpdateData?: () => void
}

export const BoxModal: FC<BoxModalProps> = observer(props => {
  const { boxId, onToggleModal, onUpdateData } = props

  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new BoxModalModel({ boxId, onUpdateData }), [])

  return (
    <div className={styles.wrapper}>
      <Header
        formFields={viewModel.currentData as unknown as IBox}
        disabledPrepId={!(viewModel.isClient || viewModel.isStorekeeper)}
        onChangeField={viewModel.onChangeField}
      />

      <Info
        formFields={viewModel.currentData as unknown as IBox}
        isStorekeeper={viewModel.isStorekeeper}
        onChangeField={viewModel.onChangeField}
      />

      <div className={styles.switcherWrapper}>
        <div className={styles.switcher}>
          <Quantities formFields={viewModel.currentData as unknown as IBox} />

          <CustomRadioButton
            size="large"
            options={switcherSettings()}
            defaultValue={viewModel.activeTab}
            className={styles.switcherRadioButtons}
            onChange={viewModel.setActiveTab}
          />
        </div>

        <TabPanel value={viewModel.activeTab} index={BoxTabs.BOX_INFO}>
          <Box
            isEdit={viewModel.isEdit}
            isBuyer={viewModel.isBuyer}
            isClient={viewModel.isClient}
            formFields={viewModel.currentData as unknown as IBox}
            onChangeField={viewModel.onChangeField}
            onChangeTrackNumberFile={viewModel.onChangeTrackNumberFile}
          />
        </TabPanel>
        <TabPanel value={viewModel.activeTab} index={BoxTabs.ORDER_INFO}>
          <Order
            isClient={viewModel.isClient}
            formFields={viewModel.currentData as unknown as IBox}
            onClickHsCode={viewModel.onClickHsCode}
          />
        </TabPanel>
      </div>

      <Comments
        isClient={viewModel.isClient}
        isStorekeeper={viewModel.isStorekeeper}
        formFields={viewModel.currentData as unknown as IBox}
        onChangeField={viewModel.onChangeField}
        onSubmitChangeFields={viewModel.onSubmitChangeBoxFields}
      />

      <Footer
        isEdit={viewModel.isEdit}
        disableSaveButton={viewModel.disableSaveButton}
        onToggleModal={onToggleModal}
        onSubmitChangeFields={viewModel.onSubmitChangeBoxFields}
      />

      <Modal
        openModal={viewModel.showEditHSCodeModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
      >
        <EditHSCodeModal
          // @ts-ignore
          productId={viewModel.currentData?.items?.[0]?.product?._id}
          onCloseModal={() => viewModel.onTriggerOpenModal('showEditHSCodeModal')}
        />
      </Modal>
    </div>
  )
})
