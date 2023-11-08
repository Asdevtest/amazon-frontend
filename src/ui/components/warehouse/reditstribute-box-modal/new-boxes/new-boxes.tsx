/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDestination, IDestinationStorekeeper } from '@typings/destination'

import { useStyles } from './new-boxes.style'

import { Box } from '../box/box'

interface NewBoxesProps {
  showCheckbox?: boolean
  newBoxes: any
  isMasterBox?: boolean
  selectedBox?: any
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  destinationsFavourites?: any
  setDestinationsFavouritesItem: (destinationId: string) => void
  onRemoveBox: (boxIndex: string) => void
  onChangeAmountInput: (event: any, guid: string, order: any) => void
  onChangeField: (value: any, field: string, guid: string) => void
}

export const NewBoxes: FC<NewBoxesProps> = props => {
  const { classes: styles, cx } = useStyles()
  const {
    showCheckbox,
    newBoxes,
    isMasterBox,
    selectedBox,
    destinations,
    storekeepers,
    destinationsFavourites,
    onChangeAmountInput,
    onRemoveBox,
    onChangeField,
    setDestinationsFavouritesItem,
  } = props

  return (
    <div>
      <div className={styles.currentBoxTitle}>
        <p className={styles.sectionTitle}>{t(TranslationKey['New boxes'])}</p>
      </div>

      {newBoxes.map((box: any, boxIndex: number) => (
        <div key={boxIndex} className={cx({ [styles.marginBox]: newBoxes.length > 1 })}>
          <Box
            isNewBox
            // @ts-ignore
            index={boxIndex}
            showCheckbox={showCheckbox}
            destinations={destinations}
            storekeepers={storekeepers}
            box={box}
            readOnly={isMasterBox}
            isMasterBox={isMasterBox}
            selectedBox={selectedBox}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            onChangeAmountInput={onChangeAmountInput}
            onChangeField={onChangeField}
            onRemoveBox={onRemoveBox}
          />
        </div>
      ))}
    </div>
  )
}
