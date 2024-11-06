import { ChangeEvent, FC, memo } from 'react'

import Tooltip from '@mui/material/Tooltip'

import { TranslationKey } from '@constants/translations/translation-key'

import { Input } from '@components/shared/input'
import { UserLink } from '@components/user/user-link'

import { getNewTariffTextForBoxOrOrder } from '@utils/text'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './info.style'

interface InfoProps {
  formFields?: IBox
  isStorekeeper: boolean
  onChangeField: (field: keyof IBox) => (event: ChangeEvent<HTMLInputElement>) => void
}

export const Info: FC<InfoProps> = memo(props => {
  const { formFields, isStorekeeper, onChangeField } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.informationContainer, { [styles.customGap]: isStorekeeper })}>
        <p className={styles.informationTitle}>{t(TranslationKey.Storage)}</p>
        {isStorekeeper ? (
          <Input
            disabled={!isStorekeeper}
            className={styles.storageInput}
            classes={{ input: styles.input }}
            inputProps={{ maxLength: 64 }}
            value={formFields?.storage}
            placeholder={t(TranslationKey['Not available'])}
            onChange={onChangeField('storage')}
          />
        ) : (
          <Tooltip title={formFields?.storage ? formFields?.storage : ''}>
            <p className={styles.informationText}>{formFields?.storage || t(TranslationKey['Not available'])}</p>
          </Tooltip>
        )}
      </div>

      <div className={styles.informationContainer}>
        <p className={styles.informationTitle}>{t(TranslationKey.Tariff)}</p>
        <Tooltip title={getNewTariffTextForBoxOrOrder(formFields)}>
          <p className={styles.informationText}>{getNewTariffTextForBoxOrOrder(formFields)}</p>
        </Tooltip>
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
        <Tooltip title={formFields?.destination?.name ? formFields?.destination?.name : ''}>
          <p className={styles.informationText}>
            {formFields?.destination?.name || t(TranslationKey['Not available'])}
          </p>
        </Tooltip>
      </div>

      <div className={styles.informationContainer}>
        <p className={styles.informationTitle}>{t(TranslationKey.Batch)}</p>
        <Tooltip title={formFields?.batch?.xid ? formFields?.batch?.xid : ''}>
          <p className={styles.informationText}>{formFields?.batch?.xid || t(TranslationKey['Not available'])}</p>
        </Tooltip>
      </div>
    </div>
  )
})
