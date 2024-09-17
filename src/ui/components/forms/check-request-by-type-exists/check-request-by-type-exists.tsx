import { FC } from 'react'

import { Link } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './check-request-by-type-exists.style'

interface RequestsDataInterface {
  humanFriendlyId: number
  _id: string
}

interface CheckRequestByTypeExistsProps {
  asin: string
  specTitle: string
  requestsData: Array<RequestsDataInterface>
  onClickRequest: (request: RequestsDataInterface) => void
  onClickContinue: () => void
  onClickCancel: () => void
}

export const CheckRequestByTypeExists: FC<CheckRequestByTypeExistsProps> = ({
  asin,
  specTitle,
  requestsData,
  onClickRequest,
  onClickContinue,
  onClickCancel,
}) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.root}>
      <p className={styles.attentionText}>{t(TranslationKey.Attention)}</p>

      <div className={styles.requestsInfoWrapper}>
        <p className={styles.text}>{`${t(TranslationKey['With the product'])}: ${t(TranslationKey.ASIN)} ${
          asin || t(TranslationKey.Missing)
        },`}</p>

        <p className={styles.text}>{`${t(TranslationKey['there are already requests of the type'])} ${specTitle}`}</p>

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
        <Button styleType={ButtonStyle.SUCCESS} onClick={onClickContinue}>
          {t(TranslationKey.Continue)}
        </Button>
        <Button styleType={ButtonStyle.CASUAL} onClick={onClickCancel}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
