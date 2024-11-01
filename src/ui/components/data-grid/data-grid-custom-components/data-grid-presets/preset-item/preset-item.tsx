import { Dropdown, MenuProps, Popconfirm } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { ChangeEvent, FC, memo, useCallback, useState } from 'react'
import { BsPinAngleFill, BsThreeDotsVertical } from 'react-icons/bs'
import { GrUpdate } from 'react-icons/gr'
import { MdOutlineDelete, MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { RiUnpinLine } from 'react-icons/ri'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'

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

  const [renamePresetName, setPresetName] = useState<string>(preset?.data?.title)

  const presetFavorite = preset?.data?.isFavorite
  const quickAccessTitle = presetFavorite ? 'Remove from quick access' : 'Add to quick access'
  const QuickAccessIcon = presetFavorite ? BsPinAngleFill : RiUnpinLine

  const presetId = preset?.data?._id

  const handleChangeTagName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPresetName(e.target.value)
  }, [])

  const onClickSaveRename = useCallback(() => {
    onClickSaveRenamedPreset(renamePresetName)
  }, [renamePresetName, onClickSaveRenamedPreset])

  const resetRenamePreset = useCallback(() => {
    setPresetName(preset?.data?.title)
  }, [preset?.data?.title])

  const items: MenuProps['items'] = [
    {
      key: 'rename',
      label: (
        <Popconfirm
          icon={null}
          placement="leftTop"
          title={
            <CustomInput
              allowClear
              maxLength={32}
              wrapperClassName={styles.input}
              placeholder="Rename"
              value={renamePresetName}
              onChange={handleChangeTagName}
            />
          }
          getPopupContainer={() => document.getElementById('presets') as HTMLElement}
          okText={t(TranslationKey.Save)}
          cancelText={t(TranslationKey.Cancel)}
          okButtonProps={{ disabled: !renamePresetName?.trim() }}
          onConfirm={e => {
            e?.stopPropagation()
            onClickSaveRename()
          }}
          onPopupClick={e => e?.stopPropagation()}
          onCancel={e => e?.stopPropagation()}
          onOpenChange={resetRenamePreset}
        >
          <CustomButton icon={<MdOutlineDriveFileRenameOutline size={16} />}>{t(TranslationKey.Rename)}</CustomButton>
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
          onPopupClick={e => e?.stopPropagation()}
        >
          <CustomButton icon={<GrUpdate size={16} />}>{t(TranslationKey.Update)}</CustomButton>
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
          onPopupClick={e => e?.stopPropagation()}
        >
          <CustomButton danger icon={<MdOutlineDelete size={20} />}>
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
          icon={<QuickAccessIcon title={t(TranslationKey[quickAccessTitle])} />}
          onClick={onClickAddQuickAccess}
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
          <CustomButton icon={<BsThreeDotsVertical />} />
        </Dropdown>
      ) : null}
    </div>
  )
})
