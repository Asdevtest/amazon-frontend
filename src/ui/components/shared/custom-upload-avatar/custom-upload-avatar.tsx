/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Upload, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { UploadRef } from 'antd/es/upload/Upload'
import { observer } from 'mobx-react-lite'
import RcUpload from 'rc-upload'
import { FC, useMemo, useRef } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MdAutorenew } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './custom-upload-avatar.style'

import { CircleSpinner } from '../circle-spinner'

import { CustomUploadAvatarModel } from './custom-upload-avatar.model'

interface CustomUploadAvatarProps extends UploadProps {
  initialUrl?: string
  isEditable?: boolean
  className?: string
  maxCount?: number
  onSubmit?: (imageData: UploadFileType) => void
}

interface ExtendedUploadRef<T = any> extends Omit<UploadRef<T>, 'upload'> {
  upload: Omit<RcUpload, 'uploader'> & {
    uploader: any
  }
}

export const CustomUploadAvatar: FC<CustomUploadAvatarProps> = observer(props => {
  const { initialUrl, isEditable = false, maxCount = 1, onSubmit, ...restProps } = props

  const viewModel = useMemo(() => new CustomUploadAvatarModel(initialUrl), [])

  const { classes: styles } = useStyles()

  const uploadRef = useRef<ExtendedUploadRef>(null)

  const showUploadButton = viewModel.fileList.length < maxCount && isEditable
  const uploadIcon = viewModel.loading ? <CircleSpinner size={24} /> : <FiPlus size={24} />

  const uploadButton = showUploadButton ? (
    <div className={styles.buttonWrapper}>
      {uploadIcon}
      <div className={styles.buttonText}>{t(TranslationKey.Upload)}</div>
    </div>
  ) : null

  const openFileSelector = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    uploadRef.current?.upload?.uploader?.onClick(e)
  }

  return (
    <>
      <ImgCrop
        rotationSlider
        cropShape="round"
        modalTitle={t(TranslationKey['Edit image'])}
        modalOk={t(TranslationKey.Ok)}
        modalCancel={t(TranslationKey.Cancel)}
      >
        <Upload
          ref={uploadRef}
          className={styles.upload}
          accept="image/*"
          listType="picture-circle"
          fileList={viewModel.fileList}
          maxCount={maxCount}
          disabled={!isEditable}
          previewFile={async file => URL.createObjectURL(file)}
          beforeUpload={(file, fileList) => {
            viewModel.onSaveImage(fileList)
          }}
          showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: isEditable,
            removeIcon: (
              <MdAutorenew
                size={24}
                className={styles.changeIcon}
                title={t(TranslationKey['Edit file'])}
                onClick={e => openFileSelector(e)}
              />
            ), // change avatar image,
          }}
          customRequest={() => viewModel.onUploadImage(onSubmit)}
          onPreview={viewModel.onPreviewImage}
          {...restProps}
        >
          {uploadButton}
        </Upload>
      </ImgCrop>
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
