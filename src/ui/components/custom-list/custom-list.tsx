import CircleIcon from '@mui/icons-material/Circle'

import React, {FC} from 'react'

import {List, ListItem, ListItemText, Typography} from '@material-ui/core'

import {useClassNames} from './custom-list.style'

interface Props {
  dataList: [string]
  title: string
}

export const CustomList: FC<Props> = ({dataList, title}) => {
  const classNames = useClassNames()
  return (
    <div>
      <Typography className={classNames.listTitle}>{title}</Typography>

      <List>
        {dataList
          ? dataList.map(item => (
              <ListItem key={item} className={classNames.listItem}>
                <CircleIcon classes={{root: classNames.dot}} style={{width: '8px'}} />

                <ListItemText className={classNames.listItemText}>{item}</ListItemText>
              </ListItem>
            ))
          : null}
      </List>
    </div>
  )
}
