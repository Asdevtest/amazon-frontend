import { observer } from 'mobx-react'
import { useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './add-or-edit-shop-form.style'

export const AddOrEditShopForm = observer(({ onCloseModal, onSubmit, shopToEdit }) => {
  const { classes: styles, cx } = useStyles()

  const sourceFormFields = {
    name: shopToEdit?.name || '',
    sellerBoardWarehouseReportUrlDaily: shopToEdit?.sellerBoardWarehouseReportUrlDaily || '',
    sellerBoardWarehouseReportUrlMonthly: shopToEdit?.sellerBoardWarehouseReportUrlMonthly || '',
    reportAccountUrl: shopToEdit?.reportAccountUrl || '',
  }

  const [formFields, setFormFields] = useState(sourceFormFields)

  const onChangeField = fieldName => event => {
    const newFormFields = { ...formFields }

    newFormFields[fieldName] = event.target.value

    setFormFields(newFormFields)
  }

  const disableSubmitBtn =
    JSON.stringify(sourceFormFields) === JSON.stringify(formFields) ||
    !formFields?.name ||
    !formFields?.sellerBoardWarehouseReportUrlDaily ||
    !formFields?.sellerBoardWarehouseReportUrlMonthly

  return (
    <div className={styles.root}>
      <Typography className={styles.title}>{t(TranslationKey['Add shop'])}</Typography>

      <Field
        withCopy
        labelClasses={styles.label}
        containerClasses={styles.containerField}
        tooltipInfoContent={t(TranslationKey['Enter store name'])}
        className={styles.descriptionField}
        label={t(TranslationKey.Title) + '*'}
        value={formFields.name}
        placeholder={t(TranslationKey['Store name'])}
        onChange={onChangeField('name')}
      />

      <Field
        withCopy
        labelClasses={styles.label}
        containerClasses={styles.containerField}
        tooltipInfoContent={t(TranslationKey['Insert the link to the sellerboard report'])}
        className={styles.descriptionField}
        placeholder={t(TranslationKey.Link)}
        label={t(TranslationKey['Warehouse report']) + '*'}
        value={formFields.sellerBoardWarehouseReportUrlDaily}
        onChange={onChangeField('sellerBoardWarehouseReportUrlDaily')}
      />

      <Field
        withCopy
        labelClasses={styles.label}
        containerClasses={styles.containerField}
        className={styles.descriptionField}
        tooltipInfoContent={t(TranslationKey['Insert the link to the sellerboard report'])}
        label={t(TranslationKey['Dashboard by goods/days']) + '*'}
        placeholder={t(TranslationKey.Link)}
        value={formFields.sellerBoardWarehouseReportUrlMonthly}
        onChange={onChangeField('sellerBoardWarehouseReportUrlMonthly')}
      />

      <Field
        withCopy
        labelClasses={styles.label}
        containerClasses={styles.containerField}
        className={styles.descriptionField}
        label={t(TranslationKey['Account report'])}
        placeholder={t(TranslationKey.Link)}
        value={formFields.reportAccountUrl}
        onChange={onChangeField('reportAccountUrl')}
      />

      <div className={styles.buttonsWrapper}>
        <Button
          tooltipInfoContent={t(TranslationKey['Create/edit a store based on the data you entered'])}
          disabled={disableSubmitBtn}
          className={styles.button}
          onClick={() => onSubmit(formFields, shopToEdit && shopToEdit._id)}
        >
          {t(TranslationKey.Save)}
        </Button>

        <Button
          tooltipInfoContent={t(TranslationKey['Closes the store creation/editing window without saving'])}
          variant={ButtonVariant.OUTLINED}
          className={cx(styles.button, styles.cancelBtn)}
          onClick={() => onCloseModal()}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
