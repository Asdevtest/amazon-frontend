import { Popconfirm } from 'antd'
import Link from 'antd/es/typography/Link'
import Paragraph, { ParagraphProps } from 'antd/es/typography/Paragraph'
import { ChangeEvent, FC, MouseEvent, ReactNode, memo, useEffect, useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomTextarea } from '@components/shared/custom-textarea'

import { t } from '@utils/translations'

import { useHover } from '@hooks/use-hover'

import { useStyles } from './text.style'

interface TextCellProps extends ParagraphProps {
  text: string
  isCell?: boolean
  icon?: ReactNode
  editMode?: boolean
  rows?: number
  link?: boolean
  maxTextareaLength?: number
  url?: string
  collapsible?: boolean
  onClickSubmit?: (id: string, comment?: string) => void
}

export const Text: FC<TextCellProps> = memo(props => {
  const {
    text,
    isCell,
    icon = null,
    copyable = true,
    editMode,
    rows = 3,
    style,
    link,
    color,
    maxTextareaLength = 255,
    url,
    collapsible,
    onClick,
    onClickSubmit,
    ...restProps
  } = props

  const { classes: styles, cx } = useStyles()
  const [value, setValue] = useState<string>('')
  const [isHover, onMouseFunctions] = useHover()
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (text) {
      setValue(String(text))
    }
  }, [text])

  const handleChangeValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setValue(text)
    }
  }
  const handleExpand = (event: MouseEvent, info: { expanded: boolean }) => {
    event.stopPropagation()
    setExpanded(info.expanded)
  }
  const handleSubmit = () => {
    onClickSubmit?.(value)
    setValue('')
  }

  const isCopyable = !!text && isHover && copyable

  const paragraph = (
    <div className={styles.container}>
      {icon}
      {link ? (
        <Link
          {...restProps}
          ellipsis
          href={url}
          target="_blank"
          onClick={e => {
            e.stopPropagation()
            onClick?.(e)
          }}
        >
          {text}
        </Link>
      ) : (
        <Paragraph
          {...restProps}
          copyable={isCopyable}
          ellipsis={{
            rows,
            expanded,
            expandable: collapsible ? 'collapsible' : false,
            symbol: t(TranslationKey[expanded ? 'Close' : 'Open']),
            tooltip: !collapsible && { destroyTooltipOnHide: true, arrow: false },
            onExpand: handleExpand,
          }}
          style={{
            color,
            margin: 0,
            ...style,
          }}
          onClick={onClick}
        >
          {text}
        </Paragraph>
      )}
      {editMode && isCell ? <MdOutlineEdit className={styles.icon} /> : null}
    </div>
  )

  return (
    <div
      {...onMouseFunctions}
      className={cx(styles.wrapper, { [styles.cell]: isCell })}
      onDoubleClick={e => editMode && e.stopPropagation()}
    >
      {editMode ? (
        <Popconfirm
          title=""
          icon={null}
          placement="bottomLeft"
          description={
            <CustomTextarea
              {...restProps}
              allowClear
              rows={rows}
              value={value}
              maxLength={maxTextareaLength}
              onChange={handleChangeValue}
            />
          }
          okText={t(TranslationKey.Save)}
          cancelText={t(TranslationKey.Cancel)}
          overlayClassName={styles.popconfirm}
          onConfirm={handleSubmit}
          onCancel={() => setValue(text)}
          onOpenChange={handleOpenChange}
        >
          {paragraph}
        </Popconfirm>
      ) : (
        paragraph
      )}
    </div>
  )
})
