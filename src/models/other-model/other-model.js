import axios from 'axios'

// import * as fs from 'fs'
// import fs from 'fs'
import { BACKEND_API_URL } from '@constants/keys/env'

import { restApiService } from '@services/rest-api-service/rest-api-service'

// const fs = require('fs')

class OtherModelStatic {
  getImage = async guid => {
    const response = await axios({
      method: 'get',
      url: `${BACKEND_API_URL}/api/v1/other/img/${guid}`,
      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,
      },
    })

    return response
  }

  postImage = async dataForm => {
    const response = await axios({
      method: 'post',
      url: `${BACKEND_API_URL}/api/v1/other/upload_file`,
      data: dataForm,

      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,

        Authorization: `${restApiService.apiClient.authentications.AccessTokenBearer.apiKeyPrefix} ${restApiService.apiClient.authentications.AccessTokenBearer.apiKey}`,
      },
    })

    return response.data.fileName
  }

  postAvatar = async dataForm => {
    const response = await axios({
      method: 'post',
      url: `${BACKEND_API_URL}/api/v1/other/upload_avatar`,
      data: dataForm,

      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,

        Authorization: `${restApiService.apiClient.authentications.AccessTokenBearer.apiKeyPrefix} ${restApiService.apiClient.authentications.AccessTokenBearer.apiKey}`,
      },
    })

    return response
  }

  postTemplate = async file => {
    const blob = new Blob([file], { type: file?.type })
    const fileData = new FormData()
    fileData.append('file', blob, file.name)

    const response = await axios({
      method: 'post',
      url: `${BACKEND_API_URL}/api/v1/other/suppliers/suppliers_xlsx`,
      data: fileData,

      responseType: 'blob',

      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,

        Authorization: `${restApiService.apiClient.authentications.AccessTokenBearer.apiKeyPrefix} ${restApiService.apiClient.authentications.AccessTokenBearer.apiKey}`,
      },
    })

    return response
  }

  getReportTaskByTaskId = async id => {
    await axios({
      method: 'get',
      url: `${BACKEND_API_URL}/api/v1/storekeepers/tasks/report/${id}`,

      responseType: 'blob',

      params: {
        getOldVer: true,
      },

      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,

        Authorization: `${restApiService.apiClient.authentications.AccessTokenBearer.apiKeyPrefix} ${restApiService.apiClient.authentications.AccessTokenBearer.apiKey}`,
      },
    })
      .then(res => {
        const aElement = document.createElement('a')
        aElement.setAttribute('download', `boxReceiveReport_${id}.xlsx`)
        const href = URL.createObjectURL(res.data)
        aElement.href = href
        aElement.setAttribute('target', '_blank')
        aElement.click()
        URL.revokeObjectURL(href)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  getReportBatchByHumanFriendlyId = async id => {
    await axios({
      method: 'get',
      url: `${BACKEND_API_URL}/api/v1/batches/report/${id}`,

      responseType: 'blob',

      params: {
        getOldVer: true,
      },

      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,

        Authorization: `${restApiService.apiClient.authentications.AccessTokenBearer.apiKeyPrefix} ${restApiService.apiClient.authentications.AccessTokenBearer.apiKey}`,
      },
    })
      .then(res => {
        const aElement = document.createElement('a')
        aElement.setAttribute('download', `batchReport_${id}.xlsx`)
        const href = URL.createObjectURL(res.data)
        aElement.href = href
        aElement.setAttribute('target', '_blank')
        aElement.click()
        URL.revokeObjectURL(href)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  getAllImages = async () => {
    const response = await axios({
      method: 'get',
      url: `${BACKEND_API_URL}/images/`,
      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,
      },
    })

    return response
  }

  uploadFileByUrl = async url => {
    const response = await restApiService.otherApi.apiV1OtherUploadFileByUrlPost({ body: { fileUrl: url } })
    return response
  }

  getPaymentsByProductId = async id => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsByProductGuidGet(id)
    return response
  }

  getMyPayments = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
    return response
  }

  getPaymentsByUserId = async id => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsByUserGuidGet(id)
    return response
  }

  checkAsins = async data => {
    const response = await restApiService.otherApi.apiV1OtherCheckAsinsPost({ body: data })
    return response
  }

  getAsins = async () => {
    const response = await restApiService.otherApi.apiV1OtherCheckAsinsGet()
    return response
  }
  editAsins = async (id, data) => {
    const response = await restApiService.otherApi.apiV1OtherCheckAsinsGuidPatch(id, { body: data })
    return response
  }
  removeAsin = async id => {
    const response = await restApiService.otherApi.apiV1OtherCheckAsinsGuidDelete(id)
    return response
  }

  removeAsins = async ids => {
    const response = await restApiService.otherApi.apiV1OtherCheckAsinsDelete({ body: ids })
    return response
  }

  sendFeedback = async data => {
    const response = await restApiService.otherApi.apiV1OtherFeedbackPost({ body: data })
    return response
  }
}

export const OtherModel = new OtherModelStatic()
