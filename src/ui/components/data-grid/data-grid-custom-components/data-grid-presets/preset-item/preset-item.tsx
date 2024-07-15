import { Popconfirm } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { FC, memo } from 'react'
import { GrUpdate } from 'react-icons/gr'
import { MdOutlineDelete } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './preset-item.style'

interface PresetItemProps {
  preset: BaseOptionType
  handleDeletePreset: () => void
  handleUpdatePreset: () => void
}

export const PresetItem: FC<PresetItemProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { preset, handleDeletePreset, handleUpdatePreset } = props

  return (
    <div className={styles.presetItemWrapper}>
      <p className={styles.presetTitle}>{preset?.data?.title}</p>
      {preset?.data?._id ? (
        <div className={cx(styles.buttonWrapper)}>
          <Popconfirm
            title={t(TranslationKey['Are you sure delete this preset?'])}
            okText={t(TranslationKey.Yes)}
            cancelText={t(TranslationKey.No)}
            onConfirm={e => {
              e?.stopPropagation()
              handleDeletePreset()
            }}
            onCancel={e => e?.stopPropagation()}
            onPopupClick={e => e.stopPropagation()}
          >
            <CustomButton
              icon={<MdOutlineDelete size={20} title={t(TranslationKey.Delete)} className={styles.deleteIcon} />}
              onClick={e => e.stopPropagation()}
            />
          </Popconfirm>

          <Popconfirm
            title={t(TranslationKey['Save the state of the table to this preset?'])}
            okText={t(TranslationKey.Yes)}
            cancelText={t(TranslationKey.No)}
            onConfirm={e => {
              e?.stopPropagation()
              handleUpdatePreset()
            }}
            onCancel={e => e?.stopPropagation()}
            onPopupClick={e => e.stopPropagation()}
          >
            <CustomButton
              icon={<GrUpdate title={t(TranslationKey.Update)} className={styles.updateButton} />}
              onClick={e => e.stopPropagation()}
            />
          </Popconfirm>
        </div>
      ) : null}
    </div>
  )
})
