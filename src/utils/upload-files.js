import JSZip from 'jszip'
import { runInAction } from 'mobx'

import { Errors } from '@constants/errors'

import { OtherModel } from '@models/other-model'

import { checkIsHasHttp, checkIsImageInludesPostfixes, checkIsMediaFileLink } from './checks'
import { getAmazonImageUrl } from './get-amazon-image-url'
import { getFileNameFromUrl } from './get-file-name-from-url'

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${mime}`, { type: mime })
}

export const onPostImage = async imageData => {
  const formData = new FormData()

  const fileWithoutSpaces = new File([imageData.file], imageData.file?.name.replace(/ /g, ''), {
    type: imageData.file?.type || '',
    lastModified: imageData.file?.lastModified,
  })

  formData.append('filename', fileWithoutSpaces)

  try {
    const fileName = await OtherModel.postImage(formData)

    return '/uploads/' + fileName
  } catch (error) {
    this.error = error
  }
}

export const uploadFileByUrl = async image => {
  try {
    const result = await OtherModel.uploadFileByUrl(image)

    return '/uploads/' + result.fileName
  } catch (error) {
    console.log(error?.response?.data?.message)
    throw new Error(Errors.INVALID_IMAGE)
  }
}

export const onSubmitPostFilesInData = async ({ dataWithFiles, nameOfField }) => {
  for (let j = 0; j < dataWithFiles.length; j++) {
    const item = dataWithFiles[j]

    for (let i = 0; i < item[nameOfField].length; i++) {
      const file = item[nameOfField][i]

      if (typeof file === 'string' && file.includes('/uploads/')) {
        dataWithFiles[j] = { ...dataWithFiles[j], newData: [...dataWithFiles[j].newData, file] }
      } else if (typeof file === 'string') {
        try {
          const res = await uploadFileByUrl(
            checkIsImageInludesPostfixes(file) || checkIsMediaFileLink(file) || checkIsHasHttp(file)
              ? file
              : getAmazonImageUrl(file, true),
          )
          dataWithFiles[j] = { ...dataWithFiles[j], newData: [...dataWithFiles[j].newData, res] }
        } catch (error) {
          dataWithFiles[j] = { ...dataWithFiles[j], newData: [...dataWithFiles[j].newData, file] }
        }
      } else {
        const res = await onPostImage(file)
        dataWithFiles[j] = { ...dataWithFiles[j], newData: [...dataWithFiles[j].newData, res] }
      }
    }
  }

  return dataWithFiles
}

export async function onSubmitPostImages({ images, type, withoutShowProgress }) {
  try {
    this[type] = []

    const loadingStep = 100 / images.length

    if (!withoutShowProgress) {
      runInAction(() => {
        this.showProgress = true
      })
    }

    for (let i = 0; i < images.length; i++) {
      const image = images[i]

      if (typeof image === 'string' && image.includes('/uploads/')) {
        this[type].push(image)
      } else if (typeof image === 'string') {
        const res = await uploadFileByUrl(
          checkIsImageInludesPostfixes(image) || checkIsMediaFileLink(image) || checkIsHasHttp(image)
            ? image
            : getAmazonImageUrl(image, true),
        )

        this[type].push(res)
      } else {
        const res = await onPostImage(image)
        this[type].push(res)
      }
      runInAction(() => {
        this.progressValue = this.progressValue + loadingStep
      })
    }

    if (!withoutShowProgress) {
      runInAction(() => {
        this.showProgress = false
      })
    }

    runInAction(() => {
      this.progressValue = 0
      this.isValidLink = true
    })
  } catch (error) {
    runInAction(() => {
      this.progressValue = 0
      this.showProgress = false
      this.isValidLink = false
    })
  }
}

export const downloadFile = async (file, fileName) => {
  const url = window.URL.createObjectURL(file)

  const a = document.createElement('a')

  a.setAttribute('download', fileName ?? file.name ?? 'no-name')
  a.style.display = 'none'
  a.href = url

  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  a.remove()
}

export const downloadFileByLink = async (str, fileName) => {
  fetch(getAmazonImageUrl(str, true))
    .then(resp => resp.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob)

      const name = getFileNameFromUrl(str)?.name

      const a = document.createElement('a')

      a.setAttribute('download', fileName ?? name ?? 'no-name')
      a.style.display = 'none'
      a.href = url

      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
      // alert('your file has downloaded!') // or you know, something with better UX...
    })
    .catch(() => alert('oh no!'))
}

export const getFileWeight = async url =>
  fetch(url /* , {mode: 'no-cors'} */)
    .then(res => res.blob())
    .then(res => {
      const fileSizeInKB = res.size / 1024
      const fileSizeInMB = fileSizeInKB / 1024
      const fileSizeInGB = fileSizeInMB / 1024

      let formattedSize

      switch (true) {
        case fileSizeInGB > 1:
          formattedSize = `${fileSizeInGB.toFixed(2)} GB`
          break
        case fileSizeInMB > 1:
          formattedSize = `${fileSizeInMB.toFixed(2)} MB`
          break
        case fileSizeInKB > 1:
          formattedSize = `${fileSizeInKB.toFixed(2)} KB`
          break
        default:
          formattedSize = `${res.size.toFixed(2)} bytes`
      }

      return formattedSize
    })

export const downloadArchive = async (files, folderName) => {
  const zip = new JSZip()

  const validFilesData = files.map(async file => {
    const res = await fetch(getAmazonImageUrl(file.image.file || file.image, true))
    const blob = await res.blob()

    return {
      title: file.comment,
      blob,
    }
  })

  const fetchedData = await Promise.all(validFilesData)

  fetchedData.forEach(file => zip.file(file.title, file.blob, { base64: true }))
  zip.generateAsync({ type: 'blob' }).then(content => {
    downloadFile(content, `${folderName}.rar`)
  })
}
