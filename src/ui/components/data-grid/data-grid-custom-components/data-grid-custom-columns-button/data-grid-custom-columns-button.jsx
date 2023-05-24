/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Checkbox, Menu, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

import { t } from 'i18n-js'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { SearchInput } from '@components/shared/search-input'

import { useClassNames } from './data-grid-custom-columns-button.style'

export const DataGridCustomColumnsButton = props => {
  const { classes: classNames } = useClassNames()
  const { className, columsBtnSettings, ...other } = props

  const { columnsModel, changeColumnsModel, columnVisibilityModel, onColumnVisibilityModelChange } = columsBtnSettings

  const [menuAnchor, setMenuAnchor] = useState(null)
  const handleClick = event => {
    setMenuAnchor(event.currentTarget)
  }
  const handleClose = () => {
    setMenuAnchor(null)
  }

  const [itemsForRender, setItemsForRender] = useState(columnsModel || [])
  const [nameSearchValue, setNameSearchValue] = useState('')

  useEffect(() => {
    setItemsForRender(columnsModel)
  }, [columnsModel])

  useEffect(() => {
    if (nameSearchValue) {
      const filter = columnsModel?.filter(item => item.headerName.toLowerCase().includes(nameSearchValue.toLowerCase()))
      setItemsForRender(filter)
    } else {
      setItemsForRender(columnsModel)
    }
  }, [nameSearchValue])

  const onClickItem = field => {
    onColumnVisibilityModelChange({
      ...columnVisibilityModel,
      [field]: columnVisibilityModel?.[field] !== false ? false : true,
    })
  }

  const isSomeItemChecked = columnVisibilityModel && Object.values(columnVisibilityModel).some(el => el === false)

  const onClickAllItemBtn = () => {
    if (isSomeItemChecked) {
      onColumnVisibilityModelChange(columnsModel.reduce((ac, cur) => ({ ...ac, [cur.field]: true }), {}))
    } else {
      onColumnVisibilityModelChange(columnsModel.reduce((ac, cur) => ({ ...ac, [cur.field]: false }), {}))
    }
  }

  return (
    <div>
      <Button variant="text" className={cx(className, classNames.mainFilterBtn)} onClick={handleClick}>
        <div className={cx(className, classNames.mainFilterBtnInsert)}>
          <SettingsOutlinedIcon fontSize="small" />

          <Typography className={classNames.mainFilterBtnInsertText}>{t(TranslationKey.Parameters)}</Typography>
        </div>
      </Button>

      <Menu
        keepMounted
        anchorEl={menuAnchor}
        autoFocus={false}
        open={Boolean(menuAnchor)}
        classes={{ paper: classNames.menu, list: classNames.list }}
        onClose={handleClose}
      >
        <div className={classNames.mainWrapper}>
          <Typography className={classNames.titleText}>{t(TranslationKey.Columns)}</Typography>
          <div className={classNames.searchInputWrapper}>
            <SearchInput
              inputClasses={classNames.searchInput}
              placeholder={t(TranslationKey.Search)}
              onChange={e => {
                setNameSearchValue(e.target.value)
              }}
            />
          </div>

          <div className={classNames.shopsBody}>
            <div className={classNames.shop}>
              <Checkbox
                color="primary"
                checked={!columnVisibilityModel || !isSomeItemChecked}
                onClick={onClickAllItemBtn}
              />
              <div className={classNames.shopName}>{t(TranslationKey.All)}</div>
            </div>

            {itemsForRender.map((el, index) => (
              <div key={index} className={classNames.shop}>
                <Checkbox
                  color="primary"
                  checked={
                    !columnVisibilityModel || (columnVisibilityModel && columnVisibilityModel?.[el.field] !== false)
                  }
                  onClick={() => onClickItem(el.field)}
                />
                <div className={classNames.shopName}>{el.headerName}</div>
              </div>
            ))}
          </div>
        </div>
      </Menu>
    </div>
  )
}
