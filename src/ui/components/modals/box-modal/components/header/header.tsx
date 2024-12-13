import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Input } from '@components/shared/input'
import { Text } from '@components/shared/text'

import { formatShortDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './header.style'

interface HeaderProps {
  formFields?: IBox
  disabledPrepId: boolean
  onChangeField: (field: keyof IBox) => (event: ChangeEvent<HTMLInputElement>) => void
}

export const Header: FC<HeaderProps> = memo(props => {
  const { formFields, disabledPrepId, onChangeField } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <div className={styles.boxAndPrepIdContainer}>
        <p className={styles.boxAndPrepIdTitle}>
          {t(TranslationKey.Box)} №
          <Text text={String(formFields?.xid)} className={styles.boxAndPrepIdTitle} /> / prep id:
        </p>
        <Input
          disabled={disabledPrepId}
          className={styles.boxAndPrepIdInput}
          classes={{ input: styles.input }}
          inputProps={{ maxLength: 25 }}
          value={formFields?.prepId}
          placeholder={t(TranslationKey['Not available'])}
          onChange={onChangeField('prepId')}
        />
      </div>

      <div className={styles.updatedContainer}>
        <p className={styles.updatedText}>{`${t(TranslationKey.Updated)}:`}</p>
        <p className={styles.updatedTitle}>{formatShortDateTime(formFields?.updatedAt)}</p>
      </div>
    </div>
  )
})
