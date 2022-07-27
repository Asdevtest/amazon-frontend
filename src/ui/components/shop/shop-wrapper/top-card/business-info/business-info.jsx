import CircleIcon from '@mui/icons-material/Circle'

import React from 'react'

import {Box, List, ListItem, ListItemText, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {useClassNames} from './business-info.style'

export const BusinessInfo = observer(() => {
  const classNames = useClassNames()

  return (
    <Box className={classNames.businessInfoWrapper}>
      <Typography className={classNames.businessInfoTitle}>{'Бизнес начат'}</Typography>

      <div>
        <Typography className={classNames.businessInfoDate}>{'10 июля 2010 г.'}</Typography>
        <Typography className={classNames.businessInfoDateAgo}>{'( 11 лет 11 месяцев )'}</Typography>
      </div>
      <div>
        <Typography className={classNames.assetsTitle}>{'Активы, включенные в продажу'}</Typography>

        <List>
          <ListItem className={classNames.assetsListItem}>
            <CircleIcon color="primary" style={{width: '8px'}} />

            <ListItemText className={classNames.assetsListItemText}>{'Один домен перенаправления'}</ListItemText>
          </ListItem>
          <ListItem className={classNames.assetsListItem}>
            <CircleIcon color="primary" style={{width: '8px'}} />

            <ListItemText className={classNames.assetsListItemText}>
              {'Дополнительный домен и весь контент/файлы сайта'}
            </ListItemText>
          </ListItem>
          <ListItem className={classNames.assetsListItem}>
            <CircleIcon color="primary" style={{width: '8px'}} />

            <ListItemText className={classNames.assetsListItemText}>
              {
                'Аккаунты/страницы в социальных сетях (18 аккаунтов/страниц для Facebook, Twitter, Instagram, Pinterest, TikTok, Youtube, LinkedIn, PUBLC и Mewe)'
              }
            </ListItemText>
          </ListItem>
          <ListItem className={classNames.assetsListItem}>
            <CircleIcon color="primary" style={{width: '8px'}} />

            <ListItemText className={classNames.assetsListItemText}>
              {'Два списка адресов электронной почты (78 000+ подписчиков)'}
            </ListItemText>
          </ListItem>
          <ListItem className={classNames.assetsListItem}>
            <CircleIcon color="primary" style={{width: '8px'}} />

            <ListItemText className={classNames.assetsListItemText}>{'Пять фирменных электронных книг'}</ListItemText>
          </ListItem>
          <ListItem className={classNames.assetsListItem}>
            <CircleIcon color="primary" style={{width: '8px'}} />

            <ListItemText className={classNames.assetsListItemText}>{'Товарные знаки'}</ListItemText>
          </ListItem>
        </List>
      </div>
    </Box>
  )
})
