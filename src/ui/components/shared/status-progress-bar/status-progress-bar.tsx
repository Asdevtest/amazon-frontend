import { FC, memo, useEffect, useState } from 'react'

import { OrderStatusTranslate, getOrderStatusByCode, orderColorByStatus } from '@constants/orders/order-status'

import { toFixed } from '@utils/text'

import { useStyles } from './status-progress-bar.style'

import { CheckIcon } from '../svg-icons'

import { OPACITY_TO_NEXT_ELEMENT, PERCENT_COMLETE } from './status-progress-bar.constants'

interface IElementWithKey {
  element: JSX.Element
  elementKey: string
}

interface IOrderStatus {
  status: string
  statusCode: number
}

interface StatusProgressBarProps {
  currentStatus: number
  trackedStatuses: IOrderStatus[]
  negativeTrackedStatuses?: IOrderStatus[]
  wrapperClassName?: string
  informationClassName?: string
  statusClassName?: string
  progressBarClassName?: string
  percentClassName?: string
  circleClassName?: string
  iconClassName?: string
  pointClassName?: string
  lineClassName?: string
}

export const StatusProgressBar: FC<StatusProgressBarProps> = memo(props => {
  const {
    currentStatus,
    trackedStatuses,
    negativeTrackedStatuses,
    wrapperClassName,
    informationClassName,
    statusClassName,
    progressBarClassName,
    percentClassName,
    circleClassName,
    iconClassName,
    pointClassName,
    lineClassName,
  } = props

  const { classes: styles, cx } = useStyles()

  const [elements, setElements] = useState<JSX.Element[]>([])

  const isNegativeCurrentStatus = negativeTrackedStatuses?.find(({ statusCode }) => statusCode === currentStatus)
  const currentStatusIndex = trackedStatuses?.findIndex(({ statusCode }) => statusCode === currentStatus)
  const currentCompletionPercent = toFixed(
    isNegativeCurrentStatus ? PERCENT_COMLETE : ((currentStatusIndex + 1) / trackedStatuses.length) * PERCENT_COMLETE,
    1,
  )
  const currentStatusColor = orderColorByStatus(getOrderStatusByCode(currentStatus))
  const currentStatusText = OrderStatusTranslate(getOrderStatusByCode(currentStatus))
  const longCurrentStatusText = currentStatusText && currentStatusText.length > 30 ? currentStatusText : ''

  const getProgressBarColor = (statusIndex: number): string =>
    statusIndex <= currentStatusIndex || isNegativeCurrentStatus ? currentStatusColor : 'none'

  useEffect(() => {
    const elementsWithKeys: IElementWithKey[] = []

    trackedStatuses.forEach((_, statusIndex) => {
      const isFilled = statusIndex <= currentStatusIndex || isNegativeCurrentStatus
      const progressBarColor = getProgressBarColor(statusIndex)
      const circleKey = `circle-${statusIndex}`

      elementsWithKeys.push({
        element: (
          <div
            key={circleKey}
            className={cx(styles.circle, circleClassName)}
            style={{
              background: progressBarColor,
              borderColor: progressBarColor,
            }}
          >
            {isFilled ? (
              <CheckIcon className={cx(styles.icon, iconClassName)} />
            ) : (
              <div className={cx(styles.point, pointClassName)} style={{ background: 'none' }} />
            )}
          </div>
        ),
        elementKey: circleKey,
      })

      if (statusIndex < trackedStatuses.length - 1) {
        const lineKey = `line-${statusIndex}`

        elementsWithKeys.push({
          element: (
            <div
              key={lineKey}
              className={cx(styles.line, lineClassName)}
              style={{
                background: isFilled ? progressBarColor : undefined,
              }}
            />
          ),
          elementKey: lineKey,
        })
      }
    })

    const progressBarElements = elementsWithKeys.map(item => {
      if (!isNegativeCurrentStatus) {
        if (item.elementKey === `circle-${currentStatusIndex + 1}`) {
          item.element.props.style.borderColor = currentStatusColor
          item.element.props.children.props.style.background = currentStatusColor
        }

        if (item.elementKey === `line-${currentStatusIndex + 1}`) {
          item.element.props.style.background = currentStatusColor
          item.element.props.style.opacity = OPACITY_TO_NEXT_ELEMENT
        }

        if (item.elementKey === `circle-${currentStatusIndex + 2}`) {
          item.element.props.style.borderColor = currentStatusColor
          item.element.props.style.opacity = OPACITY_TO_NEXT_ELEMENT
          item.element.props.children.props.style.background = currentStatusColor
        }
      }

      return item.element
    })

    setElements(progressBarElements)
  }, [currentStatus, trackedStatuses, negativeTrackedStatuses])

  return (
    <div className={cx(styles.wrapper, wrapperClassName)}>
      <div className={cx(styles.information, informationClassName)}>
        <p
          title={longCurrentStatusText}
          style={{ color: currentStatusColor }}
          className={cx(styles.status, statusClassName)}
        >
          {currentStatusText}
        </p>
        <p className={cx(styles.percent, percentClassName)}>{`${currentCompletionPercent} %`}</p>
      </div>

      <div className={cx(styles.progressBar, progressBarClassName)}>{elements}</div>
    </div>
  )
})
