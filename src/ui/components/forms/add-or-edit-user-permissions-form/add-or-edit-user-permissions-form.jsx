import React, {useState} from 'react'

import {Checkbox, Divider, ListItemText, MenuItem, Select, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRoleCodeMap} from '@constants/user-roles'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './add-or-edit-user-permissions-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOrEditUserPermissionsForm

export const AddOrEditUserPermissionsForm = observer(
  ({onCloseModal, onSubmit, permissionsToSelect, permissionGroupsToSelect, sourceData}) => {
    const classNames = useClassNames()

    const sourceFormFields = {
      curPermissions: sourceData?.permissions || [],
      curPermissionGroups: sourceData?.permissionGroups || [],
    }

    const [formFields, setFormFields] = useState(sourceFormFields)

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
      setFormFields(newFormFields)
    }

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
                    className={classNames.permissionSelect}
                    value={formFields.curPermissionGroups}
                    renderValue={selected => selected.join(', ')}
                    onChange={handleSelectPermissionChange('curPermissionGroups')}
                  >
                    {permissionGroupsToSelect.map(perGroup => (
                      <MenuItem key={perGroup._id} value={perGroup._id}>
                        <Checkbox color="primary" checked={formFields.curPermissionGroups.includes(perGroup._id)} />
                        <ListItemText
                          primary={`${perGroup.title} (ключ: ${perGroup.key}) (роль: ${
                            UserRoleCodeMap[perGroup.role]
                          })`}
                        />
                      </MenuItem>
                    ))}
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
                    className={classNames.permissionSelect}
                    value={formFields.curPermissions}
                    renderValue={selected => selected.join(', ')}
                    onChange={handleSelectPermissionChange('curPermissions')}
                  >
                    {permissionsToSelect.map(perGroup => (
                      <MenuItem key={perGroup._id} value={perGroup._id}>
                        <Checkbox color="primary" checked={formFields.curPermissions.includes(perGroup._id)} />
                        <ListItemText
                          primary={`${perGroup.title} (ключ: ${perGroup.key}) (роль: ${
                            UserRoleCodeMap[perGroup.role]
                          })`}
                        />
                      </MenuItem>
                    ))}
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
