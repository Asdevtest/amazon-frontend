import { Popconfirm } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import Paragraph from 'antd/es/typography/Paragraph'
import { ChangeEvent, FC, MouseEvent, memo, useEffect, useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomTextarea } from '@components/shared/custom-textarea'

import { t } from '@utils/translations'

import { useStyles } from './text-cell.style'

interface TextCellProps extends TextAreaProps {
  text: string
  onClickSubmit: (id: string, comment?: string) => void
  editMode?: boolean
}

export const TextCell: FC<TextCellProps> = memo(props => {
  const {
    text,
    rows = 3, // only for textarea, text - autocomplete 1-2-3 lines{}
    editMode,
    onClickSubmit,
    ...restProps
  } = props

  const { classes: styles } = useStyles()
  const [value, setValue] = useState('')

  useEffect(() => {
    if (text) {
      setValue(text)
    }
  }, [text])

  const handleChangeValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setValue(text)
    }
  }
  const handleExpand = (event: MouseEvent) => {
    event.stopPropagation()
  }

  const paragraph = (
    <div className={styles.container}>
      <Paragraph
        copyable={!!value?.length}
        ellipsis={{ tooltip: text, rows: 3, onExpand: handleExpand }}
        style={{ margin: 0 }}
      >
        {text}
      </Paragraph>
      {editMode ? <MdOutlineEdit className={styles.icon} /> : null}
    </div>
  )

  return (
    <div className={styles.wrapper}>
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
          onConfirm={() => onClickSubmit(value)}
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
