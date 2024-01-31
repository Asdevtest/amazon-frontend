import { FC, memo, useEffect, useState } from 'react'

import { Checkbox } from '@components/shared/checkbox'

import { useStyles } from './additional-table-settings.style'

import { IPresets, IPresetsSettings } from '../../helpers/interfaces'
import { PresetsControlButtons } from '../presets-control-buttons/presets-control-buttons'

interface AdditionalTableSettingsProps {
  presetsSettings: IPresetsSettings
  handleClose: () => void
}

export const AdditionalTableSettings: FC<AdditionalTableSettingsProps> = memo(({ presetsSettings, handleClose }) => {
  const { classes: styles } = useStyles()

  const { presetsData } = presetsSettings

  const [dataForRender, setDataForRender] = useState<IPresets[] | undefined>([])

  const onClickItem = (presetIndex: number, fieldIndex: number, value: boolean) =>
    setDataForRender(prev => {
      if (!prev) return

      const newDataForRender = [...prev]
      newDataForRender[presetIndex].fields[fieldIndex].checked = value
      return newDataForRender
    })

  const onClickResetPresets = () => {
    handleClose()
    presetsSettings.onClickResetPresets()
  }

  const onClickSavePresets = () => {
    handleClose()
    presetsSettings.onClickSavePresets(dataForRender)
  }

  useEffect(() => {
    setDataForRender(presetsData)
  }, [presetsData])

  return (
    <>
      <div className={styles.parametersWrapper}>
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
      </div>

      <PresetsControlButtons onClickResetPresets={onClickResetPresets} onClickSavePresets={onClickSavePresets} />
    </>
  )
})
