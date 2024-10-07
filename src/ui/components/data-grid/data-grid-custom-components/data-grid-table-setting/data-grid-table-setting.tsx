/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, KeyboardEvent, memo, useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'

import { Menu } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './data-grid-table-setting.style'

import { AdditionalTableSettings, DefaultTableSettings } from './components'
import { SwitcherSetting, switcherConfig } from './switcher-setting'
import { DataGridTableSettingProps } from './type'

export const DataGridTableSetting: FC<DataGridTableSettingProps> = memo(({ columsBtnSettings, presetsSettings }) => {
  const { classes: styles } = useStyles()

  const [menuAnchor, setMenuAnchor] = useState(null)
  const [nameSearchValue, setNameSearchValue] = useState('')
  const [switcherValue, setSwitcherValue] = useState(SwitcherSetting.STANDARD)

  const isAdditionalMode = switcherValue === SwitcherSetting.ADDITIONAL

  const handleClose = () => {
    setMenuAnchor(null)
    setNameSearchValue('')
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key.toLowerCase()
    if (key === 'p' || key === 'п') {
      event.stopPropagation()
    }
  }

  return (
    <>
      <Button
        iconButton
        defaultButtonTooltip={t(TranslationKey.Parameters)}
        styleType={ButtonStyle.DEFAULT}
        className={styles.parametersButton}
        onClick={(event: any) => setMenuAnchor(event.currentTarget)}
      >
        <IoSettingsOutline size={20} />
      </Button>

      {Boolean(menuAnchor) && (
        <Menu
          anchorEl={menuAnchor}
          autoFocus={false}
          open={Boolean(menuAnchor)}
          classes={{ paper: styles.menu, list: styles.list }}
          onClose={handleClose}
        >
          <p className={styles.title}>{t(TranslationKey['Parameters of the table'])}</p>

          {!!presetsSettings && (
            <CustomRadioButton
              size="small"
              options={switcherConfig}
              value={switcherValue}
              onChange={e => setSwitcherValue(e.target.value)}
            />
          )}

          <CustomInputSearch
            allowClear
            wrapperClassName={styles.searchInput}
            onChange={e => setNameSearchValue(e.target.value.trim())}
            onKeyDown={handleKeyDown}
          />

          {isAdditionalMode ? (
            <AdditionalTableSettings
              presetsSettings={presetsSettings}
              nameSearchValue={nameSearchValue}
              handleClose={handleClose}
            />
          ) : (
            <DefaultTableSettings nameSearchValue={nameSearchValue} columsBtnSettings={columsBtnSettings} />
          )}
        </Menu>
      )}
    </>
  )
})
