import { makeAutoObservable, runInAction } from 'mobx';

import { loadingStatuses } from '@constants/loading-statuses';

import { BoxesModel } from '@models/boxes-model';
import { ClientModel } from '@models/client-model';

import { sortObjectsArrayByFiledDate } from '@utils/date-time';

export class ClientWarehouseViewModel {
  history = undefined;
  requestStatus = undefined;
  error = undefined;

  boxesMy = [];
  tasksMy = [];

  drawerOpen = false;
  curPage = 1;
  rowsPerPage = 5;
  selectedBoxes = [];

  showSendOwnProductModal = false;
  showEditBoxModal = false;
  showRedistributeBoxModal = false;
  showRedistributeBoxAddNewBoxModal = false;
  showRedistributeBoxSuccessModal = false;

  constructor({ history }) {
    this.history = history;
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading);
      await this.getBoxesMy();
      await this.getTasksMy();
      this.setRequestStatus(loadingStatuses.success);
    } catch (error) {
      console.log(error);
      this.setRequestStatus(loadingStatuses.failed);
    }
  }

  onModalRedistributeBoxAddNewBox(value) {
    this.modalRedistributeBoxAddNewBox = value;
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  onChangeCurPage = (e, value) => {
    this.curPage = value;
  };

  onChangeRowsPerPage = (e) => {
    this.rowsPerPage = Number(e.target.value);
    this.paginationPage = 1;
  };

  onTriggerCheckbox = (boxId) => {
    const updatedselectedBoxes = this.selectedBoxes.includes(boxId)
      ? this.selectedBoxes.filter((_id) => _id !== boxId)
      : this.selectedBoxes.concat(boxId);
    this.selectedBoxes = updatedselectedBoxes;
  };

  async onRedistribute(id, updatedBoxes, type) {
    const boxes = updatedBoxes.map((el) =>
      el.items.map((item) => ({ ...item, product: item.product._id }))
    );
    const splitBoxesResult = await this.splitBoxes(id, boxes);

    await this.postTask({ idsData: splitBoxesResult, type });
    await this.getTasksMy();
    this.selectedBoxes = [];
  }

  onEditBoxSubmit(id, data) {
    this.updateBox(id, data);
  }

  async onClickMerge(type) {
    const mergeBoxesResult = await this.mergeBoxes(this.selectedBoxes);

    console.log('mergeBoxesResult ', mergeBoxesResult);

    await this.postTask({ idsData: [ mergeBoxesResult ], type }); // TODO: тут нужно исправить на коробки полученные из mergeBoxesResult, сейчас там ничего не приходит, ждем бек
    await this.getTasksMy();

    this.selectedBoxes = [];
  }

  async postTask({ idsData, type }) {
    try {
      await ClientModel.createTask({
        taskId: 0,
        boxes: [ ...idsData ],
        operationType: type
      });
    } catch (error) {
      console.log(error);
      this.error = error;
    }
  }

  async getTasksMy() {
    try {
      const result = await ClientModel.getTasks();

      runInAction(() => {
        this.tasksMy = result.sort(sortObjectsArrayByFiledDate('createDate'));
      });
    } catch (error) {
      console.log(error);
      this.error = error;
    }
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState];
  }

  async mergeBoxes(boxes) {
    try {
      const result = await BoxesModel.mergeBoxes(boxes);

      await this.getBoxesMy();
      return result;
    } catch (error) {
      console.log(error);
      this.error = error;
    }
  }

  async splitBoxes(id, data) {
    try {
      const result = await BoxesModel.splitBoxes(id, data);

      await this.getBoxesMy();
      return result;
    } catch (error) {
      console.log(error);
      this.error = error;
    }
  }

  async updateBox(id, data) {
    try {
      await BoxesModel.updateBox(id, data);

      await this.getBoxesMy();
    } catch (error) {
      console.log(error);
      this.error = error;
    }
  }

  async getBoxesMy() {
    try {
      const result = await BoxesModel.getBoxes();

      runInAction(() => {
        this.boxesMy = result;
      });
    } catch (error) {
      console.log(error);
      this.error = error;
    }
  }

  async approveBoxesOperation(id) {
    try {
      await BoxesModel.approveBoxesOperation(id);

      await this.getBoxesMy();
    } catch (error) {
      console.log(error);
      this.error = error;
    }
  }

  async cancelMergeBoxes(id) {
    try {
      await BoxesModel.cancelMergeBoxes(id);

      await this.getBoxesMy();
    } catch (error) {
      console.log(error);
      this.error = error;
    }
  }

  async cancelSplitBoxes(id) {
    try {
      await BoxesModel.cancelSplitBoxes(id);

      await this.getBoxesMy();
    } catch (error) {
      console.log(error);
      this.error = error;
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus;
  }

  //  для тестов
  async removeBox(id) {
    try {
      await BoxesModel.removeBox(id);
    } catch (error) {
      console.log(error);
      this.error = error;
    }
  }
}
