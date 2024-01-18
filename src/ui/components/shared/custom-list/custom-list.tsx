import { FC, memo } from 'react'

import CircleIcon from '@mui/icons-material/Circle'
import { List, ListItem, ListItemText, Typography } from '@mui/material'

import { useStyles } from './custom-list.style'

interface Props {
  dataList: string[]
  title: string
}

export const CustomList: FC<Props> = memo(({ dataList, title }) => {
  const { classes: styles } = useStyles()
  return (
    <div>
      <Typography className={styles.listTitle}>{title}</Typography>

      <List>
        {dataList
          ? dataList.map(item => (
              <ListItem key={item} className={styles.listItem}>
                <CircleIcon classes={{ root: styles.dot }} style={{ width: '8px' }} />

                <ListItemText className={styles.listItemText}>{item}</ListItemText>
              </ListItem>
            ))
          : null}
      </List>
    </div>
  )
})
