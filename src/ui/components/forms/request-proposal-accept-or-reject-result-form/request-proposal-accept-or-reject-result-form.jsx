import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useState } from 'react'

import { Rating } from '@material-ui/lab'
import { Typography } from '@mui/material'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'

import { useClassNames } from './request-proposal-accept-or-reject-result-form.style'

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
    const [formFields, setFormFields] = useState({ review: '', rating: '' })
    const { classes: classNames } = useClassNames()

    const onChangeField = fieldName => event => {
      setFormFields({
        ...formFields,
        [fieldName]: event.target.value,
      })
    }
    return (
      <div className={classNames.root}>
        <Typography className={classNames.modalTitle}>{title}</Typography>
        <div className={classNames.ratingWrapper}>
          <Field
            label={rateLabel + '*'}
            inputComponent={
              <div className={classNames.rating}>
                <Rating
                  value={formFields.rating}
                  classes={{ icon: classNames.icon }}
                  size="large"
                  onChange={onChangeField('rating')}
                />
              </div>
            }
          />
        </div>

        <Field
          multiline
          inputProps={{ maxLength: 500 }}
          label={reviewLabel}
          minRows={6}
          maxRows={6}
          value={formFields.reason}
          className={classNames.heightFieldAuto}
          onChange={onChangeField('review')}
        />

        <div className={classNames.btnsWrapper}>
          <Button
            disabled={!formFields.rating}
            success={!isReject}
            danger={isReject}
            color="primary"
            className={cx(classNames.btnSubmit, { [classNames.btnLargeSubmit]: isSupervisor })}
            onClick={() => onSubmit(formFields)}
          >
            {isReject ? rejectButtonText : confirmButtonText}
          </Button>
          <Button variant="text" className={cx(classNames.btnSubmit, classNames.cancelSubmit)} onClick={onClose}>
            {cancelBtnText}
          </Button>
        </div>
      </div>
    )
  },
)
