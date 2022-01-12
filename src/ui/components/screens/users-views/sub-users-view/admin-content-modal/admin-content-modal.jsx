import React, {useState} from 'react'

import {Container, Button, Typography, NativeSelect, Checkbox, Select, ListItemText, MenuItem} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {Field} from '@components/field'
import {AddOrEditUserPermissionsForm} from '@components/forms/add-or-edit-user-permissions-form'
import {Input} from '@components/input'
import {Modal} from '@components/modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './admin-content-modal.style'

const textConsts = getLocalizedTexts(texts, 'en').subUsersModalContent
const activeOptions = [
  {value: true, label: textConsts.activeOption},
  {value: false, label: textConsts.bannedOption},
]

export const AdminContentModal = observer(
  ({
    editUserFormFields,
    title,
    buttonLabel,
    onSubmit,
    onCloseModal,
    groupPermissions,
    singlePermissions,
    checkValidationNameOrEmail,
    changeNameAndEmail,
  }) => {
    const classNames = useClassNames()

    const [showPermissionModal, setShowPermissionModal] = useState(false)

    const renderPermissionBtn = (
      <Button
        disableElevation
        variant="contained"
        color="primary"
        onClick={() => setShowPermissionModal(!showPermissionModal)}
      >
        {textConsts.manageBtn}
      </Button>
    )

    const sourceFormFields = {
      active: editUserFormFields?.active || false,
      allowedRoles: (editUserFormFields?.allowedRoles === null ? [] : editUserFormFields?.allowedRoles) || [],
      email: editUserFormFields?.email || '',
      fba: editUserFormFields?.fba || false,
      canByMasterUser: editUserFormFields?.canByMasterUser || false,
      name: editUserFormFields?.name || '',
      rate: editUserFormFields?.rate || 0,
      role: editUserFormFields?.role || '',

      permissions: editUserFormFields?.permissions.map(perm => perm._id) || [],
      permissionGroups: editUserFormFields?.permissionGroups.map(permGroup => permGroup._id) || [],
    }

    const [formFields, setFormFields] = useState(sourceFormFields)

    console.log('formFields', formFields)

    const onChangeFormField = fieldName => event => {
      console.log('event', event)
      const newFormFields = {...formFields}
      if (fieldName === 'rate') {
        newFormFields[fieldName] = event.target.value.replace(/[-]/, '')
      } else if (['fba', 'canByMasterUser'].includes(fieldName)) {
        newFormFields[fieldName] = event.target.checked
      } else {
        newFormFields[fieldName] = event.target.value
      }

      if (fieldName === 'role' && fieldName === 'permissions' && fieldName === 'permissionGroups') {
        changeNameAndEmail.name = ''
        changeNameAndEmail.email = ''
      }

      if (fieldName === 'name') {
        changeNameAndEmail.name = event.target.value
      }

      if (fieldName === 'email') {
        changeNameAndEmail.email = event.target.value
      }

      setFormFields(newFormFields)
    }

    const onSubmitUserPermissionsForm = (permissions, permissionGroups) => {
      const newFormFields = {...formFields}
      newFormFields.permissions = permissions
      newFormFields.permissionGroups = permissionGroups
      setFormFields(newFormFields)
    }

    const selectedPermissions = singlePermissions.filter(per => formFields.permissions.includes(per._id))
    const selectedGroupPermissions = groupPermissions.filter(perGroup =>
      formFields.permissionGroups.includes(perGroup._id),
    )

    const isWrongPermissionsSelect =
      selectedPermissions.find(per => per.role !== Number(formFields.role)) ||
      selectedGroupPermissions.find(perGroup => perGroup.role !== Number(formFields.role))

    const disabledSubmitButton = formFields.name === '' || formFields.email === '' || formFields.rate === ''

    return (
      <Container disableGutters className={classNames.modalContainer}>
        <Typography paragraph variant="h3">
          {`${title} ${editUserFormFields.name}`}
        </Typography>

        <Field
          label={textConsts.name}
          error={checkValidationNameOrEmail.nameIsUnique && 'Пользователь с таким именем уже существует'}
          value={formFields.name}
          onChange={onChangeFormField('name')}
        />
        <Field
          label={textConsts.email}
          error={checkValidationNameOrEmail.emailIsUnique && 'Пользователь с таким email уже существует'}
          value={formFields.email}
          type="email"
          onChange={onChangeFormField('email')}
        />
        <Field label={textConsts.rate} value={formFields.rate} onChange={onChangeFormField('rate')} />
        <Field
          label={textConsts.role}
          error={isWrongPermissionsSelect && textConsts.isWrongPermissionsSelect}
          inputComponent={
            <NativeSelect
              input={<Input fullWidth />}
              variant="filled"
              value={formFields.role}
              onChange={onChangeFormField('role')}
            >
              {Object.keys(UserRoleCodeMap).map(userRoleCode => (
                <option
                  key={userRoleCode}
                  value={userRoleCode}
                  disabled={[UserRole.CANDIDATE, UserRole.ADMIN].includes(UserRoleCodeMap[userRoleCode])}
                >
                  {UserRoleCodeMap[userRoleCode]}
                </option>
              ))}
            </NativeSelect>
          }
        />

        <Field
          label={textConsts.allowedRoles}
          inputComponent={
            <Select
              multiple
              value={formFields.allowedRoles}
              renderValue={selected => selected.map(el => UserRoleCodeMap[el]).join(', ')}
              onChange={onChangeFormField('allowedRoles')}
            >
              {Object.keys(UserRoleCodeMap).map((role, index) => (
                <MenuItem
                  key={index}
                  value={Number(role)}
                  disabled={[UserRole.CANDIDATE, UserRole.ADMIN].includes(UserRoleCodeMap[role])}
                >
                  <Checkbox color="primary" checked={formFields.allowedRoles.includes(Number(role))} />
                  <ListItemText primary={UserRoleCodeMap[role]} />
                </MenuItem>
              ))}
            </Select>
          }
        />

        <Field
          label={textConsts.active}
          inputComponent={
            <NativeSelect
              input={<Input fullWidth />}
              variant="filled"
              value={formFields.active}
              onChange={onChangeFormField('active')}
            >
              {activeOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          }
        />
        <div className={classNames.checkboxWrapper}>
          <Checkbox color="primary" checked={formFields.fba} onChange={onChangeFormField('fba')} />
          <Typography className={classNames.checkboxLabel}>{textConsts.fba}</Typography>
        </div>

        <div className={classNames.checkboxWrapper}>
          <Checkbox
            color="primary"
            checked={formFields.canByMasterUser}
            onChange={onChangeFormField('canByMasterUser')}
          />
          <Typography className={classNames.checkboxLabel}>{textConsts.canByMasterUser}</Typography>
        </div>

        <Field label={textConsts.fieldSecurity} inputComponent={renderPermissionBtn} />

        {isWrongPermissionsSelect && (
          <Typography className={classNames.isWrongPermissionsSelectError}>
            {textConsts.isWrongPermissionsSelect}
          </Typography>
        )}

        <div className={classNames.buttonWrapper}>
          <Button
            disableElevation
            disabled={isWrongPermissionsSelect || disabledSubmitButton}
            variant="contained"
            color="primary"
            onClick={() => {
              onSubmit(formFields)
            }}
          >
            {buttonLabel}
          </Button>

          <Button
            disableElevation
            className={classNames.rightBtn}
            variant="contained"
            color="primary"
            onClick={() => {
              onCloseModal()
            }}
          >
            {textConsts.closeBtn}
          </Button>
        </div>
        <Modal openModal={showPermissionModal} setOpenModal={() => setShowPermissionModal(!showPermissionModal)}>
          <AddOrEditUserPermissionsForm
            permissionsToSelect={singlePermissions}
            permissionGroupsToSelect={groupPermissions}
            sourceData={formFields}
            onCloseModal={() => setShowPermissionModal(!showPermissionModal)}
            onSubmit={onSubmitUserPermissionsForm}
          />
        </Modal>
      </Container>
    )
  },
)
