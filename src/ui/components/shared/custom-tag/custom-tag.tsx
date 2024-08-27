import { Tag, TagProps, Tooltip } from 'antd'
import { FC, memo } from 'react'

import { ITag } from '@typings/shared/tag'

import { useStyles } from './custom-tag.style'

interface CustomTagProps extends TagProps {
  tag: ITag
  onClickTag?: (tag: ITag) => void
  className?: string
  prefix?: string
  withTooltip?: boolean
}

export const CustomTag: FC<CustomTagProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { tag, withTooltip, prefix = '', className, onClickTag, ...restProps } = props
  const { title, color } = tag

  const TagComponent = (
    <Tag
      color={color}
      className={cx(styles.tagItem, { [styles.activeButton]: !!onClickTag }, className)}
      onClick={() => onClickTag?.(tag)}
      {...restProps}
    >
      {`${prefix}${title}`}
    </Tag>
  )

  return (
    <>
      {withTooltip ? (
        <Tooltip placement="top" title={title}>
          {TagComponent}
        </Tooltip>
      ) : (
        TagComponent
      )}
    </>
  )
})
