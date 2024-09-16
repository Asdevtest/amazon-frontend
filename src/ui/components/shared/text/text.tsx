import { Popconfirm } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import Paragraph from 'antd/es/typography/Paragraph'
import { ChangeEvent, FC, MouseEvent, ReactNode, memo, useEffect, useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomTextarea } from '@components/shared/custom-textarea'

import { t } from '@utils/translations'

import { useHover } from '@hooks/use-hover'

import { useStyles } from './text.style'

/**
 * The emphasis is on the "Textarea" component, additional props for the "Text" component must be added.
 *
 * @returns {HTMLElement} Returns a custom Text component.
 */

interface TextCellProps extends TextAreaProps {
  text: string
  isCell?: boolean
  icon?: ReactNode
  color?: string
  center?: boolean
  copyable?: boolean
  editMode?: boolean
  textRows?: number
  className?: string
  textStyle?: React.CSSProperties
  type?: 'secondary' | 'success' | 'warning' | 'danger'
  onClickSubmit?: (id: string, comment?: string) => void
}

export const Text: FC<TextCellProps> = memo(props => {
  const {
    text,
    isCell,
    icon = null,
    color,
    center,
    copyable = true,
    rows = 3, // rows for Textarea compoent
    editMode,
    textRows = 3, // rows for Text component
    className,
    textStyle,
    type,
    onClickSubmit,
    ...restProps
  } = props

  const { classes: styles, cx } = useStyles()
  const [value, setValue] = useState<string>('')
  const [isHover, onMouseFunctions] = useHover()

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
  const handleExpand = (event: MouseEvent) => {
    event.stopPropagation()
  }
  const handleSubmit = () => {
    onClickSubmit?.(value)
    setValue('')
  }

  const isCopyable = !!text?.length && isHover && copyable

  const paragraph = (
    <div className={styles.container}>
      {icon}
      <Paragraph
        type={type}
        copyable={isCopyable}
        ellipsis={{ tooltip: text, rows: textRows, onExpand: handleExpand }}
        style={{ margin: 0, color, textAlign: center ? 'center' : 'left', ...textStyle }}
        className={className}
      >
        {text}
      </Paragraph>
      {editMode ? <MdOutlineEdit className={styles.icon} /> : null}
    </div>
  )

  return (
    <div {...onMouseFunctions} className={cx(styles.wrapper, { [styles.cell]: isCell })}>
      {editMode ? (
        <Popconfirm
          title=""
          icon={null}
          placement="bottomLeft"
          description={
            <CustomTextarea {...restProps} allowClear rows={rows} value={value} onChange={handleChangeValue} />
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
