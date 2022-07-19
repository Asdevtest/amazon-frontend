import React from 'react'

import {Typography} from '@material-ui/core'

import {Button} from '@components/buttons/button'

import {useClassNames} from './select-shops-modal.style'

export const SelectShopsModal = ({onClickSuccessBtn, onClickCancelBtn, title}) => {
  const classNames = useClassNames()

  const onSubmit = () => {
    onClickSuccessBtn()
  }

  return (
    <div>
      <div className={classNames.modalMessageWrapper}>
        <div className={classNames.titleWrapper}>
          <Typography paragraph variant="h5" className={classNames.title}>
            {title}
          </Typography>
        </div>

        <Typography paragraph className={classNames.modalMessage}>
          {'message'}
        </Typography>
        <div className={classNames.buttonsWrapper}>
          <Button
            success
            disableElevation
            className={classNames.button}
            // disabled={submitIsClicked}
            variant="contained"
            onClick={onSubmit}
          >
            {'ok'}
          </Button>

          <Button
            // disabled={submitIsClicked}
            className={classNames.cancelButton}
            variant={'text'}
            color="primary"
            onClick={onClickCancelBtn}
          >
            {'cancel'}
          </Button>
        </div>
      </div>
    </div>
  )
}
