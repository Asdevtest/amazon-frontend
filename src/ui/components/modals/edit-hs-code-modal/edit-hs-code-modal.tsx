import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './edit-hs-code-modal.style'

import { EditHSCodeModalModel } from './edit-hs-code-modal.model'

interface EditHSCodeModalProps {
  productId?: string
  onCloseModal: () => void
  onUpdateData?: () => void
}

export const EditHSCodeModal: FC<EditHSCodeModalProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { productId, onUpdateData, onCloseModal } = props

  const viewModel = useMemo(() => new EditHSCodeModalModel({ productId, onCloseModal, onUpdateData }), [])

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['HS code'])}</p>

      <Field
        label="HS Code"
        className={styles.nameField}
        labelClasses={styles.label}
        containerClasses={styles.field}
        inputProps={{ maxLength: 255 }}
        // @ts-ignore
        value={viewModel.currentData?.hsCode}
        onChange={viewModel.onChangeField?.('hsCode')}
      />

      <Field
        multiline
        minRows={2}
        maxRows={2}
        label="产品中文品名"
        labelClasses={styles.label}
        className={styles.nameField}
        containerClasses={styles.field}
        inputProps={{ maxLength: 255 }}
        // @ts-ignore
        value={viewModel.currentData?.chinaTitle}
        onChange={viewModel.onChangeField?.('chinaTitle')}
      />

      <Field
        multiline
        minRows={2}
        maxRows={2}
        label={t(TranslationKey.Material)}
        className={styles.nameField}
        labelClasses={styles.label}
        containerClasses={styles.field}
        inputProps={{ maxLength: 255 }}
        // @ts-ignore
        value={viewModel.currentData?.material}
        onChange={viewModel.onChangeField?.('material')}
      />

      <Field
        multiline
        minRows={2}
        maxRows={2}
        label={t(TranslationKey['Product usage'])}
        className={styles.nameField}
        labelClasses={styles.label}
        containerClasses={styles.field}
        inputProps={{ maxLength: 255 }}
        // @ts-ignore
        value={viewModel.currentData?.productUsage}
        onChange={viewModel.onChangeField?.('productUsage')}
      />

      <div className={styles.buttons}>
        <CustomButton type="primary" onClick={viewModel.onSaveHSCode}>
          {t(TranslationKey.Save)}
        </CustomButton>
        <CustomButton onClick={onCloseModal}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
