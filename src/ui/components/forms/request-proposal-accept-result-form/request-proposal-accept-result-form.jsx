import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {Rating} from '@material-ui/lab'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {t} from '@utils/translations'

import {useClassNames} from './request-proposal-result-to-correct-form.style'

export const RequestProposalAcceptResultForm = observer(({onSubmit}) => {
  const classNames = useClassNames()
  const [rating, setRating] = useState('')

  return (
    <div className={classNames.root}>
      <Typography className={classNames.modalTitle}>{'Подтвердите работу'}</Typography>
      <div className={classNames.ratingWrapper}>
        <Field
          label="Поставьте оценку"
          inputComponent={<Rating value={rating} onChange={e => setRating(e.target.value)} />}
        />
      </div>

      <div>
        <Field label="Оставьте отзыв о работе исполнителя" inputClasses={classNames.inputsWrapper} />
      </div>

      <div className={classNames.btnsWrapper}>
        <Button success color="primary" className={classNames.btnSubmit} onClick={() => onSubmit()}>
          {t(TranslationKey.Accept)}
        </Button>
        <Button
          variant="text"
          className={clsx(classNames.btnSubmit, classNames.cancelSubmit)}
          // disabled={!formFields.reason || totalTimeInMinute === '0'}
          // onClick={() => onPressSubmitForm(formFields)}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
