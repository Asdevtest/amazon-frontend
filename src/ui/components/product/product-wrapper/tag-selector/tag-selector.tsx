import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { Autocomplete } from '@mui/material'
import TextField from '@mui/material/TextField'

import { GeneralModel } from '@models/general-model'

import { Button } from '@components/shared/button'
import { CustomPlusIcon } from '@components/shared/svg-icons'
import { TagItem } from '@components/shared/tag-item'

import { useStyles } from './tag-selector.style'

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

export const TagSelector: FC<TagSelectorProps> = memo(props => {
  const { currentTags, getTags, handleSaveTags, isEditMode, prefix = '', placeholder = 'Input' } = props
  const { classes: styles } = useStyles()

  const [tagList, setTagList] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>(currentTags)
  const [selectValue, setSelectValue] = useState<Tag | null>()

  const [textValue, setTextValue] = useState<string>('')

  useEffect(() => {
    if (isEditMode) {
      getTags().then(value => setTagList(value))
    }
  }, [])

  const handleRemoveTags = (tag: Tag) => {
    const newTags = selectedTags.filter(el => el._id !== tag._id)
    setSelectedTags(newTags)
    handleSaveTags(newTags)
  }

  const handleAddTags = () => {
    const tag = tagList.find(el => el.title === selectValue?.title)

    let newValue: Tag[] = []

    if (tag) {
      newValue = [...selectedTags, tag]
      setSelectedTags(newValue)
      handleSaveTags(newValue)
    } else {
      GeneralModel.createTag(textValue || selectValue?.title).then(res => {
        newValue = [...selectedTags, { title: textValue || selectValue?.title, _id: res._id } as Tag]
        setSelectedTags(newValue)
        handleSaveTags(newValue)
        getTags().then(value => setTagList(value))
      })
    }

    setSelectValue(null)
    setTextValue('')
  }

  return (
    <div>
      {isEditMode && (
        <div className={styles.search}>
          <Autocomplete
            disablePortal
            freeSolo
            autoSelect
            id="combo-box-demo"
            options={tagList}
            getOptionLabel={el => (typeof el === 'string' ? el : el.title)}
            sx={{ width: '100%', minWidth: 300 }}
            renderInput={params => (
              <TextField
                {...params}
                placeholder={placeholder}
                value={textValue}
                onInput={(event: ChangeEvent<HTMLInputElement>) => {
                  setTextValue(event.target.value)
                  event.target.value = event?.target.value.slice(0, 75) // Ограничиваем длину ввода
                }}
              />
            )}
            renderOption={(_, option) => (
              <li {..._}>
                <TagItem prefix={prefix} option={option.title} />
              </li>
            )}
            value={textValue}
            onChange={(_, value) => {
              setTextValue(typeof value === 'string' ? value : value?.title || '')
              setSelectValue(typeof value === 'string' ? ({ title: value } as Tag) : value)
            }}
          />

          <Button
            iconButton
            className={styles.addBtn}
            disabled={!textValue?.length || selectedTags.some(el => el.title === textValue)}
            onClick={handleAddTags}
          >
            <CustomPlusIcon />
          </Button>
        </div>
      )}

      <div className={styles.tagList}>
        {selectedTags.map(el => (
          <TagItem
            key={el._id}
            prefix={prefix}
            option={el.title}
            onClickRemove={isEditMode ? () => handleRemoveTags(el) : undefined}
          />
        ))}
      </div>
    </div>
  )
})
