import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'

import { t } from '@utils/translations'

import { useStyles } from './link.style'

interface LinkProps {
  linkInput: string
  linkInputError: boolean
  disabledLoadButton: boolean
  onLoadFile: () => void
  onChangeLink: (event: ChangeEvent<HTMLInputElement>) => void
  title?: string
  disabled?: boolean
  minimized?: boolean
  withoutTitles?: boolean
}

export const Link: FC<LinkProps> = memo(props => {
  const {
    linkInput,
    linkInputError,
    disabledLoadButton,
    onLoadFile,
    onChangeLink,
    title,
    disabled,
    minimized,
    withoutTitles,
  } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.linkInputWrapper, { [styles.linkInputWrapperMinimazed]: minimized })}>
      <Field
        disabled={disabled}
        placeholder={t(TranslationKey.Link)}
        tooltipInfoContent={t(TranslationKey['Ability to attach photos/documents/links'])}
        label={withoutTitles ? '' : title ? title : t(TranslationKey['Attach file'])}
        labelClasses={styles.label}
        error={linkInputError && t(TranslationKey['Invalid link!'])}
        containerClasses={styles.linkInputContainer}
        inputClasses={styles.linkInput}
        value={linkInput}
        onChange={onChangeLink}
      />

      <Button
        disabled={disabledLoadButton}
        tooltipInfoContent={t(TranslationKey['Adds a document/file from the entered link'])}
        className={styles.loadButton}
        onClick={onLoadFile}
      >
        {t(TranslationKey.Load)}
      </Button>
    </div>
  )
})
