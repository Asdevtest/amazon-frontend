import { Image, Upload, UploadProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { FC, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './custom-avatar.style'

import { CircleSpinner } from '../circle-spinner'

import { CustomAvatarModel } from './custom-avatar.model'

interface CustomAvatarProps extends UploadProps {
  initialUrl?: string
  isEditable?: boolean
  className?: string
  maxCount?: number
  onSubmit?: (imageData: UploadFileType) => void
}

export const CustomAvatar: FC<CustomAvatarProps> = observer(props => {
  const { initialUrl, isEditable = false, maxCount = 1, onSubmit, ...restProps } = props

  const viewModel = useMemo(() => new CustomAvatarModel(initialUrl), [])

  const { classes: styles } = useStyles()

  const showUploadButton = viewModel.fileList.length < maxCount && isEditable
  const uploadIcon = viewModel.loading ? <CircleSpinner size={24} /> : <FiPlus size={24} />

  const uploadButton = showUploadButton ? (
    <div className={styles.buttonWrapper}>
      {uploadIcon}
      <div className={styles.buttonText}>{t(TranslationKey.Upload)}</div>
    </div>
  ) : null

  return (
    <>
      <Upload
        className={styles.upload}
        accept="image/*"
        listType="picture-circle"
        fileList={viewModel.fileList}
        maxCount={maxCount}
        disabled={!isEditable}
        previewFile={async file => URL.createObjectURL(file)}
        beforeUpload={() => false}
        showUploadList={{
          showPreviewIcon: true,
          showRemoveIcon: isEditable,
        }}
        onRemove={viewModel.onRemoveImage}
        onPreview={viewModel.onPreviewImage}
        onChange={({ fileList }) => viewModel.onChangeImage(fileList, onSubmit)}
        {...restProps}
      >
        {uploadButton}
      </Upload>

      {viewModel.previewImage ? (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: viewModel.previewOpen,
            onVisibleChange: viewModel.setPreviewOpen,
          }}
          src={viewModel.previewImage}
        />
      ) : null}
    </>
  )
})
