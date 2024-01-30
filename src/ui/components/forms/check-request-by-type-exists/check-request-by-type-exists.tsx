import { FC } from 'react'

import { Link, Typography } from '@mui/material'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './check-request-by-type-exists.style'

interface RequestsDataInterface {
  humanFriendlyId: number
  _id: string
}

interface CheckRequestByTypeExistsProps {
  asin: string
  type: number | string
  requestsData: Array<RequestsDataInterface>
  onClickRequest: (request: RequestsDataInterface) => void
  onClickContinue: () => void
  onClickCancel: () => void
}

export const CheckRequestByTypeExists: FC<CheckRequestByTypeExistsProps> = ({
  asin,
  type,
  requestsData,
  onClickRequest,
  onClickContinue,
  onClickCancel,
}) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.root}>
      <Typography className={styles.attentionText}>{t(TranslationKey.Attention)}</Typography>

      <div className={styles.requestsInfoWrapper}>
        <Typography className={styles.text}>{`${t(TranslationKey['With the product'])}: ${t(TranslationKey.ASIN)} ${
          asin || t(TranslationKey.Missing)
        },`}</Typography>

        <Typography className={styles.text}>{`${t(
          TranslationKey['there are already requests of the type'],
        )} ${freelanceRequestTypeTranslate(freelanceRequestTypeByCode[Number(type)])}`}</Typography>

        <div className={styles.requestsTextWrapper}>
          {requestsData.map((request, requestIndex: number) => (
            <Link
              key={requestIndex}
              className={cx(styles.text, styles.requestInfo)}
              onClick={() => onClickRequest(request)}
            >
              {`№${request?.humanFriendlyId}${
                requestsData.length > 1 && requestIndex + 1 !== requestsData.length ? ', ' : ''
              }`}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        <Button success /* disabled={submitIsClicked} */ variant="contained" onClick={onClickContinue}>
          {t(TranslationKey.Continue)}
        </Button>
        <Button variant="text" className={styles.cancelBtn} onClick={onClickCancel}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
}
