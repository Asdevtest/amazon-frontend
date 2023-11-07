/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react'

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import { Menu } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { SearchInput } from '@components/shared/search-input'

import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useDataGridCellStyles } from './string-list-cell.style'

interface StringListCellProps {
  sourceString: string | string[]
  withCopy?: boolean
  maxItemsDisplay: number
  maxLettersInItem?: number
  onClickCell?: () => void
}

export const StringListCell: FC<StringListCellProps> = React.memo(props => {
  const { classes: styles, cx } = useDataGridCellStyles()
  const { sourceString, withCopy, maxItemsDisplay, maxLettersInItem, onClickCell } = props

  const [menuAnchor, setMenuAnchor] = useState(null)
  const handleClick = (event: any) => {
    setMenuAnchor(event.currentTarget)
  }
  const handleClose = () => {
    setMenuAnchor(null)
  }
  const items = Array.isArray(sourceString) ? sourceString : sourceString?.split(', ')

  const [itemsForRender, setItemsForRender] = useState(items || [])
  const [nameSearchValue, setNameSearchValue] = useState('')

  useEffect(() => {
    if (nameSearchValue) {
      const filter = items?.filter(item => String(item).toLowerCase().includes(nameSearchValue.toLowerCase()))
      setItemsForRender(filter)
    } else {
      setItemsForRender(items)
    }
  }, [nameSearchValue])

  return (
    <div className={cx(styles.flexDirectionColumn, styles.adaptText)}>
      <div onClick={onClickCell && onClickCell}>
        {!!items?.length &&
          items
            ?.slice(0, maxItemsDisplay)
            ?.filter(el => el)
            ?.map((item, i) => (
              <AsinOrSkuLink key={i} withCopyValue asin={getShortenStringIfLongerThanCount(item, maxLettersInItem)} />
            ))}
      </div>

      {items?.length > maxItemsDisplay && (
        <Button variant="text" onClick={handleClick}>
          <MoreHorizOutlinedIcon color="primary" />
        </Button>
      )}

      {menuAnchor && (
        <Menu
          keepMounted
          anchorEl={menuAnchor}
          autoFocus={false}
          open={menuAnchor}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          onClose={handleClose}
        >
          <div className={styles.stringListMenuWrapper}>
            <SearchInput
              inputClasses={styles.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
            <>
              {itemsForRender?.map((item, i) => (
                <div key={i} className={styles.multilineTextHeaderWrapper}>
                  <p className={styles.shopOrderText}>{getShortenStringIfLongerThanCount(item, maxLettersInItem)}</p>
                  {withCopy && <CopyValue text={item} />}
                </div>
              ))}
            </>
          </div>
        </Menu>
      )}
    </div>
  )
})
