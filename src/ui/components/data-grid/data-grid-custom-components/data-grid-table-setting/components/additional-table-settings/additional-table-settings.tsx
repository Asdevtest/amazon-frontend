import { FC, memo, useEffect, useState } from 'react'

import { Checkbox } from '@components/shared/checkbox'

import { formatCamelCaseString } from '@utils/text'

import { useStyles } from './additional-table-settings.style'

import { IPresets, IPresetsSettings } from '../../type'
import { PresetsControlButtons } from '../presets-control-buttons/presets-control-buttons'

interface AdditionalTableSettingsProps {
  nameSearchValue: string
  presetsSettings: IPresetsSettings
  handleClose: () => void
}

export const AdditionalTableSettings: FC<AdditionalTableSettingsProps> = memo(
  ({ presetsSettings, nameSearchValue, handleClose }) => {
    const { classes: styles } = useStyles()

    const { presetsData } = presetsSettings

    const [dataForRender, setDataForRender] = useState<IPresets[]>([])

    const onClickItem = (presetIndex: number, fieldIndex: number, value: boolean) =>
      setDataForRender(prev => {
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

    useEffect(() => {
      if (nameSearchValue) {
        setDataForRender(
          presetsData?.map(preset => ({
            ...preset,
            fields: preset.fields.filter(field => field.name?.toLowerCase()?.includes(nameSearchValue?.toLowerCase())),
          })),
        )
      } else {
        setDataForRender(presetsData)
      }
    }, [nameSearchValue])

    return (
      <>
        <div className={styles.parametersWrapper}>
          {dataForRender?.map((preset, presetIndex) => (
            <div key={presetIndex}>
              <p>{formatCamelCaseString(preset.table)}</p>

              {preset.fields.map((field, fieldIndex) => (
                <Checkbox
                  key={fieldIndex}
                  checked={field?.checked}
                  onChange={event => onClickItem(presetIndex, fieldIndex, event.target.checked)}
                >
                  {field.name}
                </Checkbox>
              ))}
            </div>
          ))}
        </div>

        <PresetsControlButtons onClickResetPresets={onClickResetPresets} onClickSavePresets={onClickSavePresets} />
      </>
    )
  },
)
