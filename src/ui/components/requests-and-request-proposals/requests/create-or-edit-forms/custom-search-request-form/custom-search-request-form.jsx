import { parseISO } from 'date-fns/esm'
import { useState } from 'react'

import { Button, Checkbox, ListItemText, MenuItem, Select, TextareaAutosize, Typography } from '@mui/material'

import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'
import { RequestStatus } from '@constants/requests/request-status'

import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Field } from '@components/shared/field'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'

import { useStyles } from './custom-search-request-form.style'

export const CustomSearchRequestForm = ({ onSubmit, setOpenModal, isEdit, requestToEdit }) => {
  const { classes: styles, cx } = useStyles()

  const sourceFormFields = {
    request: {
      maxAmountOfProposals: requestToEdit?.request?.maxAmountOfProposals || '',
      price: requestToEdit?.request?.price || '',
      timeoutAt: requestToEdit?.request?.timeoutAt ? parseISO(requestToEdit?.request?.timeoutAt) : '',
      roles: requestToEdit?.request?.roles || [],
      type: requestToEdit?.request?.type || 'CUSTOM',
      status: requestToEdit?.request?.status || RequestStatus.CREATED,
      direction: requestToEdit?.request?.direction || 'IN',
      assignees: requestToEdit?.request?.assignees || [],
    },
    details: {
      name: requestToEdit?.details?.name || '',
      conditions: requestToEdit?.details?.conditions || '',
    },
  }
  const [formFields, setFormFields] = useState(sourceFormFields)

  const [deadlineError, setDeadlineError] = useState(false)

  const onChangeField = section => fieldName => event => {
    const newFormFields = { ...formFields }
    if (['maxAmountOfProposals'].includes(fieldName)) {
      newFormFields[section][fieldName] = parseInt(event.target.value) || ''
    } else if (
      ['price'].includes(fieldName) &&
      !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2)
    ) {
      return
    } else if (['timeoutAt'].includes(fieldName)) {
      newFormFields[section][fieldName] = event
      setDeadlineError(false)
    } else {
      newFormFields[section][fieldName] = event.target.value
    }

    setFormFields(newFormFields)
  }

  const isOneOfFieldIsEmpty =
    formFields.details.name === '' ||
    formFields.details.conditions === '' ||
    formFields.request.maxAmountOfProposals === '' ||
    formFields.request.price === '' ||
    formFields.request.timeoutAt === '' ||
    formFields.request.roles.length < 1

  const isDeadlineError = formFields.request.timeoutAt < new Date()

  const disableSubmitBtn =
    JSON.stringify(sourceFormFields) === JSON.stringify(formFields) || isOneOfFieldIsEmpty || deadlineError

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <Typography variant="h3" className={styles.title}>
          {'title'}
        </Typography>

        <Field
          containerClasses={styles.field}
          label={'maxAmountOfProposals'}
          value={formFields.request.maxAmountOfProposals}
          onChange={onChangeField('request')('maxAmountOfProposals')}
        />

        <Field
          containerClasses={styles.field}
          label={'priceOfProposal'}
          value={formFields.request.price}
          onChange={onChangeField('request')('price')}
        />

        <Field
          containerClasses={styles.field}
          label={'timeoutAt'}
          inputComponent={
            <div className={cx({ [styles.deadlineError]: deadlineError })}>
              <NewDatePicker value={formFields.request.timeoutAt} onChange={onChangeField('request')('timeoutAt')} />
              {deadlineError && <p className={styles.deadlineErrorText}>{'deadlineError'}</p>}
            </div>
          }
        />

        <Field
          label={'rolesSee'}
          inputComponent={
            <Select
              multiple
              value={formFields.request.roles}
              renderValue={selected => selected.map(el => UserRoleCodeMap[el]).join(', ')}
              onChange={onChangeField('request')('roles')}
            >
              {Object.keys(UserRoleCodeMap)
                .filter(role => UserRoleCodeMap[role] !== UserRole.CANDIDATE)
                .map((role, index) => (
                  <MenuItem key={index} value={Number(role)}>
                    <Checkbox color="primary" checked={formFields.request.roles.includes(Number(role))} />
                    <ListItemText primary={UserRoleCodeMap[role]} />
                  </MenuItem>
                ))}
            </Select>
          }
        />

        <Field
          multiline
          label={'requestName'}
          inputComponent={
            <TextareaAutosize
              className={styles.nameField}
              value={formFields.details.name}
              onChange={onChangeField('details')('name')}
            />
          }
        />

        <Field
          multiline
          label={'conditionsRequest'}
          inputComponent={
            <TextareaAutosize
              className={styles.conditionsField}
              value={formFields.details.conditions}
              onChange={onChangeField('details')('conditions')}
            />
          }
        />
      </div>

      <Button
        disableElevation
        disabled={disableSubmitBtn}
        color="primary"
        variant="contained"
        onClick={() =>
          isDeadlineError ? setDeadlineError(!deadlineError) : onSubmit(formFields, requestToEdit?.request?._id)
        }
      >
        {isEdit ? 'editBtn' : 'createBtn'}
      </Button>

      <Button
        disableElevation
        className={styles.button}
        color="primary"
        variant="contained"
        onClick={() => setOpenModal()}
      >
        {'cancelBtn'}
      </Button>
    </div>
  )
}
