import React from 'react'

import {Box, Container, Grid, IconButton, Typography} from '@material-ui/core'
import MuiCheckbox from '@material-ui/core/Checkbox'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './fields-and-suppliers.style'
import {TableSupplier} from './table-supplier'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const FieldsAndSuppliers = observer(({onChangeField, product, onClick, selectedSupplier, onClickSupplier}) => {
  const classNames = useClassNames()
  return (
    <Grid item xs={12}>
      <Box className={classNames.productFieldBox}>
        <Field disabled label={textConsts.fieldAsin} value={product.id} onChange={onChangeField('asin')} />
        <Field label={textConsts.fieldLinkAmazon} value={product.lamazon} onChange={onChangeField('lamazon')} />
        <Box className={classNames.productCheckboxBox} mb={2.5}>
          <Typography className={(classNames.label, classNames.typoCheckbox)}>{textConsts.checkboxFba}</Typography>

          <MuiCheckbox
            disabled
            checked={product.fba}
            onClick={() => onChangeField('fba')({target: {value: !product.fba}})}
          />
        </Box>
        <Container disableGutters className={classNames.supplierContainer}>
          <IconButton className={classNames.iconBtn} onClick={() => onClick('add')}>
            <AddIcon />
          </IconButton>
          {selectedSupplier ? (
            <>
              <IconButton className={classNames.iconBtn} onClick={() => onClick('edit')}>
                <EditIcon />
              </IconButton>
              <IconButton
                className={clsx(classNames.iconBtn, classNames.iconBtnRemove)}
                onClick={() => onClick('delete')}
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : undefined}
        </Container>
        <TableSupplier
          selectedSupplier={selectedSupplier}
          suppliers={product.suppliers}
          onClickSupplier={onClickSupplier}
        />
      </Box>
    </Grid>
  )
})
