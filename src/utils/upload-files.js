import {BACKEND_API_URL} from '@constants/env'

import {OtherModel} from '@models/other-model'

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type: mime})
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
    return image
  }
}

export const onSubmitPostFilesInData = async ({dataWithFiles, nameOfField}) => {
  for (let j = 0; j < dataWithFiles.length; j++) {
    const item = dataWithFiles[j]

    for (let i = 0; i < item[nameOfField].length; i++) {
      const file = item[nameOfField][i]

      if (typeof file === 'string') {
        const res = await uploadFileByUrl(file)

        dataWithFiles[j] = {...dataWithFiles[j], newData: [...dataWithFiles[j].newData, res]}
      } else {
        const res = await onPostImage(file)

        dataWithFiles[j] = {...dataWithFiles[j], newData: [...dataWithFiles[j].newData, res]}
      }
    }
  }

  return dataWithFiles
}

export async function onSubmitPostImages({images, type}) {
  this[type] = []
  const loadingStep = 100 / images.length

  this.showProgress = true

  for (let i = 0; i < images.length; i++) {
    const image = images[i]

    if (typeof image === 'string') {
      const res = await uploadFileByUrl(image)

      this[type].push(res)
    } else {
      const res = await onPostImage(image)

      this[type].push(res)
    }

    this.progressValue = this.progressValue + loadingStep
  }

  this.showProgress = false
  this.progressValue = 0
}
