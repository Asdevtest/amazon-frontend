import React from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './comments.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderComments

export const Comments = observer(({order}) => {
  const classNames = useClassNames()

  return (
    <React.Fragment>
      <Typography className={classNames.containerTitle}>{textConsts.mainTitle}</Typography>
      <div className={classNames.commentsWrapper}>
        <div className={classNames.commentsSubWrapper}>
          <Typography className={classNames.label}>{textConsts.buyerLabel}</Typography>
          <Input
            disabled
            multiline
            rows={4}
            rowsMax={6}
            value={order.product.buyerComment}
            className={classNames.input}
          />
        </div>
        <div className={classNames.commentsLastSubWrapper}>
          <Typography className={classNames.label}>{textConsts.clientLabel}</Typography>
          <Input disabled multiline rows={4} rowsMax={6} value={order.clientComment} className={classNames.input} />
        </div>
      </div>
    </React.Fragment>
  )
})
