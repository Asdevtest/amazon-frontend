import { memo, FC, ReactNode } from 'react'
import { cx } from '@emotion/css'

import { Select, MenuItem } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select/SelectInput'

import { SaveIcon } from '@components/shared/svg-icons'

import { useClassNames } from './member-select.style'

type OptionType = {
  _id: string
  name: string
}

interface Props {
  title: string
  value: string
  disabled: boolean
  options: OptionType[]
  isDisabled: boolean
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  onSave: VoidFunction
}

export const MemberSelect: FC<Props> = memo(({ title, value, disabled, options, isDisabled, onChange, onSave }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.selectWrapper}>
      <p className={classNames.subtitle}>{title}</p>
      <div className={classNames.selectContainer}>
        <Select displayEmpty value={value} disabled={disabled} className={classNames.select} onChange={onChange}>
          <MenuItem value="">-</MenuItem>
          {options?.map(({ _id, name }) => (
            <MenuItem key={_id} value={_id}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <SaveIcon
          disabled={isDisabled}
          className={cx(classNames.saveIcon, {
            [classNames.disableIcon]: isDisabled,
          })}
          onClick={onSave}
        />
      </div>
    </div>
  )
})
