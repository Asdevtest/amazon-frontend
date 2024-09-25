import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'

import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './fields.style'

interface FieldsProps {
  formFields: IBox
  isClient: boolean
  isBuyer: boolean
  isEdit: boolean
  onChangeField: (field: keyof IBox) => (event: ChangeEvent<HTMLInputElement>) => void
}

export const Fields: FC<FieldsProps> = memo(props => {
  const { formFields, isClient, isBuyer, isEdit, onChangeField } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.wrapper}>
      <LabelWithCopy
        direction="column"
        labelWrapperStyles={styles.field}
        labelTitle="Shipping label"
        labelValue={formFields?.shippingLabel}
        lableLinkTitle={t(TranslationKey.View)}
      />
      <Field
        disabled={!isEdit || isBuyer}
        placeholder={t(TranslationKey['Not available'])}
        classes={{ input: styles.input }}
        inputClasses={styles.inputClasses}
        containerClasses={styles.field}
        labelClasses={cx(styles.text, styles.label)}
        inputProps={{ maxLength: 250 }}
        label={t(TranslationKey['Reference id'])}
        value={formFields?.referenceId || ''}
        onChange={onChangeField('referenceId')}
      />
      <Field
        disabled={!isEdit || isBuyer}
        placeholder={t(TranslationKey['Not available'])}
        classes={{ input: styles.input }}
        inputClasses={styles.inputClasses}
        containerClasses={styles.field}
        labelClasses={cx(styles.text, styles.label)}
        inputProps={{ maxLength: 250 }}
        label={'FBA number'}
        value={formFields?.fbaNumber || ''}
        onChange={onChangeField('fbaNumber')}
      />
      <Field
        disabled={isClient || isBuyer}
        placeholder={t(TranslationKey['Not available'])}
        classes={{ input: styles.input }}
        inputClasses={styles.inputClasses}
        containerClasses={styles.field}
        labelClasses={cx(styles.text, styles.label)}
        inputProps={{ maxLength: 250 }}
        label={'UPS Track number'}
        value={formFields?.upsTrackNumber || ''}
        onChange={onChangeField('upsTrackNumber')}
      />
      <Field
        disabled
        placeholder={t(TranslationKey['Not available'])}
        classes={{ input: styles.input }}
        inputClasses={styles.inputClasses}
        containerClasses={styles.field}
        labelClasses={cx(styles.text, styles.label)}
        label={t(TranslationKey['FBA Shipment'])}
        value={formFields?.fbaShipment || ''}
      />
    </div>
  )
})
