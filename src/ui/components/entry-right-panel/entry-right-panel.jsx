import React, {useEffect} from 'react'

import {Divider, Typography} from '@material-ui/core'
import {useFaviconNotification} from 'react-favicon-notification'

import {LanguageSelector} from '@components/language-selector/language-selector.jsx'

import {useClassNames} from './entry-right-panel.style.js'

export const EntryRightPanel = ({onClickRedirect, redirect, title, children}) => {
  const classNames = useClassNames()

  const [config, setConfig] = useFaviconNotification()

  useEffect(() => {
    setConfig({...config, show: false})
  }, [])

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
    </div>
  )
}
