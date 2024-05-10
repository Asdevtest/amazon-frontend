import { Dispatch, SetStateAction, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

interface IConfirmModalSettings {
  isWarning: boolean
  title: string
  confirmMessage: string
  onClickConfirm: () => void
  onClickCancelBtn: () => void
}

export interface INewDataOfVariation {
  isSameDestination: boolean
  variationTariffId: string
  destinationId: string
  logicsTariffId: string
  storekeeperId: string
}

export const useTariffVariation = (initialDestinationId: string, handleSetState: Dispatch<SetStateAction<IBox>>) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

  const [currentDestinationId, setCurrentDestinationId] = useState(initialDestinationId)
  const [confirmModalSettings, setConfirmModalSettings] = useState<IConfirmModalSettings | undefined>(undefined)

  const onSubmitSelectStorekeeperAndTariff = ({
    isSameDestination,
    variationTariffId,
    destinationId,
    logicsTariffId,
    storekeeperId,
  }: INewDataOfVariation) => {
    if (isSameDestination) {
      handleSetState(prev => ({
        ...prev,

        logicsTariffId,
        variationTariffId,
        destinationId,
        storekeeperId,

        storekeeper: {
          ...prev?.storekeeper,
          _id: storekeeperId,
        },
        destination: {
          ...prev?.destination,
          _id: destinationId,
        },
        logicsTariff: {
          ...prev?.logicsTariff,
          _id: logicsTariffId,
        },
        variationTariff: {
          ...prev?.variationTariff,
          _id: variationTariffId,
        },
      }))

      setCurrentDestinationId(destinationId)
      setShowSelectionStorekeeperAndTariffModal(false)
    } else {
      setConfirmModalSettings({
        isWarning: false,
        title: t(TranslationKey.Attention),
        confirmMessage: t(TranslationKey['Wish to change a destination?']),

        onClickConfirm: () => {
          handleSetState(prev => ({
            ...prev,
            logicsTariffId,
            variationTariffId,
            destinationId,
            storekeeperId,

            storekeeper: {
              ...prev?.storekeeper,
              _id: storekeeperId,
            },
            destination: {
              ...prev?.destination,
              _id: destinationId,
            },
            logicsTariff: {
              ...prev?.logicsTariff,
              _id: logicsTariffId,
            },
            variationTariff: {
              ...prev?.variationTariff,
              _id: variationTariffId,
            },
          }))

          setCurrentDestinationId(destinationId)
          setShowConfirmModal(false)
          setShowSelectionStorekeeperAndTariffModal(false)
        },

        onClickCancelBtn: () => {
          handleSetState(prev => ({
            ...prev,

            logicsTariffId,
            variationTariffId,
            destinationId: null as unknown as string,
            storekeeperId,

            storekeeper: {
              ...prev?.storekeeper,
              _id: storekeeperId,
            },
            destination: {
              ...prev?.destination,
              _id: null as unknown as string,
            },
            logicsTariff: {
              ...prev?.logicsTariff,
              _id: logicsTariffId,
            },
            variationTariff: {
              ...prev?.variationTariff,
              _id: variationTariffId,
            },
          }))

          setCurrentDestinationId(destinationId)
          setShowConfirmModal(false)
          setShowSelectionStorekeeperAndTariffModal(false)
        },
      })

      setShowConfirmModal(true)
    }
  }

  const handleSetDestination = (destinationId: string) =>
    handleSetState(prev => ({
      ...prev,
      destination: {
        ...prev?.destination,
        _id: destinationId,
      },
      destinationId,
    }))

  const handleResetDestination = () =>
    handleSetState(prev => ({
      ...prev,
      destination: {
        ...prev?.destination,
        _id: null as unknown as string,
      },
      destinationId: null as unknown as string,
    }))

  return {
    destinationId: currentDestinationId,
    setDestinationId: setCurrentDestinationId,

    showConfirmModal,
    setShowConfirmModal,

    confirmModalSettings,
    setConfirmModalSettings,

    handleSetDestination,
    handleResetDestination,

    showSelectionStorekeeperAndTariffModal,
    setShowSelectionStorekeeperAndTariffModal,

    onSubmitSelectStorekeeperAndTariff,
  }
}
