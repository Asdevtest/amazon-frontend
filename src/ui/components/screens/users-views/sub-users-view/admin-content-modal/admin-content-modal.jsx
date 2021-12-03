import React from 'react'

import {Container, Button, Typography, NativeSelect, Checkbox} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {Field} from '@components/field'
import {Input} from '@components/input'

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
    onChangeFormField,
    onSubmit,
    onTriggerEditUserModal,
    onTriggerPermissionModal,
  }) => {
    const classNames = useClassNames()

    const renderPermissionBtn = (
      <Button disableElevation variant="contained" color="primary" onClick={() => onTriggerPermissionModal()}>
        {textConsts.manageBtn}
      </Button>
    )

    return (
      <Container disableGutters className={classNames.modalContainer}>
        <Typography paragraph variant="h3">
          {`${title} ${editUserFormFields.name}`}
        </Typography>

        <Field label={textConsts.name} value={editUserFormFields.name} onChange={onChangeFormField('name')} />
        <Field
          label={textConsts.email}
          value={editUserFormFields.email}
          type="email"
          onChange={onChangeFormField('email')}
        />
        <Field label={textConsts.rate} value={editUserFormFields.rate} onChange={onChangeFormField('rate')} />
        <Field
          label={textConsts.role}
          inputComponent={
            <NativeSelect
              input={<Input fullWidth />}
              variant="filled"
              value={editUserFormFields.role}
              onChange={onChangeFormField('role')}
            >
              {Object.keys(UserRoleCodeMap)
                .filter(role => UserRoleCodeMap[role] !== UserRole.CANDIDATE)
                .map(userRoleCode => (
                  <option key={userRoleCode} value={userRoleCode}>
                    {UserRoleCodeMap[userRoleCode]}
                  </option>
                ))}
            </NativeSelect>
          }
        />
        <Field
          label={textConsts.active}
          inputComponent={
            <NativeSelect
              input={<Input fullWidth />}
              variant="filled"
              value={editUserFormFields.active}
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
          <Checkbox color="primary" value={editUserFormFields.fba} />
          <Typography className={classNames.checkboxLabel}>{textConsts.fba}</Typography>
        </div>
        <Field label={textConsts.fieldSecurity} inputComponent={renderPermissionBtn} />

        <div className={classNames.buttonWrapper}>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => {
              onSubmit()
              onTriggerEditUserModal()
            }}
          >
            {buttonLabel}
          </Button>
        </div>
      </Container>
    )
  },
)
