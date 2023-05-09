import {cx} from '@emotion/css'
import {MenuItem, Select, Typography} from '@mui/material'

import React, {FC, useState} from 'react'

import {
  colorByTaskPriorityStatus,
  mapTaskPriorityStatusEnum,
  mapTaskPriorityStatusEnumToKey,
  TaskPriorityStatus,
  taskPriorityStatusTranslate,
} from '@constants/task-priority-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {useEditTaskPriorityModalStyles} from '@components/screens/warehouse/edit-task-priority-modal/edit-task-priority-modal.styles'

import {t} from '@utils/translations'

interface EditTaskPriorityModalProps {
  data: {
    taskId: string
    newPriority: keyof typeof mapTaskPriorityStatusEnum
  }
  withSelect?: boolean
  handleClose: () => void
  onSubmitHandler: (orderId: string, priority: number, reason: string) => void
}

export const EditTaskPriorityModal: FC<EditTaskPriorityModalProps> = props => {
  const {data, onSubmitHandler, handleClose, withSelect} = props
  const {classes: styles} = useEditTaskPriorityModalStyles()

  const [curPriority, setCurPriority] = useState<number>(
    data.newPriority || (mapTaskPriorityStatusEnumToKey as {[key: string]: number})[TaskPriorityStatus.STANDART],
  )

  const [reason, setReason] = useState<string>('')

  return (
    <div className={styles.body}>
      <div className={styles.titleWrapper}>
        <Typography className={styles.title}>
          {t(TranslationKey['Change the priority to'])}{' '}
          {!withSelect && (
            <span style={{color: colorByTaskPriorityStatus(mapTaskPriorityStatusEnum[data.newPriority])}}>
              {taskPriorityStatusTranslate(mapTaskPriorityStatusEnum[data.newPriority])}
            </span>
          )}
        </Typography>

        {withSelect && (
          <Select
            value={String(curPriority)}
            className={styles.nativeSelect}
            input={<Input className={styles.nativeSelect} />}
            classes={{
              select: cx({
                [styles.colorYellow]:
                  curPriority ===
                  (mapTaskPriorityStatusEnumToKey as {[key: string]: number})[TaskPriorityStatus.STANDART],
                [styles.colorGreen]:
                  curPriority === (mapTaskPriorityStatusEnumToKey as {[key: string]: number})[TaskPriorityStatus.LONG],
                [styles.colorRed]: [
                  (mapTaskPriorityStatusEnumToKey as {[key: string]: number})[TaskPriorityStatus.URGENT],
                  (mapTaskPriorityStatusEnumToKey as {[key: string]: number})[TaskPriorityStatus.PROBLEMATIC],
                ].includes(curPriority),
              }),
            }}
            onChange={e => setCurPriority(Number(e.target.value))}
          >
            {Object.keys(mapTaskPriorityStatusEnum)
              // .filter(el => el !== String(curPriority))
              .map((statusCode, statusIndex) => (
                <MenuItem
                  key={statusIndex}
                  value={statusCode}
                  style={{
                    color: colorByTaskPriorityStatus(
                      (mapTaskPriorityStatusEnum as {[key: string]: string})[statusCode],
                    ),
                  }}
                  className={styles.menuItem}
                >
                  {taskPriorityStatusTranslate((mapTaskPriorityStatusEnum as {[key: string]: string})[statusCode])}

                  {TaskPriorityStatus.URGENT === (mapTaskPriorityStatusEnum as {[key: string]: string})[statusCode] && (
                    <img className={styles.rushOrderImg} src="/assets/icons/fire.svg" alt="Fire" />
                  )}
                </MenuItem>
              ))}
          </Select>
        )}
      </div>
      {/* <Typography className={styles.title}>
        {t(TranslationKey['Change the priority to'])}{' '}
        <span style={{color: colorByTaskPriorityStatus(mapTaskPriorityStatusEnum[data.newPriority])}}>
          {taskPriorityStatusTranslate(mapTaskPriorityStatusEnum[data.newPriority])}
        </span>
      </Typography> */}

      <Field
        labelClasses={styles.reasonLabel}
        label={`${t(TranslationKey.Comment)}${
          Number(data.newPriority) ===
          mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.PROBLEMATIC as keyof typeof mapTaskPriorityStatusEnumToKey]
            ? '*'
            : ''
        }`}
        inputComponent={
          <Input
            multiline
            placeholder={t(TranslationKey.Comment)}
            minRows={2}
            maxRows={2}
            className={styles.reasonInput}
            value={reason}
            inputProps={{maxLength: 250}}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setReason(event.target.value)}
          />
        }
      />

      <div className={styles.controls}>
        <Button
          success
          disabled={
            Number(curPriority) ===
              mapTaskPriorityStatusEnumToKey[
                TaskPriorityStatus.PROBLEMATIC as keyof typeof mapTaskPriorityStatusEnumToKey
              ] && reason.length < 1
          }
          onClick={() => {
            onSubmitHandler(data.taskId, curPriority, reason)
            handleClose()
          }}
        >
          {t(TranslationKey.Save)}
        </Button>
        <Button variant="text" className={styles.cancel} onClick={handleClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
