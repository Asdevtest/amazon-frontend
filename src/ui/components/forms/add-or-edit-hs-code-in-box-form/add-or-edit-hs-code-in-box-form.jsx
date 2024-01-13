import { observer } from 'mobx-react'
import { useState } from 'react'

import { TableCell, TableRow, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Input } from '@components/shared/input'
import { Table } from '@components/shared/table'
import { TableHeadRow } from '@components/table/table-rows/batches-view/table-head-row'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './add-or-edit-hs-code-in-box-form.style'

const TableBodyBoxRow = ({ item, handlers, ...restProps }) => {
  const { classes: styles } = useStyles()

  return (
    <TableRow>
      <TableCell>
        <div className={styles.descriptionWrapper}>
          <div className={styles.imgBlock}>
            <img className={styles.imgBox} src={getAmazonImageUrl(item.image)} />
            <div className={styles.imgSubBlock}>
              <Typography className={styles.productTitle}>{item.amazonTitle}</Typography>

              <Typography className={styles.boxTitle}>{`ASIN: ${item.asin}`}</Typography>
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className={styles.countBlock}>
          <Typography className={styles.amount}>{item.qty}</Typography>

          {restProps.box.amount > 1 && (
            <Typography className={styles.superboxTypo}>{`Superbox x ${restProps.box.amount}`}</Typography>
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
  const { classes: styles } = useStyles()

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
    <div className={styles.form}>
      <Typography className={styles.modalTitle} variant="h5">
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

      <div className={styles.buttonsWrapper}>
        <Button success disabled={submitDisabled} className={styles.saveButton} onClick={onClickSubmit}>
          {t(TranslationKey.Save)}
        </Button>

        <Button className={styles.closeButton} variant="text" onClick={() => setOpenModal()}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
