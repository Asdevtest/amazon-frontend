import CheckBoxIcon from '@mui/icons-material/CheckBox'
import {Typography, Checkbox, Select, ListItemText, MenuItem, Rating} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'
import {mapUserRoleEnumToKey, UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {AddOrEditUserPermissionsForm} from '@components/forms/add-or-edit-user-permissions-form'
import {RegistrationForm} from '@components/forms/registration-form'
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
    changeFields,
  }) => {
    const {classes: classNames} = useClassNames()

    const [showPermissionModal, setShowPermissionModal] = useState(false)

    const sourceFormFields = {
      active: editUserFormFields?.active || false,
      allowedRoles: (editUserFormFields?.allowedRoles === null ? [] : editUserFormFields?.allowedRoles) || [],
      allowedStrategies:
        (editUserFormFields?.allowedStrategies === null ? [] : editUserFormFields?.allowedStrategies) || [],
      email: editUserFormFields?.email || '',
      // password: editUserFormFields?.password || '',
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
    }

    const [formFields, setFormFields] = useState(sourceFormFields)
    const [selectedAllowedRoles, setSelectedAllowedRoles] = useState(formFields.allowedRoles)
    const [selectedRole, setSelectedRole] = useState('')
    const [changedAllowedRoles, setChangedAllowedRoles] = useState([])
    const [clearSelect, setClearSelect] = useState(false)

    // const [accessTags, setAccessTags] = useState([]) // ТЕГИ
    // const [accessTag, setAccessTag] = useState('')

    const [permissionsToSelect, setPermissionsToSelect] = useState([
      ...singlePermissions.filter(item => item.role === formFields.role),
    ])
    const [permissionGroupsToSelect, setPermissionGroupsToSelect] = useState([
      ...groupPermissions.filter(item => item.role === formFields.role),
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

    // const addAccessTag = () => {  // ТЕГИ ВОЗМОЖНО ВЕРНУТЬСЯ
    //   setAccessTags(prev => [...prev, accessTag])
    //   setAccessTag('')
    // }

    // const removeAccessTag = value => {
    //   const removeTag = accessTags.filter(tag => tag !== value)
    //   setAccessTags(removeTag)
    // }

    const onChangeFormField = fieldName => event => {
      const newFormFields = {...formFields}
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
      const newFormFields = {...formFields}
      newFormFields.permissions = permissions
      newFormFields.permissionGroups = []
      setFormFields(newFormFields)
    }

    const onClickSubmit = () => {
      const dataToSubmit = {
        ...formFields,
        allowedRoles: selectedAllowedRoles.includes(Number(formFields.role))
          ? [...selectedAllowedRoles]
          : [...selectedAllowedRoles, Number(formFields.role)],
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
      // formFields.role === mapUserRoleEnumToKey[UserRole.CANDIDATE] ||
      (JSON.stringify(changedAllowedRoles) === JSON.stringify(selectedAllowedRoles) &&
        JSON.stringify(sourceFormFields) === JSON.stringify(formFields))

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
                      name={editUserFormFields.masterUserInfo?.name}
                      userId={editUserFormFields.masterUserInfo?._id}
                    />

                    <Typography className={classNames.standartText}>
                      {editUserFormFields.masterUserInfo.email}
                    </Typography>
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
                        <UserLink name={subUser.name} userId={subUser._id} />

                        <Typography className={classNames.standartText}>{subUser.email}</Typography>
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

            <RegistrationForm isRecoverPassword formFields={{password: ''}} onChangeFormField={onChangeFormField} />
          </div>

          <div className={classNames.middleWrapper}>
            <Field
              inputProps={{maxLength: 10}}
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

              {!editUserFormFields.masterUser ? (
                <Field
                  inputProps={{maxLength: 8}}
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
                <div className={classNames.leftContentWrapper}>
                  <Typography className={classNames.selectedRole}>{UserRoleCodeMap[role]}</Typography>

                  <Field
                    oneLine
                    disabled
                    inputProps={{maxLength: 8}}
                    inputClasses={classNames.allowedRoleRateInput}
                    containerClasses={classNames.allowedRoleRateContainer}
                    label={t(TranslationKey.Rate)}
                    // value={formFields.rate}
                    // onChange={onChangeFormField('rate')}
                  />
                </div>

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
                      classes={{select: classNames.selectRoot}}
                      value={selectedRole ? selectedRole : 'Роль'}
                      renderValue={selected =>
                        clearSelect ? t(TranslationKey['Choose a role']) : UserRoleCodeMap[selected]
                      }
                      className={classNames.standartText}
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
                    inputProps={{maxLength: 8}}
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
                  classes={{root: classNames.actionButton}}
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
                  renderValue={selected => selected.map(el => mapProductStrategyStatusEnum[el]).join(', ')}
                  onChange={onChangeFormField('allowedStrategies')}
                >
                  {Object.keys(mapProductStrategyStatusEnum).map((strategy, index) => (
                    <MenuItem key={index} className={classNames.standartText} value={Number(strategy)}>
                      <Checkbox color="primary" checked={formFields.allowedStrategies.includes(Number(strategy))} />
                      <ListItemText primary={mapProductStrategyStatusEnum[strategy]} />
                    </MenuItem>
                  ))}
                </Select>
              }
            />

            {/* <Field  // ТЕГИ, ВОЗМОЖНО ВЕРНУТЬСЯ
              label={t(TranslationKey['Add user access tags'])}
              value={accessTag}
              endAdornment={
                <Typography className={classNames.actionTagButton} onClick={() => addAccessTag()}>
                  {'+'}
                </Typography>
              }
              onChange={e => setAccessTag(e.target.value)}
            />
            <div className={classNames.tagsWrapper}>
              {accessTags.map((tag, index) => (
                <div key={index}>
                  <Typography className={classNames.tag}>
                    {tag}
                    <Typography className={classNames.removeTagButton} onClick={() => removeAccessTag(tag)}>
                      {'х'}
                    </Typography>
                  </Typography>
                </div>
              ))}
            </div> */}
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
