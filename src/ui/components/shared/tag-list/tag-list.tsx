import { Empty } from 'antd'
import { FC, memo, useMemo, useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { EditProductTags } from '@components/modals/edit-product-tags-modal'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomTag } from '@components/shared/custom-tag'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { ITag } from '@typings/shared/tag'

import { useStyles } from './tag-list.style'

interface TagListProps {
  tags: ITag[]
  productId: string
  onClickTag?: (tag: ITag) => void
}

export const TagList: FC<TagListProps> = memo(props => {
  const { tags, productId, onClickTag } = props

  const { classes: styles, cx } = useStyles()
  const [showEditProductTagsModal, setShowEditProductTagsModal] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const filteredTags = useMemo(
    () => tags?.filter(tag => tag.title.toLowerCase().includes(searchValue.toLowerCase())),
    [tags, searchValue],
  )

  return (
    <>
      <div className={styles.root}>
        <p className={styles.text}>{t(TranslationKey['Product tags'])}</p>

        <div className={styles.search}>
          <CustomInput fullWidth placeholder="Search" onChange={e => setSearchValue(e.target.value)} />
          <div>
            <CustomButton icon={<MdOutlineEdit size={16} />} onClick={() => setShowEditProductTagsModal(true)} />
          </div>
        </div>

        <div className={cx(styles.tags, { [styles.empty]: !filteredTags?.length })}>
          {filteredTags?.length ? (
            filteredTags?.map(tag => (
              <CustomTag
                key={tag._id}
                title={tag.title}
                color={tag.color}
                tooltipText={tag.title}
                onClick={() => onClickTag?.(tag)}
              >
                {tag.title}
              </CustomTag>
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>

      <Modal
        missClickModalOn
        openModal={showEditProductTagsModal}
        setOpenModal={() => setShowEditProductTagsModal(!showEditProductTagsModal)}
      >
        <EditProductTags
          productId={productId}
          onCloseModal={() => setShowEditProductTagsModal(!showEditProductTagsModal)}
          onUpdateRow={() => {}}
        />
      </Modal>
    </>
  )
})
