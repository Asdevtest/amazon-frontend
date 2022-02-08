import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

import React, {useState} from 'react'

import {Box, Divider, ListItemText, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './new-add-or-edit-user-permissions-form.style'

const textConsts = getLocalizedTexts(texts, 'en').addOrEditUserPermissionsForm

export const NewAddOrEditUserPermissionsForm = observer(
  ({onCloseModal, onSubmit, permissionsToSelect, permissionGroupsToSelect, sourceData}) => {
    const classNames = useClassNames()

    const permissionsIdsFromGroups = permissionGroupsToSelect.reduce(
      (ac, cur) => (ac = [...ac, ...cur.permissions.map(el => el._id)]),
      [],
    )

    const otherPermissionsGroup = {
      key: 'WITHOUT_GROUP',
      title: 'Без группы',
      permissions: permissionsToSelect.filter(el => !permissionsIdsFromGroups.includes(el._id)),
      hierarchy: 999,
    }

    const groupsToSelect = (
      otherPermissionsGroup.permissions.length
        ? [...permissionGroupsToSelect, otherPermissionsGroup]
        : [...permissionGroupsToSelect]
    ).sort((a, b) => a.hierarchy - b.hierarchy)

    const [formFields, setFormFields] = useState(sourceData?.permissions || [])

    const onChangePermissionCheckbox = id => {
      if (!formFields.includes(id)) {
        setFormFields([...formFields, id])
      } else {
        const newArr = formFields.filter(el => el !== id)
        setFormFields([...newArr])
      }
    }

    const [rightSide, setRightSide] = useState(groupsToSelect[0])

    const onSetRightSide = item => {
      setRightSide(item)
    }

    const onClickLeftCheckbox = item => {
      if (item.permissions.some(el => formFields.includes(el._id))) {
        const checkedPerms = item.permissions.filter(el => formFields.includes(el._id))

        const checkedPermsIds = checkedPerms.map(el => el._id)

        const filteredFormFields = formFields.filter(el => !checkedPermsIds.includes(el))

        setFormFields([...filteredFormFields])
      } else {
        const permsToCheckIds = item.permissions.map(el => el._id)

        setFormFields([...formFields, ...permsToCheckIds])
      }
    }

    const submitDisabled =
      (!formFields.length && !sourceData?.permissions.length) ||
      JSON.stringify(formFields.slice().sort()) === JSON.stringify(sourceData?.permissions.slice().sort())

    return (
      <div className={classNames.root}>
        <Typography variant="h5">{textConsts.mainTitle}</Typography>

        <div className={classNames.form}>
          <div className={classNames.leftSideWrapper}>
            {groupsToSelect.map(item => (
              <div key={item._id} className={classNames.permissionGroupsToSelectItemWrapper}>
                <div
                  className={clsx(classNames.permissionGroupsToSelectItem, {
                    [classNames.selectedItem]: rightSide.key === item.key,
                  })}
                  onClick={() => onSetRightSide(item)}
                >
                  <ListItemText primary={`${item.title}`} />
                </div>

                <div
                  className={clsx(
                    classNames.permissionGroupsToSelectCheckboxWrapper,
                    {
                      [classNames.selectedItem]: rightSide.key === item.key,
                    },
                    {
                      [classNames.tabWillBeOpened]: formFields.includes(
                        item.permissions.find(el => el.key.startsWith('SHOW_'))?._id,
                      ),
                    },
                  )}
                  onClick={() => onClickLeftCheckbox(item)}
                >
                  <Checkbox
                    color="primary"
                    checked={item.permissions.every(el => formFields.includes(el._id))}
                    indeterminate={
                      item.permissions.some(el => formFields.includes(el._id)) &&
                      !item.permissions.every(el => formFields.includes(el._id))
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <Divider flexItem orientation={'vertical'} className={classNames.divider} />

          <div className={classNames.rightSideWrapper}>
            <Typography>{rightSide?.title}</Typography>

            {rightSide?.permissions
              ?.sort((a, b) => a.hierarchy - b.hierarchy)
              .map(item => (
                <Tooltip
                  key={item.key}
                  followCursor
                  arrow
                  title={item.description}
                  placement="top-start"
                  TransitionComponent={Zoom}
                  TransitionProps={{timeout: 900}}
                >
                  <Box className={classNames.permissionWrapper} onClick={() => onChangePermissionCheckbox(item._id)}>
                    <Checkbox color="primary" checked={formFields.includes(item._id)} />
                    <Typography className={clsx({[classNames.keyPermission]: item.key.startsWith('SHOW_')})}>
                      {item.title}
                    </Typography>
                  </Box>
                </Tooltip>
              ))}
          </div>
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            disableElevation
            disabled={submitDisabled}
            color="primary"
            variant="contained"
            onClick={() => {
              onSubmit(formFields, sourceData._id)
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
