import React, { useEffect, useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { ListItemText, MenuItem, Select, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'

import { t } from '@utils/translations'

import { useClassNames } from './select-shops-modal.style'

export const SelectShopsModal = ({ onClickSuccessBtn, onClickCancelBtn, title, message, shops }) => {
  const { classes: classNames } = useClassNames()

  const shopsNames = shops.map(shop => shop.name)
  const [clearSelect, setClearSelect] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [currentShops, setCurrentShops] = useState([])
  const [currentShopsIds, setCurrentShopsIds] = useState([])

  useEffect(() => {
    !selectedItem && shops?.length ? setClearSelect(true) : setClearSelect(false)
  }, [selectedItem, shops])

  const onChangeShopNamesField = () => {
    setClearSelect(true)
    selectedItem && setCurrentShops(prev => [...new Set([...prev, selectedItem])])
    selectedItem && setCurrentShopsIds(prev => [...new Set([...prev, selectedItem._id])])
  }

  const onRemoveShop = (name, id) => {
    setSelectedItem(null)
    setCurrentShops(currentShops.filter(shop => shop.name !== name))
    currentShopsIds && setCurrentShopsIds(currentShopsIds.filter(shopId => shopId !== id))
  }

  return (
    <div>
      <div className={classNames.modalMessageWrapper}>
        <div className={classNames.titleWrapper}>
          <Typography paragraph variant="h5" className={classNames.title}>
            {title}
          </Typography>
        </div>

        <div className={classNames.shopsWrapper}>
          <Field
            label={t(TranslationKey.Shops)}
            labelClasses={classNames.fieldLabel}
            containerClasses={classNames.allowedRoleContainer}
            inputComponent={
              <div className={classNames.shopsFieldWrapper}>
                <Select
                  value={shops?.length ? shopsNames : t(TranslationKey['No stores'])}
                  variant="outlined"
                  disabled={!shops.length}
                  input={<Input fullWidth />}
                  renderValue={() =>
                    clearSelect
                      ? t(TranslationKey['Select a store'])
                      : !shopsNames.length
                      ? t(TranslationKey['No stores'])
                      : selectedItem?.name
                  }
                  className={classNames.shopsSelect}
                  classes={{ select: classNames.select }}
                  onChange={e => setSelectedItem(e.target.value)}
                >
                  {shops.map((shop, index) => (
                    <MenuItem
                      key={index}
                      disabled={currentShops.includes(shop)}
                      value={shop}
                      className={classNames.selectMenu}
                    >
                      {/* <Checkbox color="primary" checked={currentShops.includes(traiding-shop._id)} /> */}

                      <ListItemText primary={shop.name} />
                    </MenuItem>
                  ))}
                </Select>
                <HighlightOffIcon className={classNames.deleteIcon} onClick={() => setSelectedItem('')} />
                <Button
                  disabled={!shops.length}
                  className={classNames.shopsFieldAddButton}
                  onClick={onChangeShopNamesField}
                >
                  {t(TranslationKey.Add)}
                </Button>
              </div>
            }
          />

          <div className={classNames.selectedShopsWrapper}>
            {currentShops.map((shop, index) => (
              <div key={index} className={classNames.selectedShop}>
                <Typography className={classNames.selectedShopText}>{shop.name}</Typography>
                <ClearIcon className={classNames.removeShopButton} onClick={() => onRemoveShop(shop.name, shop._id)} />
              </div>
            ))}
          </div>
        </div>

        <Typography paragraph className={classNames.modalMessage}>
          {message}
        </Typography>
        <div className={classNames.buttonsWrapper}>
          <Button
            success
            disableElevation
            disabled={selectedItem?.name && !clearSelect}
            // tooltipAttentionContent={!clearSelect && t(TranslationKey.)}
            className={classNames.button}
            // disabled={submitIsClicked}
            variant="contained"
            onClick={() => onClickSuccessBtn(currentShopsIds)}
          >
            {t(TranslationKey.Yes)}
          </Button>

          <Button
            // disabled={submitIsClicked}
            className={classNames.cancelButton}
            variant={'text'}
            color="primary"
            onClick={onClickCancelBtn}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </div>
  )
}
