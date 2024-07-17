import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './edit-hs-code-modal.style'

import { EditHSCodeModalModel } from './edit-hs-code-modal.model'

interface EditHSCodeModalProps {
  productId: string
  onCloseModal: () => void
  handleUpdateData?: () => void
}

export const EditHSCodeModal: FC<EditHSCodeModalProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { productId, handleUpdateData, onCloseModal } = props

  const [viewModel] = useState(() => new EditHSCodeModalModel({ productId, onCloseModal, handleUpdateData }))

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>HS Code</p>

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
        <Button styleType={ButtonStyle.SUCCESS} onClick={viewModel.handleSaveHSCode}>
          {t(TranslationKey.Save)}
        </Button>
        <Button styleType={ButtonStyle.CASUAL} onClick={onCloseModal}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
})
