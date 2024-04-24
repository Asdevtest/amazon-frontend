import isEqual from 'lodash.isequal'
import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { UserRoleCodeMap } from '@constants/keys/user-roles'

import { CustomSwitcher } from '@components/shared/custom-switcher'
import { TabPanel } from '@components/shared/tab-panel'

import { checkIsBuyer, checkIsClient, checkIsStorekeeper } from '@utils/checks'

import { IBox } from '@typings/models/boxes/box'
import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './box-form.style'

import { BoxTabs, switcherSettings } from './box-form.constants'
import { Box, Comments, Footer, Header, Info, Order, Quantities } from './components'

interface BoxFormProps {
  box: IBox
  onToggleModal: () => void
  userInfo?: IFullUser
  onClickHsCode?: (id: string) => void
  onSubmitChangeFields?: (fields: IBox) => void
}

export const BoxForm: FC<BoxFormProps> = memo(props => {
  const { box, onToggleModal, userInfo, onClickHsCode, onSubmitChangeFields } = props

  const { classes: styles } = useStyles()
  const [activeTab, setActiveTab] = useState(BoxTabs.BOX_INFO)
  const [formFields, setFormFields] = useState<IBox>(box)

  useEffect(() => {
    if (box) {
      setFormFields(box)
    }
  }, [box])

  const handleChangeField = (fieldName: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormFields(prevFormFields => ({ ...prevFormFields, [fieldName]: event.target.value }))
  }
  const handleChangeTrackNumberFile = (files: string[]) => {
    setFormFields(prevFormFields => ({ ...prevFormFields, trackNumberFile: files }))
  }

  const isClient = !!userInfo && checkIsClient(UserRoleCodeMap[userInfo?.role])
  const isStorekeeper = !!userInfo && checkIsStorekeeper(UserRoleCodeMap[userInfo?.role])
  const isBuyer = !!userInfo && checkIsBuyer(UserRoleCodeMap[userInfo?.role])
  const isEdit = isClient || isStorekeeper || isBuyer
  const disableSaveButton = isEqual(box, formFields)

  return (
    <div className={styles.wrapper}>
      <Header formFields={formFields} disabledPrepId={!(isClient || isStorekeeper)} onChangeField={handleChangeField} />

      <Info formFields={formFields} isStorekeeper={isStorekeeper} onChangeField={handleChangeField} />

      <div className={styles.switcherWrapper}>
        <div className={styles.switcher}>
          <Quantities formFields={formFields} />

          <CustomSwitcher
            fullWidth
            switchMode="medium"
            condition={activeTab}
            switcherSettings={switcherSettings}
            changeConditionHandler={setActiveTab}
          />
        </div>

        <TabPanel value={activeTab} index={BoxTabs.BOX_INFO}>
          <Box
            isEdit={isEdit}
            isBuyer={isBuyer}
            isClient={isClient}
            formFields={formFields}
            onChangeField={handleChangeField}
            onChangeTrackNumberFile={handleChangeTrackNumberFile}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={BoxTabs.ORDER_INFO}>
          <Order isClient={isClient} formFields={formFields} onClickHsCode={onClickHsCode} />
        </TabPanel>
      </div>

      <Comments
        isClient={isClient}
        isStorekeeper={isStorekeeper}
        formFields={formFields}
        onChangeField={handleChangeField}
        onSubmitChangeFields={onSubmitChangeFields}
      />

      <Footer
        isEdit={isEdit}
        disableSaveButton={disableSaveButton}
        onToggleModal={onToggleModal}
        onSubmitChangeFields={() => (onSubmitChangeFields ? onSubmitChangeFields(formFields) : undefined)}
      />
    </div>
  )
})
