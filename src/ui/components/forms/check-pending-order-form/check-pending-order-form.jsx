/* eslint-disable no-unused-vars */
import {Typography} from '@mui/material'

import React, {useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'

import {checkIsPositiveNum, checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {t} from '@utils/translations'

import {useClassNames} from './check-pending-order-form.style'

export const CheckPendingOrderForm = ({selectedProductsData}) => {
  const {classes: classNames} = useClassNames()

  // console.log('selectedProductsData', selectedProductsData)

  // return (
  // )
}
