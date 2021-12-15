import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import React, {useState} from 'react'

import {Typography, Tooltip, IconButton, NativeSelect, Input} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {mapUserRoleEnumToKey, UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {Modal} from '@components/modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {AddOrEditSinglePermissionForm} from '../add-or-edit-single-permission-form'
import {useClassNames} from './add-or-edit-group-permission-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOrEditGroupPermissionForm

export const AddOrEditGroupPermissionForm = observer(
  ({onCloseModal, onSubmit, isEdit, permissionToEdit, singlePermissions}) => {
    const classNames = useClassNames()

    const objectSinglePermissions = singlePermissions.reduce(
      (prev, item) => ({...prev, [item.role]: prev[item.role] ? [...prev[item.role], item] : [item]}),
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
      const newFormFields = {...formFields}
      newFormFields[fieldName] = event.target.value
      if (fieldName === 'key') {
        setOnKeyFieldEditing(true)
        newFormFields[fieldName] = event.target.value.replace(/[{}"!@#$%^&*()+=;:`~|'?/.><, ]/, '')
      }
      setFormFields(newFormFields)
    }

    const curPermissions = singlePermissions.filter(el => formFields.permissions.includes(el._id))

    const handleSelectPermissionChange = event => {
      const {
        target: {value},
      } = event
      const newFormFields = {...formFields}
      newFormFields.permissions = typeof value === 'string' ? value.split(',') : value
      setFormFields(newFormFields)
    }

    const renderPermissionInfo = perm => (
      <div>
        <Typography>{textConsts.keyPermInfo}</Typography>
        <Typography>{perm.key}</Typography>

        <Typography>{textConsts.descriptionPermInfo}</Typography>
        <Typography>{perm.description}</Typography>

        <Typography>{textConsts.allowedUrlPermInfo}</Typography>
        {perm.allowedUrl.map((item, itemIndex) => (
          <div key={itemIndex}>
            <Typography>{item}</Typography>
          </div>
        ))}
      </div>
    )

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
      isWrongPermissionsSelect

    const renderMenuItem = per => (
      <MenuItem key={per._id} value={per._id}>
        <Checkbox checked={formFields.permissions.includes(per._id)} />
        <ListItemText primary={`${per.title} (ключ: ${per.key})`} />
      </MenuItem>
    )

    return (
      <div className={classNames.root}>
        <Typography variant="h5">{isEdit ? textConsts.editTitle : textConsts.addTitle}</Typography>

        <div className={classNames.form}>
          <Field
            label={textConsts.roleLabel}
            error={isWrongPermissionsSelect && textConsts.isWrongPermissionsSelect}
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
            error={formFields.key.match(/[_]/) === null && onKeyFieldEditing && textConsts.keyFieldError}
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
            label={textConsts.allowPermissions}
            error={isWrongPermissionsSelect && textConsts.isWrongPermissionsSelect}
            inputComponent={
              <div className={classNames.allowPermissions}>
                <div>
                  <Typography className={classNames.permissionsSubTitle}>{textConsts.currentPermissions}</Typography>

                  {curPermissions.map((el, index) => (
                    <Tooltip key={index} title={renderPermissionInfo(el)}>
                      <Typography className={classNames.singlePermission}>{`${el.title} (ключ: ${el.key})`}</Typography>
                    </Tooltip>
                  ))}

                  <div className={classNames.selectWrapper}>
                    <Typography className={classNames.selectChoose}>{textConsts.selectChooseTitle}</Typography>
                    <Select
                      multiple
                      open={openSinglePermissions}
                      className={classNames.permissionSelect}
                      value={formFields.permissions}
                      renderValue={() => textConsts.choose}
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
                        <ListSubheader>{UserRole.ADMIN}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.ADMIN]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.ADMIN]].map(per => renderMenuItem(per))}

                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.CLIENT]] && (
                        <ListSubheader>{UserRole.CLIENT}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.CLIENT]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.CLIENT]].map(per => renderMenuItem(per))}

                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.SUPERVISOR]] && (
                        <ListSubheader>{UserRole.SUPERVISOR}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.SUPERVISOR]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.SUPERVISOR]].map(per =>
                          renderMenuItem(per),
                        )}

                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.RESEARCHER]] && (
                        <ListSubheader>{UserRole.RESEARCHER}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.RESEARCHER]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.RESEARCHER]].map(per =>
                          renderMenuItem(per),
                        )}

                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.BUYER]] && (
                        <ListSubheader>{UserRole.BUYER}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.BUYER]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.BUYER]].map(per => renderMenuItem(per))}

                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.STOREKEEPER]] && (
                        <ListSubheader>{UserRole.STOREKEEPER}</ListSubheader>
                      )}
                      {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.STOREKEEPER]] &&
                        objectSinglePermissions[mapUserRoleEnumToKey[UserRole.STOREKEEPER]].map(per =>
                          renderMenuItem(per),
                        )}
                      <div>
                        <Button
                          disableElevation
                          className={classNames.button}
                          color="primary"
                          variant="contained"
                          onClick={() => setOpenSinglePermissions(!openSinglePermissions)}
                        >
                          {textConsts.closeBtn}
                        </Button>

                        <Button
                          disableElevation
                          className={classNames.button}
                          color="primary"
                          variant="default"
                          onClick={() => onChangeField('permissions')({target: {value: []}})}
                        >
                          {textConsts.clearBtn}
                        </Button>
                      </div>
                    </Select>
                  </div>
                </div>

                <div>
                  <Typography className={classNames.permissionsSubTitle}>
                    {textConsts.permissionsWillbeCreated}
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
                    {textConsts.addNewPermBtn}
                  </Button>
                </div>
              </div>
            }
          />
        </div>

        <Button
          disableElevation
          disabled={disableSubmitBtn}
          color="primary"
          variant="contained"
          onClick={() => onSubmit(formFields, newSinglePermission, permissionToEdit._id)}
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

        <Modal
          openModal={showAddOrEditSinglePermissionModal}
          setOpenModal={() => setShowAddOrEditSinglePermissionModal(!showAddOrEditSinglePermissionModal)}
        >
          <AddOrEditSinglePermissionForm
            singlePermissions={singlePermissions}
            onCloseModal={() => setShowAddOrEditSinglePermissionModal(!showAddOrEditSinglePermissionModal)}
            onSubmit={onAddNewSinglePermissionSubmit}
          />
        </Modal>
      </div>
    )
  },
)
