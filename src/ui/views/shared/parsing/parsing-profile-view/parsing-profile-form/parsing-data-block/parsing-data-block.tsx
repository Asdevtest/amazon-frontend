import { Avatar } from 'antd'
import { FC, memo } from 'react'
import { AiOutlineUser } from 'react-icons/ai'

import { TranslationKey } from '@constants/translations/translation-key'

import { TextCell, UserMiniCell } from '@components/data-grid/data-grid-cells'
import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { IParsingProfile } from '@typings/models/parser/parsing-profile'

import { useStyles } from './parsing-data-block.style'

interface ParsingDataBlockProps {
  profile?: IParsingProfile
}

export const ParsingDataBlock: FC<ParsingDataBlockProps> = memo(props => {
  const { profile } = props

  const { classes: styles, cx } = useStyles()

  if (!profile?.shop) {
    return (
      <div className={cx(styles.wrapper, styles.empty)}>
        <Avatar size={64} icon={<AiOutlineUser />} />
        <p className={styles.text}>{t(TranslationKey['Nobody is approved for this profile yet.'])}</p>
      </div>
    )
  }

  return (
    <div className={cx(styles.wrapper, styles.content)}>
      <p className={styles.title}>{t(TranslationKey['Parsing data'])}</p>

      <div className={styles.info}>
        <TextCell text={profile?.shop?.name || ''} />

        <UserMiniCell userName={profile?.client?.name} userId={profile?.client?._id} />
      </div>

      <div className={styles.buttons}>
        <CustomButton size="small">{t(TranslationKey.Reset)}</CustomButton>
        <CustomButton danger size="small" type="primary">
          {t(TranslationKey.Stop)}
        </CustomButton>
      </div>
    </div>
  )
})
