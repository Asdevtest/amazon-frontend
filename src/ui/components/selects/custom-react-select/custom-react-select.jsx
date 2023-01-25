import {observer} from 'mobx-react'
import Select from 'react-select'
import {withStyles} from 'tss-react/mui'

import {styles} from './custom-react-select.style'

const CustomReactSelectRaw = observer(({classes: classNames, ...restProps}) => (
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
    }}
  />
))
export const CustomReactSelect = withStyles(CustomReactSelectRaw, styles)
