import { Tag, TagProps, Tooltip } from 'antd'
import { FC, PropsWithChildren, memo } from 'react'

import { useStyles } from './custom-tag.style'

interface CustomTagProps extends TagProps, PropsWithChildren {
  title?: string
  color?: string
  tooltipText?: string
  prefix?: string
  className?: string
  onClickTag?: () => void
}

export const CustomTag: FC<CustomTagProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { color, tooltipText, prefix = '', title, className, onClickTag, children, ...restProps } = props

  const TagComponent = (
    <Tag
      color={color}
      className={cx(styles.tagItem, { [styles.activeButton]: !!onClickTag }, className)}
      onClick={onClickTag}
      {...restProps}
    >
      <p className={styles.tagTitle}>{`${prefix}${title}`}</p>
    </Tag>
  )

  return (
    <>
      {tooltipText ? (
        <Tooltip placement="top" title={tooltipText}>
          {TagComponent}
        </Tooltip>
      ) : (
        TagComponent
      )}
    </>
  )
})
