import React, {useState} from 'react'

import {Typography, Avatar as AvatarMui} from '@material-ui/core'
import clsx from 'clsx'
import Avatar from 'react-avatar-edit'

import {Button} from '@components/buttons/button'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {useClassNames} from './avatar-editor-form.style'

export const AvatarEditorForm = ({onSubmit, onCloseModal}) => {
  const classNames = useClassNames()

  const [showInfoModal, setShowInfoModal] = useState(false)

  const [showInfoModalText, setShowInfoModalText] = useState('')

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
      setShowInfoModalText('Файл слишком большой!')
      setShowInfoModal(true)
      elem.target.value = ''
    } else if (
      ![
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/ico',
        'image/gif',
        'image/svg',
        'image/webp',
        'image/avif',
      ].includes(elem.target.files[0].type)
    ) {
      setShowInfoModalText('Неподходящий формат!')
      setShowInfoModal(true)
      elem.target.value = ''
    }
  }

  return (
    <div className={classNames.root}>
      <Typography variant="h4">{'Загрузить фотографию'}</Typography>

      <div className={classNames.mainWrapper}>
        <Avatar
          width={320}
          height={210}
          labelStyle={{
            width: '100%',
            backgroundColor: '#EBEBEB',
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

        <div className={classNames.imgWrapper}>
          <AvatarMui className={classNames.img} src={state.preview} />
        </div>
      </div>

      <div className={classNames.textsWrapper}>
        <Typography className={clsx({[classNames.successText]: state.preview})}>
          {`Размер изображения не должен превышать`} {<span className={classNames.spanText}>{'15 Мб.'}</span>}
        </Typography>

        <Typography className={clsx({[classNames.successText]: state.preview})}>
          {'Допустимые форматы изображений '}
          {'('}
          {<span className={classNames.spanText}>{`'jpeg', 'jpg', 'png', 'webp', 'gif', 'ico', 'svg', 'avif'`}</span>}
          {')'}
        </Typography>
      </div>

      <div className={classNames.btnsWrapper}>
        <Button disabled={!state.preview} onClick={() => onSubmit(state.preview)}>
          {'Загрузить фотографию'}
        </Button>

        <Button variant="text" className={classNames.cancelBtn} onClick={onCloseModal}>
          {'Отмена'}
        </Button>
      </div>

      <WarningInfoModal
        openModal={showInfoModal}
        setOpenModal={() => setShowInfoModal(!showInfoModal)}
        title={showInfoModalText}
        btnText={'Ок'}
        onClickBtn={() => {
          setShowInfoModal(!showInfoModal)
        }}
      />
    </div>
  )
}
