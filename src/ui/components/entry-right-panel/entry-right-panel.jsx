import {Divider, Typography} from '@mui/material'

import React, {useEffect} from 'react'

import {useFaviconNotification} from 'react-favicon-notification'

import {LanguageSelector} from '@components/language-selector/language-selector.jsx'

import {useClassNames} from './entry-right-panel.style.js'

export const EntryRightPanel = ({onClickRedirect, redirect, title, children}) => {
  const {classes: classNames} = useClassNames()

  const [config, setConfig] = useFaviconNotification()

  useEffect(() => {
    setConfig({...config, show: false})
  }, []) // при разлогине скидывает счетчик уведомлений в иконке во вкладке браузера

  return (
    <div className={classNames.rightPanel}>
      <div className={classNames.formWrapper}>
        <div className={classNames.formHeader}>
          <Typography className={classNames.title}>{title}</Typography>
          <div className={classNames.redirectWrapper}>
            <Typography className={classNames.redirect} onClick={onClickRedirect}>
              {redirect}
            </Typography>

            <LanguageSelector />
          </div>
        </div>
        <Divider className={classNames.divider} />
        {children}
      </div>

      <Typography className={classNames.version}>{'version: 1.0.0'}</Typography>
    </div>
  )
}
