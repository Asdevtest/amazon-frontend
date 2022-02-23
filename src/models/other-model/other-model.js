import axios from 'axios'

import {BACKEND_API_URL} from '@constants/env'

import {restApiService} from '@services/rest-api-service/rest-api-service'

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
      },
    })

    return response
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
}

export const OtherModel = new OtherModelStatic()
