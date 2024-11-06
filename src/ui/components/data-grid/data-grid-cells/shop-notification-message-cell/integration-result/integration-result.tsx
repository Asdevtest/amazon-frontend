import { FC, memo } from 'react'

import { IntegrationResultItem } from '../integration-result-item'
import { IIntegrationResult, ShopUpdateResult } from '../shop-notification.type'

interface IntegrationResultProps {
  integrationResult: IIntegrationResult
}

export const IntegrationResult: FC<IntegrationResultProps> = memo(({ integrationResult }) => {
  const success = integrationResult[ShopUpdateResult.SUCCESS]
  const error = integrationResult[ShopUpdateResult.ERROR]

  return (
    <div>
      {success?.length ? <IntegrationResultItem type={ShopUpdateResult.SUCCESS} tables={success} /> : null}
      {error?.length ? <IntegrationResultItem type={ShopUpdateResult.ERROR} tables={error} /> : null}
    </div>
  )
})
