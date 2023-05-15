/* eslint-disable no-unused-vars */
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'
import {Link as RouterLink, useHistory, useLocation} from 'react-router-dom'

import {overallRoutesConfigs, privateRoutesConfigs} from '@constants/routes'
import {TranslationKey} from '@constants/translations/translation-key'

import {SettingsModel} from '@models/settings-model'

import {t} from '@utils/translations'

import {useClassNames} from './bread-crumbs-line.style'

const exclusionWords = [
  '/client',
  '/freelancer',
  '/admin',
  '/buyer',
  '/supervisor',
  '/warehouse',
  '/researcher',
  '/moderator',
]

export const BreadCrumbsLine = observer(({lastCrumbAdditionalText, savedLastCrumbAdditionalText}) => {
  const {classes: classNames} = useClassNames()

  const hostory = useHistory()

  const location = useLocation()
  const pathnames = SettingsModel.breadcrumbsForProfile
    ? SettingsModel.breadcrumbsForProfile.split('/').filter(x => x)
    : []

  const allRoutesConfigs = [...privateRoutesConfigs, ...overallRoutesConfigs]

  const getCrumbNameKey = path => allRoutesConfigs.find(el => el.routePath === path)?.crumbNameKey || '---'

  const onClickCrumb = (to, isPreLast, index) => {
    if (isPreLast && index !== 1) {
      // hostory.goBack()
      hostory.push(to)
    } else {
      hostory.push(to)
    }
  }
  if (location.pathname === '/profile') {
    pathnames.push('profile')
  }

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" className={classNames.seporatorIcon} />}
    >
      {pathnames.length > 2 || location.pathname === '/profile'
        ? pathnames.map((value, index) => {
            const last = index === pathnames.length - 1
            const isPreLast = index === pathnames.length - 2

            const to =
              location.pathname === '/profile' && last ? '/profile' : `/${pathnames.slice(0, index + 1).join('/')}`

            if (exclusionWords.includes(to)) {
              return null
            }

            return last ? (
              <Typography key={to} className={classNames.lastCrumb}>
                {t(getCrumbNameKey(to)) + `${lastCrumbAdditionalText ? lastCrumbAdditionalText : ''}`}
              </Typography>
            ) : (
              // <LinkRouter key={to} underline="hover" color="primary" to={to} state={{data: 'HELLO'}}>
              //   {t(getCrumbNameKey(to))}
              // </LinkRouter>

              <Typography key={to} className={classNames.сrumb} onClick={() => onClickCrumb(to, isPreLast, index)}>
                {getCrumbNameKey(to) === 'Order'
                  ? `${t(TranslationKey.Order)} ${savedLastCrumbAdditionalText ? savedLastCrumbAdditionalText : ''}`
                  : t(getCrumbNameKey(to))}
              </Typography>
            )
          })
        : null}
    </Breadcrumbs>
  )
})
