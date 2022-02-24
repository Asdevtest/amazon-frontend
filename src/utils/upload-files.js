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

export async function onSubmitPostImages({images, type}) {
  const onPostImage = async imageData => {
    const formData = new FormData()
    formData.append('filename', imageData.file)

    try {
      const imageFile = await OtherModel.postImage(formData)

      this[type].push(BACKEND_API_URL + '/uploads/' + imageFile.data.fileName)
    } catch (error) {
      this.error = error
    }
  }

  this[type] = []
  const loadingStep = 100 / images.length

  this.showProgress = true

  for (let i = 0; i < images.length; i++) {
    const image = images[i]

    if (typeof image === 'string') {
      const result = await OtherModel.uploadFileByUrl(image)

      this[type].push(BACKEND_API_URL + '/uploads/' + result.fileName)
    } else {
      await onPostImage(image)
    }

    this.progressValue = this.progressValue + loadingStep
  }

  this.showProgress = false
  this.progressValue = 0
}
