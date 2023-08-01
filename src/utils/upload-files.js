import { BACKEND_API_URL } from '@constants/keys/env'

import { OtherModel } from '@models/other-model'

import { getFileNameFromUrl } from './get-file-name-from-url'
import { Errors } from '@constants/errors'

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

const onPostImage = async imageData => {
  const formData = new FormData()

  const fileWithoutSpaces = new File([imageData.file], imageData.file?.name.replace(/ /g, ''), {
    type: imageData.file?.type,
    lastModified: imageData.file?.lastModified,
  })

  formData.append('filename', fileWithoutSpaces)

  try {
    const fileName = await OtherModel.postImage(formData)

    return BACKEND_API_URL + '/uploads/' + fileName
  } catch (error) {
    this.error = error
  }
}

const uploadFileByUrl = async image => {
  try {
    const result = await OtherModel.uploadFileByUrl(image)

    return BACKEND_API_URL + '/uploads/' + result.fileName
  } catch (error) {
    console.log(error)
    throw new Error(Errors.INVALID_IMAGE)
  }
}

export const onSubmitPostFilesInData = async ({ dataWithFiles, nameOfField }) => {
  for (let j = 0; j < dataWithFiles.length; j++) {
    const item = dataWithFiles[j]

    for (let i = 0; i < item[nameOfField].length; i++) {
      const file = item[nameOfField][i]

      if (typeof file === 'string') {
        const res = await uploadFileByUrl(file)

        dataWithFiles[j] = { ...dataWithFiles[j], newData: [...dataWithFiles[j].newData, res] }
      } else {
        const res = await onPostImage(file)

        dataWithFiles[j] = { ...dataWithFiles[j], newData: [...dataWithFiles[j].newData, res] }
      }
    }
  }

  return dataWithFiles
}

export async function onSubmitPostImages({ images, type, withoutShowProgress }) {
  this[type] = []
  const loadingStep = 100 / images.length

  if (!withoutShowProgress) {
    this.showProgress = true
  }

  for (let i = 0; i < images.length; i++) {
    const image = images[i]

    if (typeof image === 'string' && image.includes(BACKEND_API_URL + '/uploads/')) {
      this[type].push(image)
    } else if (typeof image === 'string') {
      const res = await uploadFileByUrl(image)

      this[type].push(res)
    } else {
      const res = await onPostImage(image)

      this[type].push(res)
    }

    this.progressValue = this.progressValue + loadingStep
  }

  if (!withoutShowProgress) {
    this.showProgress = false
  }
  this.progressValue = 0
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
  fetch(str)
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
