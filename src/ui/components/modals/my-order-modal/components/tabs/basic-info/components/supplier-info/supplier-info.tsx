import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Card } from '@components/modals/my-order-modal/components/tabs/basic-info/components/card'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './supplier-info.style'

import { SupplierInfoProps } from './supplier-info.type'
import { useSupplierInfo } from './use-supplier-info'

export const SupplierInfo: FC<SupplierInfoProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { supplierInfoFieldsConfig, showSetBarCodeModal, onToggleSetBarCodeModal, onChangeBarCode } =
    useSupplierInfo(props)

  const isQuantityField = (title?: string) => title?.includes(t(TranslationKey['Quantity (pcs.)']))

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.title}>{t(TranslationKey['Supplier information'])}</p>

        <Card>
          {supplierInfoFieldsConfig.map((item, index) => (
            <div key={index} className={cx(styles.field, { [styles.quantityField]: isQuantityField(item.title) })}>
              <p className={styles.fieldText}>{item.title}</p>
              {item.element}
              {item.text && <p className={styles.fieldText}>{item.text}</p>}
            </div>
          ))}
        </Card>
      </div>

      {showSetBarCodeModal ? (
        <Modal openModal={showSetBarCodeModal} setOpenModal={onToggleSetBarCodeModal}>
          <SetBarcodeModal
            tmpCode={props.formFields.tmpBarCode}
            barCode={props.formFields.product?.barCode}
            onClickSaveBarcode={barCode => onChangeBarCode('tmpBarCode')(barCode)}
            onCloseModal={onToggleSetBarCodeModal}
          />
        </Modal>
      ) : null}
    </>
  )
})
