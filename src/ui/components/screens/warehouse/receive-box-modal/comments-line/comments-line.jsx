import React from 'react'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './comments-line.style'

const textConsts = getLocalizedTexts(texts, 'ru').commentsLine

export const CommentsLine = () => {
  const classNames = useClassNames()

  return (
    <div className={classNames.mainWrapper}>
      <Field
        multiline
        className={classNames.heightFieldAuto}
        rows={4}
        rowsMax={6}
        label={textConsts.commentLabel}
        placeholder={textConsts.commentPlaceHolder}
      />
      <Field
        multiline
        className={classNames.heightFieldAuto}
        rows={4}
        rowsMax={6}
        label={textConsts.defectiveLabel}
        placeholder={textConsts.defectivePlaceHolder}
      />
      <Field
        multiline
        className={classNames.heightFieldAuto}
        rows={4}
        rowsMax={6}
        label={textConsts.receivedLabel}
        placeholder={textConsts.receivedPlaceHolder}
      />
      <Field
        multiline
        className={classNames.heightFieldAuto}
        rows={4}
        rowsMax={6}
        label={textConsts.differenceLabel}
        placeholder={textConsts.differencePlaceHolder}
      />
    </div>
  )
}
