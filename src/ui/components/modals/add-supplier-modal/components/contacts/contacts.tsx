import { Form } from 'antd'
import { memo } from 'react'
import { IconType } from 'react-icons'
import { FaMinus } from 'react-icons/fa'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomInput } from '@components/shared/custom-input'

import { t } from '@utils/translations'

import { getRequiredRules } from '@config/form-rules/get-required-rules'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './contacts.style'

import { getRequiredEmailRules, getRequiredPhoneNumberRules } from '../../add-supplier-modal.config'
import { emptyEmployee } from '../../add-supplier-modal.constants'
import { ContactInputList } from '../contact-input-list'
import { ContactListHeader } from '../contact-list-header'

export const Contacts = memo(() => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <div className={styles.contactsWrapper}>
      <p className={styles.title}>{t(TranslationKey.Contacts)}</p>

      <Form.List name="supplierEmployees">
        {(fields, methods) => (
          <>
            {fields.map((field, index) => {
              const fieldName = field.name

              return (
                <div key={field.key} className={styles.contactWrapper}>
                  <div className={sharedStyles.contactField}>
                    <ContactListHeader
                      required
                      listTitle="Contact person"
                      Icon={(index > 0 ? FaMinus : undefined) as IconType}
                      onClickButton={index > 0 ? () => methods.remove(fieldName) : () => methods.add(emptyEmployee)}
                    />

                    <Form.Item
                      name={[fieldName, 'name']}
                      className={sharedStyles.field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={getRequiredRules()}
                    >
                      <CustomInput required size="large" wrapperClassName={sharedStyles.input} />
                    </Form.Item>
                  </div>

                  <ContactInputList
                    listTitle="Phone"
                    listName={[fieldName, 'phoneNumbers']}
                    formItemRules={getRequiredPhoneNumberRules}
                  />

                  <ContactInputList
                    required={false}
                    listTitle="E-mail"
                    listName={[fieldName, 'emails']}
                    formItemRules={getRequiredEmailRules}
                  />

                  <ContactInputList required={false} listTitle="Optional" listName={[fieldName, 'links']} />
                </div>
              )
            })}
          </>
        )}
      </Form.List>
    </div>
  )
})
