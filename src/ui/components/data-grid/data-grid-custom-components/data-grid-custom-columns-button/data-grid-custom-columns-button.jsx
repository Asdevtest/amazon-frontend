import { useEffect, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'

import { Checkbox, Menu } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { useStyles } from './data-grid-custom-columns-button.style'

export const DataGridCustomColumnsButton = ({ className, columsBtnSettings }) => {
  const { classes: styles, cx } = useStyles()

  const { columnsModel, columnVisibilityModel, onColumnVisibilityModelChange } = columsBtnSettings

  const [menuAnchor, setMenuAnchor] = useState(null)
  const [filteredColumnsModel, setFilteredColumnsModel] = useState([])
  const [nameSearchValue, setNameSearchValue] = useState('')

  const handleClick = event => {
    setMenuAnchor(event.currentTarget)
  }
  const handleClose = () => {
    setMenuAnchor(null)
    setNameSearchValue('')
  }

  useEffect(() => {
    if (columnsModel) {
      const filteredData = columnsModel?.filter(column => column?.type !== 'checkboxSelection')

      setFilteredColumnsModel(filteredData)
    }
  }, [columnsModel])

  const onClickItem = field => {
    onColumnVisibilityModelChange({
      ...columnVisibilityModel,
      [field]: columnVisibilityModel?.[field] !== false ? false : true,
    })
  }

  const isSomeItemChecked = columnVisibilityModel && Object.values(columnVisibilityModel).some(el => el === false)

  const onClickAllItemBtn = () => {
    onColumnVisibilityModelChange(
      filteredColumnsModel.reduce((ac, cur) => ({ ...ac, [cur.field]: isSomeItemChecked }), {}),
    )
  }

  const itemsForRender = filteredColumnsModel.filter(item =>
    item?.headerName?.toLowerCase().includes(nameSearchValue.toLowerCase()),
  )

  return (
    <div>
      <CustomButton className={className} icon={<IoSettingsOutline size={16} />} onClick={handleClick}>
        {t(TranslationKey.Parameters)}
      </CustomButton>

      {Boolean(menuAnchor) && (
        <Menu
          keepMounted
          anchorEl={menuAnchor}
          autoFocus={false}
          open={Boolean(menuAnchor)}
          classes={{ paper: styles.menu, list: styles.list }}
          onClose={handleClose}
        >
          <div className={styles.mainWrapper}>
            <p className={styles.titleText}>{t(TranslationKey.Columns)}</p>
            <div className={styles.searchInputWrapper}>
              <CustomInputSearch
                allowClear
                wrapperClassName={styles.searchInput}
                placeholder="Search"
                onChange={e => setNameSearchValue(e.target.value)}
                onKeyDown={e => e.stopPropagation()}
              />
            </div>

            <div className={styles.shopsBody}>
              <div className={styles.shop}>
                <Checkbox
                  color="primary"
                  checked={!columnVisibilityModel || !isSomeItemChecked}
                  onClick={onClickAllItemBtn}
                />
                <div title={t(TranslationKey.All)} className={styles.shopName}>
                  {t(TranslationKey.All)}
                </div>
              </div>
              {itemsForRender.map((el, index) => {
                const title = el?.headerName

                return (
                  <div key={index} className={styles.shop}>
                    <Checkbox
                      color="primary"
                      checked={
                        !columnVisibilityModel || (columnVisibilityModel && columnVisibilityModel?.[el.field] !== false)
                      }
                      onClick={() => onClickItem(el.field)}
                    />
                    <div title={title} className={styles.shopName}>
                      {title}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Menu>
      )}
    </div>
  )
}
