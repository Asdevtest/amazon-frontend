import { Form } from 'antd'
import { FormListProps, Rule } from 'antd/es/form'
import { FC, memo } from 'react'
import { FaMinus } from 'react-icons/fa'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './contact-input-list.style'

import { ContactListHeader } from '../contact-list-header'

interface ContactInputListProps {
  required?: boolean
  listTitle: keyof typeof TranslationKey
  listName: FormListProps['name']
  formItemRules?: () => Rule[]
}

export const ContactInputList: FC<ContactInputListProps> = memo(props => {
  const { required = true, listTitle, listName, formItemRules } = props

  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <Form.List name={listName}>
      {(phonesFields, methods) => (
        <div className={sharedStyles.contactField}>
          <ContactListHeader listTitle={listTitle} required={required} onClickButton={() => methods.add()} />

          <div className={styles.inputList}>
            {phonesFields.map((phoneField, index) => (
              <Form.Item
                key={phoneField.key}
                name={[phoneField.name]}
                className={sharedStyles.field}
                rules={formItemRules?.()}
              >
                <CustomInput
                  required
                  size="large"
                  wrapperClassName={sharedStyles.input}
                  suffix={
                    index > 0 ? (
                      <CustomButton
                        type="text"
                        size="small"
                        icon={<FaMinus size={10} className="icon" />}
                        onClick={() => methods.remove(phoneField.name)}
                      />
                    ) : null
                  }
                />
              </Form.Item>
            ))}
          </div>
        </div>
      )}
    </Form.List>
  )
})
