import { Image, Upload, UploadProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
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
  onSubmit?: (imageData: UploadFileType) => void
}

export const CustomAvatar: FC<CustomAvatarProps> = observer(
  ({ initialUrl, isEditable = false, onSubmit, ...restProps }) => {
    const [viewModel] = useState(() => new CustomAvatarModel(initialUrl))
    const { classes: styles } = useStyles()

    const uploadButton = (
      <div className={styles.buttonWrapper}>
        {viewModel.loading ? <CircleSpinner size={24} /> : <FiPlus size={24} />}
        <div className={styles.buttonText}>{t(TranslationKey.Upload)}</div>
      </div>
    )

    return (
      <>
        <Upload
          className={styles.upload}
          accept="image/*"
          listType="picture-circle"
          fileList={viewModel.fileList}
          maxCount={1}
          disabled={!isEditable}
          previewFile={async file => URL.createObjectURL(file)}
          beforeUpload={() => false}
          showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: isEditable,
          }}
          onRemove={viewModel.handleRemove}
          onPreview={viewModel.handlePreview}
          onChange={({ fileList }) => viewModel.handleChange(fileList, onSubmit)}
          {...restProps}
        >
          {viewModel.fileList.length >= 1 || !isEditable ? null : uploadButton}
        </Upload>

        {viewModel.previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: viewModel.previewOpen,
              onVisibleChange: viewModel.setPreviewOpen,
            }}
            src={viewModel.previewImage}
          />
        )}
      </>
    )
  },
)
