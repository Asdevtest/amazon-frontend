import dayjs from 'dayjs'
import { ChangeEvent, useState } from 'react'

import { OrderPriority } from '@constants/orders/order-priority'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserMiniCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { DefaultDatePicker } from '@components/shared/date-picker/date-picker'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { Select } from '@components/shared/selects/select'
import { Switch } from '@components/shared/switch'

import { t } from '@utils/translations'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'

import { useStyles } from './additional-info.style'

import { IFieldConfig } from '../../basic-info-tab.type'

import { AdditionalInfoProps, InitialConfirmModalSettingsState } from './additional-info.type'

export const useAdditionalInfo = ({
  isOrderEditable,
  formFields,
  destinations,
  storekeepers,
  destinationsFavourites,
  setDestinationsFavouritesItem,
  setFormFields,
}: AdditionalInfoProps) => {
  const { classes: styles } = useStyles()

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmModalSettings, setConfirmModalSettings] = useState<InitialConfirmModalSettingsState | undefined>(
    undefined,
  )

  const handleToggleConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const handleToggleSelectionStorekeeperAndTariffModal = () =>
    setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)

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

  const onChangeDeadlineField = (fieldName: string) => (date: string) => {
    setFormFields(prevFormFields => ({ ...prevFormFields, [fieldName]: date }))
  }

  const patchDestinationParamsHandler = (
    storekeeperId: string,
    tariffId: string,
    variationTariffId: string | null,
    destinationId: string | null,
    isCancel: boolean,
    notCloseConfirmModal: boolean,
  ) => {
    setFormFields(prevFormFields => ({
      ...prevFormFields,
      storekeeperId,
      logicsTariffId: tariffId,
      variationTariffId,
      destinationId: isCancel ? '' : destinationId,
    }))

    !notCloseConfirmModal && setShowConfirmModal(false)
    handleToggleSelectionStorekeeperAndTariffModal()
  }

  const onSubmitSelectStorekeeperAndTariff = (
    storekeeperId: string,
    tariffId: string,
    variationTariffId: string | null,
    destinationId: string | null,
    isSelectedDestinationNotValid: boolean,
    isSetCurrentDestination: boolean,
  ) => {
    const onClickConfirmButton = () =>
      patchDestinationParamsHandler(storekeeperId, tariffId, variationTariffId, destinationId, false, false)
    const onClickCancelButton = () =>
      patchDestinationParamsHandler(storekeeperId, tariffId, variationTariffId, destinationId, true, false)

    if (isSelectedDestinationNotValid) {
      setConfirmModalSettings({
        isWarning: false,
        title: t(TranslationKey.Attention),
        confirmMessage: t(TranslationKey['Wish to change a destination?']),
        onClickConfirm: () => onClickConfirmButton(),
        onClickCancelBtn: () => onClickCancelButton(),
      })
      setShowConfirmModal(true)
    } else {
      if (!isSetCurrentDestination) {
        setConfirmModalSettings({
          isWarning: false,
          title: t(TranslationKey.Attention),
          confirmMessage: t(TranslationKey['Wish to set a destination?']),
          onClickConfirm: () => onClickConfirmButton(),
          onClickCancelBtn: () => onClickCancelButton(),
        })
        setShowConfirmModal(true)
      } else {
        patchDestinationParamsHandler(storekeeperId, tariffId, variationTariffId, destinationId, true, true)
      }
    }
  }

  const { tariffName, tariffRate } = useGetDestinationTariffInfo(
    destinations,
    storekeepers,
    formFields.destinationId,
    formFields.storekeeperId,
    formFields.logicsTariffId,
    formFields.variationTariffId,
  )
  const currentItem = destinations?.find(el => el?._id === formFields?.destinationId)?.name
  const currentItems =
    formFields?.variationTariffId && formFields?.destinationId
      ? destinations.filter(el => el?._id === formFields?.destinationId)
      : destinations?.filter(el => el?.storekeeper?._id !== formFields?.storekeeper?._id)
  const currentTariffName = tariffName ? `${tariffName}` : ''
  const currentTariffRate = tariffRate ? `/ ${tariffRate} $` : ''
  const shoWcurrentTariff = formFields.storekeeperId && (currentTariffName || currentTariffRate)
  const minDate = dayjs().add(2, 'day')

  const additionalInfoFieldsConfig: IFieldConfig[] = [
    {
      title: t(TranslationKey.Deadline),
      element: (
        <DefaultDatePicker
          disabled={!isOrderEditable}
          minDate={minDate}
          value={formFields.deadline}
          className={styles.inputDeadline}
          onChange={onChangeDeadlineField('deadline')}
        />
      ),
    },
    {
      title: t(TranslationKey.Destination),
      element: (
        <Select
          withFaworites
          disabled={!isOrderEditable}
          currentItem={currentItem}
          items={currentItems}
          destinationsFavourites={destinationsFavourites}
          setDestinationsFavouritesItem={setDestinationsFavouritesItem}
        />
      ),
    },
    {
      title: `${t(TranslationKey.Tariff)}`,
      element: (
        <button
          disabled={!isOrderEditable}
          className={styles.tafiffButton}
          onClick={handleToggleSelectionStorekeeperAndTariffModal}
        >
          {shoWcurrentTariff ? (
            <>
              <p className={styles.tafiffText}>{currentTariffName}</p>
              <p className={styles.tafiffText}>{currentTariffRate}</p>
            </>
          ) : (
            <p>{t(TranslationKey.Select)}</p>
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
          isChecked={formFields?.needsResearch}
          disabled={!isOrderEditable}
          onChange={onChangeField('needsResearch')}
        />
      ),
    },
    {
      title: t(TranslationKey['Transparency codes']),
      text: undefined,
      element: <LabelWithCopy labelValue={formFields?.transparencyFile} lableLinkTitle={t(TranslationKey.View)} />,
    },
    {
      title: t(TranslationKey.Buyer),
      element: (
        <UserMiniCell
          userName={formFields?.buyer?.name}
          userId={formFields?.buyer?._id}
          wrapperClassName={styles.userMiniCellWrapper}
          avatarClassName={styles.userMiniCellAvatar}
        />
      ),
    },
  ]

  return {
    additionalInfoFieldsConfig,
    showConfirmModal,
    showSelectionStorekeeperAndTariffModal,
    confirmModalSettings,
    onSubmitSelectStorekeeperAndTariff,
    onToggleConfirmModal: handleToggleConfirmModal,
    onToggleSelectionStorekeeperAndTariffModal: handleToggleSelectionStorekeeperAndTariffModal,
  }
}
