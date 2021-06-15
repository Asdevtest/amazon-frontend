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

import {checkIsClient} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './fields-and-suppliers.style'
import {TableSupplier} from './table-supplier'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const FieldsAndSuppliers = observer(
  ({suppliers, curUserRole, onChangeField, product, onClickSupplierBtns, selectedSupplier, onClickSupplier}) => {
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
          {!checkIsClient(curUserRole) ? (
            <Container disableGutters className={classNames.supplierContainer}>
              <IconButton className={classNames.iconBtn} onClick={() => onClickSupplierBtns('add')}>
                <AddIcon />
              </IconButton>
              {selectedSupplier ? (
                <>
                  <IconButton className={classNames.iconBtn} onClick={() => onClickSupplierBtns('edit')}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className={clsx(classNames.iconBtn, classNames.iconBtnRemove)}
                    onClick={() => onClickSupplierBtns('delete')}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : undefined}
            </Container>
          ) : undefined}
          <TableSupplier selectedSupplier={selectedSupplier} suppliers={suppliers} onClickSupplier={onClickSupplier} />
        </Box>
      </Grid>
    )
  },
)
