import { observer } from 'mobx-react'
import { useState } from 'react'

import { TableCell, TableRow } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Input } from '@components/shared/input'
import { Table } from '@components/shared/table'
import { TableHeadRow } from '@components/table/table-rows/batches-view/table-head-row'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

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
              <p className={styles.productTitle}>{item.amazonTitle}</p>

              <p className={styles.boxTitle}>{`ASIN: ${item.asin}`}</p>
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className={styles.countBlock}>
          <p className={styles.amount}>{item.qty}</p>

          {restProps.box.amount > 1 && <p className={styles.superboxTypo}>{`Superbox x ${restProps.box.amount}`}</p>}
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
      <h5 className={styles.modalTitle}>{`${t(TranslationKey.Box)} ${box.humanFriendlyId}`}</h5>

      <Table
        rowsOnly
        data={formFields}
        BodyRow={TableBodyBoxRow}
        renderHeadRow={renderHeadRow}
        box={box}
        rowsHandlers={{ onChangeField }}
      />

      <div className={styles.buttonsWrapper}>
        <Button styleType={ButtonStyle.SUCCESS} disabled={submitDisabled} onClick={onClickSubmit}>
          {t(TranslationKey.Save)}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} onClick={() => setOpenModal()}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
