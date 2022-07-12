import {Rating} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {Typography, NativeSelect, Checkbox, Select, ListItemText, MenuItem} from '@material-ui/core'
import {observer} from 'mobx-react'

import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'
import {mapUserRoleEnumToKey, UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {NewAddOrEditUserPermissionsForm} from '@components/forms/new-add-or-edit-user-permissions-form'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {UserLink} from '@components/user-link'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot, validateEmail} from '@utils/checks'
import {t} from '@utils/translations'

import {useClassNames} from './admin-user-edit-content.style'

const activeOptions = [
  {value: true, label: t(TranslationKey.Active)},
  {value: false, label: t(TranslationKey.Banned)},
]

export const AdminUserEditContent = observer(
  ({
    editUserFormFields,
    buttonLabel,
    onSubmit,
    onClickCancelBtn,
    groupPermissions,
    singlePermissions,
    checkValidationNameOrEmail,
    changeNameAndEmail,
  }) => {
    const classNames = useClassNames()

    const [showPermissionModal, setShowPermissionModal] = useState(false)

    const sourceFormFields = {
      active: editUserFormFields?.active || false,
      allowedRoles: (editUserFormFields?.allowedRoles === null ? [] : editUserFormFields?.allowedRoles) || [],
      allowedStrategies:
        (editUserFormFields?.allowedStrategies === null ? [] : editUserFormFields?.allowedStrategies) || [],
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
      const newFormFields = {...formFields}
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
      const newFormFields = {...formFields}
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
      <div className={classNames.root}>
        <div className={classNames.mainWrapper}>
          <div className={classNames.leftWrapper}>
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

                      <Rating disabled value={editUserFormFields.masterUserInfo?.rating} />
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

                        {/* <Typography className={classNames.rating}>{subUser.email}</Typography> */}

                        <div className={classNames.ratingSubWrapper}>
                          <Typography className={classNames.rating}>{t(TranslationKey.Rating)}</Typography>

                          <Rating disabled value={subUser.rating} />
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
            ) : null}

            <div className={classNames.nameEmailWrapper}>
              <Field
                inputProps={{maxLength: 50}}
                label={t(TranslationKey.Name)}
                error={checkValidationNameOrEmail.nameIsUnique && 'Пользователь с таким именем уже существует'}
                value={formFields.name}
                onChange={onChangeFormField('name')}
              />
              <Field
                inputProps={{maxLength: 50}}
                label={t(TranslationKey.Email)}
                error={
                  (checkValidationNameOrEmail.emailIsUnique && 'Пользователь с таким email уже существует') ||
                  (!emailIsValid && t(TranslationKey['Invalid email!']))
                }
                value={formFields.email}
                type="email"
                onChange={onChangeFormField('email')}
              />
            </div>
          </div>

          <div className={classNames.middleWrapper}>
            <Field
              inputProps={{maxLength: 10}}
              label={t(TranslationKey.Overdraft)}
              value={formFields.overdraft}
              onChange={onChangeFormField('overdraft')}
            />

            <div className={classNames.roleRateWrapper}>
              <Field
                label={t(TranslationKey.Role)}
                tooltipInfoContent={'Роль будет автоматически добавлена в разрешеннные'}
                error={
                  isWrongPermissionsSelect &&
                  t(TranslationKey['The selected permissions and the current role do not match!'])
                }
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
                        className={classNames.userRoleSelect}
                        disabled={[UserRole.CANDIDATE, UserRole.ADMIN].includes(UserRoleCodeMap[userRoleCode])}
                      >
                        {UserRoleCodeMap[userRoleCode]}
                      </option>
                    ))}
                  </NativeSelect>
                }
              />

              {!editUserFormFields.masterUser ? (
                <Field
                  inputProps={{maxLength: 8}}
                  label={t(TranslationKey.Rate)}
                  value={formFields.rate}
                  onChange={onChangeFormField('rate')}
                />
              ) : null}
            </div>

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
                        checked={
                          formFields.allowedRoles.includes(Number(role)) || Number(role) === Number(formFields.role)
                        }
                      />
                      <ListItemText primary={UserRoleCodeMap[role]} />
                    </MenuItem>
                  ))}
                </Select>
              }
            />

            <Field
              label={t(TranslationKey['Allowed Strategies'])}
              inputComponent={
                <Select
                  multiple
                  value={formFields.allowedStrategies}
                  renderValue={selected => selected.map(el => mapProductStrategyStatusEnum[el]).join(', ')}
                  onChange={onChangeFormField('allowedStrategies')}
                >
                  {Object.keys(mapProductStrategyStatusEnum).map((strategy, index) => (
                    <MenuItem key={index} value={Number(strategy)}>
                      <Checkbox color="primary" checked={formFields.allowedStrategies.includes(Number(strategy))} />
                      <ListItemText primary={mapProductStrategyStatusEnum[strategy]} />
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </div>

          <div className={classNames.rightWrapper}>
            <Field
              label={t(TranslationKey['User status'])}
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

            <Field
              label={t(TranslationKey['Security/Sharing options'])}
              inputComponent={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowPermissionModal(!showPermissionModal)}
                >
                  {t(TranslationKey['Manage permissions'])}
                </Button>
              }
            />

            {isWrongPermissionsSelect && (
              <Typography className={classNames.isWrongPermissionsSelectError}>
                {t(TranslationKey['The selected permissions and the current role do not match!'])}
              </Typography>
            )}
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
              <Typography className={classNames.checkboxLabel}>
                {t(TranslationKey['Can be the master user'])}
              </Typography>
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
          </div>
        </div>

        <div className={classNames.buttonWrapper}>
          <Button
            success
            disableElevation
            disabled={isWrongPermissionsSelect || disabledSubmitButton}
            className={[classNames.button, classNames.rightBtn]}
            variant="contained"
            color="primary"
            onClick={onClickSubmit}
          >
            {buttonLabel}
          </Button>

          <Button
            disableElevation
            className={[classNames.button, classNames.rightBtn]}
            variant="text"
            color="primary"
            onClick={() => {
              onClickCancelBtn()
            }}
          >
            {t(TranslationKey.Close)}
          </Button>
        </div>
        <Modal openModal={showPermissionModal} setOpenModal={() => setShowPermissionModal(!showPermissionModal)}>
          <NewAddOrEditUserPermissionsForm
            permissionsToSelect={permissionsToSelect}
            permissionGroupsToSelect={permissionGroupsToSelect}
            sourceData={formFields}
            onCloseModal={() => setShowPermissionModal(!showPermissionModal)}
            onSubmit={onSubmitUserPermissionsForm}
          />
        </Modal>
      </div>
    )
  },
)
