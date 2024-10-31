import { observer } from 'mobx-react'
import { useEffect, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { CategoryRootViewModel } from '@views/shared/category-root-view/category-root-view.model'
import { useStyles } from '@views/shared/category-root-view/category-root-view.style'

import { t } from '@utils/translations'

import { HistoryType } from '@typings/types/history'

export const CategoryRootView = observer(({ history }: { history: HistoryType }) => {
  const viewModel = useMemo(() => new CategoryRootViewModel(history), [])
  const { classes: styles } = useStyles()

  useEffect(() => {
    viewModel.setSubRoutes()
  }, [viewModel.language])

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section'])}</p>

      <div className={styles.btnsWrapper}>
        {viewModel.subRoutes?.map((el, index) => (
          <CustomButton key={index} onClick={() => viewModel.onClickCategory(el.subRoute)}>
            {el.subtitle()}
          </CustomButton>
        ))}
      </div>
    </>
  )
})
