import { FC, memo } from 'react'

import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'

import { ICustomProposal } from '@typings/models/proposals/custom-proposal'

import { useStyles } from './main-request-result-modal.style'

import { Footer, Header, Tabs } from './components'

interface MainRequestResultModalProps {
  customProposal: ICustomProposal
  openModal: boolean
  onOpenModal: () => void
}

export const MainRequestResultModal: FC<MainRequestResultModalProps> = memo(props => {
  const { customProposal, openModal, onOpenModal } = props

  console.log('RequestStandartResultForm', customProposal)

  const { classes: styles } = useStyles()

  return (
    <Modal openModal={openModal} setOpenModal={onOpenModal}>
      <div className={styles.wrapper}>
        <Header
          executionTime={customProposal?.proposal?.execution_time}
          asin={customProposal?.request?.asin}
          humanFriendlyId={customProposal?.request?.humanFriendlyId}
        />

        <Field
          multiline
          minRows={9}
          maxRows={9}
          value={customProposal?.details?.result}
          inputClasses={styles.field}
          classes={{ input: styles.input }}
          containerClasses={styles.fieldContainer}
        />

        <Tabs customProposal={customProposal} />

        <Footer />
      </div>
    </Modal>
  )
})
