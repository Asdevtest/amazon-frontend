/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useEffect, useState } from 'react'

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import { Menu } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { SearchInput } from '@components/shared/search-input'
import { TextWithCopy } from '@components/shared/text-with-copy'

import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './string-list-cell.style'

interface StringListCellProps {
  sourceString: string | string[]
  withCopy?: boolean
  maxItemsDisplay: number
  maxLettersInItem?: number
  onClickCell?: () => void
}

export const StringListCell: FC<StringListCellProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { sourceString, withCopy, maxItemsDisplay, maxLettersInItem } = props

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
    <div className={styles.flexDirectionColumn}>
      {!!items?.length &&
        items
          ?.slice(0, maxItemsDisplay)
          ?.filter(el => el)
          ?.map((item, i) => <TextWithCopy key={i} text={getShortenStringIfLongerThanCount(item, maxLettersInItem)} />)}

      {items?.length > maxItemsDisplay && (
        <Button variant={ButtonVariant.OUTLINED} onClick={handleClick}>
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
