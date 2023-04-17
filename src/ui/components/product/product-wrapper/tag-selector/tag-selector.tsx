import CloseIcon from '@mui/icons-material/Close'
import {Autocomplete} from '@mui/material'
import TextField from '@mui/material/TextField'

import React, {FC, useEffect, useState} from 'react'

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

    let newValue: Tag[] = []

    if (tag) {
      newValue = [...selectedTags, tag]
      setSelectedTags(newValue)
    } else {
      GeneralModel.createTag(selectValue!.title).then(res => {
        newValue = [...selectedTags, {title: selectValue?.title, _id: res._id} as Tag]
        setSelectedTags(newValue)
        getTags().then(value => setTagList(value))
      })
    }

    handleSaveTags(newValue)
  }

  return (
    <div className={styles.body}>
      {isEditMode && (
        <div className={styles.search}>
          <Autocomplete
            disablePortal
            freeSolo
            autoSelect
            id="combo-box-demo"
            options={tagList}
            getOptionLabel={el => (typeof el === 'string' ? el : el.title)}
            sx={{width: '100%', minWidth: 300}}
            renderInput={params => (
              <TextField
                {...params}
                // InputProps={{
                //   startAdornment: selectValue ? <InputAdornment position="start">{prefix}</InputAdornment> : null,
                // }}
                style={{width: '100%'}}
                label={placeholder}
                onInput={(event: any) => {
                  event.target.value = event?.target.value.slice(0, 75) // Ограничиваем длину ввода
                }}
              />
            )}
            renderOption={(_, option) => <li {..._}>{prefix + option.title}</li>}
            value={selectValue}
            onChange={(_, value) => setSelectValue(typeof value === 'string' ? ({title: value} as Tag) : value)}
          />
          <button
            className={styles.addBtn}
            disabled={!selectValue?.title.length || selectedTags.some(el => el.title === selectValue?.title)}
            onClick={handleAddTags}
          >
            <img src="/assets/icons/addTag.svg" alt="+" />
          </button>
        </div>
      )}

      <div className={styles.tagList}>
        {selectedTags.map(el => (
          <div key={el._id} className={styles.tagListItem}>
            <p>{prefix + el.title}</p>
            {isEditMode && (
              <button className={styles.removeTeg} onClick={() => handleRemoveTags(el)}>
                <div>
                  <CloseIcon fontSize="inherit" />
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
