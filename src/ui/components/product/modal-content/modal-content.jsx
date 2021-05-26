import {React, useState} from 'react'

import {Container, Divider, Typography} from '@material-ui/core'

import {PRODUCT_EMPTY_SUPPLIERS} from '@constants/mocks'
import {texts} from '@constants/texts'

import {Button} from '@components/button'
import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {priceCalculation} from '@utils/price-calculation'

import {useClassNames} from './modal-content.style'

const textConsts = getLocalizedTexts(texts, 'ru').modalContent

export const ModalContent = ({title, setOpenModal, suppliers, setSuppliers, selected, modeAddOrEdit}) => {
  const classNames = useClassNames()
  const [tmpSupplier, setTmpSupplier] = useState(
    modeAddOrEdit === 'add' ? PRODUCT_EMPTY_SUPPLIERS : suppliers[selected],
  )

  const onChangeField = fieldName => event => {
    setTmpSupplier({...tmpSupplier, [fieldName]: event.target.value})
  }

  const onClickSaveBtn = () => {
    modeAddOrEdit === 'add'
      ? setSuppliers(suppliers.concat(tmpSupplier))
      : setSuppliers(
          suppliers.map((supplier, index) => {
            if (selected !== index) {
              return supplier
            } else {
              return tmpSupplier
            }
          }),
        )

    setOpenModal(false)
  }

  return (
    <Container className={classNames.modalContainer} disableGutters>
      <Typography className={classNames.modalTitle}>{title}</Typography>
      <Divider className={classNames.titleDivider} />

      <Field onChange={onChangeField('name')} title={textConsts.name} value={tmpSupplier.name} />
      <Field onChange={onChangeField('link')} title={textConsts.link} value={tmpSupplier.link} />
      <Field onChange={onChangeField('price')} title={textConsts.price} value={tmpSupplier.price} />
      <Field
        onChange={onChangeField('deliveryPrice')}
        title={textConsts.deliveryPrice}
        value={tmpSupplier.deliveryPrice}
      />
      <Field onChange={onChangeField('qty')} title={textConsts.qty} value={tmpSupplier.qty} />
      <Field onChange={onChangeField('minQty')} title={textConsts.minQty} value={tmpSupplier.minQty} />
      <Field
        disabled
        onChange={onChangeField('csCode')}
        title={textConsts.csCode}
        value={priceCalculation(tmpSupplier.price, tmpSupplier.deliveryPrice, tmpSupplier.qty)}
      />
      <Field
        className={classNames.commentField}
        multiline
        onChange={onChangeField('comment')}
        rows={4}
        rowsMax={6}
        title={textConsts.comment}
        value={tmpSupplier.comment}
      />

      <Divider className={classNames.fieldsDivider} />

      <div className={classNames.buttonsWrapper}>
        <Button
          className={classNames.saveBtn}
          disableElevation
          onClick={() => {
            onClickSaveBtn()
          }}
          variant="contained"
        >
          {textConsts.savBtn}
        </Button>
        <Button
          className={classNames.cancelBtn}
          disableElevation
          onClick={() => setOpenModal(false)}
          variant="contained"
        >
          {textConsts.cancelBtn}
        </Button>
      </div>
    </Container>
  )
}
