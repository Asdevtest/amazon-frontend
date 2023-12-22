/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, makeAutoObservable, makeObservable, observable, override, runInAction } from 'mobx'

import { GridColDef } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridTableModel } from '@models/data-grid-table-model/data-grid-table-model'
import { SellerBoardModel } from '@models/seller-board-model'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { IListOfModals } from '@typings/data-grid'

export class ClientShopsViewModel extends DataGridTableModel {
  constructor(
    getMainDataMethod: (...args: any) => any,
    columnsModel: GridColDef[],
    history?: History,
    listOfModals?: IListOfModals,
    tableKey?: string,
  ) {
    super(getMainDataMethod, columnsModel, history, listOfModals, tableKey)
    makeObservable(this, {})

    this.loadData()
  }

  async loadData() {
    try {
      const res = await this.getMainDataMethod()

      runInAction(() => {
        this.tableData = addIdDataConverter(res)
      })
    } catch (error) {
      console.log(error)
    }
  }

  // async onSubmitMoveToInventoryGoods(selectedRows: string[]) {
  //   try {
  //     const productsToCreate: any[] = []
  //     runInAction(() => {
  //       this.tableData.forEach(
  //         cur =>
  //           selectedRows.includes(cur.id) &&
  //           productsToCreate.push({ shopId: cur.shop._id, asin: cur.asin, sku: cur.sku, title: cur.title }),
  //       )
  //     })
  //     await SellerBoardModel.createAndLinkSkuProducts({ payload: productsToCreate })
  //     runInAction(() => {
  //       this.warningInfoModalSettings = {
  //         isWarning: false,
  //         title: t(TranslationKey['The products will appear in the inventory soon']),
  //       }
  //     })
  //     this.onTriggerOpenModal('showInfoModal')
  //   } catch (error) {
  //     console.log(error)
  //     // runInAction(() => {
  //     //   this.infoModalText = t(TranslationKey['Will not be moved to inventory'])
  //     // })
  //     // this.onTriggerOpenModal('showInfoModal')
  //   }
  // }
}
