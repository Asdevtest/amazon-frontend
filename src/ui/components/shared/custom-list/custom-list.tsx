import { FC, memo } from 'react'
import { FaCircle } from 'react-icons/fa'

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
                <FaCircle size={10} className={styles.dot} />

                <ListItemText className={styles.listItemText}>{item}</ListItemText>
              </ListItem>
            ))
          : null}
      </List>
    </div>
  )
})
