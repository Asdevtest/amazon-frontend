import axios from 'axios'

import {BACKEND_API_URL} from '@constants/env'

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
}

export const OtherModel = new OtherModelStatic()
