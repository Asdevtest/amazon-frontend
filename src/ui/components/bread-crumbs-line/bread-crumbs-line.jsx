import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import React from 'react'

import {observer} from 'mobx-react'
import {Link as RouterLink, useLocation} from 'react-router-dom'

import {overallRoutesConfigs, privateRoutesConfigs} from '@constants/routes'

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

export const BreadCrumbsLine = observer(({lastCrumbAdditionalText}) => {
  const classNames = useClassNames()

  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  const LinkRouter = props => <Link {...props} component={RouterLink} />

  const allRoutesConfigs = [...privateRoutesConfigs, ...overallRoutesConfigs]

  const getCrumbNameKey = path => allRoutesConfigs.find(el => el.routePath === path)?.crumbNameKey || '---'

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" color="primary" />}>
      {pathnames.length > 2
        ? pathnames.map((value, index) => {
            const last = index === pathnames.length - 1
            const to = `/${pathnames.slice(0, index + 1).join('/')}`
            if (exclusionWords.includes(to)) {
              return null
            }

            return last ? (
              <Typography key={to} className={classNames.lastCrumb}>
                {t(getCrumbNameKey(to)) + `${lastCrumbAdditionalText ? lastCrumbAdditionalText : ''}`}
              </Typography>
            ) : (
              <LinkRouter key={to} underline="hover" color="primary" to={to}>
                {t(getCrumbNameKey(to))}
              </LinkRouter>
            )
          })
        : null}
    </Breadcrumbs>
  )
})
