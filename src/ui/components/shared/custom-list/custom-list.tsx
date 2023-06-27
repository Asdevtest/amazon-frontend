import CircleIcon from '@mui/icons-material/Circle'
import { List, ListItem, ListItemText, Typography } from '@mui/material'

import React, { FC } from 'react'

import { useClassNames } from './custom-list.style'

interface Props {
  dataList: string[]
  title: string
}

export const CustomList: FC<Props> = ({ dataList, title }) => {
  const { classes: classNames } = useClassNames()
  return (
    <div>
      <Typography className={classNames.listTitle}>{title}</Typography>

      <List>
        {dataList
          ? dataList.map(item => (
              <ListItem key={item} className={classNames.listItem}>
                <CircleIcon classes={{ root: classNames.dot }} style={{ width: '8px' }} />

                <ListItemText className={classNames.listItemText}>{item}</ListItemText>
              </ListItem>
            ))
          : null}
      </List>
    </div>
  )
}
