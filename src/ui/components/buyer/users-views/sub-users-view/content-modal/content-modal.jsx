import React from 'react'

import {Container, Button, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './content-modal.style'

const textConsts = getLocalizedTexts(texts, 'en').subUsersModalContent

export const ContentModal = props => {
  const classNames = useClassNames()

  return (
    <Container disableGutters className={classNames.modalContainer}>
      <Typography variant="h3">{props.title}</Typography>
      <Field title={textConsts.email} type="email" />
      <Field title={textConsts.password} type="password" />
      <Field title={textConsts.rePassword} type="password" />
      <Field title={textConsts.fieldSecurity}>
        <Button
          disableElevation
          variant="contained"
          className={classNames.button}
          onClick={() => props.setModalPermission()}
        >
          {textConsts.manageBtn}
        </Button>
      </Field>
      <div className={classNames.buttonWrapper}>
        <Button
          disableElevation
          variant="contained"
          className={classNames.button}
          onClick={() => props.setModalSubUser()}
        >
          {props.buttonLabel}
        </Button>
      </div>
    </Container>
  )
}
