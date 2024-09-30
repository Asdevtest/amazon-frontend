import { Dropdown, MenuProps, Space } from 'antd'
import { FC, memo, useCallback, useMemo } from 'react'

import { SettingsModel } from '@models/settings-model/settings-model.js'

import { setI18nConfig } from '@utils/translations'

import { LanguageKey } from '@typings/enums/language-key'

import { useStyles } from './language-select.style'

export const LanguageSelect: FC = memo(() => {
  const { classes: styles } = useStyles()

  const handleToggleLanguage = useCallback((lang: string) => {
    SettingsModel.setLanguageTag(lang)
    setI18nConfig()
  }, [])

  const items: MenuProps['items'] = useMemo(
    () =>
      Object.values(LanguageKey).map((key: LanguageKey) => ({
        key,
        label: <span className={styles.label}>{key}</span>,
        icon: <img src={`/assets/icons/${key}.svg`} alt={key} className={styles.flag} />,
        onClick: () => handleToggleLanguage(key),
      })) || [],
    [],
  )

  return (
    <Dropdown
      arrow
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [SettingsModel.languageTag],
      }}
      trigger={['click']}
      placement="bottom"
    >
      <a onClick={e => e.preventDefault()}>
        <Space>
          <img
            src={`/assets/icons/${SettingsModel.languageTag}.svg`}
            alt={SettingsModel.languageTag}
            className={styles.flag}
          />
        </Space>
      </a>
    </Dropdown>
  )
})
