import { makeAutoObservable, runInAction } from 'mobx'

import { GridPaginationModel } from '@mui/x-data-grid'

import { loadingStatus } from '@typings/enums/loading-status'
import { IBox } from '@typings/models/boxes/box'

export class BoxesToCreateModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  paginationModel: GridPaginationModel = { page: 0, pageSize: 15 }
  boxes: IBox[]
  rowHandlers = {
    onClickRemoveBtn: (row: number) => this.onRemoveBox(row),
    onClickBarcodeCheckbox: (row: number) => this.onClickBarcodeCheckbox(row),
    onClickTransparency: (row: number) => this.onClickTransparency(row),
    onClickUpdateSupplierStandart: (row: number) => this.onClickUpdateSupplierStandart(row),
  }
  constructor(boxes: IBox[]) {
    this.boxes = boxes
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onRemoveBox(boxIndex: number) {
    this.boxes = this.boxes.filter((_, i) => i !== boxIndex)
  }

  onPaginationModelChange(model: GridPaginationModel) {
    this.paginationModel = model
  }

  onClickBarcodeCheckbox(boxIndex: number) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStateFormFields = [...this.boxes]
      newStateFormFields[boxIndex].items[0].isBarCodeAlreadyAttachedByTheSupplier = e.target.checked
      this.boxes = newStateFormFields
    }
  }
  onClickTransparency(boxIndex: number) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('Transparency Checkbox Clicked:', boxIndex, e.target.checked)
      runInAction(() => {
        const newStateFormFields = [...this.boxes]
        newStateFormFields[boxIndex].items[0] = {
          ...newStateFormFields[boxIndex].items[0],
          isTransparencyFileAlreadyAttachedByTheSupplier: e.target.checked,
        }
        this.boxes = newStateFormFields
      })
    }
  }

  onClickUpdateSupplierStandart(boxIndex: number) {
    console.log(' onClickUpdateSupplierStandart:', boxIndex)
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStateFormFields = [...this.boxes].map(el => ({
        ...el,
        tmpUseToUpdateSupplierBoxDimensions: false,
      }))
      newStateFormFields[boxIndex].tmpUseToUpdateSupplierBoxDimensions = e.target.checked
      this.boxes = newStateFormFields
    }
  }
}
