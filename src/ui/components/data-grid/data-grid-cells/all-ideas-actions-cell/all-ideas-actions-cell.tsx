/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionButtonsCell, RealizedIdeaActionsCell } from '..'
import { FC, memo } from 'react'

import { ideaStatus, ideaStatusByKey, ideaStatusGroups, ideaStatusGroupsNames } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

interface AllIdeasActionsCellProps {
  row: any
  rowHandlers: {
    onClickToCheck: (id: string) => void
    onClickReject: (id: string) => void
    onClickAcceptOnCheckingStatus: (id: string) => void
    onClickAcceptOnSuppliersSearch: (id: string) => void
    onClickAcceptOnCreatingProduct: (id: string) => void
    onClickAcceptOnAddingAsin: (id: string) => void
    onClickToOrder: (id: string) => void
    onClickRestore: (id: string) => void
    onClickClose: (id: string) => void
  }
}

export const AllIdeasActionsCell: FC<AllIdeasActionsCellProps> = memo(({ row, rowHandlers }) => {
  const status = row.status

  return (
    <>
      {ideaStatusGroups[ideaStatusGroupsNames.NEW].includes(status) && (
        <ActionButtonsCell
          showFirst
          showSecond
          secondDanger
          firstContent={t(TranslationKey['To check'])}
          secondContent={t(TranslationKey.Reject)}
          onClickFirst={() => rowHandlers.onClickToCheck(row._id)}
          onClickSecond={() => rowHandlers.onClickReject(row._id)}
        />
      )}

      {ideaStatusGroups[ideaStatusGroupsNames.ON_CHECKING].includes(status) && (
        <ActionButtonsCell
          showFirst
          showSecond
          secondDanger
          firstContent={t(TranslationKey.Accept)}
          secondContent={t(TranslationKey.Reject)}
          onClickFirst={() => rowHandlers.onClickAcceptOnCheckingStatus(row._id)}
          onClickSecond={() => rowHandlers.onClickReject(row._id)}
        />
      )}

      {ideaStatusGroups[ideaStatusGroupsNames.SEARCH_SUPPLIERS].includes(status) && (
        <ActionButtonsCell
          showFirst
          showSecond
          secondDanger
          firstContent={t(TranslationKey.Accept)}
          firstDisabled={row.status !== ideaStatusByKey[ideaStatus.SUPPLIER_FOUND]}
          secondContent={t(TranslationKey.Reject)}
          onClickFirst={() => rowHandlers.onClickAcceptOnSuppliersSearch(row._id)}
          onClickSecond={() => rowHandlers.onClickReject(row._id)}
        />
      )}

      {ideaStatusGroups[ideaStatusGroupsNames.CREATE_CARD].includes(status) && (
        <ActionButtonsCell
          showFirst
          firstContent={t(TranslationKey.Accept)}
          firstDisabled={!row.childProduct && row.variation}
          onClickFirst={() => rowHandlers.onClickAcceptOnCreatingProduct(row._id)}
        />
      )}

      {ideaStatusGroups[ideaStatusGroupsNames.ADD_ASIN].includes(status) && (
        <ActionButtonsCell
          showFirst
          firstContent={t(TranslationKey.Accept)}
          firstDisabled={row.variation ? !row.childProduct?.barCode : !row.parentProduct?.barCode}
          onClickFirst={() => rowHandlers.onClickAcceptOnAddingAsin(row._id)}
        />
      )}

      {ideaStatusGroups[ideaStatusGroupsNames.REALIZED].includes(status) && (
        <RealizedIdeaActionsCell rowHandlers={rowHandlers} row={row} />
      )}

      {ideaStatusGroups[ideaStatusGroupsNames.CLOSED].includes(status) && (
        <ActionButtonsCell
          showFirst
          showSecond
          secondDanger
          firstContent={t(TranslationKey.Restore)}
          firstDisabled={ideaStatusByKey[ideaStatus.CLOSED] === row.status}
          secondContent={t(TranslationKey.Close)}
          secondDisabled={ideaStatusByKey[ideaStatus.CLOSED] === row.status}
          onClickFirst={() => rowHandlers.onClickRestore(row._id)}
          onClickSecond={() => rowHandlers.onClickClose(row._id)}
        />
      )}
    </>
  )
})
