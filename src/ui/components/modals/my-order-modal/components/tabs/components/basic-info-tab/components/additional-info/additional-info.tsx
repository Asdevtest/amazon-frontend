/* eslint-disable @typescript-eslint/ban-ts-comment */
import dayjs from 'dayjs'
import { ChangeEvent, FC, memo, useState } from 'react'

import { orderPriority } from '@constants/orders/order-priority'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserMiniCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Card } from '@components/modals/my-order-modal/components/card'
import { IOrderWithAdditionalFields, SetFormFieldsType } from '@components/modals/my-order-modal/my-order-modal.type'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { Modal } from '@components/shared/modal'
import { Select } from '@components/shared/selects/select'
import { Switch } from '@components/shared/switch'

import { formatDateToDefaultInputDate } from '@utils/date-time'
import { t } from '@utils/translations'

import { IDestination, IDestinationStorekeeper } from '@typings/destination'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'

import { useStyles } from './additional-info.style'

import { IFieldConfig } from '../../basic-info-tab.type'

interface InitialConfirmModalSettingsState {
  isWarning: boolean
  title: string
  confirmMessage: string
  onClickConfirm: () => void
  onClickCancelBtn: () => void
}

interface AdditionalInfoProps {
  isOrderEditable: boolean
  order: IOrderWithAdditionalFields
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  destinationsFavourites: string[]
  setDestinationsFavouritesItem: () => void
  setFormFields: SetFormFieldsType
}

export const AdditionalInfo: FC<AdditionalInfoProps> = memo(props => {
  const {
    isOrderEditable,
    order,
    storekeepers,
    destinations,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    setFormFields,
  } = props

  const { classes: styles } = useStyles()

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmModalSettings, setConfirmModalSettings] = useState<InitialConfirmModalSettingsState | undefined>(
    undefined,
  )

  const { tariffName, tariffRate } = useGetDestinationTariffInfo(
    destinations,
    storekeepers,
    order.destinationId,
    order.storekeeperId,
    order.logicsTariffId,
    order.variationTariffId,
  )

  const selectedItem = destinations?.find(el => el?._id === order?.destinationId)?.name
  const selectedItems =
    order?.variationTariffId && order?.destinationId
      ? destinations.filter(el => el?._id === order?.destinationId)
      : destinations?.filter(el => el?.storekeeper?._id !== order?.storekeeper?._id)
  const currentTariffName = tariffName ? `${tariffName}` : ''
  const currentTariffRate = tariffRate ? `/ ${tariffRate} $` : ''
  const shoWcurrentTariff = order.storekeeperId && (currentTariffName || currentTariffRate)
  const minDate = dayjs().add(2, 'day')

  const onChangeField = (fieldName: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormFields(prevFormFields => {
      const updatedFormFields: IOrderWithAdditionalFields = { ...prevFormFields }

      if (fieldName === 'deadline') {
        updatedFormFields[fieldName] = event.target.value
      }

      if (fieldName === 'expressChinaDelivery' || fieldName === 'needsResearch') {
        updatedFormFields[fieldName] = event.target.checked
      }

      if (fieldName === 'priority') {
        updatedFormFields[fieldName] = event.target.checked
          ? String(orderPriority.urgentPriority)
          : String(orderPriority.normalPriority)
      }

      return updatedFormFields
    })
  }

  const additionalInfoFieldsConfig: IFieldConfig[] = [
    {
      title: t(TranslationKey.Deadline),
      element: (
        <input
          type="date"
          name="deadline"
          value={formatDateToDefaultInputDate(order?.deadline)}
          min={formatDateToDefaultInputDate(minDate)}
          disabled={!isOrderEditable}
          className={styles.inputDeadline}
          onChange={onChangeField('deadline')}
        />
      ),
    },
    {
      title: t(TranslationKey.Destination),
      element: (
        <Select
          withFaworites
          disabled={!isOrderEditable}
          currentItem={selectedItem || t(TranslationKey['Not chosen'])}
          items={selectedItems}
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
          onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
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
          isChecked={Number(order?.priority) === orderPriority.urgentPriority}
          disabled={!isOrderEditable}
          onChange={onChangeField('priority')}
        />
      ),
    },
    {
      title: t(TranslationKey['Order express delivery in China']),
      element: (
        <Switch
          isChecked={order?.expressChinaDelivery}
          disabled={!isOrderEditable}
          onChange={onChangeField('expressChinaDelivery')}
        />
      ),
    },
    {
      title: t(TranslationKey['Re-search supplier']),
      element: (
        <Switch
          isChecked={order?.needsResearch}
          disabled={!isOrderEditable}
          onChange={onChangeField('needsResearch')}
        />
      ),
    },
    {
      title: t(TranslationKey['Transparency codes']),
      text: undefined,
      element: <LabelWithCopy labelValue={order?.transparencyFile} lableLinkTitle={t(TranslationKey.View)} />,
    },
    {
      title: t(TranslationKey.Buyer),
      element: (
        <UserMiniCell
          userName={order?.buyer?.name}
          userId={order?.buyer?._id}
          wrapperClassName={styles.userMiniCellWrapper}
          avatarClassName={styles.userMiniCellAvatar}
        />
      ),
    },
  ]

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
    setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
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

  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.title}>{t(TranslationKey['Additional order information'])}</p>

        <Card wrapperClassName={styles.card}>
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
          setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
        >
          {/* @ts-ignore */}
          <SelectStorekeeperAndTariffForm
            showCheckbox
            RemoveDestinationRestriction
            storekeepers={storekeepers?.filter(el => el?._id === order?.storekeeper?._id)}
            curStorekeeperId={order?.storekeeperId}
            currentDestinationId={order?.destinationId}
            curTariffId={order?.logicsTariffId}
            currentVariationTariffId={order?.variationTariffId}
            onSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        </Modal>
      ) : null}

      {showConfirmModal ? (
        <ConfirmationModal
          isWarning={confirmModalSettings?.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => setShowConfirmModal(!showConfirmModal)}
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
