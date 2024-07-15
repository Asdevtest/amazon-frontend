import { ChangeEvent, FC, memo, useCallback, useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import { useGridApiContext } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { ITablePreset } from '@typings/models/user/table-preset'

import { useStyles } from './data-grid-presets.style'

import { PresetItem } from './preset-item'

interface PresetsMenuProps {
  presetsTableData: ITablePreset[]
  handleCreateTableSettingsPreset: (title: string) => void
  handleSetPresetActive: (presetId: string) => void
  handleDeleteTableSettingsPreset: (presetId: string) => void
  handleUpdateTableSettingsPreset: (presetId: string, body: any) => void
}

export const PresetsMenu: FC<PresetsMenuProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const {
    presetsTableData,
    handleCreateTableSettingsPreset,
    handleSetPresetActive,
    handleDeleteTableSettingsPreset,
    handleUpdateTableSettingsPreset,
  } = props

  const apiRef = useGridApiContext()

  const [createPresetTitle, setCreatePresetTitle] = useState<string>('')

  const convertedPresets = useMemo(() => {
    const defaultPreset = [{ title: t(TranslationKey['Without preset']), _id: null }] as unknown as ITablePreset[]

    return defaultPreset
      .concat(presetsTableData)
      ?.map(preset => ({ ...preset, label: preset?.title, value: preset?._id }))
  }, [presetsTableData])

  const onPresetTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setCreatePresetTitle(event.target.value),
    [],
  )

  const onClickUpdatePreset = useCallback(
    (presetId: string) => {
      handleUpdateTableSettingsPreset(presetId, apiRef.current?.getAllColumns())
      console.log(' apiRef.current?.getAllColumns()', apiRef.current?.getAllColumns())
    },
    [apiRef],
  )

  return (
    <CustomSelect
      options={convertedPresets}
      value={convertedPresets?.find(preset => preset?.activeSetting) || convertedPresets[0]}
      optionRender={preset => (
        <PresetItem
          preset={preset}
          handleDeletePreset={() => handleDeleteTableSettingsPreset(preset?.data?._id)}
          handleUpdatePreset={() => onClickUpdatePreset(preset?.data?._id)}
        />
      )}
      labelRender={preset => preset?.label}
      dropdownRender={menu => (
        <>
          {menu}

          <div className={cx(styles.createPresetWrapper)}>
            <CustomInput
              value={createPresetTitle}
              placeholder="Add a preset"
              maxLength={32}
              onChange={onPresetTitleChange}
              onKeyDown={e => e.stopPropagation()}
            />
            <CustomButton
              disabled={!createPresetTitle}
              icon={<FaPlus />}
              onClick={() => handleCreateTableSettingsPreset(createPresetTitle)}
            />
          </div>
        </>
      )}
      onChange={handleSetPresetActive}
    />
  )
})
