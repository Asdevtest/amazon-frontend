import { Dispatch, FC, SetStateAction, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Card } from '@components/modals/my-order-modal/components/tabs/basic-info/components/card'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'

import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useTariffVariation } from '@hooks/use-tariff-variation'

import { useStyles } from './additional-info.style'

import { AdditionalInfoProps } from './additional-info.type'
import { useAdditionalInfo } from './use-additional-info'

export const AdditionalInfo: FC<AdditionalInfoProps> = memo(props => {
  const { classes: styles } = useStyles()

  const useVariationData = useTariffVariation(
    props?.formFields?.destinationId || '',
    props?.setFormFields as unknown as Dispatch<SetStateAction<IBox>>,
  )

  const {
    onSubmitSelectStorekeeperAndTariff,

    showConfirmModal,
    setShowConfirmModal,

    confirmModalSettings,

    showSelectionStorekeeperAndTariffModal,
    setShowSelectionStorekeeperAndTariffModal,
  } = useVariationData

  const { additionalInfoFieldsConfig } = useAdditionalInfo({ ...props, ...useVariationData })

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
        <SupplierApproximateCalculationsModal
          isTariffsSelect
          openModal={showSelectionStorekeeperAndTariffModal}
          setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(false)}
          box={props?.formFields as unknown as IBox}
          onClickSubmit={onSubmitSelectStorekeeperAndTariff}
        />
      ) : null}

      {showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={confirmModalSettings?.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => setShowConfirmModal(false)}
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
