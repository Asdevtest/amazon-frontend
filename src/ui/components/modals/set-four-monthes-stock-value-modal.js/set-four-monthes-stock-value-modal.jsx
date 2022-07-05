import React, {useState} from 'react'

import {Box, Container, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {checkIsPositiveNum} from '@utils/checks'
import {t} from '@utils/translations'

import {useClassNames} from './set-four-monthes-stock-value-modal.style'

export const SetFourMonthesStockModal = ({title, onSubmit, onCloseModal, selectedProduct}) => {
  const classNames = useClassNames()

  const [newValue, setNewValue] = useState(selectedProduct?.fourMonthesStock)
  const stockSum =
    selectedProduct?.amountInOrders +
    selectedProduct?.amountInBoxes +
    selectedProduct?.productsInWarehouse?.reduce((ac, cur) => (ac += cur.stockValue), 0) +
    selectedProduct?.productsInWarehouse?.reduce((ac, cur) => (ac += cur.reserved), 0) +
    selectedProduct?.productsInWarehouse?.reduce((ac, cur) => (ac += cur.sentToFba), 0)

  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{title}</Typography>

      <Field
        containerClasses={classNames.field}
        inputProps={{maxLength: 255}}
        value={newValue}
        onChange={e =>
          checkIsPositiveNum(e.target.value) && Number(e.target.value) <= stockSum && setNewValue(e.target.value)
        }
      />

      <Box className={classNames.saveBox}>
        <Button
          disabled={Number(selectedProduct?.fourMonthesStock) === Number(newValue)}
          className={classNames.saveBtn}
          onClick={() => onSubmit(newValue)}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button onClick={onCloseModal}>{t(TranslationKey.Close)}</Button>
      </Box>
    </Container>
  )
}
