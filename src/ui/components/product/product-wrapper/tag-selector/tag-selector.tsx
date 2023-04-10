import CloseIcon from '@mui/icons-material/Close'
import {Autocomplete} from '@mui/material'
import TextField from '@mui/material/TextField'

import React, {FC, useEffect, useState} from 'react'

import {AddOutlined} from '@material-ui/icons'

import {GeneralModel} from '@models/general-model'

import {useTagSelectorStyles} from '@components/product/product-wrapper/tag-selector/tag-selector.styles'

interface Tag {
  _id: string
  title: string
  productCount: number
}

interface TagSelectorProps {
  handleSaveTags: (tags: Tag[]) => void
  currentTags: Tag[]
  isEditMode: boolean
  getTags: () => Promise<Tag[]>
  prefix?: string
  placeholder: string
}

export const TagSelector: FC<TagSelectorProps> = props => {
  const {currentTags, getTags, handleSaveTags, isEditMode, prefix = '', placeholder = 'Input'} = props
  const {classes: styles} = useTagSelectorStyles()

  const [tagList, setTagList] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>(currentTags)
  const [selectValue, setSelectValue] = useState<Tag | null>()

  useEffect(() => {
    if (isEditMode) {
      getTags().then(value => setTagList(value))
    }
  }, [])

  const handleRemoveTags = (tag: Tag) => {
    setSelectedTags(prevState => prevState.filter(el => el._id !== tag._id))
  }

  const handleAddTags = () => {
    if (!selectValue) return

    const tag = tagList.find(el => el.title === selectValue?.title)

    if (tag) {
      setSelectedTags(prevState => [...prevState, tag])
    } else {
      GeneralModel.createTag(selectValue!.title).then(res => {
        setSelectedTags(prevState => [
          ...prevState,
          {title: selectValue?.title.replace(prefix, ''), _id: res._id} as Tag,
        ])
        getTags().then(value => setTagList(value))
      })
    }

    handleSaveTags(selectedTags)
  }

  return (
    <div className={styles.body}>
      {isEditMode && (
        <div className={styles.search}>
          <Autocomplete
            disablePortal
            freeSolo
            id="combo-box-demo"
            options={tagList}
            getOptionLabel={el => prefix + (typeof el === 'string' ? el : el.title).replace(prefix, '')}
            sx={{width: 300}}
            renderInput={params => <TextField {...params} label={placeholder} />}
            noOptionsText={'Not found'}
            value={selectValue}
            onChange={(_, value) => setSelectValue(typeof value === 'string' ? ({title: value} as Tag) : value)}
          />
          <button
            className={styles.addBtn}
            disabled={!selectValue?.title.length || selectedTags.some(el => el.title === selectValue?.title)}
            onClick={handleAddTags}
          >
            <AddOutlined fontSize="inherit" />
          </button>
        </div>
      )}

      <div className={styles.tagList}>
        {selectedTags.map(el => (
          <div key={el._id} className={styles.tagListItem}>
            {prefix + el.title}
            {isEditMode && (
              <button className={styles.removeTeg} onClick={() => handleRemoveTags(el)}>
                <CloseIcon fontSize="inherit" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
