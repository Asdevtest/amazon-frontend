import React, {useEffect, useState} from 'react'

import {Checkbox, ListItemText, MenuItem, Select, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {t} from '@utils/translations'

import {useClassNames} from './select-shops-modal.style'

export const SelectShopsModal = ({onClickSuccessBtn, onClickCancelBtn, title, message, shops}) => {
  const classNames = useClassNames()

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
            label={t(TranslationKey.Shop)}
            containerClasses={classNames.allowedRoleContainer}
            inputComponent={
              <div className={classNames.shopsFieldWrapper}>
                <Select
                  value={shops?.length ? shopsNames : t(TranslationKey['No stores'])}
                  disabled={!shops.length}
                  renderValue={() =>
                    clearSelect
                      ? t(TranslationKey['Select a store'])
                      : !shopsNames.length
                      ? t(TranslationKey['No stores'])
                      : selectedItem?.name
                  }
                  className={classNames.shopsSelect}
                  onChange={e => setSelectedItem(e.target.value)}
                >
                  {shops.map((shop, index) => (
                    <MenuItem key={index} disabled={currentShops.includes(shop)} value={shop}>
                      <Checkbox color="primary" checked={currentShops.includes(shop)} />
                      <ListItemText primary={shop.name} />
                    </MenuItem>
                  ))}
                </Select>
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
              <Typography key={index} className={classNames.selectedShop}>
                {shop.name}
                <Typography className={classNames.removeShopButton} onClick={() => onRemoveShop(shop.name, shop._id)}>
                  {'х'}
                </Typography>
              </Typography>
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
