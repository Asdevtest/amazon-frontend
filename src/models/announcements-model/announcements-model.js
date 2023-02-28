import {restApiService} from '@services/rest-api-service/rest-api-service'

export class AnnouncementsModelStatic {
  getMyAnnouncements = async () => {
    const response = await restApiService.announcementsApi.apiV1AnnouncementsMyGet()
    return response
  }
}

export const AnnouncementsModel = new AnnouncementsModelStatic()
