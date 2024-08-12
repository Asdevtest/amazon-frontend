import { Dropdown, MenuProps, Popconfirm } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { FC, memo } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { GrUpdate } from 'react-icons/gr'
import { MdOutlineDelete } from 'react-icons/md'
import { RiUnpinLine } from 'react-icons/ri'
import { TiPinOutline } from 'react-icons/ti'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './preset-item.style'

interface PresetItemProps {
  preset: BaseOptionType
  handleDeletePreset: () => void
  handleUpdatePreset: () => void
  onClickAddQuickAccess: () => void
}

export const PresetItem: FC<PresetItemProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { preset, handleDeletePreset, handleUpdatePreset, onClickAddQuickAccess } = props

  const presetFavorite = preset?.data?.isFavorite
  const quickAccessTitle = presetFavorite ? 'Remove from quick access' : 'Add to quick access'
  const QuickAccessIcon = presetFavorite ? RiUnpinLine : TiPinOutline

  const items: MenuProps['items'] = [
    {
      key: 'quickAccess',
      label: (
        <CustomButton
          title={t(TranslationKey[quickAccessTitle])}
          className={styles.button}
          icon={<QuickAccessIcon title={t(TranslationKey[quickAccessTitle])} className={styles.updateButton} />}
          onClick={e => {
            e?.stopPropagation()
            onClickAddQuickAccess()
          }}
        >
          {t(TranslationKey[quickAccessTitle])}
        </CustomButton>
      ),
    },

    {
      key: 'update',
      label: (
        <Popconfirm
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
      <p className={styles.presetTitle}>{preset?.data?.title}</p>

      {preset?.data?._id ? (
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
