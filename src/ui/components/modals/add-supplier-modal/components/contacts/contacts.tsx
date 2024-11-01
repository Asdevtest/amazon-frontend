import { Form } from 'antd'
import { memo } from 'react'
import { IconType } from 'react-icons'
import { FaMinus } from 'react-icons/fa'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './contacts.style'

import { getRequiredRules } from '../../add-supplier-modal.config'
import { Contact, FieldType } from '../../add-supplier-modal.types'
import { ContactInputList } from '../contact-input-list'
import { ContactListHeader } from '../contact-list-header'

export const Contacts = memo(() => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <div className={styles.contactsWrapper}>
      <p className={styles.title}>{t(TranslationKey.Contacts)}</p>

      <Form.List name="contacts">
        {(fields, methods) => (
          <>
            {fields.map((field, index) => {
              const fieldName = field.name

              return (
                <div key={field.key} className={styles.contactWrapper}>
                  <Form.Item name={[fieldName, 'name']} className={sharedStyles.field} rules={getRequiredRules()}>
                    <ContactListHeader
                      required
                      listTitle="Contact person"
                      Icon={(index > 0 ? FaMinus : undefined) as IconType}
                      onClickButton={index > 0 ? () => methods.remove(fieldName) : methods.add}
                    />
                    <CustomInput required size="large" placeholder="Fullname" wrapperClassName={sharedStyles.input} />
                  </Form.Item>

                  <ContactInputList
                    listTitle="Phone"
                    inputPlaceholder="Phone"
                    listName={[fieldName, 'phones']}
                    formItemRules={getRequiredRules}
                  />

                  <ContactInputList
                    listTitle="E-mail"
                    inputPlaceholder="E-mail"
                    listName={[fieldName, 'phones']}
                    formItemRules={getRequiredRules}
                  />

                  <ContactInputList
                    required={false}
                    listTitle="Optional"
                    listName={[fieldName, 'phones']}
                    formItemRules={getRequiredRules}
                  />
                </div>
              )
            })}
          </>
        )}
      </Form.List>
    </div>
  )
})
