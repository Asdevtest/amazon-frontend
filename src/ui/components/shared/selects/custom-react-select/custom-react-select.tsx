/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC, PropsWithChildren } from 'react'
import Select from 'react-select'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './custom-react-select.style'

interface CustomReactSelect extends PropsWithChildren {
  hideDropdownIndicator?: boolean
}

export const CustomReactSelect: FC<CustomReactSelect> = React.memo(({ hideDropdownIndicator, ...restProps }) => {
  const { classes: styles } = useStyles()

  return (
    <Select
      {...restProps}
      classNames={{
        control: () => styles.control,
        multiValue: () => styles.multiValue,
        menu: () => styles.menu,
        option: () => styles.option,
        multiValueLabel: () => styles.multiValueLabel,
        multiValueRemove: () => styles.multiValueRemove,
        input: () => styles.input,
        menuList: () => styles.menuList,
        dropdownIndicator: () => (hideDropdownIndicator ? styles.hideDropdownIndicator : ''),
        indicatorSeparator: () => (hideDropdownIndicator ? styles.hideIndicatorSeparator : ''),
      }}
      // @ts-ignore
      components={{ ...restProps.components }}
      placeholder={t(TranslationKey.Select) + '...'}
      noOptionsMessage={() => t(TranslationKey['No options'])}
    />
  )
})
