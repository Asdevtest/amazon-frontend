import { Dayjs } from 'dayjs'
import { Ref, forwardRef } from 'react'

import { useSlotProps } from '@mui/base/utils'
import { useForkRef } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import {
  SingleInputDateRangeFieldProps,
  unstable_useSingleInputDateRangeField as useSingleInputDateRangeField,
} from '@mui/x-date-pickers-pro/SingleInputDateRangeField'
import { useClearableField } from '@mui/x-date-pickers/hooks'
import { DateRangeIcon } from '@mui/x-date-pickers/icons'

import { useStyles } from './custom-date-range-field.style'

import { CustomDateRangeFieldComponent, CustomDateRangeFieldProps, FieldProps } from './custom-date-range-field.type'

const Field = forwardRef((props: FieldProps, ref: Ref<HTMLDivElement>) => {
  const {
    disabled,
    id,
    inputRef,
    InputProps: { ref: containerRef, startAdornment, endAdornment } = {},
    wrapperClassName,
    inputClassName,
    ...other
  } = props

  const { classes: styles, cx } = useStyles()

  const handleRef = useForkRef(containerRef, ref)

  return (
    <div ref={handleRef} id={id} className={cx(styles.field, wrapperClassName)}>
      {startAdornment}
      <input ref={inputRef} disabled={disabled} {...other} className={cx(styles.input, inputClassName)} />
      {endAdornment}
    </div>
  )
})

export const CustomDateRangeField = forwardRef((props: CustomDateRangeFieldProps, ref: Ref<HTMLDivElement>) => {
  const { slots, slotProps, onAdornmentClick, ...other } = props

  const textFieldProps: SingleInputDateRangeFieldProps<Dayjs, false> = useSlotProps({
    elementType: 'input',
    externalSlotProps: slotProps?.textField,
    externalForwardedProps: other,
    ownerState: props,
  })

  textFieldProps.InputProps = {
    ...textFieldProps.InputProps,
    startAdornment: (
      <InputAdornment position="start">
        <IconButton onClick={onAdornmentClick}>
          <DateRangeIcon />
        </IconButton>
      </InputAdornment>
    ),
  }

  const fieldResponse = useSingleInputDateRangeField<Dayjs, false, typeof textFieldProps>({
    ...textFieldProps,
    enableAccessibleFieldDOMStructure: false,
  })

  const processedFieldProps = useClearableField({
    ...fieldResponse,
    slots,
    slotProps,
  })

  return <Field ref={ref} {...processedFieldProps} />
}) as CustomDateRangeFieldComponent

CustomDateRangeField.fieldType = 'single-input'
