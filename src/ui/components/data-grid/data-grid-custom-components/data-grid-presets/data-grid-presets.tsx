import { ChangeEvent, FC, memo, useCallback, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'

import { ITablePreset } from '@typings/models/user/table-preset'

import { useStyles } from './data-grid-presets.style'

interface PresetsMenuProps {
  presetsTableData: ITablePreset[]
  onCreatePreset: (title: string) => void
}

export const PresetsMenu: FC<PresetsMenuProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { presetsTableData, onCreatePreset } = props

  const [createPresetTitle, setCreatePresetTitle] = useState<string>('')

  const onPresetTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setCreatePresetTitle(event.target.value),
    [],
  )

  console.log('presetsTableData', presetsTableData)

  for (const preset of presetsTableData) {
    delete preset.options
  }

  return (
    <CustomSelect
      options={presetsTableData}
      optionRender={preset => {
        return <div>{preset?.data?.title}</div>
      }}
      onChange={(value, option) => console.log('value, option :>> ', value, option)}
      onSelect={(value, option) => console.log('value, option :>> ', value, option)}
      labelRender={label => {
        console.log('label :>> ', label)
        return <div>123</div>
      }}
      dropdownRender={menu => (
        <>
          {menu}

          <div className={cx(styles.createPresetWrapper)}>
            <CustomInput
              value={createPresetTitle}
              placeholder="Create"
              maxLength={32}
              onChange={onPresetTitleChange}
              onKeyDown={e => e.stopPropagation()}
            />
            <CustomButton
              disabled={!createPresetTitle}
              icon={<FaPlus />}
              onClick={() => onCreatePreset(createPresetTitle)}
            />
          </div>
        </>
      )}
    />
  )
})
