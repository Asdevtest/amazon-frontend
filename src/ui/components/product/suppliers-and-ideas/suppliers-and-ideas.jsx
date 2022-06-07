/* eslint-disable no-unused-vars */
import React, {useEffect, useRef} from 'react'

import {Typography, Divider, Paper} from '@material-ui/core'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'
import {useHistory} from 'react-router-dom'

import {TranslationKey} from '@constants/translations/translation-key'

import {SuccessButton} from '@components/buttons/success-button/success-button'
import {IdeaViewAndEditCard} from '@components/cards/idea-view-and-edit-card'

import {t} from '@utils/translations'

import {Button} from '../../buttons/button'
import {SuppliersAndIdeasModel} from './suppliers-and-ideas.model'
import {useClassNames} from './suppliers-and-ideas.style'

const ideaMock = {
  images: ['https://amazonapi.fvds.ru/uploads/82e688c1-3546-4133-977a-623d0a49b6c6.6lWa9pt.jpg'],
  title: 'Тестовая идея №1',
  links: [
    'https://amazonapi.fvds.ru/uploads/82e688c1-3546-4133-977a-623d0a49b6c6.6lWa9pt.jpg',
    'https://amazonapi.fvds.ru/uploads/82e688c1-3546-4133-977a-623d0a49b6c6.6lWa9pt.jpg',
  ],
  comment: 'Комментарий к идее.',
  name: 'Название нашего товара',
  criterions: 'Список ажных критериев в свободной форме',
  count: 42,
  price: 10,
  dimensions: '4x4x4',
}

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

      <IdeaViewAndEditCard idea={ideaMock} />
    </div>
  )
})
