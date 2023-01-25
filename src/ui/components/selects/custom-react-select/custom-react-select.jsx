/* eslint-disable no-unused-vars */
import {css, cx} from '@emotion/css'

import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'
import Select from 'react-select'
import {withStyles} from 'tss-react/mui'

import {styles} from './custom-react-select.style'

const CustomReactSelectRaw = observer(({classes: classNames, ...restProps}) => {
  // const [nameSearchValue, setNameSearchValue] = useState('')
  console.log('start')
  return (
    <Select
      {...restProps}
      styles={
        {
          // menu: base => ({...base, position: 'relative', background: 'grey'}),
          // multiValue: base => ({
          //   ...base,
          //   display: `flex`,
          //   justifyContent: 'space-between',
          //   alignItems: 'center',
          //   padding: '0 5px',
          // }),
          // control: base => ({...base, background: 'grey'}),
          // control: css(classNames.control),
        }
      }
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
  )
})
export const CustomReactSelect = withStyles(CustomReactSelectRaw, styles)
