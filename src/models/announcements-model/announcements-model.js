import {restApiService} from '@services/rest-api-service/rest-api-service'

export class AnnouncementsModelStatic {
  getMyAnnouncements = async type => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsMyGet(type)
    return response
  }

  getVacAnnouncements = async type => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsVacGet(type)
    return response
  }

  createAnnouncement = async data => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsPost({
      body: data,
    })
    return response
  }

  editAnnouncement = async (id, data) => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsGuidPatch(id, {
      body: data,
    })
    return response
  }

  createAnnouncement = async data => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsPost({
      body: data,
    })
    return response
  }
}

export const AnnouncementsModel = new AnnouncementsModelStatic()
