import dayjs from 'dayjs'
import { useState } from 'react'

import { Checkbox } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserLinkCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/buttons/button'
import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { t } from '@utils/translations'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'

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

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmModalSettings, setConfirmModalSettings] = useState(undefined)

  const { tariffName, tariffRate } = useGetDestinationTariffInfo(
    destinations,
    storekeepers,
    formFields.destinationId,
    formFields.storekeeperId,
    formFields.logicsTariffId,
    formFields.variationTariffId,
  )

  const onSubmitSelectStorekeeperAndTariff = (
    storekeeperId,
    tariffId,
    variationTariffId,
    destinationId,
    isSelectedDestinationNotValid,
  ) => {
    if (isSelectedDestinationNotValid) {
      setConfirmModalSettings({
        isWarning: false,
        title: t(TranslationKey.Attention),
        confirmMessage: t(TranslationKey['Wish to change a destination?']),

        onClickConfirm: () => {
          setFormFields({ ...formFields, storekeeperId, logicsTariffId: tariffId, variationTariffId, destinationId })

          setShowConfirmModal(false)
          setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
        },

        onClickCancelBtn: () => {
          setFormFields({
            ...formFields,
            storekeeperId,
            logicsTariffId: tariffId,
            variationTariffId,
            destinationId: null,
          })

          setShowConfirmModal(false)
          setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
        },
      })

      setShowConfirmModal(true)
    } else {
      setFormFields({ ...formFields, storekeeperId, logicsTariffId: tariffId, variationTariffId, destinationId })
      setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
    }
  }

  const minDate = dayjs().add(2, 'day')

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
              <NewDatePicker
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
              formFields?.variationTariffId
                ? destinations.filter(
                    el => el?._id === (formFields?.destinationId || formFields?.variationTariff?.destinationId),
                  )
                : destinations?.filter(el => el?.storekeeper?._id !== formFields?.storekeeperId)
            }
            searchFields={['name']}
            favourites={destinationsFavourites}
            onClickSetDestinationFavourite={setDestinationsFavouritesItem}
            onClickNotChosen={() => setFormFields({ ...formFields, destinationId: '' })}
            onClickSelect={el => setFormFields({ ...formFields, destinationId: el._id })}
          />
        }
      />

      <Field
        labelClasses={styles.fieldLabel}
        label={`${t(TranslationKey['Int warehouse'])} / ${t(TranslationKey.Tariff)}`}
        error={!tariffName && t(TranslationKey['The tariff is invalid or has been removed!'])}
        inputComponent={
          <Button
            disableElevation
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
        <img className={styles.deliveryImg} src="/assets/icons/truck.svg" alt="" />
      </div>

      <div className={styles.researchWrapper}>
        <Checkbox disabled className={styles.checkbox} checked={formFields.needsResearch} color="primary" />
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

      <Modal
        openModal={showSelectionStorekeeperAndTariffModal}
        setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
      >
        <SelectStorekeeperAndTariffForm
          showCheckbox
          RemoveDestinationRestriction
          storekeepers={storekeepers?.filter(el => el?._id === formFields?.storekeeper?._id)}
          curStorekeeperId={formFields.storekeeperId}
          currentDestinationId={formFields?.destinationId}
          curTariffId={formFields.logicsTariffId}
          currentVariationTariffId={formFields?.variationTariffId}
          onSubmit={onSubmitSelectStorekeeperAndTariff}
        />
      </Modal>

      <ConfirmationModal
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
    </div>
  )
}
