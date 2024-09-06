import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Image, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './custom-avatar.style'

interface CustomAvatarProps {
  initialImageUrl?: string
  isAnotherUser?: boolean
  className?: string
  onSubmitAvatarEdit?: (imageData: UploadFileType) => void
}

const CustomAvatar: FC<CustomAvatarProps> = ({ initialImageUrl, isAnotherUser = false, onSubmitAvatarEdit }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | undefined>(initialImageUrl)
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>(
    initialImageUrl
      ? [
          {
            uid: '-1',
            name: 'avatar.png',
            status: 'done',
            url: initialImageUrl,
          },
        ]
      : [],
  )
  const { classes: styles } = useStyles()

  const handlePreview = async (file: UploadFile) => {
    const imageSrc = file.url || file.preview
    if (!imageSrc) {
      const reader = new FileReader()
      reader.readAsDataURL(file.originFileObj as File)
      reader.onload = () => setPreviewImage(reader.result as string)
    } else {
      setPreviewImage(imageSrc)
    }
    setPreviewOpen(true)
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => reject('Error converting file to Base64')
      reader.readAsDataURL(file)
    })
  }

  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1))
    const lastFile = newFileList[0]

    if (lastFile?.originFileObj) {
      const file = lastFile.originFileObj as File
      const isFileSizeOk = file.size <= 15728640 // 15MB limit
      const isFileTypeOk = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/ico',
        'image/gif',
        'image/svg',
        'image/webp',
        'image/avif',
      ].includes(file.type)

      if (!isFileSizeOk) {
        toast.warning(t(TranslationKey['The file is too big!']))
        setFileList([])
        return
      }
      if (!isFileTypeOk) {
        toast.warning(t(TranslationKey['Inappropriate format!']))
        setFileList([])
        return
      }

      setLoading(true)
      try {
        const base64String = await convertToBase64(file)
        onSubmitAvatarEdit?.(base64String)
      } catch (error) {
        console.log('Upload failed')
      } finally {
        setLoading(false)
      }
    } else if (lastFile?.status === 'error') {
      setLoading(false)
      console.log('Upload failed')
    }
  }

  const handleRemove = () => {
    setFileList([])
    setPreviewImage(undefined)
    setLoading(false)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      <Upload
        className={styles.upload}
        accept="image/*"
        listType="picture-circle"
        fileList={fileList}
        maxCount={1}
        disabled={isAnotherUser}
        previewFile={async file => URL.createObjectURL(file)}
        beforeUpload={() => false}
        showUploadList={{
          showPreviewIcon: true,
          showRemoveIcon: !isAnotherUser,
        }}
        onRemove={handleRemove}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 || isAnotherUser ? null : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: setPreviewOpen,
          }}
          src={previewImage}
          width={300}
        />
      )}
    </>
  )
}

export default CustomAvatar
