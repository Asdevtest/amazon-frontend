import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { SizeSwitcher } from '@components/shared/size-switcher'

import { t } from '@utils/translations'

import { Dimensions } from '@typings/enums/dimensions'
import { loadingStatus } from '@typings/enums/loading-status'
import { IBox } from '@typings/models/boxes/box'
import { IPlatformSettings } from '@typings/shared/patform-settings'

import { useStyles } from './boxes-to-create.style'

import { boxesToCreateColumn } from './boxes-to-create-column'
import { BoxesToCreateModel } from './boxes-to-create.model'

interface BoxesToCreateProps {
  setBoxesForCreation: (boxes: IBox[]) => void
  formFields: IOrderWithAdditionalFields
  platformSettings: IPlatformSettings
  orderGoodsAmount: number
  barcodeIsExist: boolean
  isNoBuyerSupplier: boolean
  newBoxes: IBox[]
  onRemoveBox: () => void
  onEditBox: () => void
}

export const BoxesToCreate: FC<BoxesToCreateProps> = observer(props => {
  const {
    setBoxesForCreation,
    platformSettings,
    orderGoodsAmount,
    barcodeIsExist,
    isNoBuyerSupplier,
    newBoxes,
    onEditBox,
  } = props

  const { classes: styles, cx } = useStyles()

  const [sizeSetting, setSizeSetting] = useState(Dimensions.EU)

  const itemsGoodsAmount = newBoxes?.reduce((acc, item) => {
    return acc + item?.items?.[0]?.amount * item?.amount
  }, 0)
  const [viewModel] = useState(() => new BoxesToCreateModel(newBoxes))

  setBoxesForCreation(viewModel.boxes)

  return (
    <>
      <div className={styles.sizesSubWrapper}>
        <SizeSwitcher condition={sizeSetting} onChangeCondition={setSizeSetting} />

        <p>
          {`${t(TranslationKey['Total quantity'])}:`}{' '}
          <span
            className={cx({
              [styles.itemsNotEqualTotal]: itemsGoodsAmount !== orderGoodsAmount,
              [styles.itemsEqualTotal]: itemsGoodsAmount === orderGoodsAmount,
            })}
          >
            {itemsGoodsAmount}
          </span>
          {` / `}
          <span>{orderGoodsAmount}</span>
        </p>
      </div>
      <div className={styles.wrapper}>
        <CustomDataGrid
          disableColumnMenu
          disableRowSelectionOnClick
          sortingMode="client"
          paginationMode="client"
          rows={viewModel.boxes || []}
          columnHeaderHeight={40}
          getRowHeight={() => 'auto'}
          getRowId={(row: GridRowModel) => row._id || `new-${Math.random()}`}
          columns={boxesToCreateColumn(
            platformSettings,
            barcodeIsExist,
            isNoBuyerSupplier,
            viewModel.rowHandlers,
            onEditBox,
            newBoxes,
          )}
          paginationModel={viewModel.paginationModel}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
          sx={{
            '& .MuiDataGrid-columnHeaderTitleContainer': styles.columnHeaderTitleContainer,
            '& .MuiDataGrid-columnHeaderDraggableContainer': styles.columnHeaderTitleContainer,
          }}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
            toolbar: {
              children: (
                <div className={styles.toolbar}>
                  <p className={styles.tableTitle}>{t(TranslationKey['Boxes will be created'])}</p>
                </div>
              ),
            },
          }}
          onPaginationModelChange={viewModel.onPaginationModelChange}
        />
      </div>
    </>
  )
})
