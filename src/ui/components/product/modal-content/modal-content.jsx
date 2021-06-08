import {React, useState} from 'react'

import {Container, Divider, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {PRODUCT_EMPTY_SUPPLIERS} from '@constants/mocks'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {priceCalculation} from '@utils/price-calculation'

import {useClassNames} from './modal-content.style'

const textConsts = getLocalizedTexts(texts, 'ru').modalContent

export const ModalContent = observer(({title, setOpenModal, suppliers, setSuppliers, selected, modeAddOrEdit}) => {
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
    <Container disableGutters className={classNames.modalContainer}>
      <Typography className={classNames.modalTitle}>{title}</Typography>
      <Divider className={classNames.titleDivider} />

      <Field title={textConsts.name} value={tmpSupplier.name} onChange={onChangeField('name')} />
      <Field title={textConsts.link} value={tmpSupplier.link} onChange={onChangeField('link')} />
      <Field title={textConsts.price} value={tmpSupplier.price} onChange={onChangeField('price')} />
      <Field
        title={textConsts.deliveryPrice}
        value={tmpSupplier.deliveryPrice}
        onChange={onChangeField('deliveryPrice')}
      />
      <Field title={textConsts.qty} value={tmpSupplier.qty} onChange={onChangeField('qty')} />
      <Field title={textConsts.minQty} value={tmpSupplier.minQty} onChange={onChangeField('minQty')} />
      <Field
        disabled
        title={textConsts.csCode}
        value={priceCalculation(tmpSupplier.price, tmpSupplier.deliveryPrice, tmpSupplier.qty)}
        onChange={onChangeField('csCode')}
      />
      <Field
        multiline
        className={classNames.commentField}
        rows={4}
        rowsMax={6}
        title={textConsts.comment}
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
            onClickSaveBtn()
          }}
        >
          {textConsts.savBtn}
        </Button>
        <Button
          disableElevation
          className={classNames.cancelBtn}
          variant="contained"
          onClick={() => setOpenModal(false)}
        >
          {textConsts.cancelBtn}
        </Button>
      </div>
    </Container>
  )
})
