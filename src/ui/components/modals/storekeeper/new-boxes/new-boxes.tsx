/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { EditBoxTasksForm } from '@components/forms/edit-box-tasks-form'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'
import { IDestination, IDestinationStorekeeper } from '@typings/shared/destinations'

import { useStyles } from './new-boxes.style'

import { Box } from '../box/box'

interface NewBoxesProps {
  newBoxes: any
  isMasterBox: boolean
  selectedBox: any
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  destinationsFavourites: any
  showEditBoxModalR: boolean
  volumeWeightCoefficient: number
  onChangeField: (e: any, field: string, boxId: string) => void
  setNewBoxes: (box: any) => void
  onClickEditBox: (box: any) => void
  onClickApplyAllBtn: (box: any) => void
  onTriggerShowEditBoxModalR: () => void
  setDestinationsFavouritesItem: (destinationId: string) => void
  onRemoveBox: (boxIndex: string) => void
  onChangeAmountInput: (event: any, guid: string, order: any) => void
}

export const NewBoxes: FC<NewBoxesProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const {
    newBoxes,
    isMasterBox,
    selectedBox,
    onChangeAmountInput,
    onRemoveBox,
    onChangeField,
    destinations,
    storekeepers,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    showEditBoxModalR,
    onTriggerShowEditBoxModalR,
    onClickEditBox,
    setNewBoxes,
    onClickApplyAllBtn,
  } = props

  const [curBox, setCurBox] = useState<IBox>(selectedBox)

  return (
    <div>
      <div className={styles.currentBoxTitle}>
        <p className={styles.sectionTitle}>{t(TranslationKey['New boxes'])}</p>
      </div>

      {newBoxes.map((box: any, boxIndex: number) => (
        <div key={boxIndex} className={cx({ [styles.marginBox]: newBoxes.length > 1 })}>
          <Box
            isNewBox
            destinations={destinations}
            storekeepers={storekeepers}
            box={box}
            readOnly={isMasterBox}
            isMasterBox={isMasterBox}
            setCurBox={setCurBox}
            selectedBox={selectedBox}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            onChangeAmountInput={onChangeAmountInput}
            onChangeField={onChangeField}
            onRemoveBox={onRemoveBox}
            onClickEditBox={onClickEditBox}
            onClickApplyAllBtn={onClickApplyAllBtn}
          />
        </div>
      ))}
      <Modal openModal={showEditBoxModalR} setOpenModal={onTriggerShowEditBoxModalR}>
        <EditBoxTasksForm
          box={curBox}
          newBoxes={newBoxes}
          setNewBoxes={setNewBoxes}
          setEditModal={onTriggerShowEditBoxModalR}
        />
      </Modal>
    </div>
  )
})
