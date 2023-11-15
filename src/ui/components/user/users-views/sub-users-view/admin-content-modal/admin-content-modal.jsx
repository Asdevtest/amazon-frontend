import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { Button, Checkbox, Container, ListItemText, MenuItem, Rating, Select, Typography } from '@mui/material'

import { UserRole, UserRoleCodeMap, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditUserPermissionsForm } from '@components/forms/add-or-edit-user-permissions-form'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { UserLink } from '@components/user/user-link'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot, validateEmail } from '@utils/checks'
import { t } from '@utils/translations'

import { useClassNames } from './admin-content-modal.style'

const activeOptions = [
  { value: true, label: t(TranslationKey.Active) },
  { value: false, label: t(TranslationKey.Banned) },
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
    const { classes: classNames } = useClassNames()

    const [showPermissionModal, setShowPermissionModal] = useState(false)

    const renderPermissionBtn = (
      <Button
        disableElevation
        variant="contained"
        color="primary"
        onClick={() => setShowPermissionModal(!showPermissionModal)}
      >
        {t(TranslationKey['Manage permissions'])}
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
      hideSuppliers: editUserFormFields?.hideSuppliers || false,
      overdraft: editUserFormFields?.overdraft || 0,

      permissions: editUserFormFields?.permissions.map(perm => perm._id) || [],
      permissionGroups: editUserFormFields?.permissionGroups.map(permGroup => permGroup._id) || [],
    }

    const [formFields, setFormFields] = useState(sourceFormFields)

    const [permissionsToSelect, setPermissionsToSelect] = useState([
      ...singlePermissions.filter(item => item.role === formFields.role),
    ])
    const [permissionGroupsToSelect, setPermissionGroupsToSelect] = useState([
      ...groupPermissions.filter(item => item.role === formFields.role),
    ])

    const onChangeFormField = fieldName => event => {
      const newFormFields = { ...formFields }
      if (fieldName === 'rate') {
        newFormFields[fieldName] = event.target.value.replace(/[-]/, '')
      } else if (['fba', 'canByMasterUser', 'hideSuppliers'].includes(fieldName)) {
        newFormFields[fieldName] = event.target.checked
      } else if (
        ['overdraft'].includes(fieldName) &&
        !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2)
      ) {
        return
      } else {
        newFormFields[fieldName] = event.target.value
      }

      if (fieldName === 'role') {
        setPermissionsToSelect([...singlePermissions.filter(item => item.role === +event.target.value)])
        setPermissionGroupsToSelect([...groupPermissions.filter(item => item.role === +event.target.value)])
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

    const [emailIsValid, setEmailIsValid] = useState(true)

    useEffect(() => {
      setEmailIsValid(validateEmail(formFields.email))
    }, [formFields.email])

    const onSubmitUserPermissionsForm = permissions => {
      const newFormFields = { ...formFields }
      newFormFields.permissions = permissions
      newFormFields.permissionGroups = []
      setFormFields(newFormFields)
    }

    const onClickSubmit = () => {
      const dataToSubmit = {
        ...formFields,
        allowedRoles: formFields.allowedRoles.includes(Number(formFields.role))
          ? [...formFields.allowedRoles]
          : [...formFields.allowedRoles, Number(formFields.role)],
      }

      onSubmit(dataToSubmit, editUserFormFields)
    }

    const selectedPermissions = singlePermissions.filter(per => formFields.permissions.includes(per._id))
    const selectedGroupPermissions = groupPermissions.filter(perGroup =>
      formFields.permissionGroups.includes(perGroup._id),
    )

    const isWrongPermissionsSelect =
      selectedPermissions.find(per => per.role !== Number(formFields.role)) ||
      selectedGroupPermissions.find(perGroup => perGroup.role !== Number(formFields.role))

    const disabledSubmitButton =
      !emailIsValid ||
      formFields.name === '' ||
      formFields.email === '' ||
      formFields.rate === '' ||
      formFields.role === mapUserRoleEnumToKey[UserRole.CANDIDATE] ||
      JSON.stringify(sourceFormFields) === JSON.stringify(formFields)

    return (
      <Container disableGutters className={classNames.modalContainer}>
        <Typography paragraph variant="h3">
          {`${title} ${editUserFormFields.name}`}
        </Typography>

        {editUserFormFields.masterUser ? (
          <Field
            label={t(TranslationKey['Master user'])}
            inputComponent={
              <div className={classNames.ratingWrapper}>
                <UserLink
                  blackText
                  name={editUserFormFields.masterUserInfo?.name}
                  userId={editUserFormFields.masterUserInfo?._id}
                />

                <div className={classNames.ratingSubWrapper}>
                  <Typography className={classNames.rating}>{t(TranslationKey.Rating)}</Typography>

                  <Rating readOnly value={editUserFormFields.masterUserInfo?.rating} />
                </div>
              </div>
            }
          />
        ) : null}

        {editUserFormFields.subUsers.length ? (
          <Field
            label={t(TranslationKey['Sub users'])}
            inputComponent={
              <div className={classNames.subUsersWrapper}>
                {editUserFormFields.subUsers.map(subUser => (
                  <div key={subUser._id} className={classNames.ratingWrapper}>
                    <UserLink blackText name={subUser.name} userId={subUser._id} />

                    <div className={classNames.ratingSubWrapper}>
                      <Typography className={classNames.rating}>{t(TranslationKey.Rating)}</Typography>

                      <Rating readOnly value={subUser.rating} />
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        ) : null}

        <Field
          inputProps={{ maxLength: 50 }}
          label={t(TranslationKey.Name)}
          error={checkValidationNameOrEmail.nameIsUnique === false && 'Пользователь с таким именем уже существует'}
          value={formFields.name}
          onChange={onChangeFormField('name')}
        />
        <Field
          inputProps={{ maxLength: 50 }}
          label={t(TranslationKey.Email)}
          error={
            (checkValidationNameOrEmail.emailIsUnique === false && 'Пользователь с таким email уже существует') ||
            (!emailIsValid && t(TranslationKey['Invalid email!']))
          }
          value={formFields.email}
          type="email"
          onChange={onChangeFormField('email')}
        />

        <Field
          inputProps={{ maxLength: 10 }}
          label={t(TranslationKey.Overdraft)}
          value={formFields.overdraft}
          onChange={onChangeFormField('overdraft')}
        />

        {!editUserFormFields.masterUser ? (
          <Field
            inputProps={{ maxLength: 8 }}
            label={t(TranslationKey.Rate)}
            value={formFields.rate}
            onChange={onChangeFormField('rate')}
          />
        ) : null}

        <Field
          label={t(TranslationKey.Role)}
          tooltipInfoContent={'Роль будет автоматически добавлена в разрешеннные'}
          error={
            isWrongPermissionsSelect && t(TranslationKey['The selected permissions and the current role do not match!'])
          }
          inputComponent={
            <Select
              input={<Input fullWidth />}
              variant="filled"
              value={formFields.role}
              onChange={onChangeFormField('role')}
            >
              {Object.keys(UserRoleCodeMap).map(userRoleCode => (
                <MenuItem
                  key={userRoleCode}
                  value={userRoleCode}
                  className={classNames.userRoleSelect}
                  disabled={[UserRole.CANDIDATE, UserRole.ADMIN].includes(UserRoleCodeMap[userRoleCode])}
                >
                  {UserRoleCodeMap[userRoleCode]}
                </MenuItem>
              ))}
            </Select>
          }
        />

        {/* {!editUserFormFields.masterUser ? ( */}
        <Field
          label={t(TranslationKey['Allowed Roles'])}
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
                  disabled={
                    [UserRole.CANDIDATE, UserRole.ADMIN].includes(UserRoleCodeMap[role]) || role === formFields.role
                  }
                >
                  <Checkbox
                    color="primary"
                    checked={formFields.allowedRoles.includes(Number(role)) || Number(role) === Number(formFields.role)}
                  />
                  <ListItemText primary={UserRoleCodeMap[role]} />
                </MenuItem>
              ))}
            </Select>
          }
        />
        {/* ) : null} */}

        <Field
          label={t(TranslationKey['User status'])}
          inputComponent={
            <Select
              input={<Input fullWidth />}
              variant="filled"
              value={formFields.active}
              onChange={onChangeFormField('active')}
            >
              {activeOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          }
        />
        <div className={classNames.checkboxWrapper}>
          <Checkbox
            color="primary"
            disabled={editUserFormFields.masterUser || formFields.role === mapUserRoleEnumToKey[UserRole.CANDIDATE]}
            checked={formFields.fba}
            onChange={onChangeFormField('fba')}
          />
          <Typography className={classNames.checkboxLabel}>{t(TranslationKey.FBA)}</Typography>
        </div>

        <div className={classNames.checkboxWrapper}>
          <Checkbox
            color="primary"
            disabled={editUserFormFields.masterUser || formFields.role === mapUserRoleEnumToKey[UserRole.CANDIDATE]}
            checked={formFields.canByMasterUser}
            onChange={onChangeFormField('canByMasterUser')}
          />
          <Typography className={classNames.checkboxLabel}>{t(TranslationKey['Can be the master user'])}</Typography>
        </div>

        <div className={classNames.checkboxWrapper}>
          <Checkbox
            color="primary"
            disabled={formFields.role === mapUserRoleEnumToKey[UserRole.CANDIDATE]}
            checked={formFields.hideSuppliers}
            onChange={onChangeFormField('hideSuppliers')}
          />
          <Typography className={classNames.checkboxLabel}>{t(TranslationKey['Hide Suppliers'])}</Typography>
        </div>

        <div className={classNames.checkboxWrapper}>
          <Checkbox
            color="primary"
            disabled={formFields.role !== mapUserRoleEnumToKey[UserRole.STOREKEEPER]}
            checked={formFields.isUserPreprocessingCenterUSA}
            onChange={onChangeFormField('isUserPreprocessingCenterUSA')}
          />
          <Typography className={classNames.checkboxLabel}>{t(TranslationKey['Prep Center USA'])}</Typography>
        </div>

        <Field label={t(TranslationKey['Security/Sharing options'])} inputComponent={renderPermissionBtn} />

        {isWrongPermissionsSelect && (
          <Typography className={classNames.isWrongPermissionsSelectError}>
            {t(TranslationKey['The selected permissions and the current role do not match!'])}
          </Typography>
        )}

        <div className={classNames.buttonWrapper}>
          <Button
            disableElevation
            disabled={isWrongPermissionsSelect || disabledSubmitButton}
            variant="contained"
            color="primary"
            // onClick={() => {
            //   onSubmit(formFields, editUserFormFields)
            // }}
            onClick={onClickSubmit}
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
            {t(TranslationKey.Close)}
          </Button>
        </div>
        <Modal openModal={showPermissionModal} setOpenModal={() => setShowPermissionModal(!showPermissionModal)}>
          <AddOrEditUserPermissionsForm
            isWithoutProductPermissions
            permissionsToSelect={permissionsToSelect}
            permissionGroupsToSelect={permissionGroupsToSelect}
            sourceData={formFields}
            onCloseModal={() => setShowPermissionModal(!showPermissionModal)}
            onSubmit={onSubmitUserPermissionsForm}
          />
        </Modal>
      </Container>
    )
  },
)
