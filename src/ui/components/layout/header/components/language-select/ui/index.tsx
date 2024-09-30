import { SelectProps } from 'antd'
import { FC, memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CustomSelect } from '@components/shared/custom-select'

import { LanguageKey } from '@typings/enums/language-key'

import classes from './styles.module.scss'

export const LanguageSelect: FC = memo(() => {
  const { i18n } = useTranslation()

  const handleToggleLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang)
    },
    [i18n],
  )

  const options: SelectProps['options'] = useMemo(
    () =>
      Object.values(LanguageKey).map((key: LanguageKey) => ({
        label: (
          <p className={classes.option}>
            <img src={`/assets/icons/${key}.svg`} className={classes.flag} alt={key} />
            {key}
          </p>
        ),
        value: key,
      })) || [],
    [],
  )

  return <CustomSelect value={i18n.language} options={options} style={{ width: 80 }} onChange={handleToggleLanguage} />
})
