import { makeObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'

import { ChatModel } from '@models/chat-model'
import { ChatsModel } from '@models/chats-model'
import { DataGridTableModel } from '@models/data-grid-table-model'
import { FeedbackModel } from '@models/feedback-model'
import { ProductModel } from '@models/product-model'
import { UserModel } from '@models/user-model'

import { IFeedback } from '@typings/models/feedbacks/feedback'
import { IFullUser } from '@typings/shared/full-user'
import { HistoryType } from '@typings/types/history'

import { userProfileColumns } from '../user-profile-view/user-profile-view.columns'

import { anotherUserProfileConfig } from './another-user-profile-view.config'

export class AnotherProfileViewModel extends DataGridTableModel {
  userId?: string
  user?: IFullUser
  reviews: IFeedback[] = []
  tabHistory = 0
  tabReview = 0
  showConfirmWorkResultFormModal = false
  headerInfoData = {
    investorsCount: 255,
    goodsFound: 875,
    transactionsVolume: 7555,
    earnedAmount: 1255,
    addInSave: 12,
    inBlocked: 12,
    youBlocked: 14,
    accountCreateAt: 11,
  }

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }
  get simpleChats() {
    return ChatModel.simpleChats || []
  }

  constructor(history: HistoryType) {
    const defaultGetCurrentDataOptions = () => ({
      guid: history.location.search.slice(1),
    })

    super({
      getMainDataMethod: ProductModel.getVacProductByUserId,
      columnsModel: userProfileColumns(),
      tableKey: DataGridTablesKeys.PROFILE_VAC_PRODUCTS,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
      defaultGetCurrentDataOptions,
    })

    this.initHistory()

    this.userId = history.location.search.slice(1)
    this.getUserById()
    this.getCurrentData()
    this.getReviews()

    makeObservable(this, anotherUserProfileConfig)
  }

  async onClickWriteBtn(anotherUserId: string) {
    try {
      if (!this.simpleChats.some(el => el.users.map(e => e._id).includes(anotherUserId))) {
        await ChatsModel.createSimpleChatByUserId(anotherUserId)
      }
    } catch (e) {
      console.error(e)
    }

    this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/messages`, {
      anotherUserId,
    })
  }

  async getReviews() {
    try {
      const response = (await FeedbackModel.getMyFeedback()) as unknown as IFeedback[]

      runInAction(() => {
        this.reviews = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getUserById() {
    try {
      const response = (await UserModel.getUserInfoById(this.userId)) as unknown as IFullUser

      runInAction(() => {
        this.user = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onAcceptReview(review: { rating: number; review: string }) {
    await FeedbackModel.sendFeedback(this.userId, {
      rating: review.rating,
      comment: review.review,
    })
    await this.getReviews()
    this.onTriggerOpenModal('showConfirmWorkResultFormModal')
  }
}
