import React, {useState} from 'react'

import {Box, Container, Grid, IconButton, Typography, Link, InputLabel, NativeSelect} from '@material-ui/core'
import MuiCheckbox from '@material-ui/core/Checkbox'
import AddIcon from '@material-ui/icons/Add'
import AcceptIcon from '@material-ui/icons/Check'
import AcceptRevokeIcon from '@material-ui/icons/Clear'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {ProductStatusByKey, ProductStatus} from '@constants/product-status'
import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {checkIsClient, checkIsSupervisor, checkIsAdmin, checkIsResearcher} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl} from '@utils/text'

import {useClassNames} from './fields-and-suppliers.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const FieldsAndSuppliers = observer(
  ({curUserRole, onChangeField, product, productBase, onClickSupplierBtns, selectedSupplier}) => {
    const classNames = useClassNames()

    const [skuLine, setSkuLine] = useState('')

    const onClickSkuBtn = () => {
      onChangeField('skusByClient')({target: {value: [...product.skusByClient, skuLine.toUpperCase()]}})

      setSkuLine('')
    }

    const onRemoveSku = index => {
      const newArr = product.skusByClient.filter((el, i) => i !== index)

      onChangeField('skusByClient')({target: {value: [...newArr]}})
    }

    const isSupplierAcceptRevokeActive =
      selectedSupplier && product.currentSupplierId && product.currentSupplierId === selectedSupplier._id

    return (
      <Grid item xs={12}>
        <Box className={classNames.productFieldBox}>
          <Field
            disabled={
              !(
                checkIsClient(curUserRole) &&
                product.isCreatedByClient &&
                clientToEditStatuses.includes(productBase.status)
              )
            }
            label={textConsts.fieldAsin}
            value={product.id}
            onChange={onChangeField('id')}
          />
          <Field
            disabled
            label={textConsts.fieldLinkAmazon}
            inputComponent={
              <div>
                <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(product.lamazon)}>
                  <Typography className={classNames.amazonLink}>{product.lamazon}</Typography>
                </Link>

                {checkIsClient(curUserRole) &&
                  product.isCreatedByClient &&
                  clientToEditStatuses.includes(productBase.status) && (
                    <Input
                      disabled={!checkIsClient(curUserRole)}
                      placeholder={textConsts.linkPlaceholder}
                      value={product.lamazon}
                      onChange={onChangeField('lamazon')}
                    />
                  )}
              </div>
            }
          />

          <Field
            label={textConsts.sku}
            inputComponent={
              <div>
                {product.skusByClient.length ? (
                  <Grid container spacing={2} className={classNames.skuItemsWrapper}>
                    {product.skusByClient.map((item, index) => (
                      <Grid key={index} item className={classNames.skuItemWrapper}>
                        <Typography className={classNames.skuItemTitle}>{item}</Typography>

                        {checkIsClient(curUserRole) &&
                          product.isCreatedByClient &&
                          clientToEditStatuses.includes(productBase.status) && (
                            <IconButton className={classNames.deleteBtnWrapper} onClick={() => onRemoveSku(index)}>
                              <DeleteIcon className={classNames.deleteBtn} />
                            </IconButton>
                          )}
                      </Grid>
                    ))}
                  </Grid>
                ) : null}

                {checkIsClient(curUserRole) &&
                  product.isCreatedByClient &&
                  clientToEditStatuses.includes(productBase.status) && (
                    <div className={classNames.inputWrapper}>
                      <Input
                        placeholder={textConsts.skuHolder}
                        inputProps={{maxLength: 1000}}
                        value={skuLine}
                        className={classNames.input}
                        onChange={e => setSkuLine(e.target.value)}
                      />
                      <Button
                        disableElevation
                        disabled={skuLine === ''}
                        className={classNames.defaultBtn}
                        variant="contained"
                        color="primary"
                        onClick={onClickSkuBtn}
                      >
                        {textConsts.addSkuBtn}
                      </Button>
                    </div>
                  )}
              </div>
            }
          />

          <Typography className={classNames.label}>{textConsts.deliveryMethod}</Typography>

          <div className={classNames.productCheckboxBoxesWrapper}>
            <Box className={classNames.productCheckboxBox} mb={2.5}>
              <Typography className={classNames.label}>{textConsts.checkboxFba}</Typography>
              <MuiCheckbox
                disabled={
                  !(
                    checkIsSupervisor(curUserRole) ||
                    checkIsResearcher(curUserRole) ||
                    (checkIsClient(curUserRole) &&
                      product.isCreatedByClient &&
                      clientToEditStatuses.includes(productBase.status))
                  )
                }
                color="primary"
                checked={product.fba}
                onClick={() => onChangeField('fba')({target: {value: !product.fba}})}
              />
            </Box>

            <Box className={classNames.productCheckboxBox} mb={2.5}>
              <Typography className={classNames.label}>{textConsts.checkboxFbm}</Typography>
              <MuiCheckbox
                disabled={
                  !(
                    checkIsSupervisor(curUserRole) ||
                    checkIsResearcher(curUserRole) ||
                    (checkIsClient(curUserRole) &&
                      product.isCreatedByClient &&
                      clientToEditStatuses.includes(productBase.status))
                  )
                }
                color="primary"
                checked={!product.fba}
                onClick={() => onChangeField('fba')({target: {value: !product.fba}})}
              />
            </Box>
          </div>

          <Box mt={3} className={classNames.strategyWrapper}>
            <InputLabel className={classNames.strategyLabel}>{textConsts.strategyLabel}</InputLabel>

            <NativeSelect
              disabled={
                !(
                  checkIsResearcher(curUserRole) ||
                  (checkIsClient(curUserRole) &&
                    product.isCreatedByClient &&
                    clientToEditStatuses.includes(productBase.status))
                )
              }
              value={product.strategyStatus}
              className={classNames.nativeSelect}
              input={<Input />}
              onChange={onChangeField('strategyStatus')}
            >
              {Object.keys(mapProductStrategyStatusEnum)
                .filter(el => el > 0)
                .map((statusCode, statusIndex) => (
                  <option key={statusIndex} value={statusCode}>
                    {mapProductStrategyStatusEnum[statusCode]}
                  </option>
                ))}
            </NativeSelect>
          </Box>

          <Typography variant="h4" className={classNames.supplierTitle}>
            {textConsts.supplierTitle}
          </Typography>
          {!(
            (checkIsClient(curUserRole) && !product.isCreatedByClient) ||
            (checkIsClient(curUserRole) && !clientToEditStatuses.includes(productBase.status)) ||
            checkIsSupervisor(curUserRole) ||
            checkIsAdmin(curUserRole)
          ) ? (
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
        </Box>
      </Grid>
    )
  },
)
