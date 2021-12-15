import ListSubheader from '@mui/material/ListSubheader'

import React, {useState} from 'react'

import {Checkbox, Divider, ListItemText, MenuItem, Select, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {mapUserRoleEnumToKey, UserRole, UserRoleCodeMap} from '@constants/user-roles'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './add-or-edit-user-permissions-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOrEditUserPermissionsForm

export const AddOrEditUserPermissionsForm = observer(
  ({onCloseModal, onSubmit, permissionsToSelect, permissionGroupsToSelect, sourceData}) => {
    const classNames = useClassNames()
    const objectSinglePermissions = permissionsToSelect.reduce(
      (prev, item) => ({...prev, [item.role]: prev[item.role] ? [...prev[item.role], item] : [item]}),
      {},
    )
    const objectGroupPermissions = permissionGroupsToSelect.reduce(
      (prev, item) => ({...prev, [item.role]: prev[item.role] ? [...prev[item.role], item] : [item]}),
      {},
    )

    const sourceFormFields = {
      curPermissions: sourceData?.permissions || [],
      curPermissionGroups: sourceData?.permissionGroups || [],
    }

    const [formFields, setFormFields] = useState(sourceFormFields)

    const [openSinglePermissions, setOpenSinglePermissions] = useState(false)
    const [openGroupPermissions, setOpenGroupPermissions] = useState(false)

    const RenderGroupPermissionInfo = permGroup => {
      const [collapseInfo, setCollapseInfo] = useState(true)

      return (
        <div className={classNames.permGroup}>
          <div className={classNames.permGroupSubWrapper}>
            <div>
              <Typography>{permGroup.permGroup.title}</Typography>
              <Typography>{permGroup.permGroup.description}</Typography>
              <Typography>{`(${UserRoleCodeMap[permGroup.permGroup.role]})`}</Typography>
            </div>
            <Button
              disableElevation
              className={classNames.permGroupBtn}
              color="default"
              variant="contained"
              onClick={() => setCollapseInfo(!collapseInfo)}
            >
              {collapseInfo ? textConsts.showBtn : textConsts.hideBtn}
            </Button>
          </div>

          {!collapseInfo && (
            <div>
              <Typography>{textConsts.permissionSubTitle}</Typography>

              {permGroup.permGroup.permissions.map(item => (
                <div key={item._id} className={classNames.permissionWrapper}>
                  <Checkbox checked disabled color="primary" />
                  <div>
                    <Typography>{item.title}</Typography>
                    <Typography>{`(${item.description})`}</Typography>
                    <Typography>{`(${UserRoleCodeMap[item.role]})`}</Typography>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    const handleSelectPermissionChange = type => event => {
      const {
        target: {value},
      } = event
      const newFormFields = {...formFields}
      newFormFields[type] = typeof value === 'string' ? value.split(',') : value

      setFormFields(() => newFormFields)
    }

    const renderMenuItem = (per, checkArr) => (
      <MenuItem key={per._id} value={per._id}>
        <Checkbox color="primary" checked={checkArr.includes(per._id)} />
        <ListItemText primary={`${per.title} (ключ: ${per.key})`} />
      </MenuItem>
    )

    return (
      <div className={classNames.root}>
        <Typography variant="h5">{textConsts.mainTitle}</Typography>

        <div className={classNames.form}>
          <Field
            containerClasses={classNames.field}
            label={textConsts.allowPermissions}
            inputComponent={
              <div className={classNames.allowPermissions}>
                <Typography className={classNames.permissionsSubTitle}>{textConsts.choosePermissionGroups}</Typography>

                <div className={classNames.selectWrapper}>
                  <Typography className={classNames.selectChoose}>{textConsts.selectChooseTitle}</Typography>
                  <Select
                    multiple
                    open={openGroupPermissions}
                    className={classNames.permissionSelect}
                    value={formFields.curPermissionGroups}
                    renderValue={() => textConsts.choose}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 420,
                        },
                      },
                    }}
                    onClose={() => setOpenGroupPermissions(!openGroupPermissions)}
                    onOpen={() => setOpenGroupPermissions(!openGroupPermissions)}
                    onChange={handleSelectPermissionChange('curPermissionGroups')}
                  >
                    {objectGroupPermissions[mapUserRoleEnumToKey[UserRole.ADMIN]] && (
                      <ListSubheader>{UserRole.ADMIN}</ListSubheader>
                    )}
                    {objectGroupPermissions[mapUserRoleEnumToKey[UserRole.ADMIN]] &&
                      objectGroupPermissions[mapUserRoleEnumToKey[UserRole.ADMIN]].map(per =>
                        renderMenuItem(per, formFields.curPermissionGroups),
                      )}

                    {objectGroupPermissions[mapUserRoleEnumToKey[UserRole.CLIENT]] && (
                      <ListSubheader>{UserRole.CLIENT}</ListSubheader>
                    )}
                    {objectGroupPermissions[mapUserRoleEnumToKey[UserRole.CLIENT]] &&
                      objectGroupPermissions[mapUserRoleEnumToKey[UserRole.CLIENT]].map(per =>
                        renderMenuItem(per, formFields.curPermissionGroups),
                      )}

                    {objectGroupPermissions[mapUserRoleEnumToKey[UserRole.SUPERVISOR]] && (
                      <ListSubheader>{UserRole.SUPERVISOR}</ListSubheader>
                    )}
                    {objectGroupPermissions[mapUserRoleEnumToKey[UserRole.SUPERVISOR]] &&
                      objectGroupPermissions[mapUserRoleEnumToKey[UserRole.SUPERVISOR]].map(per =>
                        renderMenuItem(per, formFields.curPermissionGroups),
                      )}

                    {objectGroupPermissions[mapUserRoleEnumToKey[UserRole.RESEARCHER]] && (
                      <ListSubheader>{UserRole.RESEARCHER}</ListSubheader>
                    )}
                    {objectGroupPermissions[mapUserRoleEnumToKey[UserRole.RESEARCHER]] &&
                      objectGroupPermissions[mapUserRoleEnumToKey[UserRole.RESEARCHER]].map(per =>
                        renderMenuItem(per, formFields.curPermissionGroups),
                      )}

                    {objectGroupPermissions[mapUserRoleEnumToKey[UserRole.BUYER]] && (
                      <ListSubheader>{UserRole.BUYER}</ListSubheader>
                    )}
                    {objectGroupPermissions[mapUserRoleEnumToKey[UserRole.BUYER]] &&
                      objectGroupPermissions[mapUserRoleEnumToKey[UserRole.BUYER]].map(per =>
                        renderMenuItem(per, formFields.curPermissionGroups),
                      )}

                    {objectGroupPermissions[mapUserRoleEnumToKey[UserRole.STOREKEEPER]] && (
                      <ListSubheader>{UserRole.STOREKEEPER}</ListSubheader>
                    )}
                    {objectGroupPermissions[mapUserRoleEnumToKey[UserRole.STOREKEEPER]] &&
                      objectGroupPermissions[mapUserRoleEnumToKey[UserRole.STOREKEEPER]].map(per =>
                        renderMenuItem(per, formFields.curPermissionGroups),
                      )}

                    <div>
                      <Button
                        disableElevation
                        className={classNames.button}
                        color="primary"
                        variant="contained"
                        onClick={() => setOpenGroupPermissions(!openGroupPermissions)}
                      >
                        {textConsts.closeBtn}
                      </Button>

                      <Button
                        disableElevation
                        className={classNames.button}
                        color="primary"
                        variant="default"
                        onClick={event => {
                          event.stopPropagation()
                          handleSelectPermissionChange('curPermissionGroups')({target: {value: []}})
                        }}
                      >
                        {textConsts.clearBtn}
                      </Button>
                    </div>
                  </Select>
                </div>

                <Typography>{textConsts.choosenPermissionGroups}</Typography>

                <div className={classNames.permissionsGroupWrapper}>
                  {permissionGroupsToSelect
                    .filter(group => formFields.curPermissionGroups.includes(group._id))
                    .map((el, index) => (
                      <RenderGroupPermissionInfo key={index} permGroup={el} />
                    ))}
                </div>
              </div>
            }
          />

          <Divider flexItem orientation={'vertical'} className={classNames.divider} />

          <Field
            containerClasses={classNames.field}
            label={textConsts.allowPermissions}
            inputComponent={
              <div className={classNames.allowPermissions}>
                <Typography className={classNames.permissionsSubTitle}>{textConsts.choosePermissions}</Typography>

                <div className={classNames.selectWrapper}>
                  <Typography className={classNames.selectChoose}>{textConsts.selectChooseTitle}</Typography>
                  <Select
                    multiple
                    open={openSinglePermissions}
                    className={classNames.permissionSelect}
                    value={formFields.curPermissions}
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
                    onChange={handleSelectPermissionChange('curPermissions')}
                  >
                    {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.ADMIN]] && (
                      <ListSubheader>{UserRole.ADMIN}</ListSubheader>
                    )}
                    {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.ADMIN]] &&
                      objectSinglePermissions[mapUserRoleEnumToKey[UserRole.ADMIN]].map(per =>
                        renderMenuItem(per, formFields.curPermissions),
                      )}

                    {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.CLIENT]] && (
                      <ListSubheader>{UserRole.CLIENT}</ListSubheader>
                    )}
                    {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.CLIENT]] &&
                      objectSinglePermissions[mapUserRoleEnumToKey[UserRole.CLIENT]].map(per =>
                        renderMenuItem(per, formFields.curPermissions),
                      )}

                    {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.SUPERVISOR]] && (
                      <ListSubheader>{UserRole.SUPERVISOR}</ListSubheader>
                    )}
                    {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.SUPERVISOR]] &&
                      objectSinglePermissions[mapUserRoleEnumToKey[UserRole.SUPERVISOR]].map(per =>
                        renderMenuItem(per, formFields.curPermissions),
                      )}

                    {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.RESEARCHER]] && (
                      <ListSubheader>{UserRole.RESEARCHER}</ListSubheader>
                    )}
                    {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.RESEARCHER]] &&
                      objectSinglePermissions[mapUserRoleEnumToKey[UserRole.RESEARCHER]].map(per =>
                        renderMenuItem(per, formFields.curPermissions),
                      )}

                    {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.BUYER]] && (
                      <ListSubheader>{UserRole.BUYER}</ListSubheader>
                    )}
                    {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.BUYER]] &&
                      objectSinglePermissions[mapUserRoleEnumToKey[UserRole.BUYER]].map(per =>
                        renderMenuItem(per, formFields.curPermissions),
                      )}

                    {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.STOREKEEPER]] && (
                      <ListSubheader>{UserRole.STOREKEEPER}</ListSubheader>
                    )}
                    {objectSinglePermissions[mapUserRoleEnumToKey[UserRole.STOREKEEPER]] &&
                      objectSinglePermissions[mapUserRoleEnumToKey[UserRole.STOREKEEPER]].map(per =>
                        renderMenuItem(per, formFields.curPermissions),
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
                        onClick={event => {
                          event.stopPropagation()
                          handleSelectPermissionChange('curPermissions')({target: {value: []}})
                        }}
                      >
                        {textConsts.clearBtn}
                      </Button>
                    </div>
                  </Select>
                </div>

                <Typography>{textConsts.choosenPermission}</Typography>

                <div className={classNames.permissionsGroupWrapper}>
                  {permissionsToSelect
                    .filter(group => formFields.curPermissions.includes(group._id))
                    .map(el => (
                      <div key={el._id} className={classNames.permissionWrapper}>
                        <Checkbox checked disabled color="primary" />
                        <div>
                          <Typography>{el.title}</Typography>
                          <Typography>{`(${el.description})`}</Typography>
                          <Typography>{`(${UserRoleCodeMap[el.role]})`}</Typography>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            }
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            disableElevation
            color="primary"
            variant="contained"
            onClick={() => {
              onSubmit(formFields.curPermissions, formFields.curPermissionGroups, sourceData._id)
              onCloseModal()
            }}
          >
            {textConsts.editBtn}
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
        </div>
      </div>
    )
  },
)
