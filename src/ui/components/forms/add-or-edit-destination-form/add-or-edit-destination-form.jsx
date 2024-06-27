import { observer } from 'mobx-react'
import { useState } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field/field'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './add-or-edit-destination-form.style'

export const AddOrEditDestinationForm = observer(
  ({ onCloseModal, onCreateSubmit, onEditSubmit, destinationToEdit, onClickAddBtn }) => {
    const { classes: styles } = useStyles()

    const sourceFormFields = {
      name: destinationToEdit?.name || '',
      country: destinationToEdit?.country || '',
      zipCode: destinationToEdit?.zipCode || '',
      city: destinationToEdit?.city || '',
      state: destinationToEdit?.state || '',
      address: destinationToEdit?.address || '',
    }

    const [formFields, setFormFields] = useState(sourceFormFields)

    const onChangeField = fieldName => event => {
      const newFormFields = { ...formFields }

      newFormFields[fieldName] = event.target.value

      setFormFields(newFormFields)
    }

    const onSubmit = () => {
      if (destinationToEdit) {
        onEditSubmit(formFields, destinationToEdit._id)
      } else {
        onCreateSubmit(formFields)
      }
    }

    const disableSubmitBtn =
      JSON.stringify(sourceFormFields) === JSON.stringify(formFields) ||
      formFields.name === '' ||
      formFields.address === '' ||
      formFields.country === '' ||
      formFields.city === '' ||
      formFields.state === '' ||
      formFields.zipCode === '' ||
      formFields.city === '' ||
      formFields.state === ''

    return (
      <div className={styles.root}>
        <Typography variant="h5" className={styles.standartText}>
          {destinationToEdit
            ? t(TranslationKey['Edit drop off location'])
            : t(TranslationKey['Add a new drop off location'])}
        </Typography>

        <div className={styles.form}>
          {destinationToEdit && (
            <Field
              label={t(TranslationKey.Account)}
              labelClasses={styles.label}
              inputComponent={
                <>
                  {destinationToEdit.storekeeper ? (
                    <UserLink
                      blackText
                      withAvatar
                      name={destinationToEdit.storekeeper?.name}
                      userId={destinationToEdit.storekeeper?._id}
                    />
                  ) : (
                    <Typography className={styles.standartText}>{t(TranslationKey.Missing)}</Typography>
                  )}
                </>
              }
            />
          )}

          <Field
            label={t(TranslationKey.Title)}
            labelClasses={styles.label}
            inputProps={{ maxLength: 255 }}
            value={formFields.name}
            placeholder={t(TranslationKey.Title) + '...'}
            onChange={onChangeField('name')}
          />

          <Field
            label={t(TranslationKey.Country)}
            labelClasses={styles.label}
            inputProps={{ maxLength: 255 }}
            value={formFields.country}
            placeholder={t(TranslationKey.Country) + '...'}
            onChange={onChangeField('country')}
          />

          <Field
            label={t(TranslationKey.City)}
            labelClasses={styles.label}
            inputProps={{ maxLength: 255 }}
            value={formFields.city}
            placeholder={t(TranslationKey.City) + '...'}
            onChange={onChangeField('city')}
          />

          <Field
            label={t(TranslationKey.State)}
            labelClasses={styles.label}
            inputProps={{ maxLength: 255 }}
            value={formFields.state}
            placeholder={t(TranslationKey.State) + '...'}
            onChange={onChangeField('state')}
          />

          <Field
            label={t(TranslationKey.Address)}
            labelClasses={styles.label}
            inputProps={{ maxLength: 255 }}
            value={formFields.address}
            placeholder={t(TranslationKey.Address) + '...'}
            onChange={onChangeField('address')}
          />

          <Field
            label={t(TranslationKey['ZIP code'])}
            labelClasses={styles.label}
            inputProps={{ maxLength: 64 }}
            value={formFields.zipCode}
            placeholder={t(TranslationKey['ZIP code']) + '...'}
            onChange={onChangeField('zipCode')}
          />
        </div>

        <div className={styles.footerWrapper}>
          <Button
            styleType={ButtonStyle.SUCCESS}
            tooltipInfoContent={t(TranslationKey['Add a new rate'])}
            className={styles.placeAddBtn}
            onClick={onClickAddBtn}
          >
            {t(TranslationKey.Add)}
          </Button>

          <div className={styles.btnsWrapper}>
            <Button styleType={ButtonStyle.SUCCESS} disabled={disableSubmitBtn} onClick={onSubmit}>
              {t(TranslationKey.Save)}
            </Button>

            <Button className={styles.button} styleType={ButtonStyle.CASUAL} onClick={onCloseModal}>
              {t(TranslationKey.Close)}
            </Button>
          </div>
        </div>
      </div>
    )
  },
)
