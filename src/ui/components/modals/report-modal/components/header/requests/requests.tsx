import { Button, Tooltip } from 'antd'
import { observer } from 'mobx-react'
import { FC } from 'react'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { IRequestWithLaunch } from '@components/modals/report-modal/report-modal.type'
import { Launches } from '@components/shared/launches'
import { CrossIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './requests.style'

interface RequestsProps {
  requests: IRequestWithLaunch[]
  onRemoveRequest: (id: string) => void
}

export const Requests: FC<RequestsProps> = observer(({ requests, onRemoveRequest }) => {
  const { classes: styles } = useStyles()

  return requests.length > 0 ? (
    <div className={styles.flexRowContainer}>
      {requests.map(request => (
        <div key={request._id} className={styles.requestWrapper}>
          <div className={styles.requestConatainer}>
            <div className={styles.requestText}>
              <span className={styles.requestTextSecond}>{`${t(TranslationKey['Request type'])}:`}</span>
              <Tooltip title={request.spec.title} className={styles.requestTypeTooltip}>
                {request.spec.title}
              </Tooltip>
            </div>

            <Button
              danger
              shape="circle"
              size="small"
              icon={<CrossIcon className={styles.crossIcon} onClick={() => onRemoveRequest(request._id)} />}
              className={styles.crossButton}
            />
          </div>
          <div className={styles.requestConatainer}>
            <p className={styles.requestText}>
              <span className={styles.requestTextSecond}>{`${t(TranslationKey.ID)}:`}</span>
              {request.humanFriendlyId}
            </p>

            <Launches launches={[request.launch]} />
          </div>
          <p className={styles.requestText}>
            <span className={styles.requestTextSecond}>{`${t(TranslationKey.Status)}:`}</span>
            <span style={{ color: colorByStatus(request.status) }}>{MyRequestStatusTranslate(request.status)}</span>
          </p>
        </div>
      ))}
    </div>
  ) : null
})
