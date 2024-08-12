import { FC, memo } from 'react'

import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { ITablePreset } from '@typings/models/user/table-preset'

interface QuickPresetsProps {
  presetsTableData: ITablePreset[]
  handleSetPresetActive: (presetId: string) => void
}

export const QuickPresets: FC<QuickPresetsProps> = memo(({ presetsTableData, handleSetPresetActive }) => {
  const presetsAddedToQuickAccess = presetsTableData?.filter(preset => preset?.isFavorite)
  const selectedPreset = presetsTableData?.find(preset => preset?.activeSetting)

  return (
    <>
      {presetsAddedToQuickAccess?.length ? (
        <CustomRadioButton
          size="small"
          buttonStyle="solid"
          options={presetsAddedToQuickAccess?.map(preset => ({ label: preset?.title, value: preset?._id }))}
          value={selectedPreset?._id}
          onChange={data => handleSetPresetActive(data?.target?.value)}
        />
      ) : null}
    </>
  )
})
