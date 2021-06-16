import React from 'react'

import {Container, Button, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './admin-content-modal.style'

const textConsts = getLocalizedTexts(texts, 'en').subUsersModalContent

export const AdminContentModal = ({selectedUser, title, buttonLabel, closeModal, openPermissionModal}) => {
  const classNames = useClassNames()

  const renderPermissionBtn = (
    <Button disableElevation variant="contained" color="primary" onClick={() => openPermissionModal()}>
      {textConsts.manageBtn}
    </Button>
  )

  return (
    <Container disableGutters className={classNames.modalContainer}>
      <Typography paragraph variant="h3">
        {title + ' ' + selectedUser.email}
      </Typography>

      <Field label={textConsts.email} type="email" />
      <Field label={textConsts.password} type="password" />
      <Field label={textConsts.rePassword} type="password" />
      <Field label={textConsts.fieldSecurity} inputComponent={renderPermissionBtn} />

      <div className={classNames.buttonWrapper}>
        <Button disableElevation variant="contained" color="primary" onClick={closeModal}>
          {buttonLabel}
        </Button>
      </div>
    </Container>
  )
}
