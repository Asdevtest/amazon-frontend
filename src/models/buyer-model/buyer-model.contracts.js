import {
  InlineResponse200,
  InlineResponse2002,
  InlineResponse2003,
  InlineResponse2004,
} from '@services/rest-api-service/codegen/src'

export class BuyerProduct extends InlineResponse200 {}

export class BuyerOrder extends InlineResponse2002 {}

export class BuyerBox extends InlineResponse2003 {}

export class BuyerPayment extends InlineResponse2004 {}
