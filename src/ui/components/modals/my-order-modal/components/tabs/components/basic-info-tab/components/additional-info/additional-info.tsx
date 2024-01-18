/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Card } from '@components/modals/my-order-modal/components/tabs/components/basic-info-tab/components/card'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './additional-info.style'

import { AdditionalInfoProps } from './additional-info.type'
import { useAdditionalInfo } from './use-additional-info'

export const AdditionalInfo: FC<AdditionalInfoProps> = memo(props => {
  const { classes: styles } = useStyles()

  const {
    additionalInfoFieldsConfig,
    showConfirmModal,
    showSelectionStorekeeperAndTariffModal,
    confirmModalSettings,
    onSubmitSelectStorekeeperAndTariff,
    onToggleConfirmModal,
    onToggleSelectionStorekeeperAndTariffModal,
  } = useAdditionalInfo(props)

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.title}>{t(TranslationKey['Additional order information'])}</p>

        <Card>
          {additionalInfoFieldsConfig.map((item, index) => (
            <div key={index} className={styles.field}>
              <p className={styles.fieldText}>{item.title}</p>
              {item.element}
              {item.text && <p className={styles.fieldText}>{item.text}</p>}
            </div>
          ))}
        </Card>
      </div>

      {showSelectionStorekeeperAndTariffModal ? (
        <Modal
          openModal={showSelectionStorekeeperAndTariffModal}
          setOpenModal={onToggleSelectionStorekeeperAndTariffModal}
        >
          {/* @ts-ignore */}
          <SelectStorekeeperAndTariffForm
            showCheckbox
            RemoveDestinationRestriction
            storekeepers={props.storekeepers}
            curStorekeeperId={props.formFields?.storekeeperId}
            currentDestinationId={props.formFields?.destinationId}
            curTariffId={props.formFields?.logicsTariffId}
            currentVariationTariffId={props.formFields?.variationTariffId}
            onSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        </Modal>
      ) : null}

      {showConfirmModal ? (
        <ConfirmationModal
          isWarning={confirmModalSettings?.isWarning}
          openModal={showConfirmModal}
          setOpenModal={onToggleConfirmModal}
          title={t(TranslationKey.Attention)}
          message={confirmModalSettings?.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={confirmModalSettings?.onClickConfirm}
          onClickCancelBtn={confirmModalSettings?.onClickCancelBtn}
        />
      ) : null}
    </>
  )
})
