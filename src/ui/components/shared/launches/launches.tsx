import { Button } from 'antd'
import { FC, memo, useCallback, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { LinkRequestForm } from '@components/forms/link-request-form'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'
import { IRequest } from '@typings/models/requests/request'
import { ILaunch } from '@typings/shared/launch'

import { getLaunchStyle } from './helpers/get-launch-style'
import { useStyles } from './launches.style'

import { getLaunchName } from './helpers/get-launch-name'

interface LaunchesProps {
  launches: ILaunch[]
  cell?: boolean
  product?: IProduct
  launchLabel?: string
  isLinkRequest?: boolean
  onAddRequest?: (request?: IRequest) => void
}

export const Launches: FC<LaunchesProps> = memo(props => {
  const { launches, cell, product, launchLabel, isLinkRequest = false, onAddRequest } = props

  const { classes: styles, theme, cx } = useStyles()
  const [showBindingModal, setShowBindingModal] = useState(false)

  const handleToggleModal = useCallback(() => setShowBindingModal(prev => !prev), [])

  return (
    <>
      <div className={cx(styles.launches, { [styles.cell]: cell })}>
        {launchLabel && <p className={styles.soloLaunchLabel}>{launchLabel}</p>}

        {/* main part - start */}
        {launches.map((launch, index) => (
          <p key={index} style={getLaunchStyle(launch.type, theme)} className={styles.text}>
            {`${getLaunchName(launch.type, true)} ${launch.value} %`}
          </p>
        ))}
        {/* main part - end */}

        {isLinkRequest && (
          <Button type="primary" size="small" onClick={handleToggleModal}>
            {t(TranslationKey['Link request'])}
          </Button>
        )}
      </div>

      <Modal openModal={isLinkRequest && showBindingModal} setOpenModal={handleToggleModal}>
        <LinkRequestForm product={product} onClose={handleToggleModal} onAddRequest={onAddRequest} />
      </Modal>
    </>
  )
})
