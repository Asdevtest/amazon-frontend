import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { CategoryRootViewModel } from '@views/shared/category-root-view/category-root-view.model'
import { useCategoryRootViewStyles } from '@views/shared/category-root-view/category-root-view.style'

import { t } from '@utils/translations'

export const CategoryRootView = observer(props => {
  const [viewModel] = useState(() => new CategoryRootViewModel({ history: props.history }))
  const { classes: styles } = useCategoryRootViewStyles()

  useEffect(() => {
    viewModel.setSubRoutes()
  }, [viewModel.language])

  return (
    <div>
      <Typography className={styles.title}>{t(TranslationKey['Choose a section'])}</Typography>

      <div className={styles.btnsWrapper}>
        {viewModel.subRoutes?.map((el, index) => (
          <Button
            key={index}
            className={styles.button}
            color="primary"
            variant="outlined"
            onClick={() => viewModel.onClickCategory(el.subRoute)}
          >
            <div className={styles.btnTextWrapper}>
              <Typography className={styles.btnText}>{el.subtitle()}</Typography>
              <ArrowRightAltIcon color="primary" />
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
})
