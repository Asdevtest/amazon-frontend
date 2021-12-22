import React from 'react'

import {Paper, TextareaAutosize} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Field} from '@components/field/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './custom-request-details.style'

const textConsts = getLocalizedTexts(texts, 'en').productSearchRequestContent

export const CustomSearchRequestDetails = ({request}) => {
  const classNames = useClassNames()

  return (
    <Paper>
      <div className={classNames.root}>
        <div className={classNames.requestDataWrapper}>
          <Field
            multiline
            disabled
            className={classNames.nameField}
            label={textConsts.nameRequest}
            value={request.name}
          />

          <Field
            multiline
            label={textConsts.conditionsRequest}
            inputComponent={
              <TextareaAutosize disabled className={classNames.conditionsField} value={request.conditions} />
            }
          />
        </div>
      </div>
    </Paper>
  )
}
