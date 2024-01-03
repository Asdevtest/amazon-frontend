/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, memo, useEffect, useState } from 'react'

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Menu } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Checkbox } from '@components/shared/checkbox'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { useStyles } from './data-grid-table-setting.style'

import { DataGridTableSettingProps } from './helpers/interfaces'
import { SwitcherSetting, switcherConfig } from './helpers/switcher-setting'

export const DataGridTableSetting: FC<DataGridTableSettingProps> = memo(({ columsBtnSettings, presetsSettings }) => {
  const { classes: styles } = useStyles()

  const { presetsData, currentPreset } = presetsSettings
  const { columnsModel, columnVisibilityModel, onColumnVisibilityModelChange } = columsBtnSettings

  const [menuAnchor, setMenuAnchor] = useState(null)
  const [nameSearchValue, setNameSearchValue] = useState('')
  const [switcherValue, setSwitcherValue] = useState(SwitcherSetting.STANDARD)

  const isSomeItemChecked = columnVisibilityModel && Object.values(columnVisibilityModel).some(el => el === false)

  const itemsForRender = columnsModel.filter(item =>
    item?.headerName?.toLowerCase()?.includes(nameSearchValue?.toLowerCase()),
  )

  const isAdditionalMode = switcherValue === SwitcherSetting.ADDITIONAL

  const onClickAllItemBtn = () =>
    onColumnVisibilityModelChange(columnsModel.reduce((ac, cur) => ({ ...ac, [cur?.field]: isSomeItemChecked }), {}))

  const handleClose = () => {
    setMenuAnchor(null)
    setNameSearchValue('')
  }

  const onClickItem = (field: string, value: boolean) =>
    onColumnVisibilityModelChange({
      ...columnVisibilityModel,
      [field]: value,
    })

  return (
    <>
      <Button
        variant="text"
        className={styles.parametersButton}
        onClick={(event: any) => setMenuAnchor(event.currentTarget)}
      >
        <SettingsOutlinedIcon fontSize="small" className={styles.parametersButtonIcon} />

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

          <CustomSwitcher
            fullWidth
            switchMode={'medium'}
            condition={switcherValue}
            switcherSettings={switcherConfig}
            changeConditionHandler={value => setSwitcherValue(value as SwitcherSetting)}
          />

          <SearchInput inputClasses={styles.searchInput} onChange={e => setNameSearchValue(e.target.value)} />

          <div className={styles.parametersWrapper}>
            {!isAdditionalMode && (
              <Checkbox checked={!columnVisibilityModel || !isSomeItemChecked} onChange={onClickAllItemBtn}>
                <p title={t(TranslationKey.All)} className={styles.parameterTitle}>
                  {t(TranslationKey.All)}
                </p>
              </Checkbox>
            )}

            {!isAdditionalMode &&
              itemsForRender.map((el, index) => (
                <Checkbox
                  key={index}
                  checked={!columnVisibilityModel || columnVisibilityModel?.[el?.field]}
                  onChange={event => onClickItem(el.field, event.target.checked)}
                >
                  {el.headerName}
                </Checkbox>
              ))}

            {isAdditionalMode &&
              presetsData.map((preset, presetIndex) => (
                <div key={presetIndex}>
                  <p>{preset.table}</p>

                  {preset.fields.map((field, fieldIndex) => (
                    <Checkbox
                      key={fieldIndex}
                      // checked={!columnVisibilityModel || columnVisibilityModel?.[el?.field]}
                      // onChange={event => onClickItem(el.field, event.target.checked)}
                    >
                      {field}
                    </Checkbox>
                  ))}
                </div>
              ))}
          </div>

          {isAdditionalMode && (
            <div className={styles.additionalButtonsWrapper}>
              <Button
                danger
                btnWrapperStyle={styles.buttonWrapper}
                className={styles.additionalButton}
                onClick={handleClose}
              >
                {t(TranslationKey['Reset Settings'])}
              </Button>

              <Button btnWrapperStyle={styles.buttonWrapper} className={styles.additionalButton} onClick={handleClose}>
                {t(TranslationKey.Save)}
              </Button>
            </div>
          )}
        </Menu>
      )}
    </>
  )
})
