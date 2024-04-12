import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Modal } from '@components/shared/modal'
import { TagsSelect } from '@components/shared/selects/tags-select'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { TagItem } from '@components/shared/tag-item'

import { t } from '@utils/translations'

import { ITagList } from '@typings/models/generals/tag-list'

import { useStyles } from './edit-product-tags-modal.style'

import { EditProductTagModel } from './edit-product-tags-modal.model'

export const EditProductTags = observer(({ openModal, setOpenModal, productId }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new EditProductTagModel(productId))

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.container}>
        <TagsSelect tags={viewModel.availableTags} />
      </div>
    </Modal>
  )
})
