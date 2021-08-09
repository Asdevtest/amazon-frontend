import {React, useState} from 'react'

import {Container, Divider, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {priceCalculation} from '@utils/price-calculation'

import {useClassNames} from './add-or-edit-supplier-modal-content.style'

const textConsts = getLocalizedTexts(texts, 'ru').addOrEditSupplierModalContent

export const AddOrEditSupplierModalContent = observer(({title, onTriggerShowModal, supplier, onClickSaveBtn}) => {
  const classNames = useClassNames()

  const [tmpSupplier, setTmpSupplier] = useState({
    amount: (supplier && supplier.amount) || '',
    comment: (supplier && supplier.comment) || '',
    delivery: (supplier && supplier.delivery) || '',
    link: (supplier && supplier.link) || '',
    lotcost: (supplier && supplier.lotcost) || '',
    minlot: (supplier && supplier.minlot) || '',
    name: (supplier && supplier.name) || '',
    price: (supplier && supplier.price) || '',
  })

  const onChangeField = fieldName => event => {
    setTmpSupplier({...tmpSupplier, [fieldName]: event.target.value})
  }

  return (
    <Container disableGutters className={classNames.modalContainer}>
      <Typography className={classNames.modalTitle}>{title}</Typography>
      <Divider className={classNames.titleDivider} />

      <Field label={textConsts.name} value={tmpSupplier.name} onChange={onChangeField('name')} />
      <Field label={textConsts.link} value={tmpSupplier.link} onChange={onChangeField('link')} />
      <Field label={textConsts.price} value={tmpSupplier.price} type="number" onChange={onChangeField('price')} />
      <Field
        label={textConsts.deliveryPrice}
        value={tmpSupplier.delivery}
        type="number"
        onChange={onChangeField('delivery')}
      />
      <Field label={textConsts.qty} value={tmpSupplier.amount} type="number" onChange={onChangeField('amount')} />
      <Field label={textConsts.minLot} value={tmpSupplier.minlot} type="number" onChange={onChangeField('minlot')} />
      <Field label={textConsts.lotCost} value={tmpSupplier.lotcost} type="number" onChange={onChangeField('lotcost')} />
      <Field
        disabled
        label={textConsts.csCode}
        type="number"
        value={priceCalculation(tmpSupplier.price, tmpSupplier.delivery, tmpSupplier.amount)}
      />
      <Field
        multiline
        className={classNames.commentField}
        rows={4}
        rowsMax={6}
        label={textConsts.comment}
        value={tmpSupplier.comment}
        onChange={onChangeField('comment')}
      />

      <Divider className={classNames.fieldsDivider} />

      <div className={classNames.buttonsWrapper}>
        <Button
          disableElevation
          className={classNames.saveBtn}
          variant="contained"
          onClick={() => {
            onClickSaveBtn({...tmpSupplier, _id: supplier && supplier._id})
          }}
        >
          {textConsts.saveBtn}
        </Button>
        <Button
          disableElevation
          className={classNames.cancelBtn}
          variant="contained"
          onClick={() => onTriggerShowModal()}
        >
          {textConsts.cancelBtn}
        </Button>
      </div>
    </Container>
  )
})
