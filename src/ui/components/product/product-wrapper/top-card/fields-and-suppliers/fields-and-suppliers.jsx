import React from 'react'

import {Box, Container, Grid, IconButton, Typography} from '@material-ui/core'
import MuiCheckbox from '@material-ui/core/Checkbox'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './fields-and-suppliers.style'
import {TableSupplier} from './table-supplier'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const FieldsAndSuppliers = ({
  onChangeField,
  product,
  setProduct,
  onClick,
  suppliers,
  selected,
  onClickSupplier,
}) => {
  const classNames = useClassNames()

  return (
    <Grid item xs={12}>
      <Box className={classNames.productFieldBox}>
        <Field disabled title={textConsts.fieldAsin} value={product.asin} onChange={onChangeField('asin')} />
        <Field title={textConsts.fieldLinkAmazon} value={product.linkAmazon} onChange={onChangeField('linkAmazon')} />
        <Box className={classNames.productCheckboxBox} mb={2.5}>
          <Typography className={(classNames.label, classNames.typoCheckbox)}>{textConsts.checkboxFba}</Typography>

          <MuiCheckbox
            disabled
            checked={product.fba}
            onClick={() => {
              setProduct({...product, fba: !product.fba})
            }}
          />
        </Box>
        <Container disableGutters className={classNames.supplierContainer}>
          <IconButton className={(classNames.iconButton, classNames.supplierIcon)} onClick={() => onClick('add')}>
            <AddIcon />
          </IconButton>
          <IconButton className={(classNames.iconButton, classNames.supplierIcon)} onClick={() => onClick('edit')}>
            <EditIcon />
          </IconButton>
          <IconButton
            className={(classNames.iconButton, classNames.supplierIconBackground)}
            onClick={() => onClick('delete')}
          >
            <DeleteIcon />
          </IconButton>
        </Container>
        <TableSupplier selected={selected} suppliers={suppliers} onClickSupplier={onClickSupplier} />
      </Box>
    </Grid>
  )
}
