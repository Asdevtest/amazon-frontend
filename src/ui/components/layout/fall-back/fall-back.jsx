import React from 'react'

import { Typography } from '@mui/material'

import { useClassNames } from './fall-back.style'

export const FallBack = () => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.root}>
      <div className={classNames.header}>
        <img className={classNames.logo} alt="company logo" src={'/assets/icons/logo-var-2.svg'} />
      </div>
      <div className={classNames.main}>
        <Typography className={classNames.title}>{'Иногда, чтобы идти вперёд, нужно сделать шаг назад.'}</Typography>

        <Typography>{'Вернитесь назад и перезагрузите страницу.'}</Typography>
      </div>
    </div>
  )
}
