import dayjs from 'dayjs'

import { Checkbox } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserLinkCell } from '@components/data-grid/data-grid-cells'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { Button } from '@components/shared/button'
import { DatePicker } from '@components/shared/date-picker'
import { Field } from '@components/shared/field'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { TruckIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { TariffModalType } from '@typings/shared/tariff-modal'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'
import { useTariffVariation } from '@hooks/use-tariff-variation'

import { useStyles } from './delivery-parameters.style'

export const DeliveryParameters = ({
  isCanChange,
  storekeepers,
  order,
  destinations,
  formFields,
  destinationsFavourites,
  setDestinationsFavouritesItem,
  setFormFields,
  onChangeField,
}) => {
  const { classes: styles, cx } = useStyles()

  const minDate = dayjs().add(2, 'day')

  const { tariffName, tariffRate } = useGetDestinationTariffInfo(
    destinations,
    storekeepers,
    formFields.destinationId,
    formFields.storekeeperId,
    formFields.logicsTariffId,
    formFields.variationTariffId,
  )

  const {
    destinationId,

    onSubmitSelectStorekeeperAndTariff,

    showConfirmModal,
    setShowConfirmModal,

    confirmModalSettings,

    handleSetDestination,
    handleResetDestination,

    showSelectionStorekeeperAndTariffModal,
    setShowSelectionStorekeeperAndTariffModal,
  } = useTariffVariation(formFields.destinationId, setFormFields)

  return (
    <div className={styles.root}>
      {order.status < 20 && (
        <Field
          oneLine
          label={t(TranslationKey.Deadline)}
          containerClasses={styles.parameterTableCellWrapper}
          labelClasses={styles.fieldLabel}
          inputComponent={
            <div className={styles.deadlineWrapper}>
              <DatePicker
                disablePast
                disabled={!isCanChange}
                minDate={minDate}
                value={formFields.deadline}
                onChange={onChangeField('deadline')}
              />
            </div>
          }
        />
      )}

      <Field
        labelClasses={styles.fieldLabel}
        label={t(TranslationKey.Destination)}
        tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the United States"])}
        inputComponent={
          <WithSearchSelect
            disabled={!isCanChange}
            width={220}
            selectedItemName={
              destinations?.find(el => el?._id === formFields?.destinationId)?.name || t(TranslationKey['Not chosen'])
            }
            data={
              formFields?.variationTariffId && destinationId
                ? destinations.filter(el => el?._id === (destinationId || formFields?.variationTariff?.destinationId))
                : destinations?.filter(el => el?.storekeeper?._id !== formFields?.storekeeperId)
            }
            searchFields={['name']}
            favourites={destinationsFavourites}
            onClickSetDestinationFavourite={setDestinationsFavouritesItem}
            onClickNotChosen={handleResetDestination}
            onClickSelect={el => handleSetDestination(el?._id)}
          />
        }
      />

      <Field
        labelClasses={styles.fieldLabel}
        label={`${t(TranslationKey['Int warehouse'])} / ${t(TranslationKey.Tariff)}`}
        tooltipAttentionContent={!tariffName && t(TranslationKey['The tariff is invalid or has been removed!'])}
        inputComponent={
          <Button
            disabled={!isCanChange}
            onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
          >
            {formFields.storekeeperId && (tariffName || tariffRate)
              ? `${tariffName ? tariffName : ''}${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
              : t(TranslationKey.Select)}
          </Button>
        }
      />

      <div
        className={cx(styles.expressWrapper, { [styles.disabledExpressWrapper]: !isCanChange })}
        onClick={() =>
          isCanChange && onChangeField('priority')({ target: { value: formFields.priority === '30' ? '40' : '30' } })
        }
      >
        <Checkbox
          disabled={!isCanChange}
          className={styles.checkbox}
          checked={formFields.priority === '40'}
          color="primary"
        />
        <p>{t(TranslationKey['Mark an order as urgent'])}</p>
        <img className={styles.deliveryImg} src="/assets/icons/fire.svg" alt="" />
      </div>
      <div
        className={cx(styles.expressWrapper, { [styles.disabledExpressWrapper]: !isCanChange })}
        onClick={() =>
          isCanChange && onChangeField('expressChinaDelivery')({ target: { value: !formFields.expressChinaDelivery } })
        }
      >
        <Checkbox
          disabled={!isCanChange}
          className={styles.checkbox}
          checked={formFields.expressChinaDelivery}
          color="primary"
        />
        <p>{t(TranslationKey['Order express delivery in China'])}</p>
        <TruckIcon className={styles.deliveryImg} />
      </div>

      <div
        className={cx(styles.expressWrapper, { [styles.disabledExpressWrapper]: !isCanChange })}
        onClick={() => isCanChange && onChangeField('needsResearch')({ target: { value: !formFields.needsResearch } })}
      >
        <Checkbox
          disabled={!isCanChange}
          className={styles.checkbox}
          checked={formFields.needsResearch}
          color="primary"
        />
        <p>{t(TranslationKey['Re-search supplier'])}</p>
      </div>

      <div className={styles.buyerWrapper}>
        <Field
          oneLine
          label={t(TranslationKey.Buyer)}
          tooltipInfoContent={t(
            TranslationKey['Buyer with whom the order is being processed / Buyer assigned to the order'],
          )}
          containerClasses={styles.parameterTableCellWrapper}
          labelClasses={styles.fieldLabel}
          inputComponent={
            <div className={styles.intWarehouseWrapper}>
              <UserLinkCell blackText name={order.buyer?.name} userId={order.buyer?._id} />
            </div>
          }
        />
      </div>

      {showSelectionStorekeeperAndTariffModal ? (
        <SupplierApproximateCalculationsModal
          isTariffsSelect
          isGetAllStorekeepers
          tariffModalType={TariffModalType.ORDER}
          openModal={showSelectionStorekeeperAndTariffModal}
          setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
          box={formFields}
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
    </div>
  )
}
