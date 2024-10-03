/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useEffect, useState } from 'react'
import { MdOutlineMoreHoriz } from 'react-icons/md'

import { Menu } from '@mui/material'

import { Button } from '@components/shared/button'
import { CopyValue } from '@components/shared/copy-value'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { getShortenStringIfLongerThanCount } from '@utils/text'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './string-list-cell.style'

import { Text } from '../../../shared/text/text'

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
          ?.map((item, i) => <Text key={i} text={item} />)}

      {items?.length > maxItemsDisplay && (
        <Button styleType={ButtonStyle.TRANSPARENT} className={styles.moreButton} onClick={handleClick}>
          <MdOutlineMoreHoriz size={24} className={styles.icon} />
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
            <CustomInputSearch
              allowClear
              wrapperClassName={styles.searchInput}
              placeholder="Search"
              onChange={e => setNameSearchValue(e.target.value)}
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
