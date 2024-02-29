import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Autocomplete } from '@mui/material'
import TextField from '@mui/material/TextField'

import { GeneralModel } from '@models/general-model'

import { Button } from '@components/shared/buttons/button'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { useStyles } from './tag-selector.style'

import { Option } from './option'

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
    if (!selectValue) return

    const tag = tagList.find(el => el.title === selectValue?.title)

    let newValue: Tag[] = []

    if (tag) {
      newValue = [...selectedTags, tag]
      setSelectedTags(newValue)
      handleSaveTags(newValue)
    } else {
      GeneralModel.createTag(selectValue.title).then(res => {
        newValue = [...selectedTags, { title: selectValue?.title, _id: res._id } as Tag]
        setSelectedTags(newValue)
        handleSaveTags(newValue)
        getTags().then(value => setTagList(value))
      })
    }
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
                style={{ width: '100%' }}
                label={placeholder}
                value={textValue}
                onInput={(event: ChangeEvent<HTMLInputElement>) => {
                  setTextValue(event.target.value)
                  event.target.value = event?.target.value.slice(0, 75) // Ограничиваем длину ввода
                }}
              />
            )}
            renderOption={(_, option) => (
              <li {..._}>
                <Option prefix={prefix} option={option.title} />
              </li>
            )}
            value={selectValue}
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
          <div key={el._id} className={styles.tagListItem}>
            <Option prefix={prefix} option={el.title} />
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
})
