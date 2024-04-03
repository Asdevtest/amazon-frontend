import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Input } from '@components/shared/input'

import { formatShortDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './header.style'

interface HeaderProps {
  formFields: IBox
  disabledPrepId: boolean
  onChangeField: (field: string) => (event: ChangeEvent<HTMLInputElement>) => void
}

export const Header: FC<HeaderProps> = memo(props => {
  const { formFields, disabledPrepId, onChangeField } = props

  const { classes: styles } = useStyles()

  const handleClearPrepId = () => {
    const event = { target: { value: '' } } as ChangeEvent<HTMLInputElement>
    onChangeField('prepId')(event)
  }

  const boxAndPrepIdTitle = `${t(TranslationKey.Box)} № ${formFields?.humanFriendlyId}/ prep id:`

  return (
    <div className={styles.wrapper}>
      <div className={styles.boxAndPrepIdContainer}>
        <p className={styles.boxAndPrepIdTitle}>{boxAndPrepIdTitle}</p>

        <Input
          disabled={disabledPrepId}
          className={styles.boxAndPrepIdInput}
          classes={{ input: styles.input }}
          inputProps={{ maxLength: 20 }}
          value={formFields?.prepId}
          placeholder="PREP ID"
          endAdornment={
            formFields?.prepId.length > 0 ? (
              <button className={styles.clearButton} onClick={handleClearPrepId}>
                ✕
              </button>
            ) : null
          }
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
