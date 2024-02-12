export interface IStoreekeeperDashboard {
  tasks?: IStoreekeeperDashboardTasks
  boxes?: IStoreekeeperDashboardBoxes
  batches?: IStoreekeeperDashboardBatches
}

export interface IStoreekeeperDashboardTasks {
  vacant?: number
  my?: number
  completed?: number
  canceled?: number
}
export interface IStoreekeeperDashboardBoxes {
  all?: number
  requestedShipment?: number
}

export interface IStoreekeeperDashboardBatches {
  awaitingSend?: number
  sent?: number
}
