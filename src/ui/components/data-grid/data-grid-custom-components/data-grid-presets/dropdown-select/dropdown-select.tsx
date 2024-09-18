import { ChangeEvent, FC, PropsWithChildren, memo, useCallback, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import { useGridApiContext } from '@mui/x-data-grid-premium'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'

import { IGridColumn } from '@typings/shared/grid-column'

import { useStyles } from './dropdown-select.style'

interface DropdownSelectProps extends PropsWithChildren {
  handleCreateTableSettingsPreset: (title: string, colomns: IGridColumn[]) => void
}

export const DropdownSelect: FC<DropdownSelectProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { children, handleCreateTableSettingsPreset } = props

  const apiRef = useGridApiContext()

  const [createPresetTitle, setCreatePresetTitle] = useState<string>('')

  const onClickCreatePreset = useCallback(() => {
    handleCreateTableSettingsPreset(createPresetTitle, apiRef.current?.getAllColumns())
    setCreatePresetTitle('')
  }, [createPresetTitle, apiRef])

  const onPresetTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setCreatePresetTitle(event.target.value),
    [],
  )

  return (
    <>
      {children}

      <div className={cx(styles.createPresetWrapper)} onClick={e => e.stopPropagation()}>
        <CustomInput
          value={createPresetTitle}
          placeholder="Add a preset"
          maxLength={32}
          onChange={onPresetTitleChange}
          onKeyDown={e => e.stopPropagation()}
        />

        <CustomButton disabled={!createPresetTitle.trim()} icon={<FaPlus />} onClick={onClickCreatePreset} />
      </div>
    </>
  )
})
