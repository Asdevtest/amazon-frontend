import { Avatar } from 'antd'
import { memo } from 'react'
import { components } from 'react-select'

import { useStyles } from '../add-new-chat-by-email-form.style'

export const MultiValueContainer = memo(props => {
  const { classes: styles } = useStyles()

  return (
    <components.MultiValueContainer {...props}>
      {[
        <Avatar
          key={props.key}
          src={props.data.img}
          className={styles.avatarWrapper}
          style={{ width: 20, height: 20 }}
        />,

        ...props.children,
      ]}
    </components.MultiValueContainer>
  )
})
