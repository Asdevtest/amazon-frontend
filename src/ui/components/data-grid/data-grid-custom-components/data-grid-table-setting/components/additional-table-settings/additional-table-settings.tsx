import { FC, memo, useEffect, useState } from 'react'

import { Checkbox } from '@components/shared/checkbox'

import { IPresets, IPresetsSettings } from '../../helpers/interfaces'

interface AdditionalTableSettingsProps {
  presetsSettings: IPresetsSettings
}

export const AdditionalTableSettings: FC<AdditionalTableSettingsProps> = memo(({ presetsSettings }) => {
  const { presetsData } = presetsSettings

  const [dataForRender, setDataForRender] = useState<IPresets[] | undefined>(undefined)

  const onClickItem = (presetIndex: number, fieldIndex: number, value: boolean) =>
    setDataForRender(prev => {
      if (!prev) return

      const newDataForRender = [...prev]
      newDataForRender[presetIndex].fields[fieldIndex].checked = value
      return newDataForRender
    })

  useEffect(() => {
    setDataForRender(presetsData)
  }, [presetsData])

  return (
    <>
      {dataForRender?.map((preset, presetIndex) => (
        <div key={presetIndex}>
          <p>{preset.table}</p>

          {preset.fields.map((field, fieldIndex) => (
            <Checkbox
              key={fieldIndex}
              checked={field?.checked}
              onChange={event => onClickItem(presetIndex, fieldIndex, event.target.checked)}
            >
              {field.field}
            </Checkbox>
          ))}
        </div>
      ))}
    </>
  )
})
