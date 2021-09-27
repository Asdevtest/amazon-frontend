/* eslint-disable no-unused-vars */
import React from 'react'

import {Box, Container, Grid, IconButton, Typography, Link} from '@material-ui/core'
import MuiCheckbox from '@material-ui/core/Checkbox'
import AddIcon from '@material-ui/icons/Add'
import AcceptIcon from '@material-ui/icons/Check'
import AcceptRevokeIcon from '@material-ui/icons/Clear'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {ProductStatusByKey, ProductStatus} from '@constants/product-status'
import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {checkIsClient, checkIsSupervisor, checkIsAdmin} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl} from '@utils/text'

import {useClassNames} from './fields-and-suppliers.style'
import {TableSupplier} from './table-supplier'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const FieldsAndSuppliers = observer(
  ({suppliers, curUserRole, onChangeField, product, onClickSupplierBtns, selectedSupplier, onClickSupplier}) => {
    const classNames = useClassNames()
    const isSupplierAcceptRevokeActive =
      selectedSupplier && product.currentSupplier && product.currentSupplier._id === selectedSupplier._id
    return (
      <Grid item xs={12}>
        <Box className={classNames.productFieldBox}>
          <Field disabled label={textConsts.fieldAsin} value={product.id} />
          <Field
            disabled
            label={textConsts.fieldLinkAmazon}
            inputComponent={
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(product.lamazon)}>
                <Typography className={classNames.amazonLink}>{product.lamazon}</Typography>
              </Link>
            }
          />

          <Box className={classNames.productCheckboxBox} mb={2.5}>
            <Typography className={(classNames.label, classNames.typoCheckbox)}>{textConsts.checkboxFba}</Typography>

            <MuiCheckbox
              disabled
              checked={product.fba}
              onClick={() => onChangeField('fba')({target: {value: !product.fba}})}
            />
          </Box>

          <Typography variant="h4" className={classNames.supplierTitle}>
            {textConsts.supplierTitle}
          </Typography>
          {!(checkIsClient(curUserRole) || checkIsSupervisor(curUserRole) || checkIsAdmin(curUserRole)) ? (
            <div className={classNames.supplierActionsWrapper}>
              <Typography variant="h6" className={classNames.supplierActionsTitle}>
                {textConsts.supplierActionsTitle}
              </Typography>
              <Container disableGutters className={classNames.supplierContainer}>
                <IconButton className={classNames.iconBtn} onClick={() => onClickSupplierBtns('add')}>
                  <AddIcon />
                </IconButton>
                {selectedSupplier ? (
                  <>
                    <IconButton className={classNames.iconBtn} onClick={() => onClickSupplierBtns('edit')}>
                      <EditIcon />
                    </IconButton>

                    {product.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS] && (
                      <IconButton
                        className={clsx(classNames.iconBtn, classNames.iconBtnRemove)}
                        onClick={() => onClickSupplierBtns('delete')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}

                    <IconButton
                      className={clsx(classNames.iconBtn, classNames.iconBtnAccept, {
                        [classNames.iconBtnAcceptRevoke]: isSupplierAcceptRevokeActive,
                      })}
                      onClick={() =>
                        isSupplierAcceptRevokeActive
                          ? onClickSupplierBtns('acceptRevoke')
                          : onClickSupplierBtns('accept')
                      }
                    >
                      {isSupplierAcceptRevokeActive ? <AcceptRevokeIcon /> : <AcceptIcon />}
                    </IconButton>
                  </>
                ) : undefined}
              </Container>
            </div>
          ) : undefined}
          {/* <TableSupplier
            product={product}
            selectedSupplier={selectedSupplier}
            suppliers={suppliers}
            onClickSupplier={onClickSupplier}
          /> */}
        </Box>
      </Grid>
    )
  },
)
