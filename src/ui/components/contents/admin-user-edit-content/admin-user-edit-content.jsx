import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Checkbox, ListItemText, MenuItem, Rating, Select, Typography } from '@mui/material'

import { UserRole, UserRoleCodeMap, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { humanFriendlyStategyStatus, mapProductStrategyStatusEnum } from '@constants/product/product-strategy-status'
import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

// import {RegistrationForm} from '@components/forms/registration-form'
import { SettingsModel } from '@models/settings-model'

import { AddOrEditUserPermissionsForm } from '@components/forms/add-or-edit-user-permissions-form'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { UserLink } from '@components/user/user-link'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot, validateEmail } from '@utils/checks'
import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import { t } from '@utils/translations'
import { validationMessagesArray } from '@utils/validation'

import { useClassNames } from './admin-user-edit-content.style'

const activeOptions = [
  { value: true, label: t(TranslationKey.Active) },
  { value: false, label: t(TranslationKey.Banned) },
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
    changeFields,
    wrongPassword,
  }) => {
    const { classes: classNames } = useClassNames()

    const [showPermissionModal, setShowPermissionModal] = useState(false)

    const sourceFormFields = {
      active: editUserFormFields?.active || false,
      allowedRoles: (editUserFormFields?.allowedRoles === null ? [] : editUserFormFields?.allowedRoles) || [],
      allowedStrategies:
        (editUserFormFields?.allowedStrategies === null ? [] : editUserFormFields?.allowedStrategies) || [],
      allowedSpec: (editUserFormFields?.allowedSpec === null ? [] : editUserFormFields?.allowedSpec) || [],
      email: editUserFormFields?.email || '',
      fba: editUserFormFields?.fba || false,
      canByMasterUser: editUserFormFields?.canByMasterUser || false,
      name: editUserFormFields?.name || '',
      rate: editUserFormFields?.rate || 0,
      role: editUserFormFields?.role || '',
      hideSuppliers: editUserFormFields?.hideSuppliers || false,
      overdraft: editUserFormFields?.overdraft || 0,
      isUserPreprocessingCenterUSA: editUserFormFields?.isUserPreprocessingCenterUSA || false,

      permissions: editUserFormFields?.permissions.map(perm => perm._id) || [],
      permissionGroups: editUserFormFields?.permissionGroups.map(permGroup => permGroup._id) || [],
      oldPassword: '',
      password: '',
      confirmPassword: '',
    }

    const [formFields, setFormFields] = useState(sourceFormFields)

    const [selectedAllowedRoles, setSelectedAllowedRoles] = useState(formFields.allowedRoles)

    const [selectedRole, setSelectedRole] = useState('')
    const [changedAllowedRoles, setChangedAllowedRoles] = useState([])
    const [clearSelect, setClearSelect] = useState(false)

    const [permissionsToSelect, setPermissionsToSelect] = useState([
      ...((!!singlePermissions && singlePermissions?.filter(item => item?.role === formFields?.role)) || []),
    ])
    const [permissionGroupsToSelect, setPermissionGroupsToSelect] = useState([
      ...((!!groupPermissions && groupPermissions?.filter(item => item?.role === formFields?.role)) || []),
    ])

    useEffect(() => {
      !selectedRole ? setClearSelect(true) : setClearSelect(false)
    }, [selectedRole])

    const addAllowedRole = () => {
      setSelectedAllowedRoles(prev => [...new Set([...prev, selectedRole])])
      setSelectedRole('')
    }

    const removeAllowedRole = value => {
      const removeRole = selectedAllowedRoles.filter(role => role !== value)
      setSelectedAllowedRoles(removeRole)
    }

    const onChangeFormField = fieldName => event => {
      const newFormFields = { ...formFields }
      if (fieldName === 'rate') {
        newFormFields[fieldName] = event.target.value.replace(/[-]/, '')
      } else if (['fba', 'canByMasterUser', 'hideSuppliers', 'isUserPreprocessingCenterUSA'].includes(fieldName)) {
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
        changeFields.name = ''
        changeFields.email = ''
      }

      if (fieldName === 'name') {
        changeFields.name = event.target.value
      }

      if (fieldName === 'email') {
        changeFields.email = event.target.value
      }

      setFormFields(newFormFields)
    }

    const [emailIsValid, setEmailIsValid] = useState(true)

    useEffect(() => {
      setEmailIsValid(validateEmail(formFields.email))
    }, [formFields.email])

    useEffect(() => {
      const arr = [...selectedAllowedRoles]
      setChangedAllowedRoles(arr)
    }, [])

    const onSubmitUserPermissionsForm = permissions => {
      const newFormFields = { ...formFields }
      newFormFields.permissions = permissions
      newFormFields.permissionGroups = []
      setFormFields(newFormFields)
    }

    const onClickSubmit = () => {
      if (startChangePassword) {
        setSubmit(true)
        !errorLowercaseLetter &&
          !errorMinLength &&
          !errorOneNumber &&
          !errorUppercaseLetter &&
          !errorMaxLength &&
          !equalityError &&
          !errorNoEngLetter
      }

      const dataToSubmit = {
        ...formFields,
        allowedRoles: selectedAllowedRoles.includes(Number(formFields.role))
          ? [...selectedAllowedRoles]
          : [...selectedAllowedRoles, Number(formFields.role)],
      }

      const { oldPassword, password, confirmPassword, ...other } = dataToSubmit

      onSubmit(other, editUserFormFields, { oldPassword, password, confirmPassword })
    }

    const selectedPermissions = singlePermissions?.filter(per => formFields?.permissions?.includes(per?._id))
    const selectedGroupPermissions = groupPermissions?.filter(perGroup =>
      formFields?.permissionGroups?.includes(perGroup?._id),
    )

    const isWrongPermissionsSelect =
      selectedPermissions?.find(per => per?.role !== Number(formFields?.role)) ||
      selectedGroupPermissions?.find(perGroup => perGroup?.role !== Number(formFields?.role))

    const disabledSubmitButton =
      !emailIsValid ||
      formFields.name === '' ||
      formFields.email === '' ||
      formFields.rate === '' ||
      // formFields.role === mapUserRoleEnumToKey[UserRole.CANDIDATE] ||
      (JSON.stringify(changedAllowedRoles) === JSON.stringify(selectedAllowedRoles) &&
        JSON.stringify(sourceFormFields) === JSON.stringify(formFields))

    const [visibilityPass, setVisibilityPass] = useState(false)
    const [visibilityOldPass, setVisibilityOldPass] = useState(false)
    const [errorOneNumber, setErrorOneNumber] = useState(false)
    const [errorUppercaseLetter, setErrorUppercaseLetter] = useState(false)
    const [errorLowercaseLetter, setErrorLowercaseLetter] = useState(false)
    const [errorMinLength, setErrorMinLength] = useState(false)
    const [errorMaxLength, setErrorMaxLength] = useState(false)
    const [errorNoEngLetter, setErrorNoEngLetter] = useState(false)
    const [equalityError, setEqualityError] = useState(false)
    const [submit, setSubmit] = useState(false)

    const [startChangePassword, setStartChangePassword] = useState(false)

    useEffect(() => {
      if (formFields.password !== '') {
        setStartChangePassword(true)
      }
      if (formFields.password === '') {
        setStartChangePassword(false)
      }
    }, [formFields.password])

    const regExpNumber = /(?=.*[0-9])/g
    const regExpUpperCase = /(?=.*[A-Z])/g
    const regExpLowerCase = /(?=.*[a-z])/g
    const regExpEngLetter = /(?=.*[A-Za-z])/
    const regExpRuLetter = /(?=.*[А-Яа-я])/

    useEffect(() => {
      if (formFields.password.length < 6) {
        setErrorMinLength(true)
      } else {
        setErrorMinLength(false)
      }
      if (formFields.password.length > 32) {
        setErrorMaxLength(true)
      } else {
        setErrorMaxLength(false)
      }
      if (!formFields.password.match(regExpNumber)) {
        setErrorOneNumber(true)
      } else {
        setErrorOneNumber(false)
      }
      if (!formFields.password.match(regExpUpperCase)) {
        setErrorUppercaseLetter(true)
      } else {
        setErrorUppercaseLetter(false)
      }
      if (!formFields.password.match(regExpLowerCase)) {
        setErrorLowercaseLetter(true)
      } else {
        setErrorLowercaseLetter(false)
      }
      if (!formFields.password.match(regExpEngLetter)) {
        setErrorNoEngLetter(true)
      } else {
        setErrorNoEngLetter(false)
      }
      if (formFields.password.match(regExpRuLetter)) {
        setErrorNoEngLetter(true)
      } else {
        setErrorNoEngLetter(false)
      }
      if (formFields.password !== formFields.confirmPassword) {
        setEqualityError(true)
      } else {
        setEqualityError(false)
      }
    }, [
      formFields.password,
      formFields.confirmPassword,
      errorOneNumber,
      errorUppercaseLetter,
      SettingsModel.languageTag,
    ])

    // const onSubmitForm = event => {
    //   event.preventDefault()
    //   setSubmit(true)
    //   !errorLowercaseLetter &&
    //     !errorMinLength &&
    //     !errorOneNumber &&
    //     !errorUppercaseLetter &&
    //     !errorMaxLength &&
    //     !equalityError &&
    //     !errorNoEngLetter &&
    //     onSubmit()
    // }

    const showError =
      (submit && errorLowercaseLetter) ||
      (submit && errorMinLength) ||
      (submit && errorOneNumber) ||
      (submit && errorUppercaseLetter) ||
      (submit && errorMaxLength)

    //
    return (
      <div className={classNames.root}>
        <div className={classNames.mainWrapper}>
          <div className={classNames.leftWrapper}>
            {editUserFormFields?.masterUser ? (
              <Field
                label={t(TranslationKey['Master user'])}
                inputComponent={
                  <div className={classNames.ratingWrapper}>
                    <UserLink
                      name={editUserFormFields?.masterUserInfo?.name}
                      userId={editUserFormFields?.masterUserInfo?._id}
                    />

                    <Typography className={classNames.standartText}>
                      {editUserFormFields?.masterUserInfo.email}
                    </Typography>
                    <div className={classNames.ratingSubWrapper}>
                      <Typography className={classNames.rating}>{t(TranslationKey.Rating)}</Typography>

                      <Rating readOnly value={editUserFormFields?.masterUserInfo?.rating} />
                    </div>
                  </div>
                }
              />
            ) : null}

            {editUserFormFields?.subUsers.length ? (
              <Field
                label={t(TranslationKey['Sub users'])}
                inputComponent={
                  <div className={classNames.subUsersWrapper}>
                    {editUserFormFields?.subUsers.map(subUser => (
                      <div key={subUser?._id} className={classNames.ratingWrapper}>
                        <UserLink name={subUser?.name} userId={subUser?._id} />

                        <Typography className={classNames.standartText}>{subUser?.email}</Typography>
                      </div>
                    ))}
                  </div>
                }
              />
            ) : null}

            <div className={classNames.nameEmailWrapper}>
              <Field
                inputProps={{ maxLength: 50 }}
                label={t(TranslationKey.Name)}
                error={
                  checkValidationNameOrEmail.nameIsUnique === false && 'Пользователь с таким именем уже существует'
                }
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
            </div>

            {/* Новое */}
            <div className={classNames.field}>
              <Field
                disabled
                inputProps={{ maxLength: 128 }}
                labelClasses={classNames.labelField}
                error={wrongPassword && t(TranslationKey['Old password'])}
                inputClasses={classNames.input}
                label={t(TranslationKey['Old password'])}
                placeholder={t(TranslationKey['Old password'])}
                type={!visibilityOldPass ? 'password' : 'text'}
                value={formFields.oldPassword}
                onChange={onChangeFormField('oldPassword')}
              />
              <div className={classNames.visibilityIcon} onClick={() => setVisibilityOldPass(!visibilityOldPass)}>
                {!visibilityOldPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>

            <div className={classNames.field}>
              <Field
                disabled
                inputProps={{ maxLength: 128 }}
                labelClasses={classNames.labelField}
                error={showError}
                inputClasses={classNames.input}
                label={t(TranslationKey['New password'])}
                placeholder={t(TranslationKey.Password)}
                type={!visibilityPass ? 'password' : 'text'}
                value={formFields.password}
                onChange={onChangeFormField('password')}
              />
              <div className={classNames.visibilityIcon} onClick={() => setVisibilityPass(!visibilityPass)}>
                {!visibilityPass ? <VisibilityOffIcon /> : <VisibilityIcon/>}
              </div>
              <div className={classNames.validationMessage}>
                {validationMessagesArray(
                  errorMinLength,
                  errorOneNumber,
                  errorUppercaseLetter,
                  errorLowercaseLetter,
                  errorNoEngLetter,
                ).map((text, index) => (
                  <span
                    key={index}
                    className={cx(classNames.validationText, { [classNames.red]: submit && text.error })}
                  >
                    {text.name}
                  </span>
                ))}
              </div>
              <div className={classNames.validationHiddenMessage}>
                <Typography
                  className={cx(
                    classNames.validationHiddenText,
                    { [classNames.red]: submit && errorMaxLength },
                    { [classNames.visibility]: errorMaxLength },
                  )}
                >
                  {`${t(TranslationKey.maximum)} 32 ${t(TranslationKey.characters)}`}
                </Typography>
              </div>
            </div>

            <div className={classNames.field}>
              <Field
                disabled
                inputProps={{ maxLength: 128 }}
                labelClasses={classNames.labelField}
                error={submit && equalityError && t(TranslationKey["Passwords don't match"])}
                inputClasses={classNames.input}
                label={t(TranslationKey['Re-enter the new password'])}
                placeholder={t(TranslationKey.Password)}
                type={!visibilityPass ? 'password' : 'text'}
                value={formFields.confirmPassword}
                onChange={onChangeFormField('confirmPassword')}
              />
            </div>
            {/* Новое */}
          </div>

          <div className={classNames.middleWrapper}>
            <Field
              inputProps={{ maxLength: 10 }}
              label={t(TranslationKey.Overdraft)}
              containerClasses={classNames.overdraftContainer}
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
                containerClasses={classNames.roleContainer}
                inputComponent={
                  <Select
                    displayEmpty
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

              {!editUserFormFields?.masterUser ? (
                <Field
                  inputProps={{ maxLength: 8 }}
                  containerClasses={classNames.rateContainer}
                  label={t(TranslationKey.Rate)}
                  value={formFields.rate}
                  onChange={onChangeFormField('rate')}
                />
              ) : null}
            </div>
            <Typography className={classNames.allowedRoleWrapperTitle}>{t(TranslationKey['Allowed Roles'])}</Typography>
            {selectedAllowedRoles.map((role, index) => (
              <div key={index} className={classNames.selectedRoleWrapper}>
                <Typography className={classNames.selectedRole}>{UserRoleCodeMap[role]}</Typography>

                <Field
                  oneLine
                  disabled
                  inputProps={{ maxLength: 8 }}
                  inputClasses={classNames.allowedRoleRateInput}
                  containerClasses={classNames.allowedRoleRateContainer}
                  label={t(TranslationKey.Rate)}
                />

                <div className={classNames.actionDelButton} onClick={() => removeAllowedRole(role)}>
                  {'-'}
                </div>
              </div>
            ))}
            <div className={classNames.allowedRoleWrapper}>
              <div className={classNames.leftContentWrapper}>
                <Field
                  containerClasses={classNames.allowedRoleContainer}
                  inputComponent={
                    <Select
                      size="small"
                      variant="standard"
                      input={<Input fullWidth />}
                      classes={{ select: classNames.selectRoot }}
                      value={selectedRole ? selectedRole : 'Роль'}
                      renderValue={selected =>
                        clearSelect ? t(TranslationKey['Choose a role']) : UserRoleCodeMap[selected]
                      }
                      className={classNames.standartTextRole}
                      onChange={e => setSelectedRole(e.target.value)}
                    >
                      {Object.keys(UserRoleCodeMap).map((role, index) => (
                        <MenuItem
                          key={index}
                          className={classNames.standartText}
                          value={Number(role)}
                          disabled={
                            [UserRole.CANDIDATE, UserRole.ADMIN].includes(UserRoleCodeMap[role]) ||
                            role === formFields.role
                          }
                        >
                          <Checkbox
                            color="primary"
                            checked={
                              selectedAllowedRoles.includes(Number(role)) || Number(role) === Number(formFields.role)
                            }
                          />
                          <ListItemText primary={UserRoleCodeMap[role]} />
                        </MenuItem>
                      ))}
                    </Select>
                  }
                />
                <div>
                  <Field
                    oneLine
                    disabled
                    inputProps={{ maxLength: 8 }}
                    inputClasses={classNames.allowedRoleRateInput}
                    containerClasses={classNames.allowedRoleRateContainer}
                    label={t(TranslationKey.Rate)}
                    // value={formFields.rate}
                    // onChange={onChangeFormField('rate')}
                  />
                </div>
              </div>
              {selectedRole ? (
                <CheckBoxIcon
                  fontSize="medium"
                  classes={{ root: classNames.actionButton }}
                  onClick={() => addAllowedRole()}
                />
              ) : null}
            </div>

            <Field
              label={t(TranslationKey['Allowed Strategies'])}
              containerClasses={classNames.allowedStrategiesContainer}
              inputComponent={
                <Select
                  multiple
                  className={classNames.standartText}
                  value={formFields.allowedStrategies}
                  renderValue={selected =>
                    selected.map(el => humanFriendlyStategyStatus(mapProductStrategyStatusEnum[el])).join(', ')
                  }
                  onChange={onChangeFormField('allowedStrategies')}
                >
                  {Object.keys(mapProductStrategyStatusEnum).map((strategy, index) => (
                    <MenuItem key={index} className={classNames.standartText} value={Number(strategy)}>
                      <Checkbox color="primary" checked={formFields.allowedStrategies.includes(Number(strategy))} />
                      <ListItemText primary={humanFriendlyStategyStatus(mapProductStrategyStatusEnum[strategy])} />
                    </MenuItem>
                  ))}
                </Select>
              }
            />

            {(formFields.allowedRoles.some(item => `${item}` === `${mapUserRoleEnumToKey[UserRole.FREELANCER]}`) ||
              selectedAllowedRoles.some(item => `${item}` === `${mapUserRoleEnumToKey[UserRole.FREELANCER]}`) ||
              `${formFields.role}` === `${mapUserRoleEnumToKey[UserRole.FREELANCER]}`) && (
              <Field
                label={t(TranslationKey['User specialties'])}
                containerClasses={classNames.allowedStrategiesContainer}
                inputComponent={
                  <Select
                    multiple
                    className={classNames.standartText}
                    value={formFields?.allowedSpec}
                    renderValue={selected => selected.map(el => freelanceRequestTypeByCode[el]).join(', ')}
                    onChange={onChangeFormField('allowedSpec')}
                  >
                    {Object.keys(getObjectFilteredByKeyArrayBlackList(freelanceRequestTypeByCode, ['0'])).map(
                      (type, index) => (
                        <MenuItem key={index} className={classNames.standartText} value={Number(type)}>
                          <Checkbox color="primary" checked={formFields?.allowedSpec?.includes(Number(type))} />
                          <ListItemText primary={freelanceRequestTypeTranslate(freelanceRequestTypeByCode[type])} />
                        </MenuItem>
                      ),
                    )}
                  </Select>
                }
              />
            )}
          </div>

          <div className={classNames.rightWrapper}>
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

            <Field
              label={t(TranslationKey['Security/Sharing options'])}
              inputComponent={
                <Button
                  variant="contained"
                  color="primary"
                  className={classNames.securityButton}
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
                disabled={
                  editUserFormFields?.masterUser || formFields.role === mapUserRoleEnumToKey[UserRole.CANDIDATE]
                }
                checked={formFields.fba}
                onChange={onChangeFormField('fba')}
              />
              <Typography className={classNames.checkboxLabel}>{t(TranslationKey.FBA)}</Typography>
            </div>

            <div className={classNames.checkboxWrapper}>
              <Checkbox
                color="primary"
                disabled={
                  editUserFormFields?.masterUser ||
                  formFields.role === mapUserRoleEnumToKey[UserRole.CANDIDATE] ||
                  editUserFormFields?.subUsers?.length
                }
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

            <div className={classNames.checkboxWrapper}>
              <Checkbox
                color="primary"
                disabled={`${formFields.role}` !== `${mapUserRoleEnumToKey[UserRole.STOREKEEPER]}`}
                checked={formFields.isUserPreprocessingCenterUSA}
                onChange={onChangeFormField('isUserPreprocessingCenterUSA')}
              />
              <Typography className={classNames.checkboxLabel}>{t(TranslationKey['Prep Center USA'])}</Typography>
            </div>
          </div>
        </div>

        <div className={classNames.buttonWrapper}>
          <Button
            success
            disabled={isWrongPermissionsSelect || disabledSubmitButton}
            className={[classNames.button, classNames.rightBtn]}
            onClick={onClickSubmit}
          >
            {buttonLabel}
          </Button>

          <Button
            className={[classNames.button, classNames.rightBtn, classNames.cancelBtn]}
            variant="text"
            onClick={() => {
              onClickCancelBtn()
            }}
          >
            {t(TranslationKey.Close)}
          </Button>
        </div>
        <Modal openModal={showPermissionModal} setOpenModal={() => setShowPermissionModal(!showPermissionModal)}>
          <AddOrEditUserPermissionsForm
            isWithoutProductPermissions
            shops={[]}
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
