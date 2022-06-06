/* eslint-disable no-unused-vars */
import React, {useEffect, useRef} from 'react'

import {Typography, Divider, Paper} from '@material-ui/core'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'
import {useHistory} from 'react-router-dom'

import {TranslationKey} from '@constants/translations/translation-key'

import {SuccessButton} from '@components/buttons/success-button/success-button'

import {t} from '@utils/translations'

import {Button} from '../../buttons/button'
import {SuppliersAndIdeasModel} from './suppliers-and-ideas.model'
import {useClassNames} from './suppliers-and-ideas.style'

export const SuppliersAndIdeas = observer(({productId}) => {
  const classNames = useClassNames()
  const history = useHistory()
  const model = useRef(new SuppliersAndIdeasModel({history, productId}))

  useEffect(() => {
    model.current.loadData()
  }, [])

  // const {} = model.current

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.btnsWrapper}>
        <SuccessButton variant="contained">{t(TranslationKey['Add a product idea'])}</SuccessButton>
      </div>
    </div>
  )
})
