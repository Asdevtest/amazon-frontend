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
  ({editUserFormFields, title, buttonLabel, onSubmit, onCloseModal, groupPermissions, singlePermissions}) => {
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
      name: editUserFormFields?.name || '',
      rate: editUserFormFields?.rate || 0,
      role: editUserFormFields?.role || '',

      permissions: editUserFormFields?.permissions.map(perm => perm._id) || [],
      permissionGroups: editUserFormFields?.permissionGroups.map(permGroup => permGroup._id) || [],
    }

    const [formFields, setFormFields] = useState(sourceFormFields)

    const onChangeFormField = fieldName => event => {
      const newFormFields = {...formFields}
      newFormFields[fieldName] = event.target.value
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

    return (
      <Container disableGutters className={classNames.modalContainer}>
        <Typography paragraph variant="h3">
          {`${title} ${editUserFormFields.name}`}
        </Typography>

        <Field label={textConsts.name} value={formFields.name} onChange={onChangeFormField('name')} />
        <Field label={textConsts.email} value={formFields.email} type="email" onChange={onChangeFormField('email')} />
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
                <option key={userRoleCode} value={userRoleCode}>
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
              {Object.keys(UserRoleCodeMap)
                .filter(role => UserRoleCodeMap[role] !== UserRole.CANDIDATE)
                .map((role, index) => (
                  <MenuItem key={index} value={Number(role)}>
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
          <Checkbox color="primary" value={formFields.fba} />
          <Typography className={classNames.checkboxLabel}>{textConsts.fba}</Typography>
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
            disabled={isWrongPermissionsSelect}
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
