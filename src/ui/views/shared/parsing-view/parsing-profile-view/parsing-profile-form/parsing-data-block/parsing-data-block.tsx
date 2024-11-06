import { Avatar } from 'antd'
import { FC, memo } from 'react'
import { AiOutlineUser, AiTwotoneShop } from 'react-icons/ai'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserCell } from '@components/data-grid/data-grid-cells'
import { CustomButton } from '@components/shared/custom-button'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { ICreatedBy } from '@typings/shared/created-by'

import { useStyles } from './parsing-data-block.style'

interface ParsingDataBlockProps {
  onResetParsingData: () => void
  onToggleParsingData: () => void
  shop?: ICreatedBy | null
  client?: ICreatedBy | null
  isActive?: boolean
  access?: boolean
}

export const ParsingDataBlock: FC<ParsingDataBlockProps> = memo(props => {
  const { onResetParsingData, onToggleParsingData, shop, client, isActive, access } = props

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
          <Text rows={1} copyable={false} text={shop?.name || ''} className={styles.shopName} />
        </div>

        <UserCell name={client?.name} id={client?._id} />
      </div>

      <div className={styles.buttons}>
        <CustomButton size="small" onClick={onResetParsingData}>
          {t(TranslationKey.Unlink)}
        </CustomButton>
        <CustomButton disabled={!access} danger={isActive} size="small" type="primary" onClick={onToggleParsingData}>
          {t(TranslationKey[isActive ? 'Stop' : 'Start'])}
        </CustomButton>
      </div>
    </div>
  )
})
