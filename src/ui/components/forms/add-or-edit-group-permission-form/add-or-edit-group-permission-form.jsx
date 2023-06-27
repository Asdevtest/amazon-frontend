import { Typography, Tooltip, IconButton, MenuItem, Select, Input } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

import React, { useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { observer } from 'mobx-react'

import { mapUserRoleEnumToKey, UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'

import { checkIsPositiveNum } from '@utils/checks'
import { t } from '@utils/translations'

import { AddOrEditSinglePermissionForm } from '../add-or-edit-single-permission-form'
import { useClassNames } from './add-or-edit-group-permission-form.style'

export const AddOrEditGroupPermissionForm = observer(
  ({ onCloseModal, onSubmit, isEdit, permissionToEdit, singlePermissions, existingGroupPermissions }) => {
    const { classes: classNames } = useClassNames()

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
      } else if (fieldName === 'hierarchy' && !checkIsPositiveNum(event.target.value)) {
        return
      } else {
        newFormFields[fieldName] = event.target.value
      }

      setFormFields(newFormFields)
    }

    const curPermissions = singlePermissions.filter(el => formFields.permissions.includes(el._id))

    const handleSelectPermissionChange = event => {
      if (!event.target.value[event.target.value.length - 1] && event.target.value.length > 0) {
        return
      }

      const {
        target: { value },
      } = event
      const newFormFields = { ...formFields }
      newFormFields.permissions = typeof value === 'string' ? value.split(',') : value
      setFormFields(newFormFields)
    }

    const renderPermissionInfo = perm => (
      <div>
        <Typography>{t(TranslationKey.Key) + ':'}</Typography>
        <Typography>{perm.key}</Typography>

        <Typography>{t(TranslationKey.Description) + ':'}</Typography>
        <Typography>{perm.description}</Typography>

        <Typography>{t(TranslationKey['Allowed Endpoints']) + ':'}</Typography>
        {perm.allowedUrls.map((item, itemIndex) => (
          <div key={itemIndex}>
            <Typography>{item.url}</Typography>
            <Typography>{item.httpMethod}</Typography>
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
        <ListItemText className={classNames.standartText} primary={`${per.title}`} />
      </MenuItem>
    )

    return (
      <div className={classNames.root}>
        <Typography variant="h5" className={classNames.mainTitle}>
          {isEdit ? t(TranslationKey['Change permissions group']) : t(TranslationKey['New Permission Group'])}
        </Typography>

        <div className={classNames.form}>
          <Field
            label={t(TranslationKey.Role)}
            error={
              isWrongPermissionsSelect &&
              t(TranslationKey['The selected permissions and the current role do not match!'])
            }
            inputComponent={
              <Select
                variant="filled"
                value={formFields.role}
                className={classNames.standartText}
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
            placeholder={t(TranslationKey['Group №1'])}
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
            label={t(TranslationKey.Permissions)}
            error={
              isWrongPermissionsSelect &&
              t(TranslationKey['The selected permissions and the current role do not match!'])
            }
            inputComponent={
              <div className={classNames.allowPermissions}>
                <div>
                  <Typography className={classNames.permissionsSubTitle}>
                    {t(TranslationKey['Existing permissions:'])}
                  </Typography>

                  {curPermissions.map((el, index) => (
                    <Tooltip key={index} title={renderPermissionInfo(el)}>
                      <Typography className={classNames.singlePermission}>{`${el.title}`}</Typography>
                    </Tooltip>
                  ))}

                  <div className={classNames.selectWrapper}>
                    <Typography className={classNames.selectChoose}>
                      {t(TranslationKey['Select available:'])}
                    </Typography>
                    <Select
                      multiple
                      open={openSinglePermissions}
                      className={classNames.permissionSelect}
                      value={formFields.permissions}
                      renderValue={() => t(TranslationKey.Choose)}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 420,
                          },
                        },
                      }}
                      onOpen={() => setOpenSinglePermissions(!openSinglePermissions)}
                      onClose={() => setOpenSinglePermissions(!openSinglePermissions)}
                      onChange={handleSelectPermissionChange}
                    >
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.ADMIN]] && (
                        <ListSubheader className={classNames.listSubheader}>{UserRole.ADMIN}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.ADMIN]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.ADMIN]].map(per => renderMenuItem(per))}

                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.CLIENT]] && (
                        <ListSubheader className={classNames.listSubheader}>{UserRole.CLIENT}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.CLIENT]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.CLIENT]].map(per => renderMenuItem(per))}

                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.SUPERVISOR]] && (
                        <ListSubheader className={classNames.listSubheader}>{UserRole.SUPERVISOR}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.SUPERVISOR]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.SUPERVISOR]].map(per =>
                          renderMenuItem(per),
                        )}

                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.RESEARCHER]] && (
                        <ListSubheader className={classNames.listSubheader}>{UserRole.RESEARCHER}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.RESEARCHER]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.RESEARCHER]].map(per =>
                          renderMenuItem(per),
                        )}

                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.BUYER]] && (
                        <ListSubheader className={classNames.listSubheader}>{UserRole.BUYER}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.BUYER]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.BUYER]].map(per => renderMenuItem(per))}

                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.STOREKEEPER]] && (
                        <ListSubheader className={classNames.listSubheader}>{UserRole.STOREKEEPER}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.STOREKEEPER]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.STOREKEEPER]].map(per =>
                          renderMenuItem(per),
                        )}

                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.FREELANCER]] && (
                        <ListSubheader className={classNames.listSubheader}>{UserRole.FREELANCER}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.FREELANCER]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.FREELANCER]].map(per =>
                          renderMenuItem(per),
                        )}
                      <div className={classNames.selectModalBtnsWrapper}>
                        <Button
                          className={classNames.button}
                          color="primary"
                          variant="contained"
                          onClick={() => setOpenSinglePermissions(!openSinglePermissions)}
                        >
                          {t(TranslationKey.Close)}
                        </Button>

                        <Button
                          disabled={!curPermissions.length}
                          className={[classNames.button, classNames.resetBtn]}
                          color="primary"
                          variant="default"
                          onClick={() => onChangeField('permissions')({ target: { value: [] } })}
                        >
                          {t(TranslationKey.reset)}
                        </Button>
                      </div>
                    </Select>
                  </div>
                </div>

                <div>
                  <Typography className={classNames.permissionsSubTitle}>
                    {t(TranslationKey['Permissions will be created:'])}
                  </Typography>

                  {newSinglePermission.map((el, index) => (
                    <Tooltip key={index} title={renderPermissionInfo(el)}>
                      <div className={classNames.newSinglePermissionWrapper}>
                        <Typography className={classNames.singlePermission}>{`${el.title} (ключ: ${el.key}) (роль: ${
                          UserRoleCodeMap[el.role]
                        })`}</Typography>

                        <IconButton onClick={() => onRemovePermission(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </Tooltip>
                  ))}

                  <Button
                    disableElevation
                    color="primary"
                    variant="contained"
                    onClick={() => setShowAddOrEditSinglePermissionModal(!showAddOrEditSinglePermissionModal)}
                  >
                    {t(TranslationKey['Create New'])}
                  </Button>
                </div>
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
            onClick={() => onSubmit(formFields, newSinglePermission, permissionToEdit._id)}
          >
            {isEdit ? t(TranslationKey['Edit a group']) : t(TranslationKey['Create a group'])}
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
