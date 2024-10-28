import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import { useHistory, useLocation } from 'react-router-dom'

import Breadcrumbs from '@mui/material/Breadcrumbs'

import { LOCAL_STORAGE_KEYS } from '@constants/keys/local-storage'
import { overallRoutesConfigs, privateRoutesConfigs } from '@constants/navigation/routes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { t } from '@utils/translations'

import { useStyles } from './bread-crumbs-line.style'

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

export const BreadCrumbsLine = observer(() => {
  const { classes: styles } = useStyles()
  const location = useLocation()
  const history = useHistory()
  const breadcrumbsKey = LOCAL_STORAGE_KEYS.LAST_BREADCRUMBS_TEXT
  const savedLastCrumbAdditionalText = localStorage.getItem(breadcrumbsKey)
  const breadcrumbsAdditionalText = SettingsModel.lastCrumbAdditionalText

  useEffect(() => {
    if (location.pathname !== '/profile') {
      SettingsModel.setBreadcrumbsForProfile(location.pathname)
    }
  }, [location.pathname])

  useEffect(() => {
    if (breadcrumbsAdditionalText !== undefined) {
      localStorage.setItem(breadcrumbsKey, breadcrumbsAdditionalText)
    }
  }, [breadcrumbsAdditionalText])

  const pathnames = SettingsModel.breadcrumbsForProfile
    ? SettingsModel.breadcrumbsForProfile.split('/').filter(x => x)
    : []

  const allRoutesConfigs = [...privateRoutesConfigs, ...overallRoutesConfigs]

  const getCrumbNameKey = path => allRoutesConfigs.find(el => el.routePath === path)?.crumbNameKey || '---'

  const onClickCrumb = (to, isPreLast, index) => {
    if (isPreLast && index !== 1) {
      history.push(to)
    } else {
      history.push(to)
    }
  }
  if (location.pathname === '/profile') {
    pathnames.push('profile')
  }

  return (
    <div className={styles.breadCrumbsWrapper}>
      {pathnames.length > 2 || location.pathname === '/profile' ? (
        <Breadcrumbs aria-label="breadcrumb" separator={<MdNavigateNext className={styles.seporatorIcon} />}>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1
            const isPreLast = index === pathnames.length - 2

            const to =
              location.pathname === '/profile' && last ? '/profile' : `/${pathnames.slice(0, index + 1).join('/')}`

            if (exclusionWords.includes(to)) {
              return null
            }

            return last ? (
              <p key={to} className={styles.lastCrumb}>
                {t(getCrumbNameKey(to)) + `${breadcrumbsAdditionalText ? breadcrumbsAdditionalText : ''}`}
              </p>
            ) : (
              <p key={to} className={styles.crumb} onClick={() => onClickCrumb(to, isPreLast, index)}>
                {getCrumbNameKey(to) === 'Order'
                  ? `${t(TranslationKey.Order)} ${savedLastCrumbAdditionalText ? savedLastCrumbAdditionalText : ''}`
                  : t(getCrumbNameKey(to))}
              </p>
            )
          })}
        </Breadcrumbs>
      ) : null}
    </div>
  )
})
