import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import React from 'react'

import {observer} from 'mobx-react'
import {Link as RouterLink, useHistory, useLocation} from 'react-router-dom'

import {useClassNames} from './bread-crumbs-line.style'

// const breadcrumbNameMap = {
//   '/inbox': 'Inbox',
//   '/inbox/important': 'Important',
//   '/trash': 'Trash',
//   '/spam': 'Spam',
//   '/drafts': 'Drafts',
// }

const breadcrumbNameMap = {
  '/client/dashboard': 'dashboard',
  '/requests/my': 'MY REQ',
  '/vacant-requests': 'VAC',
  '/requests/my-proposals': 'REQ my',
  '/client': 'client',
  '/client/inventory': 'invent',
  '/client/orders': 'ORDERS',
  '/client/orders/order': 'ORDER',
}

const exclusionWords = ['/client']

export const BreadCrumbsLine = observer(() => {
  const classNames = useClassNames()

  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  const history = useHistory()

  console.log('history', history)

  console.log('pathnames', pathnames)

  const LinkRouter = props => <Link {...props} component={RouterLink} />

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
      <LinkRouter underline="hover" color="inherit" to="/dashboard">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        if (exclusionWords.includes(to)) {
          return null
        }

        return last ? (
          <Typography key={to} /* color="text.primary" */ className={classNames.lastCrumb}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter key={to} underline="hover" color="inherit" to={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        )
      })}
    </Breadcrumbs>
  )
})
