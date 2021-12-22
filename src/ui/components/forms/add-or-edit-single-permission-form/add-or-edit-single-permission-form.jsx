import React, {useState} from 'react'

import {IconButton, NativeSelect, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRoleCodeMap} from '@constants/user-roles'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {clearSpecialCharacters} from '@utils/text'

import {useClassNames} from './add-or-edit-single-permission-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOrEditSinglePermissionForm

export const AddOrEditSinglePermissionForm = observer(
  ({onCloseModal, onSubmit, isEdit, permissionToEdit, existingSinglePermissions}) => {
    const classNames = useClassNames()

    const [onKeyFieldEditing, setOnKeyFieldEditing] = useState(false)

    const sourceFormFields = {
      key: permissionToEdit?.key || '',
      title: permissionToEdit?.title || '',
      description: permissionToEdit?.description || '',
      allowedUrl: permissionToEdit?.allowedUrl || [],
      role: permissionToEdit?.role === 0 ? 0 : permissionToEdit?.role || '',
    }

    const [formFields, setFormFields] = useState(sourceFormFields)

    const onChangeField = (fieldName, index) => event => {
      const newFormFields = {...formFields}

      if (fieldName === 'allowedUrl') {
        newFormFields[fieldName][index] = event.target.value
      } else {
        newFormFields[fieldName] = event.target.value
      }

      if (fieldName === 'key') {
        setOnKeyFieldEditing(true)
        newFormFields[fieldName] = clearSpecialCharacters(event.target.value)
      }
      setFormFields(newFormFields)
    }

    const addAllowUrl = () => {
      const newFormFields = {...formFields}
      const addUrlToArray = newFormFields.allowedUrl.concat('')
      newFormFields.allowedUrl = addUrlToArray
      setFormFields(newFormFields)
    }

    const onRemovePermission = index => {
      const newFormFields = {...formFields}
      const removeUrlFromArray = newFormFields.allowedUrl.filter(url => url !== newFormFields.allowedUrl[index])
      newFormFields.allowedUrl = removeUrlFromArray
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
      !formFields.allowedUrl[0] ||
      formFields.role === 'None' ||
      isDoubleKey

    return (
      <div className={classNames.root}>
        <Typography variant="h5">{isEdit ? textConsts.editTitle : textConsts.addTitle}</Typography>

        <div className={classNames.form}>
          <Field
            label={textConsts.roleLabel}
            inputComponent={
              <NativeSelect
                variant="filled"
                value={formFields.role}
                input={<Input fullWidth />}
                onChange={onChangeField('role')}
              >
                <option value={'None'}>{textConsts.valueNone}</option>
                {Object.keys(UserRoleCodeMap).map((roleCode, index) => (
                  <option key={index} value={roleCode}>
                    {UserRoleCodeMap[roleCode]}
                  </option>
                ))}
              </NativeSelect>
            }
          />

          <Field
            disabled={isEdit}
            label={textConsts.keyLabel}
            value={formFields.key}
            placeholder={textConsts.keyHolder}
            error={
              (formFields.key.match(/[_]/) === null && onKeyFieldEditing && textConsts.keyFieldError) ||
              (isDoubleKey && textConsts.doubleKeyError)
            }
            onChange={onChangeField('key')}
          />

          <Field
            label={textConsts.titleLabel}
            value={formFields.title}
            placeholder={textConsts.titleHolder}
            onChange={onChangeField('title')}
          />

          <Field
            multiline
            minRows={4}
            rowsMax={6}
            className={classNames.descriptionField}
            label={textConsts.descriptionLabel}
            placeholder={textConsts.descriptionHolder}
            value={formFields.description}
            onChange={onChangeField('description')}
          />

          <Field
            containerClasses={classNames.field}
            label={textConsts.allowUrlsLabel}
            inputComponent={
              <div className={classNames.allowUrlsWrapper}>
                {formFields.allowedUrl.map((url, index) => (
                  <div key={index} className={classNames.urlInputWrapper}>
                    <Input
                      multiline
                      minRows={1}
                      rowsMax={3}
                      className={classNames.urlInput}
                      value={url}
                      placeholder={textConsts.allowUrlsHolder}
                      onChange={onChangeField('allowedUrl', index)}
                    />

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

        <Button
          disableElevation
          disabled={disableSubmitBtn}
          color="primary"
          variant="contained"
          onClick={() => onSubmit(formFields, permissionToEdit && permissionToEdit._id)}
        >
          {isEdit ? textConsts.editBtn : textConsts.createBtn}
        </Button>

        <Button
          disableElevation
          className={classNames.button}
          color="primary"
          variant="contained"
          onClick={() => onCloseModal()}
        >
          {textConsts.cancelBtn}
        </Button>
      </div>
    )
  },
)
