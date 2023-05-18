import { TableCell, TableRow, Typography } from '@mui/material'

import React, { useState } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Input } from '@components/shared/input'
import { Table } from '@components/shared/table'
import { TableHeadRow } from '@components/table/table-rows/batches-view/table-head-row'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useClassNames } from './add-or-edit-hs-code-in-box-form.style'

const TableBodyBoxRow = ({ item, handlers, ...restProps }) => {
  const { classes: classNames } = useClassNames()

  return (
    <TableRow>
      <TableCell>
        <div className={classNames.descriptionWrapper}>
          <div className={classNames.imgBlock}>
            <img className={classNames.imgBox} src={getAmazonImageUrl(item.image)} />
            <div className={classNames.imgSubBlock}>
              <Typography className={classNames.productTitle}>{item.amazonTitle}</Typography>

              <Typography className={classNames.boxTitle}>{`ASIN: ${item.asin}`}</Typography>
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className={classNames.countBlock}>
          <Typography className={classNames.amount}>{item.qty}</Typography>

          {restProps.box.amount > 1 && (
            <Typography className={classNames.superboxTypo}>{`Superbox x ${restProps.box.amount}`}</Typography>
          )}
        </div>
      </TableCell>

      <TableCell>
        <Input
          inputProps={{ maxLength: 18 }}
          value={item.hsCode}
          onChange={handlers.onChangeField('hsCode', item.productId)}
        />
      </TableCell>
    </TableRow>
  )
}

export const AddOrEditHsCodeInBox = observer(({ box, setOpenModal, onSubmit, startData }) => {
  const { classes: classNames } = useClassNames()

  const HEAD_CELLS = [
    { title: t(TranslationKey.Product) },
    { title: t(TranslationKey.Quantity) },
    { title: t(TranslationKey['HS code']) },
  ]

  const renderHeadRow = <TableHeadRow headCells={HEAD_CELLS} />

  const sourceData = box.items.map(item => ({
    productId: item.product._id,
    hsCode: item.product.hsCode,

    asin: item.product.asin,
    qty: item.amount,
    amazonTitle: item.product.amazonTitle,
    image: item.product.images[0],
  }))

  const [formFields, setFormFields] = useState(startData ? startData : sourceData)

  const onChangeField = (fieldName, productId) => event => {
    const newFormFieldsProd = formFields.find(el => el.productId === productId)

    newFormFieldsProd[fieldName] = event.target.value

    setFormFields(formFields.map(el => (el.prod === productId ? newFormFieldsProd : el)))
  }

  const onClickSubmit = () => {
    onSubmit(formFields)
  }

  const submitDisabled = JSON.stringify(sourceData) === JSON.stringify(formFields)

  return (
    <div className={classNames.form}>
      <Typography className={classNames.modalTitle} variant="h5">
        {`${t(TranslationKey.Box)} ${box.humanFriendlyId}`}
      </Typography>

      <Table
        rowsOnly
        data={formFields}
        BodyRow={TableBodyBoxRow}
        renderHeadRow={renderHeadRow}
        box={box}
        rowsHandlers={{ onChangeField }}
      />

      <div className={classNames.buttonsWrapper}>
        <Button success disabled={submitDisabled} className={classNames.saveButton} onClick={onClickSubmit}>
          {t(TranslationKey.Save)}
        </Button>

        <Button className={classNames.closeButton} variant="text" onClick={() => setOpenModal()}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
