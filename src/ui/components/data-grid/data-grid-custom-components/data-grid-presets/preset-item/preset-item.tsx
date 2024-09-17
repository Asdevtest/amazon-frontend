import { Dropdown, MenuProps, Popconfirm } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { ChangeEvent, FC, memo, useCallback, useState } from 'react'
import { BsPinAngleFill, BsThreeDotsVertical } from 'react-icons/bs'
import { GrUpdate } from 'react-icons/gr'
import { MdOutlineDelete, MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { RiUnpinLine } from 'react-icons/ri'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomTextarea } from '@components/shared/custom-textarea'

import { t } from '@utils/translations'

import { useStyles } from './preset-item.style'

interface PresetItemProps {
  preset: BaseOptionType
  handleDeletePreset: () => void
  handleUpdatePreset: () => void
  onClickAddQuickAccess: () => void
  onClickSaveRenamedPreset: (newTitle: string) => void
}

export const PresetItem: FC<PresetItemProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { preset, handleDeletePreset, handleUpdatePreset, onClickAddQuickAccess, onClickSaveRenamedPreset } = props

  const [renamePresetName, setPresetName] = useState<string>('')

  const presetFavorite = preset?.data?.isFavorite
  const quickAccessTitle = presetFavorite ? 'Remove from quick access' : 'Add to quick access'
  const QuickAccessIcon = presetFavorite ? BsPinAngleFill : RiUnpinLine

  const presetId = preset?.data?._id

  const handleChangeTagName = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setPresetName(e.target.value)
  }, [])

  const onClickSaveRename = useCallback(() => {
    onClickSaveRenamedPreset(renamePresetName)
  }, [renamePresetName, onClickSaveRenamedPreset])

  const resetRenamePreset = useCallback(() => {
    setPresetName('')
  }, [])

  const items: MenuProps['items'] = [
    {
      key: 'rename',
      label: (
        <Popconfirm
          title=""
          icon={null}
          placement="leftTop"
          getPopupContainer={() => document.getElementById('presets') as HTMLElement}
          description={
            <CustomTextarea
              allowClear
              rows={1}
              data-input="rename-input"
              placeholder={t(TranslationKey.Rename)}
              className={styles.input}
              wrapperClassName={styles.input}
              value={renamePresetName}
              onChange={handleChangeTagName}
              onClick={e => {
                e?.stopPropagation()
                const target = e.target as HTMLElement
                target.focus()
              }}
            />
          }
          okText={t(TranslationKey.Save)}
          cancelText={t(TranslationKey.Cancel)}
          okButtonProps={{ disabled: !renamePresetName?.trim() }}
          onConfirm={e => {
            e?.stopPropagation()
            onClickSaveRename()
          }}
          onPopupClick={e => {
            const target = e.target as HTMLElement
            if (target.getAttribute('data-input') !== 'rename-input') {
              e?.stopPropagation()
            }
          }}
          onCancel={e => e?.stopPropagation()}
          onOpenChange={resetRenamePreset}
        >
          <CustomButton
            className={styles.button}
            icon={
              <MdOutlineDriveFileRenameOutline
                size={20}
                title={t(TranslationKey.Rename)}
                className={styles.updateButton}
              />
            }
            onClick={e => e.stopPropagation()}
          >
            {t(TranslationKey.Rename)}
          </CustomButton>
        </Popconfirm>
      ),
    },
    {
      key: 'update',
      label: (
        <Popconfirm
          placement="left"
          getPopupContainer={() => document.getElementById('presets') as HTMLElement}
          title={t(TranslationKey['Save the state of the table to this preset?'])}
          okText={t(TranslationKey.Yes)}
          cancelText={t(TranslationKey.No)}
          onConfirm={e => {
            e?.stopPropagation()
            handleUpdatePreset()
          }}
          onCancel={e => e?.stopPropagation()}
        >
          <CustomButton
            className={styles.button}
            icon={<GrUpdate title={t(TranslationKey.Update)} className={styles.updateButton} />}
            onClick={e => e.stopPropagation()}
          >
            {t(TranslationKey.Update)}
          </CustomButton>
        </Popconfirm>
      ),
    },

    {
      key: 'delete',
      label: (
        <Popconfirm
          placement="leftBottom"
          getPopupContainer={() => document.getElementById('presets') as HTMLElement}
          title={t(TranslationKey['Are you sure delete this preset?'])}
          okText={t(TranslationKey.Yes)}
          cancelText={t(TranslationKey.No)}
          onConfirm={e => {
            e?.stopPropagation()
            handleDeletePreset()
          }}
          onCancel={e => e?.stopPropagation()}
        >
          <CustomButton
            danger
            className={styles.button}
            icon={<MdOutlineDelete size={20} title={t(TranslationKey.Delete)} className={styles.deleteIcon} />}
            onClick={e => e.stopPropagation()}
          >
            {t(TranslationKey.Delete)}
          </CustomButton>
        </Popconfirm>
      ),
    },
  ]

  return (
    <div className={styles.presetItemWrapper}>
      {presetId ? (
        <CustomButton
          type="text"
          title={t(TranslationKey[quickAccessTitle])}
          className={styles.button}
          icon={<QuickAccessIcon title={t(TranslationKey[quickAccessTitle])} className={styles.updateButton} />}
          onClick={e => {
            e?.stopPropagation()
            onClickAddQuickAccess()
          }}
        />
      ) : (
        <div className={styles.presetEmptyFavorite} />
      )}

      <p className={styles.presetTitle}>{preset?.data?.title}</p>

      {presetId ? (
        <Dropdown
          destroyPopupOnHide
          menu={{ items }}
          placement="bottomLeft"
          trigger={['hover']}
          arrow={{ pointAtCenter: true }}
          getPopupContainer={() => document.getElementById('presets') as HTMLElement}
        >
          <CustomButton icon={<BsThreeDotsVertical />} onClick={e => e.stopPropagation()} />
        </Dropdown>
      ) : null}
    </div>
  )
})
