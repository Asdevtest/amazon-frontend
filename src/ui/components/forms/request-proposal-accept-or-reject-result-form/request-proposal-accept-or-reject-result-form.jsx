import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {Rating} from '@material-ui/lab'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'

import {useClassNames} from './request-proposal-accept-or-reject-result-form.style'

export const RequestProposalAcceptOrRejectResultForm = observer(
  ({
    isReject,
    isSupervisor,
    title,
    rateLabel,
    reviewLabel,
    onSubmit,
    onClose,
    confirmButtonText,
    cancelBtnText,
    rejectButtonText,
  }) => {
    const classNames = useClassNames()

    const [formFields, setFormFields] = useState({reason: '', rating: ''})

    const onChangeField = fieldName => event => {
      setFormFields({
        ...formFields,
        [fieldName]: event.target.value,
      })
    }
    console.log(formFields)
    return (
      <div className={classNames.root}>
        <Typography className={classNames.modalTitle}>{title}</Typography>
        <div className={classNames.ratingWrapper}>
          <Field
            label={rateLabel}
            inputComponent={
              <div className={classNames.rating}>
                <Rating
                  value={formFields.rating}
                  classes={{icon: classNames.icon}}
                  size="large"
                  onChange={onChangeField('rating')}
                />
              </div>
            }
          />
        </div>

        <div className={classNames.fieldWrapper}>
          <Field
            multiline
            inputProps={{maxLength: 500}}
            label={reviewLabel}
            minRows={6}
            maxRow={6}
            value={formFields.reason}
            containerClasses={classNames.fieldContainer}
            inputClasses={classNames.inputsWrapper}
            onChange={onChangeField('reason')}
          />
        </div>

        <div className={classNames.btnsWrapper}>
          <Button
            success={!isReject}
            danger={isReject}
            color="primary"
            className={clsx(classNames.btnSubmit, {[classNames.btnLargeSubmit]: isSupervisor})}
            onClick={() => onSubmit(formFields)}
          >
            {isReject ? rejectButtonText : confirmButtonText}
          </Button>
          <Button variant="text" className={clsx(classNames.btnSubmit, classNames.cancelSubmit)} onClick={onClose}>
            {cancelBtnText}
          </Button>
        </div>
      </div>
    )
  },
)
