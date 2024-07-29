import { Avatar } from 'antd'
import { FC, memo } from 'react'
import { AiOutlineUser } from 'react-icons/ai'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './parsing-data-block.style'

interface ParsingDataBlockProps {
  isEdit?: boolean
}

export const ParsingDataBlock: FC<ParsingDataBlockProps> = memo(props => {
  const { isEdit } = props

  const { classes: styles } = useStyles()

  if (!isEdit) {
    return (
      <div className={styles.wrapper}>
        <Avatar size={64} icon={<AiOutlineUser />} />
        <p className={styles.text}>{t(TranslationKey['Nobody is approved for this profile yet.'])}</p>
      </div>
    )
  }

  return <div className={styles.wrapper}>parsing-data-block</div>
})
