import { Form } from 'antd'
import { memo } from 'react'
import { IconType } from 'react-icons'
import { FaMinus } from 'react-icons/fa'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomInput } from '@components/shared/custom-input'

import { t } from '@utils/translations'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './contacts.style'

import { getRequiredRules } from '../../add-supplier-modal.config'
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
                      onClickButton={
                        index > 0
                          ? () => methods.remove(fieldName)
                          : () =>
                              methods.add({
                                name: '',
                                phones: [''],
                                email: [''],
                                optionals: [''],
                              })
                      }
                    />

                    <Form.Item
                      name={[fieldName, 'name']}
                      className={sharedStyles.field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={getRequiredRules()}
                    >
                      <CustomInput required size="large" placeholder="Fullname" wrapperClassName={sharedStyles.input} />
                    </Form.Item>
                  </div>

                  <ContactInputList
                    listTitle="Phone"
                    inputPlaceholder="Phone"
                    listName={[fieldName, 'phoneNumbers']}
                    formItemRules={getRequiredRules}
                  />

                  <ContactInputList
                    listTitle="E-mail"
                    inputPlaceholder="E-mail"
                    listName={[fieldName, 'email']}
                    formItemRules={getRequiredRules}
                  />

                  <ContactInputList required={false} listTitle="Optional" listName={[fieldName, 'optionals']} />
                </div>
              )
            })}
          </>
        )}
      </Form.List>
    </div>
  )
})
