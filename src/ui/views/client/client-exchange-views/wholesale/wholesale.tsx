import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { CustomInputSearch } from '@components/shared/custom-input-search'

import { useStyles } from './wholesale.style'

import { SupplierCard } from './supplier-card'
import { WholesaleViewModel } from './wholesale.model'

export const WholesaleView = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new WholesaleViewModel(), [])

  return (
    <div className="viewWrapper">
      <div className={styles.header}>
        <CustomInputSearch size="large" placeholder="Search" />
      </div>

      <div className={styles.content} onScroll={viewModel.onScroll}>
        {viewModel.suppliers.map(supplier => (
          <SupplierCard key={supplier._id} supplier={supplier} />
        ))}
      </div>
    </div>
  )
})
