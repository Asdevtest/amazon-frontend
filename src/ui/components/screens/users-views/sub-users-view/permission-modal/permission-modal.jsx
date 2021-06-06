import React from 'react'

import {Box, Container, FormControlLabel, NativeSelect, Checkbox, Button, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Field} from '@components/field'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './permission-modal.style'

const ResearcherCheckboxesData = [
  'Добавление продукта как Private label',
  'Добавление продукта как Dropshipping',
  'Добавление продукта как Online Arbitrage China',
  'Добавление продукта как Online Arbitrage USA',
  'Добавление продукта как Wholesale',
  'Персональный баланс у аккаунта',
  'Просмотр результатов проверки системой',
  'Персональный рейтинг у ресерчера',
]

const AccountManagerCheckboxesData = [
  'Покупка товара на бирже',
  'Доступ к инвентарю',
  'Заказать товар',
  'Управление заказами',
]

const permissionList = [
  {value: 'Team member', text: 'Team member'},
  {value: 'Researcher', text: 'Researcher'},
  {value: 'Account manager', text: 'Account manager'},
  {value: 'Warehouse manager', text: 'Warehouse manager'},
]

const WarehouseManagerCheckboxesData = ['Добавлять новый склад  к получению', 'Менять статус отправок']

const textConsts = getLocalizedTexts(texts, 'en').subUsersModalPermission

export const PermissionContentModal = props => {
  const classNames = useClassNames()

  const ResearcherCheckboxes = (
    <Box className={classNames.boxWrapper}>
      {ResearcherCheckboxesData.map((item, index) => (
        <FormControlLabel key={index} control={<Checkbox color="primary" />} label={item} />
      ))}
    </Box>
  )
  const AccountManagerCheckboxes = (
    <Box className={classNames.boxWrapper}>
      {AccountManagerCheckboxesData.map((item, index) => (
        <FormControlLabel key={index} control={<Checkbox color="primary" />} label={item} />
      ))}
    </Box>
  )
  const WarehouseManagerCheckboxes = (
    <Box className={classNames.boxWrapper}>
      {WarehouseManagerCheckboxesData.map((item, index) => (
        <FormControlLabel key={index} control={<Checkbox color="primary" />} label={item} />
      ))}
    </Box>
  )
  return (
    <Container disableGutters>
      <Typography variant="h3">{textConsts.title}</Typography>
      <Field
        title={textConsts.permissionTitle}
        inputComponent={
          <NativeSelect
            variant="filled"
            inputProps={{
              name: 'select-method',
              id: 'select-method',
            }}
            className={classNames.select}
            input={<Input />}
          >
            {permissionList.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
          </NativeSelect>
        }
      />
      <Box className={classNames.boxResearcher}>
        <Field title={textConsts.researcherTitle} inputComponent={ResearcherCheckboxes} />
        <Box className={classNames.boxWrapper}>
          <Field title={textConsts.acManagerTitle} inputComponent={AccountManagerCheckboxes} />
          <Field title={textConsts.warehouseManagerTitle} inputComponent={WarehouseManagerCheckboxes} />
        </Box>
      </Box>
      <Box className={classNames.buttonBox}>
        <Button
          disableElevation
          variant="contained"
          className={classNames.saveBtn}
          onClick={() => props.setModalPermission(false)}
        >
          {textConsts.saveBtn}
        </Button>
      </Box>
    </Container>
  )
}
