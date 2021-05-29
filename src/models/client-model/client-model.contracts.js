import {
  ApiV1AdminsGetNotPaidProductsCreatedby,
  InlineResponse200,
  InlineResponse2002,
  InlineResponse2006,
  InlineResponse2008,
  InlineResponse201,
} from '@services/rest-api-service/codegen/src'

export class ClientProduct extends InlineResponse200 {}

export class ClientOrder extends InlineResponse2002 {}

export class ClientCreateOrderResponse extends InlineResponse201 {}

export class ClientUser extends ApiV1AdminsGetNotPaidProductsCreatedby {}

export class ClientBox extends InlineResponse2006 {}

export class ClientBatches extends InlineResponse2008 {}
