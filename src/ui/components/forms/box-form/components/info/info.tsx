import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserLink } from '@components/user/user-link'

import { getNewTariffTextForBoxOrOrder } from '@utils/text'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './info.style'

interface InfoProps {
  formFields: IBox
  onChangeField: (field: string) => (event: ChangeEvent<HTMLInputElement>) => void
}

export const Info: FC<InfoProps> = memo(({ formFields }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.wrapper}>
      <div className={styles.informationContainer}>
        <p className={styles.informationTitle}>{t(TranslationKey.Storage)}</p>
        <p className={styles.informationText}>{t(TranslationKey['Not available'])}</p>
      </div>

      <div className={styles.informationContainer}>
        <p className={styles.informationTitle}>{t(TranslationKey.Tariff)}</p>
        <p className={styles.informationText}>
          {getNewTariffTextForBoxOrOrder(formFields) || t(TranslationKey['Not available'])}
        </p>
      </div>

      <div className={cx(styles.informationContainer, styles.informationContainerMinGap)}>
        <p className={styles.informationTitle}>{t(TranslationKey['Int warehouse'])}</p>
        <UserLink
          blackText
          withAvatar
          name={formFields?.storekeeper?.name}
          userId={formFields?.storekeeper?._id}
          customClassNames={styles.informationUser}
        />
      </div>

      <div className={styles.informationContainer}>
        <p className={styles.informationTitle}>{t(TranslationKey.Destination)}</p>
        <p className={styles.informationText}>{formFields?.destination?.name || t(TranslationKey['Not available'])}</p>
      </div>

      <div className={styles.informationContainer}>
        <p className={styles.informationTitle}>{t(TranslationKey.Batch)}</p>
        <p className={styles.informationText}>
          {formFields?.batch?.humanFriendlyId || t(TranslationKey['Not available'])}
        </p>
      </div>
    </div>
  )
})
