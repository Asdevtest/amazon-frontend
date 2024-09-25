import dayjs from 'dayjs'
import { ChangeEvent } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserCell } from '@components/data-grid/data-grid-cells'
import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { DatePicker } from '@components/shared/date-picker'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { Select } from '@components/shared/selects/select'
import { Switch } from '@components/shared/switch'

import { t } from '@utils/translations'

import { OrderPriority } from '@typings/enums/order/order-priority'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'

import { useStyles } from './additional-info.style'

import { IFieldConfig } from '../../basic-info.type'

import { UseAdditionalInfoParams } from './additional-info.type'

export const useAdditionalInfo = ({
  isOrderEditable,
  formFields,
  destinations,
  storekeepers,
  destinationsFavourites,
  destinationId,
  setDestinationsFavouritesItem,
  setFormFields,
  handleSetDestination,
  setShowSelectionStorekeeperAndTariffModal,
}: UseAdditionalInfoParams) => {
  const { classes: styles, cx } = useStyles()

  const onChangeField = (fieldName: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormFields(prevFormFields => {
      const updatedFormFields: IOrderWithAdditionalFields = { ...prevFormFields }

      if (fieldName === 'expressChinaDelivery' || fieldName === 'needsResearch') {
        updatedFormFields[fieldName] = event.target.checked
      }

      if (fieldName === 'priority') {
        updatedFormFields[fieldName] = event.target.checked
          ? String(OrderPriority.URGENT_PRIORITY)
          : String(OrderPriority.NORMAL_PRIORITY)
      }

      return updatedFormFields
    })
  }

  const onChangeStringField = (fieldName: string) => (value: string | null) => {
    setFormFields(prevFormFields => ({ ...prevFormFields, [fieldName]: value }))
  }

  const { tariffName, tariffRate } = useGetDestinationTariffInfo(
    destinations,
    storekeepers,
    formFields.destinationId,
    formFields.storekeeperId,
    formFields.logicsTariffId,
    formFields.variationTariffId,
  )

  const currentItemName = destinations?.find(el => el?._id === formFields?.destinationId)?.name
  const currentItems = formFields?.logicsTariffId
    ? destinations.filter(el => el?._id === (destinationId || formFields?.variationTariff?.destinationId))
    : destinations

  const currentTariffName = tariffName ? `${tariffName}` : ''
  const currentTariffRate = tariffRate ? `/ ${tariffRate} $` : ''
  const shoWcurrentTariff = formFields.storekeeperId && (currentTariffName || currentTariffRate)
  const minDate = dayjs().startOf('day').add(2, 'day')
  const isNotValidDate = new Date(formFields.deadline as string) < new Date(minDate.toString()) && !!formFields.deadline

  const additionalInfoFieldsConfig: IFieldConfig[] = [
    {
      title: t(TranslationKey.Deadline),
      element: (
        <DatePicker
          disabled={!isOrderEditable}
          minDate={minDate}
          value={formFields.deadline}
          className={cx(styles.inputDeadline, { [styles.notValidDeadline]: isNotValidDate })}
          onChange={onChangeStringField('deadline')}
        />
      ),
    },
    {
      title: t(TranslationKey.Destination),
      element: (
        <Select
          withFaworites
          disabled={!isOrderEditable}
          currentItemName={currentItemName}
          items={currentItems}
          destinationsFavourites={destinationsFavourites}
          setDestinationsFavouritesItem={setDestinationsFavouritesItem}
          onChangeSelectedItem={id => handleSetDestination(id as string)}
        />
      ),
    },
    {
      title: t(TranslationKey.Tariff),
      element: (
        <button
          disabled={!isOrderEditable}
          className={styles.tafiffButton}
          onClick={() => setShowSelectionStorekeeperAndTariffModal(true)}
        >
          {shoWcurrentTariff ? (
            <>
              <p className={styles.tafiffText}>{currentTariffName}</p>
              <p className={styles.tafiffText}>{currentTariffRate}</p>
            </>
          ) : (
            <p className={styles.tafiffText}>{t(TranslationKey.Select)}</p>
          )}
        </button>
      ),
    },
    {
      title: t(TranslationKey['Mark an order as urgent']),
      element: (
        <Switch
          isChecked={Number(formFields?.priority) === OrderPriority.URGENT_PRIORITY}
          disabled={!isOrderEditable}
          onChange={onChangeField('priority')}
        />
      ),
    },
    {
      title: t(TranslationKey['Order express delivery in China']),
      element: (
        <Switch
          isChecked={formFields?.expressChinaDelivery}
          disabled={!isOrderEditable}
          onChange={onChangeField('expressChinaDelivery')}
        />
      ),
    },
    {
      title: t(TranslationKey['Re-search supplier']),
      element: (
        <Switch
          disabled={!isOrderEditable}
          isChecked={formFields?.needsResearch}
          onChange={onChangeField('needsResearch')}
        />
      ),
    },
    {
      title: 'Transparency Codes',
      text: undefined,
      element: <LabelWithCopy labelValue={formFields?.transparencyFile} lableLinkTitle={t(TranslationKey.View)} />,
    },
    {
      title: t(TranslationKey.Buyer),
      element: <UserCell name={formFields?.buyer?.name} id={formFields?.buyer?._id} />,
    },
  ]

  return {
    additionalInfoFieldsConfig,
  }
}
