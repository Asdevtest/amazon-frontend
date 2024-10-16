import { FC, memo } from 'react'

import { Modal } from '@components/shared/modal'

import { ParsingReports } from '@views/client/parsing-reports'

import { useStyles } from './parsing-reports-modal.style'

interface ParsingReportsModalProps {
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
}

export const ParsingReportsModal: FC<ParsingReportsModalProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { openModal, setOpenModal } = props

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={setOpenModal}>
      <div>
        <ParsingReports />
      </div>
    </Modal>
  )
})
