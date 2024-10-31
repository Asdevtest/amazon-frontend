import isEqual from 'lodash.isequal'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'

import { MenuItem, Select } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'

import { checkIsPositiveNum } from '@utils/checks'
import { clearSpecialCharacters } from '@utils/text'
import { t } from '@utils/translations'

import '@typings/enums/button-style'
import { HttpMethods } from '@typings/enums/http'

import { useStyles } from './add-or-edit-single-permission-form.style'

export const AddOrEditSinglePermissionForm = observer(
  ({ onCloseModal, onSubmit, isEdit, permissionToEdit, existingSinglePermissions }) => {
    const { classes: styles, cx } = useStyles()
    const [onKeyFieldEditing, setOnKeyFieldEditing] = useState(false)

    const sourceFormFields = {
      key: permissionToEdit?.key || '',
      title: permissionToEdit?.title || '',
      description: permissionToEdit?.description || '',
      allowedUrls: permissionToEdit?.allowedUrls || [],
      role: permissionToEdit?.role === 0 ? 0 : permissionToEdit?.role || '',
      hierarchy: permissionToEdit?.hierarchy === 0 ? 0 : permissionToEdit?.hierarchy || 1,
    }

    const [formFields, setFormFields] = useState(sourceFormFields)

    const onChangeField = (fieldName, index, type) => event => {
      const newFormFields = JSON.parse(JSON.stringify(formFields))

      if (fieldName === 'allowedUrls') {
        newFormFields[fieldName][index][type] = event.target.value
      } else if (fieldName === 'key') {
        setOnKeyFieldEditing(true)
        newFormFields[fieldName] = clearSpecialCharacters(event.target.value)
      } else if (fieldName === 'hierarchy') {
        const value = event.target.value
        if (!checkIsPositiveNum(value) || Number(value) > 200) {
          return
        }
        newFormFields[fieldName] = value
      } else {
        newFormFields[fieldName] = event.target.value
      }

      setFormFields(newFormFields)
    }

    const addAllowUrl = () => {
      const newFormFields = { ...formFields }
      const addUrlToArray = newFormFields.allowedUrls.concat({
        url: '',
        httpMethod: '',
      })
      newFormFields.allowedUrls = addUrlToArray
      setFormFields(newFormFields)
    }

    const onRemovePermission = index => {
      const newFormFields = { ...formFields }
      const removeUrlFromArray = newFormFields.allowedUrls.filter(url => url !== newFormFields.allowedUrls[index])
      newFormFields.allowedUrls = removeUrlFromArray
      setFormFields(newFormFields)
    }

    const existingSinglePermissionsKeys = permissionToEdit
      ? existingSinglePermissions.map(per => per.key).filter(key => key !== permissionToEdit.key)
      : existingSinglePermissions.map(per => per.key)

    const isDoubleKey = existingSinglePermissionsKeys.includes(formFields.key)

    const disableSubmitBtn =
      isEqual(sourceFormFields, formFields) ||
      formFields.key === '' ||
      formFields.key.match(/[_]/) === null ||
      formFields.title === '' ||
      formFields.description === '' ||
      (formFields.allowedUrls.length &&
        (!formFields?.allowedUrls[formFields?.allowedUrls.length - 1]?.url ||
          formFields?.allowedUrls[formFields?.allowedUrls.length - 1]?.httpMethod === 'None' ||
          !formFields?.allowedUrls[formFields?.allowedUrls.length - 1]?.httpMethod)) ||
      formFields.role === 'None' ||
      isDoubleKey

    return (
      <div className={styles.root}>
        <p className={styles.title}>
          {isEdit ? t(TranslationKey['Change permission']) : t(TranslationKey['New Permission'])}
        </p>

        <Field
          label={t(TranslationKey.Role)}
          labelClasses={styles.label}
          containerClasses={styles.field}
          inputComponent={
            <Select
              variant="filled"
              value={formFields.role}
              className={styles.input}
              input={<Input fullWidth />}
              onChange={onChangeField('role')}
            >
              <MenuItem value="None" className={styles.input}>
                {'none'}
              </MenuItem>
              {Object.keys(UserRoleCodeMap).map((roleCode, index) => (
                <MenuItem key={index} value={roleCode} className={styles.input}>
                  {UserRoleCodeMap[roleCode]}
                </MenuItem>
              ))}
            </Select>
          }
        />

        <Field
          disabled={isEdit}
          label={t(TranslationKey.Key)}
          labelClasses={styles.label}
          inputClasses={styles.input}
          containerClasses={styles.field}
          value={formFields.key}
          placeholder={`${t(TranslationKey.Key)}_${t(TranslationKey.Key)}_${t(TranslationKey.Key)}...`}
          error={
            (formFields.key.match(/[_]/) === null &&
              onKeyFieldEditing &&
              t(TranslationKey['The value must contain "_"'])) ||
            (isDoubleKey && t(TranslationKey['The key already exists']))
          }
          onChange={onChangeField('key')}
        />

        <Field
          label={t(TranslationKey.Title)}
          value={formFields.title}
          labelClasses={styles.label}
          inputClasses={styles.input}
          containerClasses={styles.field}
          placeholder={t(TranslationKey['Permission №1'])}
          onChange={onChangeField('title')}
        />

        <Field
          multiline
          minRows={3}
          maxRows={3}
          labelClasses={styles.label}
          containerClasses={styles.field}
          className={cx(styles.descriptionField, styles.input)}
          label={t(TranslationKey.Description)}
          placeholder={t(TranslationKey.Description) + '...'}
          value={formFields.description}
          onChange={onChangeField('description')}
        />

        <Field
          label={t(TranslationKey.Position)}
          labelClasses={styles.label}
          inputClasses={styles.input}
          containerClasses={styles.field}
          placeholder={t(TranslationKey['Priority number'])}
          value={formFields.hierarchy}
          onChange={onChangeField('hierarchy')}
        />

        <Field
          labelClasses={styles.label}
          containerClasses={styles.field}
          label={t(TranslationKey['Allowed Endpoints'])}
          inputComponent={
            <>
              <div className={styles.allowUrls}>
                {formFields.allowedUrls.map((allowedUrl, index) => (
                  <div key={index} className={styles.urlInputWrapper}>
                    <Input
                      className={cx(styles.input, styles.urlInput)}
                      value={allowedUrl.url}
                      placeholder={'example/example/example/:guid'}
                      onChange={onChangeField('allowedUrls', index, 'url')}
                    />
                    <Select
                      variant="filled"
                      value={allowedUrl.httpMethod}
                      input={<Input />}
                      className={cx(styles.input, styles.httpMethodSelect)}
                      onChange={onChangeField('allowedUrls', index, 'httpMethod')}
                    >
                      <MenuItem value="None" className={styles.input}>
                        {'none'}
                      </MenuItem>
                      {Object.values(HttpMethods).map((method, index) => (
                        <MenuItem key={index} value={method} className={styles.input}>
                          {method}
                        </MenuItem>
                      ))}
                    </Select>

                    <CustomButton
                      danger
                      type="primary"
                      icon={<MdDeleteOutline size={24} />}
                      onClick={() => onRemovePermission(index)}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.buttonContainer}>
                <CustomButton icon={<FiPlus size={16} />} onClick={addAllowUrl} />
              </div>
            </>
          }
        />

        <div className={styles.buttons}>
          <CustomButton
            disabled={disableSubmitBtn}
            onClick={() => onSubmit(formFields, permissionToEdit && permissionToEdit._id)}
          >
            {isEdit ? t(TranslationKey.Edit) : t(TranslationKey['Create a permission'])}
          </CustomButton>

          <CustomButton onClick={onCloseModal}>{t(TranslationKey.Close)}</CustomButton>
        </div>
      </div>
    )
  },
)
