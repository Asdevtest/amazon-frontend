import { restApiService } from '@services/rest-api-service/rest-api-service'

class PermissionsModelStatic {
  createSinglePermission = async body => {
    const response = await restApiService.permissionsApi.apiV1PermissionsPost({ body })
    return response.data
  }

  getSinglePermissions = async role => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGet({ role })
    return response.data
  }

  updateSinglePermission = async (guid, body) => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGuidPatch({ guid, body })
    return response.data
  }

  removeSinglePermission = async guid => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGuidDelete({ guid })
    return response.data
  }

  createGroupPermission = async body => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGroupsPost({ body })
    return response.data
  }

  getGroupPermissions = async role => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGroupsGet({ role })
    return response.data
  }

  updateGroupPermission = async (guid, body) => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGroupsGuidPatch({ guid, body })
    return response.data
  }

  removeGroupPermission = async guid => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGroupsGuidDelete({ guid })
    return response.data
  }

  setPermissionsForUser = async (guid, body) => {
    const response = await restApiService.userApi.apiV1UsersEditMySubUsersGuidPatch({ body, guid })
    return response.data
  }

  setProductsPermissionsForUser = async body => {
    const response = await restApiService.permissionsApi.apiV1PermissionsProductsPatch({ body })
    return response.data
  }

  getProductsPermissionsForUserById = async guid => {
    const response = await restApiService.permissionsApi.apiV1PermissionsProductsGuidGet({ guid })
    return response.data
  }
}

export const PermissionsModel = new PermissionsModelStatic()
