import { FC, memo, useCallback, useEffect, useMemo, useRef } from 'react'

import { useGridApiContext } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { ITablePreset } from '@typings/models/user/table-preset'
import { IGridColumn } from '@typings/shared/grid-column'

import { useStyles } from './data-grid-presets.style'

import { DropdownSelect } from './dropdown-select'
import { PresetItem } from './preset-item'

interface PresetsMenuProps {
  showPresetsSelect: boolean
  presetsTableData: ITablePreset[]
  handleChangeSelectState: (value: boolean) => void
  handleCreateTableSettingsPreset: (title: string, colomns: IGridColumn[]) => void
  handleSetPresetActive: (presetId: string) => void
  handleDeleteTableSettingsPreset: (preset: ITablePreset) => void
  onClickAddQuickAccess: (preset: ITablePreset) => void
  handleUpdateTableSettingsPreset: (presetId: string, colomns: IGridColumn[]) => void
  onClickSaveRenamedPreset: (preset: ITablePreset, newTitle: string) => void
}

export const PresetsMenu: FC<PresetsMenuProps> = memo(props => {
  const { classes: styles } = useStyles()
  const {
    showPresetsSelect,
    presetsTableData,
    handleChangeSelectState,
    handleCreateTableSettingsPreset,
    handleSetPresetActive,
    handleDeleteTableSettingsPreset,
    handleUpdateTableSettingsPreset,
    onClickAddQuickAccess,
    onClickSaveRenamedPreset,
  } = props

  const apiRef = useGridApiContext()
  const selectWrapperRef = useRef<HTMLDivElement | null>(null)

  const convertedPresets = useMemo(() => {
    const defaultPreset = [{ title: t(TranslationKey['Without preset']), _id: null }] as unknown as ITablePreset[]

    return defaultPreset
      .concat(presetsTableData)
      ?.map(preset => ({ ...preset, label: preset?.title, value: preset?._id }))
  }, [showPresetsSelect, presetsTableData])

  const onClickUpdatePreset = useCallback(
    (presetId: string) => {
      handleUpdateTableSettingsPreset(presetId, apiRef.current?.getAllColumns())
    },
    [apiRef],
  )

  useEffect(() => {
    if (showPresetsSelect) {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectWrapperRef.current && !selectWrapperRef.current?.contains(event?.target as Node)) {
          handleChangeSelectState(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showPresetsSelect])

  return (
    <div ref={selectWrapperRef} id="presets" onClick={() => handleChangeSelectState(!showPresetsSelect)}>
      <CustomSelect
        showSearch
        className={styles.presetsSelect}
        getPopupContainer={() => document.getElementById('presets') as HTMLElement}
        open={showPresetsSelect}
        options={convertedPresets}
        value={convertedPresets?.find(preset => preset?.activeSetting) || convertedPresets[0]}
        filterOption={(inputValue, option) =>
          (option?.label as string)?.toLowerCase?.()?.includes(inputValue?.toLowerCase())
        }
        optionRender={preset => (
          <PresetItem
            preset={preset}
            handleDeletePreset={() => handleDeleteTableSettingsPreset(preset?.data as ITablePreset)}
            handleUpdatePreset={() => onClickUpdatePreset(preset?.data?._id)}
            onClickAddQuickAccess={() => onClickAddQuickAccess(preset?.data as ITablePreset)}
            onClickSaveRenamedPreset={(newTitle: string) =>
              onClickSaveRenamedPreset(preset?.data as ITablePreset, newTitle)
            }
          />
        )}
        labelRender={preset => preset?.label}
        dropdownRender={menu => (
          <DropdownSelect handleCreateTableSettingsPreset={handleCreateTableSettingsPreset}>{menu}</DropdownSelect>
        )}
        onChange={handleSetPresetActive}
      />
    </div>
  )
})
