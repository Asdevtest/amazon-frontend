import { Popconfirm } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import Text from 'antd/es/typography/Text'
import { ChangeEvent, FC, memo, useEffect, useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomTextarea } from '@components/shared/custom-textarea'

import { t } from '@utils/translations'

import { useStyles } from './comment-cell.style'

interface CommentCellProps extends TextAreaProps {
  onClickSubmit: (id: string, comment?: string) => void
  text: string
}

export const CommentCell: FC<CommentCellProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { onClickSubmit, text, rows = 3, ...restProps } = props
  const [value, setValue] = useState('')

  useEffect(() => {
    if (text) {
      setValue(text)
    }
  }, [])

  const handleChangeValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  return (
    <div className={styles.wrapper}>
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
      >
        <div className={styles.container}>
          <Text className={styles.text}>{text}</Text>
          <MdOutlineEdit className={styles.icon} />
        </div>
      </Popconfirm>
    </div>
  )
})
