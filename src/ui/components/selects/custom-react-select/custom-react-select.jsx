import {observer} from 'mobx-react'
import Select from 'react-select'
import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {t} from '@utils/translations'

import {styles} from './custom-react-select.style'

const CustomReactSelectRaw = observer(({classes: classNames, hideDropdownIndicator, ...restProps}) => (
  <Select
    {...restProps}
    classNames={{
      control: () => classNames.control,
      multiValue: () => classNames.multiValue,
      menu: () => classNames.menu,
      option: () => classNames.option,
      multiValueLabel: () => classNames.multiValueLabel,
      multiValueRemove: () => classNames.multiValueRemove,
      input: () => classNames.input,
      menuList: () => classNames.menuList,
      dropdownIndicator: () => hideDropdownIndicator && classNames.hideDropdownIndicator,
      indicatorSeparator: () => hideDropdownIndicator && classNames.hideIndicatorSeparator,
    }}
    components={{...restProps.components}}
    placeholder={t(TranslationKey.Select) + '...'}
    noOptionsMessage={() => t(TranslationKey['No options'])}
  />
))
export const CustomReactSelect = withStyles(CustomReactSelectRaw, styles)
