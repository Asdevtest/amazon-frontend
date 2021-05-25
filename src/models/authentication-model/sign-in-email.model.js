import {restApiService} from '@services/rest-api-service/rest-api-service'

export class SignInEmailModel {
  email
  password
  successResponse

  signIn = async (email, password) => {
    try {
      this.email = email
      this.password = password

      this.successResponse = await restApiService.userApi.apiV1UsersSignInPost({
        email,
        password,
      })
    } catch (error) {
      console.log(`SignInEmailModel, signIn: Cought error`, error)
      throw error
    }
  }
}
