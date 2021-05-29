import {
  InlineResponse200,
  InlineResponse20010,
  InlineResponse2004,
  InlineResponse2009,
} from '@services/rest-api-service/codegen/src'

export class ResearcherProduct extends InlineResponse200 {}

export class ResearcherCheckProductExistResponse extends InlineResponse2009 {}

export class ResearcherProductExternalResponse extends InlineResponse20010 {}

export class ResearcherPayment extends InlineResponse2004 {}
