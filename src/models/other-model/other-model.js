import { restApiService } from '@services/rest-api-service/rest-api-service'

class OtherModelStatic {
  getImage = async guid => {
    const response = await restApiService.axiosInstance({
      method: 'get',
      url: `/api/v1/other/img/${guid}`,
      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,
      },
    })
    return response.data
  }

  postImage = async dataForm => {
    const response = await restApiService.axiosInstance({
      method: 'post',
      url: `/api/v1/other/upload_file`,
      data: dataForm,

      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,
      },
    })

    return response.data.fileName
  }

  postAvatar = async dataForm => {
    const response = await restApiService.axiosInstance({
      method: 'post',
      url: `/api/v1/other/upload_avatar`,
      data: dataForm,

      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,
      },
    })

    return response.data
  }

  postTemplate = async file => {
    const blob = new Blob([file], { type: file?.type })
    const fileData = new FormData()
    fileData.append('file', blob, file.name)

    const response = await restApiService.axiosInstance({
      method: 'post',
      url: `/api/v1/other/suppliers/suppliers_xlsx`,
      data: fileData,
      responseType: 'blob',

      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,
      },
    })

    return response.data
  }

  patchPermissionJson = async file => {
    const blob = new Blob([file], { type: file?.type })
    const fileData = new FormData()
    fileData.append('file', blob, file.name)

    const response = await restApiService.axiosInstance({
      method: 'patch',
      url: `/api/v1/admins/update_permission`,
      data: fileData,
      responseType: 'blob',

      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,
      },
    })

    return response.data
  }

  getReportTaskByTaskId = async id => {
    await restApiService
      .axiosInstance({
        method: 'get',
        url: `/api/v1/storekeepers/tasks/report/${id}`,
        responseType: 'blob',
        params: {
          getOldVer: true,
        },
        headers: {
          'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,
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
        console.error(error)
      })
  }

  getReportBatchByHumanFriendlyId = async id => {
    await restApiService
      .axiosInstance({
        method: 'get',
        url: `/api/v1/batches/report/${id}`,
        responseType: 'blob',
        params: {
          getOldVer: true,
        },
        headers: {
          'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,
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
        console.error(error)
      })
  }

  getAllImages = async () => {
    const response = await restApiService.axiosInstance({
      method: 'get',
      url: `/images/`,
      headers: {
        'Content-Type': `multipart/form-data; boundary=WebAppBoundary`,
      },
    })

    return response.data
  }

  uploadFileByUrl = async url => {
    const response = await restApiService.otherApi.apiV1OtherUploadFileByUrlPost({ body: { fileUrl: url } })
    return response.data
  }

  getPaymentsByProductId = async guid => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsByProductGuidGet({ guid })
    return response.data
  }

  getMyPayments = async () => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsMyGet()
    return response.data
  }

  getPaymentsByUserId = async guid => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsByUserGuidGet({ guid })
    return response.data
  }

  checkAsins = async body => {
    const response = await restApiService.otherApi.apiV1OtherCheckAsinsPost({ body })
    return response.data
  }

  getAsins = async () => {
    const response = await restApiService.otherApi.apiV1OtherCheckAsinsGet({ noCache: true })
    return response.data
  }

  editAsins = async (guid, body) => {
    const response = await restApiService.otherApi.apiV1OtherCheckAsinsGuidPatch({ guid, body })
    return response.data
  }

  removeAsin = async guid => {
    const response = await restApiService.otherApi.apiV1OtherCheckAsinsGuidDelete({ guid })
    return response.data
  }

  removeAsins = async body => {
    const response = await restApiService.otherApi.apiV1OtherCheckAsinsDelete({ body })
    return response.data
  }

  sendFeedback = async body => {
    const response = await restApiService.otherApi.apiV1OtherFeedbackPost({ body })
    return response.data
  }

  getPresets = async () => {
    const response = await restApiService.otherApi.apiV1OtherFieldsGet()
    return response.data
  }

  getFinancesPag = async options => {
    const response = await restApiService.otherApi.apiV1OtherPaymentsPagMyGet(options)
    return response.data
  }

  getFeedbacks = async body => {
    const response = await restApiService.otherApi.apiV1OtherFeedbackMyGet({ ...body, noCache: true })
    return response.data
  }

  createFeedback = async body => {
    const response = await restApiService.otherApi.apiV1OtherFeedbackPost({ body })
    return response.data
  }

  removeFeedback = async guid => {
    const response = await restApiService.otherApi.apiV1OtherFeedbackGuidDelete({ guid })
    return response.data
  }

  updateFeedback = async (guid, body) => {
    const response = await restApiService.otherApi.apiV1OtherFeedbackGuidPatch({ guid, body })
    return response.data
  }

  getFeedback = async guid => {
    const response = await restApiService.otherApi.apiV1OtherFeedbackGuidGet({ guid })
    return response.data
  }
}

export const OtherModel = new OtherModelStatic()
