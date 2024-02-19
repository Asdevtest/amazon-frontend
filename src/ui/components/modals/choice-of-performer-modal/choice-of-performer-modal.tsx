/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChangeEvent, FC, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { MasterUserItem } from '@components/shared/master-user-item'
import { SearchInput } from '@components/shared/search-input'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { t } from '@utils/translations'

import { IAnnoucement } from '@typings/models/announcements/annoucement'
import { ICreatedBy } from '@typings/shared/created-by'
import { ButtonType, ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './choice-of-performer-modal.style'

import { AnnouncementCard } from './announcement-card'

export interface ChoiceOfPerformerModalProps {
  announcements: Array<IAnnoucement>
  masterUsersData: Array<ICreatedBy>
  chosenExecutor: ICreatedBy
  chosenAnnouncement: IAnnoucement
  onClickThumbnail: () => void
  onClickSelectButton: (selectedService?: IAnnoucement, chosenExecutor?: ICreatedBy) => void
  onClickResetPerformerBtn: () => void
  onClickCloseBtn: () => void
}

export const ChoiceOfPerformerModal: FC<ChoiceOfPerformerModalProps> = props => {
  const {
    announcements,
    masterUsersData,
    chosenExecutor,
    chosenAnnouncement,
    onClickThumbnail,
    onClickSelectButton,
    onClickResetPerformerBtn,
    onClickCloseBtn,
  } = props
  const { classes: styles } = useStyles()

  const actualmasterUsersDataIds = masterUsersData.map(obj => obj._id)
  const [dataToRender, setDataToRender] = useState(announcements)
  const [nameSearchValue, setNameSearchValue] = useState('')
  const [selectedExecutor, setSelectedExecutor] = useState<ICreatedBy | undefined>(chosenExecutor)
  const [selectedService, setSelectedService] = useState<IAnnoucement | undefined>(chosenAnnouncement)

  const selectCardHandler = (value: IAnnoucement) => {
    setSelectedService(prev => (prev?._id === value?._id ? undefined : value))
  }

  useEffect(() => {
    if (selectedExecutor) {
      setDataToRender(announcements.filter(announcement => announcement.createdBy._id === selectedExecutor?._id))
    } else {
      setDataToRender(
        announcements.filter(announcement => actualmasterUsersDataIds.includes(announcement.createdBy?._id)),
      )
    }
  }, [announcements, selectedExecutor])

  useEffect(() => {
    if (nameSearchValue) {
      setDataToRender(
        announcements
          .filter(announcement => (selectedExecutor?._id ? announcement.createdBy._id === selectedExecutor?._id : true))
          .filter(
            announcement =>
              announcement.title.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
              announcement.description.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
              announcement.createdBy.name.toLowerCase().includes(nameSearchValue.toLowerCase()),
          ),
      )
    } else {
      setDataToRender(
        announcements.filter(announcement =>
          selectedExecutor?._id ? announcement.createdBy._id === selectedExecutor?._id : true,
        ),
      )
    }
  }, [nameSearchValue])

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.supWrapper}>
        <p className={styles.title}>{t(TranslationKey['Choice of Performer'])}</p>

        <Field
          label={t(TranslationKey.Performer)}
          labelClasses={styles.label}
          containerClasses={styles.executorContainer}
          inputComponent={
            // @ts-ignore
            <WithSearchSelect
              // @ts-ignore
              darkIcon
              grayBorder
              masterUserSelect
              blackSelectedItem
              chosenItemNoHover
              width="100%"
              data={masterUsersData}
              searchOnlyFields={['name']}
              customSubMainWrapper={styles.customSubMainWrapper}
              customSearchInput={styles.customSearchInput}
              selectedItemName={
                selectedExecutor ? (
                  <MasterUserItem
                    id={selectedExecutor?._id}
                    name={selectedExecutor?.name}
                    rating={selectedExecutor?.rating}
                  />
                ) : (
                  t(TranslationKey['Choose an executor'])
                )
              }
              onClickSelect={(el: ICreatedBy) => {
                setSelectedExecutor(el)
                setSelectedService(undefined)
              }}
              onClickNotChosen={() => {
                setSelectedExecutor(undefined)
                setSelectedService(undefined)
              }}
            />
          }
        />

        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Search by Performer, Title, Description'])}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNameSearchValue(e.target.value)}
        />

        <Button
          styleType={ButtonType.DANGER}
          onClick={() => {
            onClickResetPerformerBtn()
            onClickCloseBtn()
          }}
        >
          {t(TranslationKey['Reset performer'])}
        </Button>
      </div>

      <div className={styles.cardsWrapper}>
        {dataToRender.map((service, serviceKey) => (
          <AnnouncementCard
            key={serviceKey}
            announcementData={service}
            selectedCard={selectedService}
            onClickThumbnail={onClickThumbnail}
            onClickSelectCard={selectCardHandler}
            onClickSelectButton={() => onClickSelectButton(selectedService, selectedExecutor)}
          />
        ))}
      </div>

      <div className={styles.footerWrapper}>
        <Button
          styleType={ButtonType.SUCCESS}
          disabled={!selectedService && !selectedExecutor}
          onClick={() => onClickSelectButton(selectedService, selectedExecutor)}
        >
          {t(TranslationKey.Select)}
        </Button>
        <Button variant={ButtonVariant.OUTLINED} className={styles.cancelButton} onClick={onClickCloseBtn}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
