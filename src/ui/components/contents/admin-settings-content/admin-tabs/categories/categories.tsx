import { Empty, Tree } from 'antd'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './categories.style'

import { CategoriesModel } from './categories.model'
import { CategoryForm } from './category-form'

export const Categories = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new CategoriesModel(), [])

  return (
    <>
      <div className="viewWrapper">
        <div className={styles.flexRow}>
          <CustomInputSearch allowClear size="large" placeholder="Search" onChange={viewModel.onChangeInputSearch} />

          <div className={styles.flexRow}>
            <CustomButton disabled size="large">
              {t(TranslationKey.Import)}
            </CustomButton>
            <CustomButton size="large" type="primary" onClick={viewModel.onToggleCategoryModal}>
              {t(TranslationKey['Add category'])}
            </CustomButton>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.title}>{t(TranslationKey.Categories)}</p>

          {viewModel.categoriesNodes.length ? (
            <Tree
              draggable
              blockNode
              height={650}
              className={styles.treeSelect}
              treeData={viewModel.categories}
              expandedKeys={viewModel.expandedKeys}
              autoExpandParent={viewModel.autoExpandParent}
              onExpand={viewModel.onExpand}
              onDrop={viewModel.onDrop}
            />
          ) : (
            <Empty />
          )}
        </div>
      </div>

      <Modal openModal={viewModel.showCategoryModal} setOpenModal={viewModel.onToggleCategoryModal}>
        <CategoryForm
          category={viewModel.categoryToEdit}
          categories={viewModel.categoriesNodes}
          onSubmit={viewModel.onSubmitCategoryModal}
        />
      </Modal>
    </>
  )
})
