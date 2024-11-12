import { Empty } from 'antd'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { CustomInputSearch } from '@components/shared/custom-input-search'

import { useStyles } from './wholesale.style'

import { Supplier } from './supplier'
import { WholesaleViewModel } from './wholesale.model'

export const WholesaleView = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new WholesaleViewModel(), [])

  return (
    <div className="viewWrapper">
      <div className={styles.header}>
        <CustomInputSearch
          allowClear
          enterButton
          size="large"
          placeholder="Search"
          onSearch={viewModel.onClickSubmitSearch}
        />
        {/* <CustomRadioButton
          size="large"
          options={[
            { label: t(TranslationKey.Suppliers), value: '1' },
            { label: t(TranslationKey.Products), value: '2' },
          ]}
          value="1"
        /> */}
      </div>

      <div className={styles.content} onScroll={viewModel.onScroll}>
        {viewModel.suppliers.length ? (
          viewModel.suppliers.map(supplier => <Supplier key={supplier._id} supplier={supplier} />)
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
})
