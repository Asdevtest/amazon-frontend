import { Form } from 'antd'
import { memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { useStyles } from './contacts.style'

import { getRequiredRules } from '../../add-supplier-modal.config'
import { Contact, FieldType } from '../../add-supplier-modal.types'

export const Contacts = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.contactsWrapper}>
      <p className={styles.title}>{t(TranslationKey.Contacts)}</p>

      <Form.List name="contacts">
        {(fields, methods) => (
          <div>
            {fields.map(field => (
              <div key={field.key}>
                <Form.Item name={[field.name, 'name']} className={styles.field} rules={getRequiredRules()}>
                  <CustomInput required allowClear size="large" placeholder="Name" wrapperClassName={styles.input} />
                </Form.Item>

                {/** Отображаем телефоны как массив строк */}
                <Form.List name={[field.name, 'phones']}>
                  {phonesFields => (
                    <div>
                      {phonesFields.map(phoneField => (
                        <Form.Item
                          key={phoneField.key}
                          name={[phoneField.name]}
                          className={styles.field}
                          rules={getRequiredRules()}
                        >
                          <CustomInput
                            required
                            allowClear
                            size="large"
                            placeholder="Phone"
                            wrapperClassName={styles.input}
                          />
                        </Form.Item>
                      ))}
                    </div>
                  )}
                </Form.List>
              </div>
            ))}
          </div>
        )}
      </Form.List>
    </div>
  )
})
