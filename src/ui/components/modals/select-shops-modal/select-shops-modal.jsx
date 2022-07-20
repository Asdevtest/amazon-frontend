import React, {useState} from 'react'

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
  console.log(currentShopsIds)

  const onChangeShopNamesField = () => {
    setClearSelect(true)
    selectedItem && setCurrentShops(prev => [...new Set([...prev, selectedItem])])
    selectedItem && setCurrentShopsIds(prev => [...new Set([...prev, selectedItem._id])])
  }

  const onRemoveShop = (name, id) => {
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
                  value={shopsNames}
                  renderValue={() => (clearSelect ? 'Выберите магазин' : selectedItem?.name)}
                  className={classNames.shopsSelect}
                  onChange={e => setSelectedItem(e.target.value)}
                  onClick={() => setClearSelect(false)}
                >
                  {shops.map((shop, index) => (
                    <MenuItem key={index} disabled={currentShops.includes(shop)} value={shop}>
                      <Checkbox color="primary" checked={currentShops.includes(shop)} />
                      <ListItemText primary={shop.name} />
                    </MenuItem>
                  ))}
                </Select>
                <Button className={classNames.shopsFieldAddButton} onClick={onChangeShopNamesField}>
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
            {'ok'}
          </Button>

          <Button
            // disabled={submitIsClicked}
            className={classNames.cancelButton}
            variant={'text'}
            color="primary"
            onClick={onClickCancelBtn}
          >
            {'cancel'}
          </Button>
        </div>
      </div>
    </div>
  )
}
