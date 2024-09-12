import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { AppealsListCard } from '@components/cards/appeals-list-card/appeals-list-card'

import { HistoryType } from '@typings/types/history'

import { ModeratorAppealsViewModel } from './moderator-appeals-view.model'

export const ModeratorAppealsView = observer(({ history }: { history: HistoryType }) => {
  const viewModel = useMemo(() => new ModeratorAppealsViewModel(history), [])

  return <AppealsListCard onClickViewMore={viewModel.onClickViewMore} />
})
