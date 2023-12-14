import { observer } from 'mobx-react'
import { FC } from 'react'

import { MenuItem, Select } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select/SelectInput'

import { SaveIcon } from '@components/shared/svg-icons'

import { useClassNames } from './member-select.style'

type MemberOptionType = {
  _id: string
  name: string
}

interface Props {
  value: string
  options: MemberOptionType[]
  onChange: (event: SelectChangeEvent<string>) => void
  onSave: () => void
  title?: string
  disabled?: boolean
  isDisabled?: boolean
  isEmptyMember?: boolean
}

export const MemberSelect: FC<Props> = observer(
  ({ title, value, disabled, options, isEmptyMember = false, isDisabled, onChange, onSave }) => {
    const { classes: classNames, cx } = useClassNames()

    return (
      <div className={classNames.selectWrapper}>
        {title && <p className={classNames.title}>{title}</p>}
        <div className={classNames.selectContainer}>
          <Select
            displayEmpty
            value={value}
            disabled={disabled}
            className={classNames.select}
            onChange={(e: SelectChangeEvent<string>) => onChange(e)}
          >
            <MenuItem disabled={isEmptyMember} value="">
              -
            </MenuItem>

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
            onClick={() => onSave()}
          />
        </div>
      </div>
    )
  },
)
