/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { useStyles } from './new-boxes.style'

import { Box } from '../box/box'

interface NewBoxesProps {
  showCheckbox?: boolean
  userInfo: any
  newBoxes: any
  onChangeField: (e: any, field: string, boxId: string) => void
  destinations: any
  storekeepers: any
  visibleBoxes: any
  setVisibleBoxes: any
  onRemoveBox: any
  setNewBoxes: any
  destinationsFavourites: any
  setDestinationsFavouritesItem: any
}

export const NewBoxes: FC<NewBoxesProps> = React.memo(props => {
  const { classes: styles, cx } = useStyles()
  const {
    showCheckbox,
    userInfo,
    newBoxes,
    destinations,
    storekeepers,
    visibleBoxes,
    setVisibleBoxes,
    onRemoveBox,
    setNewBoxes,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    onChangeField,
  } = props

  const [nameSearchValue, setNameSearchValue] = useState('')

  useEffect(() => {
    if (nameSearchValue) {
      setVisibleBoxes(
        newBoxes.filter(
          (el: any) =>
            el.items.some((item: any) =>
              item.product.amazonTitle?.toLowerCase().includes(nameSearchValue.toLowerCase()),
            ) ||
            el.items.some((item: any) => item.product.skuByClient?.includes(nameSearchValue.toLowerCase())) ||
            el.items.some((item: any) => item.product.asin?.toLowerCase().includes(nameSearchValue.toLowerCase())),
        ),
      )
    } else {
      setVisibleBoxes(newBoxes)
    }
  }, [newBoxes, nameSearchValue])

  return (
    <div>
      <div className={styles.currentBoxTitle}>
        <p className={styles.sectionTitle}>{t(TranslationKey.Boxes)}</p>

        <p className={styles.searchCount}>{`${visibleBoxes.length} / ${newBoxes.length}`}</p>

        <SearchInput
          value={nameSearchValue}
          placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
          onChange={e => setNameSearchValue(e.target.value)}
        />
      </div>

      {visibleBoxes.map((box: any, boxIndex: number) => (
        <div key={boxIndex} className={cx({ [styles.marginBox]: newBoxes.length > 1 })}>
          <Box
            showCheckbox={showCheckbox}
            userInfo={userInfo}
            newBoxes={newBoxes}
            destinations={destinations}
            storekeepers={storekeepers}
            box={box}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            setNewBoxes={setNewBoxes}
            onChangeField={onChangeField}
            onRemoveBox={onRemoveBox}
          />
        </div>
      ))}
    </div>
  )
})
