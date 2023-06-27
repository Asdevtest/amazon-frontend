import { restApiService } from '@services/rest-api-service/rest-api-service'

class PermissionsModelStatic {
  createSinglePermission = async data => {
    const response = await restApiService.permissionsApi.apiV1PermissionsPost({ body: data })
    return response
  }

  getSinglePermissions = async role => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGet({ role })
    return response
  }

  updateSinglePermission = async (id, data) => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGuidPatch(id, {
      body: data,
    })
    return response
  }

  removeSinglePermission = async id => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGuidDelete(id)
    return response
  }

  createGroupPermission = async data => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGroupsPost({ body: data })
    return response
  }

  getGroupPermissions = async role => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGroupsGet({ role })
    return response
  }

  updateGroupPermission = async (id, data) => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGroupsGuidPatch(id, {
      body: data,
    })
    return response
  }

  removeGroupPermission = async id => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGroupsGuidDelete(id)
    return response
  }

  setPermissionsForUser = async (guid, data) => {
    const response = await restApiService.userApi.apiV1UsersEditMySubUsersGuidPatch(guid, {
      body: data,
    })
    return response
  }

  setProductsPermissionsForUser = async data => {
    const response = await restApiService.permissionsApi.apiV1PermissionsProductsPatch({
      body: data,
    })
    return response
  }

  getProductsPermissionsForUserById = async guid => {
    const response = await restApiService.permissionsApi.apiV1PermissionsProductsGuidGet(guid)
    return response
  }
}

export const PermissionsModel = new PermissionsModelStatic()
