import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { HistoryType } from '@typings/types/history'

import { useStyles } from './users-view.style'

import { UsersViewModel } from './users-view.model'

export const UsersView = observer(({ history }: { history: HistoryType }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new UsersViewModel(history))

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Users'])}</p>

      <CustomButton type="primary" size="large" onClick={viewModel.onClickSubUsers}>
        {t(TranslationKey['My users'])}
      </CustomButton>
    </>
  )
})
