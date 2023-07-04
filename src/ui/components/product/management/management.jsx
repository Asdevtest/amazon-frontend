import { cx } from '@emotion/css'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import { Select, MenuItem } from '@mui/material'

import { SaveIcon } from '@components/shared/svg-icons'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { SettingsModel } from '@models/settings-model'

import { AdminManagementModel } from './management.model'

import { useClassNames } from './management.style'

const SWITCH_TO_CLIENT_STATUS = 200

export const Management = observer(({ product }) => {
  const { classes: classNames } = useClassNames()

  const [viewModel] = useState(() => new AdminManagementModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const [members, setMembers] = useState([])
  const [client, setClient] = useState({ _id: '', name: '' })
  const [isSaveIconDisabled, setIsSaveIconDisabled] = useState(true)

  useEffect(() => {
    setIsSaveIconDisabled(client?._id === product?.client._id)
  }, [client, product])

  useEffect(() => {
    if (viewModel.members.length > 0) {
      setMembers(viewModel.members)
    }
  }, [viewModel.members])

  useEffect(() => {
    if (members.length > 0) {
      const defaultClient = members.find(member => member._id === product?.client._id)

      setClient(defaultClient)
    }
  }, [members])

  const isEditableClientAndBuyer = product.status <= SWITCH_TO_CLIENT_STATUS

  const handleChangeSelect = event => {
    const selectedMemberId = event.target.value

    const selectedMember = members.find(member => member._id === selectedMemberId)

    if (selectedMember) {
      setClient(selectedMember)
    }
  }

  return (
    <>
      {SettingsModel.languageTag && (
        <div className={classNames.mainWrapper}>
          <p className={classNames.titleMembers}>{t(TranslationKey.AllMembers)}</p>

          <div className={classNames.selectsWrapper}>
            <div className={classNames.selectWrapper}>
              <p className={classNames.subtitleClient}>{t(TranslationKey.Client)}</p>

              <div className={classNames.selectContainer}>
                <Select
                  value={client?._id}
                  disabled={isEditableClientAndBuyer}
                  className={cx(classNames.select, {
                    [classNames.disableSelect]: isSaveIconDisabled,
                  })}
                  onChange={e => handleChangeSelect(e)}
                >
                  {members.map(({ _id, name }) => (
                    <MenuItem key={_id} value={_id}>
                      {!isEditableClientAndBuyer ? name : '-'}
                    </MenuItem>
                  ))}
                </Select>
                <SaveIcon
                  disabled={isSaveIconDisabled}
                  className={cx(classNames.saveIcon, {
                    [classNames.disableIcon]: isSaveIconDisabled,
                  })}
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
})
