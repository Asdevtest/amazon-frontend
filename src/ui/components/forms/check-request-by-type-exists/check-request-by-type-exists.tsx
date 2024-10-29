import { FC } from 'react'

import { Link } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './check-request-by-type-exists.style'

interface RequestsDataInterface {
  xid: number
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
              {`№${request?.xid}${requestsData.length > 1 && requestIndex + 1 !== requestsData.length ? ', ' : ''}`}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        <CustomButton type={ButtonStyle.PRIMARY} onClick={onClickContinue}>
          {t(TranslationKey.Continue)}
        </CustomButton>
        <CustomButton onClick={onClickCancel}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
}
