import React from 'react'

import {Container, Button, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './content-modal.style'

const textConsts = getLocalizedTexts(texts, 'en').subUsersModalContent

export const ContentModal = ({title, buttonLabel, setModalSubUser, setModalPermission}) => {
  const classNames = useClassNames()

  const renderPermissionBtn = (
    <Button disableElevation variant="contained" className={classNames.button} onClick={() => setModalPermission()}>
      {textConsts.manageBtn}
    </Button>
  )

  return (
    <Container disableGutters className={classNames.modalContainer}>
      <Typography variant="h3">{title}</Typography>

      <Field label={textConsts.email} type="email" />
      <Field label={textConsts.password} type="password" />
      <Field label={textConsts.rePassword} type="password" />
      <Field label={textConsts.fieldSecurity} inputComponent={renderPermissionBtn} />
      <div className={classNames.buttonWrapper}>
        <Button disableElevation variant="contained" className={classNames.button} onClick={() => setModalSubUser()}>
          {buttonLabel}
        </Button>
      </div>
    </Container>
  )
}
