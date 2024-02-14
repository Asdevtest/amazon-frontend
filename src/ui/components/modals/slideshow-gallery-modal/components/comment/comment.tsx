import { FC, memo } from 'react'

import { useStyles } from './comment.style'

interface CommentProps {}

export const Comment: FC<CommentProps> = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.textContainer}>
      <p className={styles.text}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio tempore exercitationem ab nesciunt molestiae
        earum mollitia voluptatum rem, minima itaque laborum non, omnis veritatis ex ipsam, totam soluta delectus harum
        fugiat qui. Earum ut, corrupti odio ipsum nobis officiis unde reiciendis explicabo? Nostrum minus, fugiat
        temporibus vel veniam voluptates eaque.
      </p>
    </div>
  )
})
