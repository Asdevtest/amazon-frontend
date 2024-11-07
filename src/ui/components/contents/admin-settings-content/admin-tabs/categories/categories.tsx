import { Tree } from 'antd'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
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
          <CustomInput allowClear size="large" placeholder="Search" />

          <div className={styles.flexRow}>
            <CustomButton size="large">Import</CustomButton>
            <CustomButton size="large" type="primary" onClick={viewModel.onToggleCategoryModal}>
              Add category
            </CustomButton>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.title}>{t(TranslationKey.Categories)}</p>

          <Tree
            draggable
            blockNode
            height={650}
            className={styles.treeSelect}
            treeData={viewModel.categories}
            onDragEnter={viewModel.onDragEnter}
            onDrop={viewModel.onDrop}
          />
        </div>
      </div>

      <Modal openModal={viewModel.showCategoryModal} setOpenModal={viewModel.onToggleCategoryModal}>
        <CategoryForm
          category={viewModel.categoryToEdit}
          categories={viewModel.categories}
          onSubmit={viewModel.onSubmitCategoryModal}
        />
      </Modal>
    </>
  )
})
