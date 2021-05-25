import {restApiService} from '@services/rest-api-service/rest-api-service'

export class SignUpEmailModel {
  name
  email
  password
  successResponse

  signUp = async (name, email, password) => {
    try {
      this.name = name
      this.email = email
      this.password = password

      this.successResponse = await restApiService.userApi.apiV1UsersPost({
        name,
        email,
        password,
      })
    } catch (error) {
      console.log(`SignUpEmailModel, signUp: Cought error`, error)
      throw error
    }
  }
}
