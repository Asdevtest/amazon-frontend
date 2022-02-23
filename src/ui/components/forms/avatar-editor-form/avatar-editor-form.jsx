import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import Avatar from 'react-avatar-edit'

import {Button} from '@components/buttons/button'

import {useClassNames} from './avatar-editor-form.style'

export const AvatarEditorForm = ({onSubmit, onCloseModal}) => {
  const classNames = useClassNames()

  const [state, setState] = useState({
    preview: null,
  })

  const onClose = () => {
    setState({preview: null})
  }

  const onCrop = preview => {
    setState({preview})
  }

  const onBeforeFileLoad = elem => {
    if (elem.target.files[0].size > 15728640) {
      alert('File is too big!')
      elem.target.value = ''
    }
  }

  return (
    <div className={classNames.root}>
      <Typography variant="h4">{'Установите свой аватар'}</Typography>

      <div className={classNames.mainWrapper}>
        <Avatar
          width={320}
          height={210}
          labelStyle={{
            width: '100%',
            textAlign: 'center',
            transition: '0.3s ease',
            cursor: 'pointer',
          }}
          borderStyle={{
            border: ' 3px dashed rgba(0,123, 255, .7)',
            transition: '0.3s ease',
            cursor: 'pointer',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
          }}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
        />

        {state.preview && (
          <div className={classNames.imgWrapper}>
            <img className={classNames.img} src={state.preview} alt="Preview" />

            <div className={classNames.btnsWrapper}>
              <Button onClick={() => onSubmit(state.preview)}>{'Сохранить'}</Button>
            </div>
          </div>
        )}
      </div>

      <Button onClick={onCloseModal}>{'Отмена'}</Button>
    </div>
  )
}
