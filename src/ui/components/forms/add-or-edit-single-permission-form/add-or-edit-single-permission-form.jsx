import React, {useState} from 'react'

import {IconButton, NativeSelect, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {observer} from 'mobx-react'

import {HttpMethod} from '@constants/http-method'
import {texts} from '@constants/texts'
import {UserRoleCodeMap} from '@constants/user-roles'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {Input} from '@components/input'

import {checkIsPositiveNum} from '@utils/checks'
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
      const newFormFields = {...formFields}
      const addUrlToArray = newFormFields.allowedUrls.concat({
        url: '',
        httpMethod: '',
      })
      newFormFields.allowedUrls = addUrlToArray
      setFormFields(newFormFields)
    }

    const onRemovePermission = index => {
      const newFormFields = {...formFields}
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
            rowsMax={4}
            className={classNames.descriptionField}
            label={textConsts.descriptionLabel}
            placeholder={textConsts.descriptionHolder}
            value={formFields.description}
            onChange={onChangeField('description')}
          />

          <Field
            label={textConsts.hierarchyLabel}
            placeholder={textConsts.hierarchyHolder}
            value={formFields.hierarchy}
            onChange={onChangeField('hierarchy')}
          />

          <Field
            containerClasses={classNames.field}
            label={textConsts.allowUrlsLabel}
            inputComponent={
              <div className={classNames.allowUrlsWrapper}>
                {formFields.allowedUrls.map((obj, index) => (
                  <div key={index} className={classNames.urlInputWrapper}>
                    <Input
                      multiline
                      minRows={1}
                      rowsMax={3}
                      className={classNames.urlInput}
                      value={formFields.allowedUrls[index].url}
                      placeholder={textConsts.allowUrlsHolder}
                      onChange={onChangeField('allowedUrls', index, 'url')}
                    />
                    <NativeSelect
                      variant="filled"
                      value={formFields.allowedUrls[index].httpMethod}
                      input={<Input fullWidth />}
                      className={classNames.httpMethodSelect}
                      onChange={onChangeField('allowedUrls', index, 'httpMethod')}
                    >
                      <option value={'None'}>{textConsts.valueNone}</option>
                      {Object.keys(HttpMethod).map((http, idx) => (
                        <option key={idx} value={http}>
                          {HttpMethod[http]}
                        </option>
                      ))}
                    </NativeSelect>

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
