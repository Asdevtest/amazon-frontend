import { Image, Upload, UploadProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { FC, useMemo, useRef } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MdAutorenew } from 'react-icons/md'

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

  const fileInputRef = useRef<HTMLInputElement>(null)

  const showUploadButton = viewModel.fileList.length < maxCount && isEditable
  const uploadIcon = viewModel.loading ? <CircleSpinner size={24} /> : <FiPlus size={24} />

  const uploadButton = showUploadButton ? (
    <div className={styles.buttonWrapper}>
      {uploadIcon}
      <div className={styles.buttonText}>{t(TranslationKey.Upload)}</div>
    </div>
  ) : null

  const openFileSelector = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => viewModel.onFileChange(e, onSubmit)} // hidden input
      />
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
          removeIcon: (
            <MdAutorenew
              size={24}
              className={styles.changeIcon}
              title={t(TranslationKey['Edit file'])}
              onClick={openFileSelector}
            />
          ), // change avatar image,
        }}
        onPreview={viewModel.onPreviewImage}
        // onChange={({ fileList }) => viewModel.onChangeImage(fileList, onSubmit)} // uncomment if needed
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
