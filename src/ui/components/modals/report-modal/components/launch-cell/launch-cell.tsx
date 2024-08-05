import { observer } from 'mobx-react'
import { FC, useCallback, useMemo, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { LinkRequestForm } from '@components/forms/link-request-form'
import { CustomButton } from '@components/shared/custom-button'
import { Launches } from '@components/shared/launches'
import { getLaunchName } from '@components/shared/launches/helpers/get-launch-name'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { Launches as LaunchesEnum } from '@typings/enums/launches'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './launch-cell.style'

import { AddRequestType } from '../../report-modal.type'

interface LaunchCellProps {
  row: GridRowModel
  onAddRequest: AddRequestType
  product?: IProduct
}

export const LaunchCell: FC<LaunchCellProps> = observer(props => {
  const { row, onAddRequest, product } = props

  const { classes: styles } = useStyles()
  const [showBindingModal, setShowBindingModal] = useState(false)
  const handleToggleModal = useCallback(() => setShowBindingModal(prev => !prev), [])
  const generatedSoloLaunch = useMemo(
    () => ({ type: row?.type, value: row?.value, expired: row?.expired, _id: row?._id }),
    [row?.type, row?.value, row?.expired, row?._id],
  )
  const isLinkRequest = useMemo(
    () => (row?.type === LaunchesEnum.CUSTOM || row?.type === LaunchesEnum.AB_TEST) && !!product,
    [row?.type, product],
  )

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.labelTitle}>{getLaunchName(row?.type)}</p>

        <Launches launches={[generatedSoloLaunch]} />

        {isLinkRequest ? (
          <CustomButton type="primary" size="small" onClick={handleToggleModal}>
            {t(TranslationKey['Link request'])}
          </CustomButton>
        ) : null}
      </div>

      <Modal openModal={isLinkRequest && showBindingModal} setOpenModal={handleToggleModal}>
        <LinkRequestForm
          product={product}
          onClose={handleToggleModal}
          onAddRequest={request => onAddRequest(generatedSoloLaunch, request)}
        />
      </Modal>
    </>
  )
})
