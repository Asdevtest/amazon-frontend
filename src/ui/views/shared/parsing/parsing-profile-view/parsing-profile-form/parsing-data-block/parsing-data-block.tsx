import { Avatar } from 'antd'
import { FC, memo } from 'react'
import { AiOutlineUser, AiTwotoneShop } from 'react-icons/ai'

import { TranslationKey } from '@constants/translations/translation-key'

import { TextCell, UserMiniCell } from '@components/data-grid/data-grid-cells'
import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { ICreatedBy } from '@typings/shared/created-by'

import { useStyles } from './parsing-data-block.style'

interface ParsingDataBlockProps {
  onResetParsingData: () => void
  onToggleParsingData: () => void
  shop?: ICreatedBy | null
  client?: ICreatedBy | null
  isActive?: boolean
}

export const ParsingDataBlock: FC<ParsingDataBlockProps> = memo(props => {
  const { onResetParsingData, onToggleParsingData, shop, client, isActive } = props

  const { classes: styles, cx } = useStyles()

  if (!shop) {
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
        <div className={styles.shop}>
          <AiTwotoneShop size="24" />
          <TextCell copyable={false} text={shop?.name || ''} />
        </div>

        <UserMiniCell userName={client?.name} userId={client?._id} />
      </div>

      <div className={styles.buttons}>
        <CustomButton size="small" onClick={onResetParsingData}>
          {t(TranslationKey.Reset)}
        </CustomButton>
        <CustomButton danger={isActive} size="small" type="primary" onClick={onToggleParsingData}>
          {t(TranslationKey[isActive ? 'Stop' : 'Start'])}
        </CustomButton>
      </div>
    </div>
  )
})
