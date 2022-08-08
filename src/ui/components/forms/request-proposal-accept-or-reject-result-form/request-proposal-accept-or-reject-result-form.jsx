import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {Rating} from '@material-ui/lab'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {t} from '@utils/translations'

import {useClassNames} from './request-proposal-accept-or-reject-result-form.style'

export const RequestProposalAcceptOrRejectResultForm = observer(
  ({isReject, title, rateLabel, reviewLabel, onSubmit}) => {
    const classNames = useClassNames()
    const [rating, setRating] = useState('')

    return (
      <div className={classNames.root}>
        <Typography className={classNames.modalTitle}>{title}</Typography>
        <div className={classNames.ratingWrapper}>
          <Field
            label={rateLabel}
            inputComponent={
              <div className={classNames.rating}>
                <Rating
                  value={rating}
                  classes={{icon: classNames.icon}}
                  size="large"
                  onChange={e => setRating(e.target.value)}
                />
              </div>
            }
          />
        </div>

        <div>
          <Field label={reviewLabel} inputClasses={classNames.inputsWrapper} />
        </div>

        <div className={classNames.btnsWrapper}>
          <Button
            success={!isReject}
            danger={isReject}
            color="primary"
            className={classNames.btnSubmit}
            onClick={() => onSubmit()}
          >
            {isReject ? t(TranslationKey.Reject) : t(TranslationKey.Accept)}
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
  },
)
