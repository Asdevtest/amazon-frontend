import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { Link } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value'
import { Input } from '@components/shared/input'

import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'

import { useDataGridCellStyles } from './copy-and-edit-link-cell.style'

interface CopyAndEditLinkCellProps {
  link: string
  isEdit?: boolean
  onChangeText: (key: string) => (value: string) => void
}

export const CopyAndEditLinkCell: FC<CopyAndEditLinkCellProps> = React.memo(({ link, isEdit, onChangeText }) => {
  const { classes: styles } = useDataGridCellStyles()

  const [value, setValue] = useState(link)

  useEffect(() => {
    setValue(link)
  }, [link])

  return (
    <>
      {isEdit ? (
        <div>
          <Input
            autoFocus={false}
            inputProps={256}
            placeholder={t(TranslationKey.Comment)}
            className={styles.changeInputComment}
            classes={{ input: styles.changeInputComment }}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value)

              if (onChangeText) {
                onChangeText('sourceFile')(e.target.value)
              }
            }}
            onKeyDown={(event: KeyboardEvent) => {
              event.stopPropagation()
            }}
          />
        </div>
      ) : value ? (
        <div className={styles.CopyLinkWrapper}>
          <Link target="_blank" rel="noopener" className={styles.linkText} href={checkAndMakeAbsoluteUrl(value)}>
            <p className={styles.linkTextClass}>{value}</p>
          </Link>

          <CopyValue text={value} />
        </div>
      ) : (
        <p>{t(TranslationKey.Missing)}</p>
      )}
    </>
  )
})
