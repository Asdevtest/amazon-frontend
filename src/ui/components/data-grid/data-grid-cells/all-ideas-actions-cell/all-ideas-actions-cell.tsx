/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { ideaStatus, ideaStatusByKey, ideaStatusGroups, ideaStatusGroupsNames } from '@constants/statuses/idea-status'

import {
  AddAsinIdeaActionsCell,
  ClosedIdeaActionsCell,
  CreateCardIdeaActionsCell,
  IdeaActionsCell,
  OnCheckingIdeaActionsCell,
  RealizedIdeaActionsCell,
} from '../data-grid-cells'

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

export const AllIdeasActionsCell: FC<AllIdeasActionsCellProps> = React.memo(({ row, rowHandlers }) => {
  const status = row.status

  return (
    <>
      {ideaStatusGroups[ideaStatusGroupsNames.NEW].includes(status) && (
        <IdeaActionsCell
          onClickToCheck={() => rowHandlers.onClickToCheck(row._id)}
          onClickReject={() => rowHandlers.onClickReject(row._id)}
        />
      )}
      {ideaStatusGroups[ideaStatusGroupsNames.ON_CHECKING].includes(status) && (
        <OnCheckingIdeaActionsCell
          onClickAccept={() => rowHandlers.onClickAcceptOnCheckingStatus(row._id)}
          onClickReject={() => rowHandlers.onClickReject(row._id)}
        />
      )}
      {ideaStatusGroups[ideaStatusGroupsNames.SEARCH_SUPPLIERS].includes(status) && (
        <OnCheckingIdeaActionsCell
          isAcceptDisabled={row.status !== ideaStatusByKey[ideaStatus.SUPPLIER_FOUND]}
          onClickAccept={() => rowHandlers.onClickAcceptOnSuppliersSearch(row._id)}
          onClickReject={() => rowHandlers.onClickReject(row._id)}
        />
      )}
      {ideaStatusGroups[ideaStatusGroupsNames.CREATE_CARD].includes(status) && (
        <CreateCardIdeaActionsCell row={row} rowHandlers={rowHandlers} />
      )}
      {ideaStatusGroups[ideaStatusGroupsNames.ADD_ASIN].includes(status) && (
        <AddAsinIdeaActionsCell rowHandlers={rowHandlers} row={row} />
      )}
      {ideaStatusGroups[ideaStatusGroupsNames.REALIZED].includes(status) && (
        <RealizedIdeaActionsCell rowHandlers={rowHandlers} row={row} />
      )}
      {ideaStatusGroups[ideaStatusGroupsNames.CLOSED].includes(status) && (
        <ClosedIdeaActionsCell row={row} rowHandlers={rowHandlers} />
      )}
    </>
  )
})
