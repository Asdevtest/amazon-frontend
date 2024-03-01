import { ChangeEvent, FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { IFields, SetFields } from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { Input } from '@components/shared/input'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './links-tab.style'

import { Link } from './link'

interface LinksTabProps {
  isClient: boolean
  fields: IFields
  setFields: SetFields
  readOnly?: boolean
}

export const LinksTab: FC<LinksTabProps> = memo(props => {
  const { isClient, fields, setFields, readOnly } = props

  const { classes: styles, cx } = useStyles()

  const [newLinkValue, setNewLinkValue] = useState('')

  const handleAddLink = () => {
    if (newLinkValue && !isClient) {
      setFields(prevFields => ({
        ...prevFields,
        publicationLinks: [...(prevFields?.publicationLinks || []), newLinkValue],
      }))
      setNewLinkValue('')
    }
  }

  const handleChangeLink = (linkIndex: number, value: string) => {
    if (!isClient) {
      setFields(prevFields => ({
        ...prevFields,
        publicationLinks: prevFields?.publicationLinks?.map((link, index) => (index === linkIndex ? value : link)),
      }))
    }
  }

  const handleRemoveLink = (linkIndex: number) => {
    if (!isClient) {
      setFields(prevFields => ({
        ...prevFields,
        publicationLinks: prevFields?.publicationLinks?.filter((_, index) => index !== linkIndex),
      }))
    }
  }

  const disabledAddLinkButton = newLinkValue.trim().length === 0
  const notClientOrNotReadOnly = !isClient || !readOnly

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.links, { [styles.clientLinks]: isClient })}>
        {fields?.publicationLinks?.map((link, index) => (
          <Link
            key={index}
            readOnly={readOnly}
            isClient={isClient}
            link={link}
            linkIndex={index}
            onChangeLink={handleChangeLink}
            onRemoveLink={handleRemoveLink}
          />
        ))}
      </div>

      {notClientOrNotReadOnly ? (
        <div className={styles.addLinkContainer}>
          <Input
            value={newLinkValue}
            placeholder={`${t(TranslationKey['Enter link'])}...`}
            classes={{ root: cx(styles.inputRoot, styles.addInput), input: styles.input }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewLinkValue(e.target.value)}
          />

          <button disabled={disabledAddLinkButton} className={styles.button} onClick={handleAddLink}>
            <CustomPlusIcon className={styles.iconPlus} />
            {t(TranslationKey['Add link'])}
          </button>
        </div>
      ) : null}
    </div>
  )
})
