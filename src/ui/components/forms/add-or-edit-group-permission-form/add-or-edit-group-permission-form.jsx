import { observer } from 'mobx-react'
import { useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'

import { IconButton, Input, MenuItem, Select, Tooltip } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

import { UserRole, UserRoleCodeMap, UserRolePrettyMap, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomButton } from '@components/shared/custom-button'
import { CustomSelect } from '@components/shared/custom-select'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'

import { checkIsPositiveNum } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './add-or-edit-group-permission-form.style'

import { AddOrEditSinglePermissionForm } from '../add-or-edit-single-permission-form'

export const AddOrEditGroupPermissionForm = observer(
  ({ onCloseModal, onSubmit, isEdit, permissionToEdit, singlePermissions, existingGroupPermissions }) => {
    const { classes: styles, cx } = useStyles()

    const objectSinglePermissions = singlePermissions.reduce(
      (prev, item) => ({ ...prev, [item.role]: prev[item.role] ? [...prev[item.role], item] : [item] }),
      {},
    )

    const [onKeyFieldEditing, setOnKeyFieldEditing] = useState(false)
    const [openSinglePermissions, setOpenSinglePermissions] = useState(false)

    const sourceFormFields = {
      key: permissionToEdit?.key || '',
      title: permissionToEdit?.title || '',
      description: permissionToEdit?.description || '',
      permissions: permissionToEdit?.permissions?.map(el => el._id) || [],
      role: permissionToEdit?.role === 0 ? 0 : permissionToEdit?.role || '',
      hierarchy: permissionToEdit?.hierarchy === 0 ? 0 : permissionToEdit?.hierarchy || 1,
    }
    const [formFields, setFormFields] = useState(sourceFormFields)

    const [showAddOrEditSinglePermissionModal, setShowAddOrEditSinglePermissionModal] = useState(false)

    const [newSinglePermission, setNewSinglePermission] = useState([])

    const onAddNewSinglePermissionSubmit = data => {
      setNewSinglePermission([...newSinglePermission, data])
      setShowAddOrEditSinglePermissionModal(!showAddOrEditSinglePermissionModal)
    }

    const onRemovePermission = index => {
      const newFormFields = [...newSinglePermission]
      newFormFields.splice(index, 1)

      setNewSinglePermission(newFormFields)
    }

    const onChangeField = fieldName => event => {
      const newFormFields = { ...formFields }
      newFormFields[fieldName] = event.target.value

      if (fieldName === 'key') {
        setOnKeyFieldEditing(true)
        newFormFields[fieldName] = event.target.value.replace(/[{}"!@#$%^&*()+=;:`~|'?/.><, ]/, '')
      } else if ((fieldName === 'hierarchy' && !checkIsPositiveNum(event.target.value)) || event.target.value > 200) {
        return
      } else {
        newFormFields[fieldName] = event.target.value
      }

      setFormFields(newFormFields)
    }

    const curPermissions = singlePermissions.filter(el => formFields.permissions.includes(el._id))

    const handleSelectPermissionChange = value => {
      if (!value[value.length - 1] && value.length > 0) {
        return
      }

      const newFormFields = { ...formFields }
      newFormFields.permissions = typeof value === 'string' ? value.split(',') : value
      setFormFields(newFormFields)
    }

    const renderPermissionInfo = perm => (
      <div className={styles.permissionInfoWrapper}>
        <p>{t(TranslationKey.Key) + ':'}</p>
        <p>{perm.key}</p>

        <p>{t(TranslationKey.Description) + ':'}</p>
        <p>{perm.description}</p>

        <p>{t(TranslationKey['Allowed Endpoints']) + ':'}</p>
        {perm.allowedUrls.map((item, itemIndex) => (
          <div key={itemIndex}>
            <p>{item.url}</p>
            <p>{item.httpMethod}</p>
          </div>
        ))}
      </div>
    )

    const existingSinglePermissionsKeys = permissionToEdit
      ? existingGroupPermissions.map(per => per.key).filter(key => key !== permissionToEdit.key)
      : existingGroupPermissions.map(per => per.key)

    const isDoubleKey = existingSinglePermissionsKeys.includes(formFields.key)

    const selectedPermissions = singlePermissions.filter(per => formFields.permissions.includes(per._id))

    const isWrongPermissionsSelect =
      selectedPermissions.find(per => Number(per.role) !== Number(formFields.role)) ||
      newSinglePermission.find(perGroup => Number(perGroup.role) !== Number(formFields.role))

    const disableSubmitBtn =
      (JSON.stringify(sourceFormFields) === JSON.stringify(formFields) && !newSinglePermission[0]) ||
      formFields.key === '' ||
      formFields.key.match(/[_]/) === null ||
      formFields.title === '' ||
      formFields.description === '' ||
      formFields.role === 'None' ||
      isWrongPermissionsSelect ||
      isDoubleKey

    const renderMenuItem = per => (
      <MenuItem key={per._id} value={per._id}>
        <Checkbox checked={formFields.permissions.includes(per._id)} />
        <ListItemText className={styles.standartText} primary={`${per.title}`} />
      </MenuItem>
    )

    const getSelectRoleConfig = permissions =>
      permissions?.map(permission => ({
        label: permission?.title,
        value: permission?._id,
      }))

    const selectConfig = Object.keys(objectSinglePermissions)?.map(role => {
      const roleTitle = UserRolePrettyMap[role]

      return {
        label: roleTitle,
        title: roleTitle,
        options: getSelectRoleConfig(objectSinglePermissions[role]),
      }
    })

    return (
      <div className={styles.root}>
        <p className={styles.mainTitle}>
          {isEdit ? t(TranslationKey['Change permissions group']) : t(TranslationKey['New Permission Group'])}
        </p>

        <div className={styles.form}>
          <Field
            label={t(TranslationKey.Role)}
            labelClasses={styles.fieldLabel}
            error={
              isWrongPermissionsSelect &&
              t(TranslationKey['The selected permissions and the current role do not match!'])
            }
            inputComponent={
              <Select
                variant="filled"
                value={formFields.role}
                className={styles.standartText}
                input={<Input fullWidth />}
                onChange={onChangeField('role')}
              >
                <MenuItem value={'None'}>{'none'}</MenuItem>
                {Object.keys(UserRoleCodeMap).map((roleCode, index) => (
                  <MenuItem key={index} value={roleCode}>
                    {UserRoleCodeMap[roleCode]}
                  </MenuItem>
                ))}
              </Select>
            }
          />

          <Field
            disabled={isEdit}
            label={t(TranslationKey.Key)}
            labelClasses={styles.fieldLabel}
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
            labelClasses={styles.fieldLabel}
            placeholder={t(TranslationKey['Group №1'])}
            onChange={onChangeField('title')}
          />

          <Field
            multiline
            minRows={4}
            maxRows={4}
            labelClasses={styles.fieldLabel}
            className={styles.descriptionField}
            label={t(TranslationKey.Description)}
            placeholder={t(TranslationKey.Description) + '...'}
            value={formFields.description}
            onChange={onChangeField('description')}
          />

          <Field
            label={t(TranslationKey.Position)}
            labelClasses={styles.fieldLabel}
            placeholder={t(TranslationKey['Priority number'])}
            value={formFields.hierarchy}
            onChange={onChangeField('hierarchy')}
          />

          <Field
            containerClasses={styles.field}
            labelClasses={styles.fieldLabel}
            label={t(TranslationKey.Permissions)}
            error={
              isWrongPermissionsSelect &&
              t(TranslationKey['The selected permissions and the current role do not match!'])
            }
            inputComponent={
              <div className={styles.allowPermissions}>
                <CustomSelect
                  mode="multiple"
                  label="Select available:"
                  value={formFields.permissions}
                  labelClassName={styles.permissionsSubTitle}
                  className={styles.permissionSelect}
                  filterOption={(input, option) =>
                    (option?.label || '')?.toLowerCase?.()?.includes?.(input?.toLowerCase?.())
                  }
                  options={selectConfig}
                  dropdownRender={menu => (
                    <div>
                      {menu}

                      <div className={styles.selectModalBtnsWrapper}>
                        <CustomButton
                          danger
                          disabled={!curPermissions.length}
                          onClick={() => onChangeField('permissions')({ target: { value: [] } })}
                        >
                          {t(TranslationKey.Reset)}
                        </CustomButton>
                      </div>
                    </div>
                  )}
                  onChange={handleSelectPermissionChange}
                />

                <div>
                  <p className={styles.permissionsSubTitle}>{t(TranslationKey['Permissions will be created:'])}</p>

                  {newSinglePermission.map((el, index) => (
                    <Tooltip key={index} title={renderPermissionInfo(el)}>
                      <div className={styles.newSinglePermissionWrapper}>
                        <p className={styles.singlePermission}>{`${el.title} (ключ: ${el.key}) (роль: ${
                          UserRoleCodeMap[el.role]
                        })`}</p>

                        <IconButton onClick={() => onRemovePermission(index)}>
                          <MdDeleteOutline size={24} />
                        </IconButton>
                      </div>
                    </Tooltip>
                  ))}

                  <Button
                    disableElevation
                    onClick={() => setShowAddOrEditSinglePermissionModal(!showAddOrEditSinglePermissionModal)}
                  >
                    {t(TranslationKey['Create New'])}
                  </Button>
                </div>
              </div>
            }
          />
        </div>

        <div className={styles.buttonsWrapper}>
          <Button
            disabled={disableSubmitBtn}
            onClick={() => onSubmit(formFields, permissionToEdit._id, newSinglePermission)}
          >
            {isEdit ? t(TranslationKey['Edit a group']) : t(TranslationKey['Create a group'])}
          </Button>

          <Button styleType={ButtonStyle.CASUAL} onClick={onCloseModal}>
            {t(TranslationKey.Close)}
          </Button>
        </div>

        <Modal
          openModal={showAddOrEditSinglePermissionModal}
          setOpenModal={() => setShowAddOrEditSinglePermissionModal(!showAddOrEditSinglePermissionModal)}
        >
          <AddOrEditSinglePermissionForm
            existingSinglePermissions={singlePermissions}
            onCloseModal={() => setShowAddOrEditSinglePermissionModal(!showAddOrEditSinglePermissionModal)}
            onSubmit={onAddNewSinglePermissionSubmit}
          />
        </Modal>
      </div>
    )
  },
)
