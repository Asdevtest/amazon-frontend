import { Tree } from 'antd'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'

import { t } from '@utils/translations'

import { useStyles } from './tab-categories.style'

import { AdminSettingsCategoriesModel } from './tab-categories.model'

export const TabCategories = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new AdminSettingsCategoriesModel(), [])

  return (
    <div className="viewWrapper">
      <div className={styles.flexRow}>
        <CustomInput size="large" placeholder="Search" />

        <div className={styles.flexRow}>
          <CustomButton size="large">Import</CustomButton>
          <CustomButton size="large" type="primary">
            Add category
          </CustomButton>
        </div>
      </div>

      {/* <div className={styles.flexRow}>
        <CustomInput size="large" onChange={viewModel.onChangeTitle} />
        <CustomButton size="large" type="primary" onClick={viewModel.onCreateCategory}>
          Create
        </CustomButton>
      </div> */}

      <div className={styles.content}>
        <p className={styles.title}>{t(TranslationKey.Categories)}</p>

        <Tree
          showLine
          draggable
          blockNode
          height={650}
          treeData={viewModel.categories}
          onDragEnter={viewModel.onDragEnter}
          onDrop={viewModel.onDrop}
        />
      </div>
    </div>
  )
})
