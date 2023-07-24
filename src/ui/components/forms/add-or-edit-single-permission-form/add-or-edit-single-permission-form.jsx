import DeleteIcon from '@material-ui/icons/Delete'
import { observer } from 'mobx-react'
import React, { useState } from 'react'

import { IconButton, MenuItem, Select, Typography } from '@mui/material'

import { HttpMethod } from '@constants/keys/http-method'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'

import { checkIsPositiveNum } from '@utils/checks'
import { clearSpecialCharacters } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './add-or-edit-single-permission-form.style'

export const AddOrEditSinglePermissionForm = observer(
  ({ onCloseModal, onSubmit, isEdit, permissionToEdit, existingSinglePermissions }) => {
    const { classes: classNames } = useClassNames()

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
      } else if (fieldName === 'hierarchy' && !checkIsPositiveNum(event.target.value)) {
        return
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
      JSON.stringify(sourceFormFields) === JSON.stringify(formFields) ||
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
      <div className={classNames.root}>
        <Typography variant="h5" className={classNames.mainTitle}>
          {isEdit ? t(TranslationKey['Change permission']) : t(TranslationKey['New Permission'])}
        </Typography>

        <div className={classNames.form}>
          <Field
            label={t(TranslationKey.Role)}
            inputComponent={
              <Select
                variant="filled"
                value={formFields.role}
                input={<Input fullWidth />}
                onChange={onChangeField('role')}
              >
                <MenuItem value={'None'} className={classNames.selectOption}>
                  {'none'}
                </MenuItem>
                {Object.keys(UserRoleCodeMap).map((roleCode, index) => (
                  <MenuItem key={index} value={roleCode} className={classNames.selectOption}>
                    {UserRoleCodeMap[roleCode]}
                  </MenuItem>
                ))}
              </Select>
            }
          />

          <Field
            disabled={isEdit}
            label={t(TranslationKey.Key)}
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
            placeholder={t(TranslationKey['Permission №1'])}
            onChange={onChangeField('title')}
          />

          <Field
            multiline
            minRows={4}
            maxRows={4}
            className={classNames.descriptionField}
            label={t(TranslationKey.Description)}
            placeholder={t(TranslationKey.Description) + '...'}
            value={formFields.description}
            onChange={onChangeField('description')}
          />

          <Field
            label={t(TranslationKey.Position)}
            placeholder={t(TranslationKey['Priority number'])}
            value={formFields.hierarchy}
            onChange={onChangeField('hierarchy')}
          />

          <Field
            containerClasses={classNames.field}
            label={t(TranslationKey['Allowed Endpoints'])}
            inputComponent={
              <div className={classNames.allowUrlsWrapper}>
                {formFields.allowedUrls.map((obj, index) => (
                  <div key={index} className={classNames.urlInputWrapper}>
                    <Input
                      multiline
                      minRows={1}
                      maxRows={3}
                      className={classNames.urlInput}
                      value={formFields.allowedUrls[index].url}
                      placeholder={'example/example/example/:guid'}
                      onChange={onChangeField('allowedUrls', index, 'url')}
                    />
                    <Select
                      variant="filled"
                      value={formFields.allowedUrls[index].httpMethod}
                      input={<Input fullWidth />}
                      className={classNames.httpMethodSelect}
                      onChange={onChangeField('allowedUrls', index, 'httpMethod')}
                    >
                      <MenuItem value={'None'} className={classNames.selectOption}>
                        {'none'}
                      </MenuItem>
                      {Object.keys(HttpMethod).map((http, idx) => (
                        <MenuItem key={idx} value={http} className={classNames.selectOption}>
                          {HttpMethod[http]}
                        </MenuItem>
                      ))}
                    </Select>

                    <IconButton onClick={() => onRemovePermission(index)}>
                      <DeleteIcon className={classNames.deleteBtn} />
                    </IconButton>
                  </div>
                ))}

                <Button color="primary" variant="contained" onClick={() => addAllowUrl()}>
                  {'+'}
                </Button>
              </div>
            }
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            disableElevation
            disabled={disableSubmitBtn}
            color="primary"
            variant="contained"
            onClick={() => onSubmit(formFields, permissionToEdit && permissionToEdit._id)}
          >
            {isEdit ? t(TranslationKey.Edit) : t(TranslationKey['Create a permission'])}
          </Button>

          <Button
            disableElevation
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={() => onCloseModal()}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    )
  },
)
