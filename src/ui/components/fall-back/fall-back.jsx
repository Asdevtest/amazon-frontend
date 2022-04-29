/* eslint-disable no-unused-vars */
import React from 'react'

import {Typography} from '@material-ui/core'
import {Redirect, useHistory} from 'react-router-dom'

import {Button} from '@components/buttons/button'

import {useClassNames} from './fall-back.style'

export const FallBack = () => {
  const classNames = useClassNames()

  const history = useHistory()

  // console.log(history, history)

  // const onClickBack=()=>{

  //   window.history.back()

  //   history.goBack()

  //   history.push('/nonexistent-address') // для перехода на разрешенный роут другой роли
  // }

  return (
    <div className={classNames.root}>
      <div className={classNames.header}>
        <img className={classNames.logo} alt="company logo" src={'/assets/icons/logo-var-2.svg'} />
      </div>
      <div className={classNames.main}>
        <Typography className={classNames.title}>{'Иногда, чтобы идти вперёд, нужно сделать шаг назад.'}</Typography>

        <Typography>{'Вернитесь назад и перезагрузите страницу.'}</Typography>

        {/* <Button variant="contained"  onClick={onClickBack}>
          {'Назад'}
        </Button> */}
      </div>
    </div>
  )
}
