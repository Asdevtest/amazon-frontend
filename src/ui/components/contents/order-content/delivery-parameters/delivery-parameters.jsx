import { cx } from '@emotion/css'
import dayjs from 'dayjs'
import { useState } from 'react'

import { Checkbox, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserLinkCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { Button } from '@components/shared/buttons/button'
import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { t } from '@utils/translations'

import { useClassNames } from './delivery-parameters.style'

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
  const { classes: classNames } = useClassNames()

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

  const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId) => {
    setFormFields({ ...formFields, storekeeperId, logicsTariffId: tariffId })

    setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
  }

  const tariffName = storekeepers
    ?.find(el => el?._id === formFields?.storekeeperId)
    ?.tariffLogistics?.find(el => el?._id === formFields?.logicsTariffId)?.name

  const minDate = dayjs().add(2, 'day')

  return (
    <div className={classNames.root}>
      {order.status < 20 && (
        <Field
          oneLine
          label={t(TranslationKey.Deadline)}
          containerClasses={classNames.parameterTableCellWrapper}
          labelClasses={classNames.fieldLabel}
          inputComponent={
            <div className={classNames.deadlineWrapper}>
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
        labelClasses={classNames.fieldLabel}
        label={t(TranslationKey.Destination)}
        tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the United States"])}
        inputComponent={
          <WithSearchSelect
            disabled={!isCanChange}
            width={220}
            selectedItemName={
              destinations?.find(el => el?._id === formFields?.destinationId)?.name || t(TranslationKey['Not chosen'])
            }
            data={destinations?.filter(el => el?.storekeeper?._id !== formFields?.storekeeperId)}
            searchFields={['name']}
            favourites={destinationsFavourites}
            onClickSetDestinationFavourite={setDestinationsFavouritesItem}
            onClickNotChosen={() => setFormFields({ ...formFields, destinationId: '' })}
            onClickSelect={el => setFormFields({ ...formFields, destinationId: el._id })}
          />
        }
      />

      <Field
        labelClasses={classNames.fieldLabel}
        label={`${t(TranslationKey['Int warehouse'])} / ${t(TranslationKey.Tariff)}`}
        error={!tariffName && t(TranslationKey['The tariff is invalid or has been removed!'])}
        inputComponent={
          <Button
            disableElevation
            disabled={!isCanChange}
            color="primary"
            variant={formFields.storekeeperId && 'text'}
            className={cx(classNames.chosenTariff, {
              [classNames.notChosenTariff]: !formFields?.storekeeperId,
            })}
            onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
          >
            {formFields?.storekeeperId
              ? `${formFields?.storekeeperId ? `${tariffName ? tariffName : ''}` : 'none'}`
              : t(TranslationKey.Select)}
          </Button>
        }
      />

      <div
        className={cx(classNames.expressWrapper, { [classNames.disabledExpressWrapper]: !isCanChange })}
        onClick={() =>
          isCanChange && onChangeField('priority')({ target: { value: formFields.priority === '30' ? '40' : '30' } })
        }
      >
        <Checkbox
          disabled={!isCanChange}
          className={classNames.checkbox}
          checked={formFields.priority === '40'}
          color="primary"
        />
        <Typography className={classNames.fieldLabel}>{t(TranslationKey['Mark an order as urgent'])}</Typography>
        <img className={classNames.deliveryImg} src="/assets/icons/fire.svg" alt="" />
      </div>
      <div
        className={cx(classNames.expressWrapper, { [classNames.disabledExpressWrapper]: !isCanChange })}
        onClick={() =>
          isCanChange && onChangeField('expressChinaDelivery')({ target: { value: !formFields.expressChinaDelivery } })
        }
      >
        <Checkbox
          disabled={!isCanChange}
          className={classNames.checkbox}
          checked={formFields.expressChinaDelivery}
          color="primary"
        />
        <Typography className={classNames.fieldLabel}>
          {t(TranslationKey['Order express delivery in China'])}
        </Typography>
        <img className={classNames.deliveryImg} src="/assets/icons/truck.svg" alt="" />
      </div>

      <div className={classNames.researchWrapper}>
        <Checkbox disabled className={classNames.checkbox} checked={formFields.needsResearch} color="primary" />
        <Typography className={classNames.fieldLabel}>{t(TranslationKey['Re-search supplier'])}</Typography>
      </div>

      {/* <div className={classNames.destinationWrapper}>
        <OrderParameter
          tooltipText={t(TranslationKey["Amazon's final warehouse in the United States"])}
          label={t(TranslationKey.Destination)}
          value={order.destination?.name || t(TranslationKey['Not chosen'])}
        />
        <OrderParameter label={'Zip Code'} value={order.destination?.zipCode} />
        <OrderParameter label={t(TranslationKey.Country)} value={order.destination?.country} />
        <OrderParameter label={t(TranslationKey.City)} value={order.destination?.city} />
        <OrderParameter label={t(TranslationKey.State)} value={order.destination?.state} />
        <OrderParameter label={t(TranslationKey.Address)} value={order.destination?.address} />
      </div> */}

      {/* <div className={classNames.storekeeperWrapper}>
        <Field
          oneLine
          label={t(TranslationKey['Int warehouse'])}
          tooltipInfoContent={t(TranslationKey['Prep Center in China'])}
          containerClasses={classNames.parameterTableCellWrapper}
          labelClasses={classNames.fieldLabel}
          inputComponent={
            <div className={classNames.intWarehouseWrapper}>
              <UserLinkCell blackText name={order.storekeeper?.name} userId={order.storekeeper?._id} />
            </div>
          }
        />

        <OrderParameter
          tooltipText={t(TranslationKey['Rate selected for delivery to the final Amazon warehouse in the USA'])}
          label={t(TranslationKey.Tariff)}
          value={getFullTariffTextForBoxOrOrder(order)}
        />

        <OrderParameter
          label={t(TranslationKey['CLS (batch closing date)'])}
          value={order.logicsTariff?.cls && formatDateWithoutTime(order.logicsTariff?.cls)}
        />

        <OrderParameter
          label={t(TranslationKey['ETD (date of shipment)'])}
          value={order.logicsTariff?.etd && formatDateWithoutTime(order.logicsTariff?.etd)}
        />
        <OrderParameter
          label={t(TranslationKey['ETA (arrival date)'])}
          value={order.logicsTariff?.eta && formatDateWithoutTime(order.logicsTariff?.eta)}
        />
      </div> */}

      <div className={classNames.buyerWrapper}>
        <Field
          oneLine
          label={t(TranslationKey.Buyer)}
          tooltipInfoContent={t(
            TranslationKey['Buyer with whom the order is being processed / Buyer assigned to the order'],
          )}
          containerClasses={classNames.parameterTableCellWrapper}
          labelClasses={classNames.fieldLabel}
          inputComponent={
            <div className={classNames.intWarehouseWrapper}>
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
          storekeepers={storekeepers?.filter(el => el?._id === formFields?.storekeeper?._id)}
          curStorekeeperId={formFields.storekeeperId}
          curTariffId={formFields.logicsTariffId}
          onSubmit={onSubmitSelectStorekeeperAndTariff}
        />
      </Modal>
    </div>
  )
}
