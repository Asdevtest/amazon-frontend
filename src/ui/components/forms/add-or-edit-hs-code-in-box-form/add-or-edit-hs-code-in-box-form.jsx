import React, {useState} from 'react'

import {TableCell, TableRow, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {Input} from '@components/input'
import {Table} from '@components/table'
import {TableHeadRow} from '@components/table-rows/batches-view/table-head-row'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

import {useClassNames} from './add-or-edit-hs-code-in-box-form.style'

const textConsts = getLocalizedTexts(texts, 'ru').addOrEditHsCodeInBox

const HEAD_CELLS = [{title: 'Продукт'}, {title: 'Количество'}, {title: 'HS Code'}]

const renderHeadRow = <TableHeadRow headCells={HEAD_CELLS} />

const TableBodyBoxRow = ({item, handlers, ...restProps}) => {
  const classNames = useClassNames()

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
            <Typography className={classNames.superboxTypo}>{`Superbox x ${item.amount}`}</Typography>
          )}
        </div>
      </TableCell>

      <TableCell>
        <Input
          inputProps={{maxLength: 18}}
          value={item.hsCode}
          onChange={handlers.onChangeField('hsCode', item.productId)}
        />
      </TableCell>
    </TableRow>
  )
}

export const AddOrEditHsCodeInBox = observer(({box, setOpenModal, onSubmit}) => {
  const classNames = useClassNames()

  const sourceData = box.items.map(item => ({
    productId: item.product._id,
    hsCode: item.product.hsCode,

    asin: item.product.asin,
    qty: item.amount,
    amazonTitle: item.product.amazonTitle,
    image: item.product.images[0],
  }))

  const [formFields, setFormFields] = useState(sourceData)

  const onChangeField = (fieldName, productId) => event => {
    const newFormFieldsProd = formFields.find(el => el.productId === productId)

    newFormFieldsProd[fieldName] = event.target.value

    setFormFields(formFields.map(el => (el.prod === productId ? newFormFieldsProd : el)))
  }

  const onClickSubmit = () => {
    const submitData = formFields.map(el => getObjectFilteredByKeyArrayWhiteList(el, ['productId', 'hsCode']))

    onSubmit(submitData)
  }

  return (
    <div className={classNames.form}>
      <Typography className={classNames.modalTitle} variant="h5">
        {`Коробка ${box.humanFriendlyId}`}
      </Typography>

      <Table
        rowsOnly
        data={formFields}
        BodyRow={TableBodyBoxRow}
        renderHeadRow={renderHeadRow}
        box={box}
        rowsHandlers={{onChangeField}}
      />

      <div className={classNames.buttonsWrapper}>
        <SuccessButton disableElevation color="primary" variant="contained" onClick={onClickSubmit}>
          {textConsts.saveBtn}
        </SuccessButton>

        <Button
          disableElevation
          className={classNames.button}
          color="primary"
          variant="text"
          onClick={() => setOpenModal()}
        >
          {textConsts.closeBtn}
        </Button>
      </div>
    </div>
  )
})
