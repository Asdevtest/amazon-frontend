import { restApiService } from '@services/rest-api-service/rest-api-service'

export class AnnouncementsModelStatic {
  getMyAnnouncements = async data => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsMyGet(data)
    return response.data
  }

  getVacAnnouncements = async data => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsVacGet(data)
    return response.data
  }

  createAnnouncement = async body => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsPost({
      body,
    })
    return response.data
  }

  deleteAnnouncementsByGuid = async guid => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsGuidDelete({ guid })
    return response.data
  }

  editAnnouncement = async (guid, body) => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsGuidPatch({
      guid,
      body,
    })
    return response.data
  }

  getAnnouncementsByGuid = async (guid, body) => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsGuidGet({
      guid,
      body,
    })
    return response.data
  }

  getNotYoursAnnouncements = async body => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsPagVacGet(body)
    return response.data
  }
}

export const AnnouncementsModel = new AnnouncementsModelStatic()
