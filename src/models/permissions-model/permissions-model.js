import {restApiService} from '@services/rest-api-service/rest-api-service'

class PermissionsModelStatic {
  createSinglePermission = async data => {
    const response = await restApiService.permissionsApi.apiV1PermissionsPost(data)
    return response
  }

  getSinglePermissions = async () => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGet()
    return response
  }

  updateSinglePermission = async (id, data) => {
    const response = await restApiService.permissionsApi.apiV1PermissionsAdminsGuidPatch(id, {
      InlineObject23: data,
    })
    return response
  }

  removeSinglePermission = async id => {
    const response = await restApiService.permissionsApi.apiV1PermissionsAdminsGuidDelete(id)
    return response
  }

  createGroupPermission = async data => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGroupsPost(data)
    return response
  }

  getGroupPermissions = async () => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGroupsGet()
    return response
  }

  updateGroupPermission = async (id, data) => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGroupsAdminsGuidPatch(id, {
      InlineObject25: data,
    })
    return response
  }

  removeGroupPermission = async id => {
    const response = await restApiService.permissionsApi.apiV1PermissionsGroupsAdminsGuidDelete(id)
    return response
  }
}

export const PermissionsModel = new PermissionsModelStatic()
