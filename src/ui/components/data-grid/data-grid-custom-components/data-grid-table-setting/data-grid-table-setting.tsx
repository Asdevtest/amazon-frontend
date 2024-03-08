/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useState } from 'react'

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Menu } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

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

  return (
    <>
      <Button
        styleType={ButtonStyle.DEFAULT}
        className={styles.parametersButton}
        onClick={(event: any) => setMenuAnchor(event.currentTarget)}
      >
        <SettingsOutlinedIcon fontSize="small" />

        <p className={styles.parametersButtonTitle}>{t(TranslationKey.Parameters)}</p>
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
            <CustomSwitcher
              fullWidth
              switchMode={'medium'}
              condition={switcherValue}
              switcherSettings={switcherConfig}
              changeConditionHandler={value => setSwitcherValue(value as SwitcherSetting)}
            />
          )}

          <SearchInput inputClasses={styles.searchInput} onChange={e => setNameSearchValue(e.target.value)} />

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
