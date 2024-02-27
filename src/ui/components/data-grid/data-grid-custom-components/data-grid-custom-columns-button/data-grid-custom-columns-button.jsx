import { useEffect, useState } from 'react'

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Checkbox, Menu, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

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
    item.headerName?.toLowerCase().includes(nameSearchValue.toLowerCase()),
  )

  return (
    <div>
      <Button variant={ButtonVariant.OUTLINED} className={cx(className, styles.mainFilterBtn)} onClick={handleClick}>
        <div className={cx(className, styles.mainFilterBtnInsert)}>
          <SettingsOutlinedIcon fontSize="small" />

          <Typography className={styles.mainFilterBtnInsertText}>{t(TranslationKey.Parameters)}</Typography>
        </div>
      </Button>

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
            <Typography className={styles.titleText}>{t(TranslationKey.Columns)}</Typography>
            <div className={styles.searchInputWrapper}>
              <SearchInput
                inputClasses={styles.searchInput}
                placeholder={t(TranslationKey.Search)}
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

              {itemsForRender.map((el, index) => (
                <div key={index} className={styles.shop}>
                  <Checkbox
                    color="primary"
                    checked={
                      !columnVisibilityModel || (columnVisibilityModel && columnVisibilityModel?.[el.field] !== false)
                    }
                    onClick={() => onClickItem(el.field)}
                  />
                  <div title={el.headerName} className={styles.shopName}>
                    {el.headerName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Menu>
      )}
    </div>
  )
}
