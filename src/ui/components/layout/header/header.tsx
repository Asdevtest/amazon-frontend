import { observer } from 'mobx-react'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { IoMdSunny } from 'react-icons/io'
import { MdArrowDropDown, MdBrightness3, MdNotifications, MdNotificationsOff, MdPerson } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Avatar, Divider } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { snackNoticeKey } from '@constants/keys/snack-notifications'
import { UserRole, UserRoleCodeMap, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { SimpleMessagesNotification } from '@components/layout/notifications/simple-messages-notification'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { CustomTimer } from '@components/shared/custom-timer'
import { DialogModal } from '@components/shared/dialog-modal'
import { LanguageSelector } from '@components/shared/language-selector'
import { ExitIcon, HintsOffIcon, HintsOnIcon, MenuIcon } from '@components/shared/svg-icons'

import { checkIsResearcher } from '@utils/checks'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { getShortenStringIfLongerThanCount, toFixedWithDollarSign } from '@utils/text'
import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { HintsContext } from '@contexts/hints-context'

import { UiTheme } from '@typings/enums/ui-theme'

import { useStyles } from './header.style'

import { HeaderModel } from './header.model'

interface Props {
  title: string
  onToggleModal: () => void
}

export const Header: FC<Props> = observer(({ title, onToggleModal }) => {
  const { hints, setHints } = useContext(HintsContext)
  const history = useHistory()
  const { classes: styles, cx } = useStyles()
  const componentModel = useRef(new HeaderModel({ history }))
  const [isEnabledNotifications, setIsEnabledNotifications] = useState(true)

  const {
    role,
    userName,
    balance,
    userId,
    snackNotifications,
    simpleMessageCrmItemId,
    allowedRoles,
    showHints,
    toggleServerSettings,
    clearSnackNoticeByKey: markNotificationAsReaded,
    onClickMessage,
    checkMessageIsRead,
    onExitFromRole,
    changeUserInfo,
    changeUiTheme,
  } = componentModel.current

  useEffect(() => {
    if (
      snackNotifications[snackNoticeKey.SIMPLE_MESSAGE] &&
      !history.location.pathname.includes('/messages') &&
      !checkMessageIsRead(snackNotifications[snackNoticeKey.SIMPLE_MESSAGE]) &&
      !history.location.search.includes(simpleMessageCrmItemId)
    ) {
      toast(
        <SimpleMessagesNotification
          noticeItem={snackNotifications[snackNoticeKey.SIMPLE_MESSAGE]}
          onClickMessage={onClickMessage}
        />,
        { className: styles.toastContainer },
      )
      markNotificationAsReaded(snackNoticeKey.SIMPLE_MESSAGE)
    }
  }, [snackNotifications])

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const handleClick = (event: { currentTarget: HTMLDivElement }) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClickExit = () => {
    handleClose()
    toast.dismiss()
    toast.clearWaitingQueue()
    onExitFromRole()
    history.push('/auth')
  }

  const onChangeUserInfo = (roleNun: number) => {
    changeUserInfo({ role: roleNun })
  }

  const onClickProfile = () => {
    history.push(`/profile`)
  }

  const onClickThemeIcon = (theme: string) => {
    changeUiTheme(theme)
  }

  const allowedRolesWithoutCandidate = allowedRoles?.filter(
    (el: number) => el !== (mapUserRoleEnumToKey as { [key: string]: number })[UserRole.CANDIDATE],
  )

  const handleNotifications = () => {
    if (isEnabledNotifications) {
      setIsEnabledNotifications(false)
      localStorage.setItem('isEnabledNotifications', 'false')
    } else {
      setIsEnabledNotifications(true)
      localStorage.setItem('isEnabledNotifications', 'true')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('isEnabledNotifications') === 'false') {
      setIsEnabledNotifications(false)
    }
  }, [])

  const roleMapper = (roleCode: number) => ({
    label: (UserRoleCodeMap as { [key: number]: string })[roleCode],
    value: roleCode,
  })
  const roles =
    allowedRolesWithoutCandidate?.length > 1 ? allowedRolesWithoutCandidate?.map(roleMapper) : [roleMapper(role)]

  return (
    <div className={styles.header}>
      <div className={styles.menuIconWrapper}>
        <MenuIcon className={styles.menuIcon} onClick={onToggleModal} />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.titleWrapper}>
          <p key={SettingsModel.languageTag} className={styles.title}>
            {t(TranslationKey[`${title as TranslationKey}`])}
          </p>

          <div className={styles.tooltipWrapper} onClick={() => setHints(!hints)}>
            {showHints ? (
              <HintsOnIcon
                className={cx(styles.hintsIcon, styles.hintsIconActive)}
                fontSize={'small'}
                viewBox={'0 0 18 18'}
              />
            ) : (
              <HintsOffIcon className={styles.hintsIcon} fontSize={'small'} viewBox={'0 0 18 18'} />
            )}
            {showHints ? (
              <p className={styles.hintsTextActive}>{t(TranslationKey['Hints included'])}</p>
            ) : (
              <p className={styles.hintsTextNoActive}>{t(TranslationKey['Hints are off'])}</p>
            )}
          </div>
        </div>

        {toggleServerSettings?.approximateShutdownTime ? (
          <CustomTimer
            targetDate={toggleServerSettings?.approximateShutdownTime}
            tooltipText="Time until server shutdown"
          />
        ) : null}

        <p className={styles.userRoleTitle}>{t(TranslationKey['Your role:'])}</p>

        <div className={styles.allowedRolesMainWrapper}>
          <CustomRadioButton
            size="large"
            options={roles}
            value={role}
            onChange={throttle(e => onChangeUserInfo(e.target.value))}
          />
        </div>

        <Divider orientation="vertical" className={styles.hideOnModile} />

        <div className={styles.selectorsWrapper}>
          {isEnabledNotifications ? (
            <MdNotifications size={24} className={styles.notificationIcon} onClick={handleNotifications} />
          ) : (
            <MdNotificationsOff size={24} className={styles.notificationIcon} onClick={handleNotifications} />
          )}

          <LanguageSelector className={styles.languageSelector} />

          {SettingsModel.uiTheme === UiTheme.light ? (
            <IoMdSunny size={24} className={styles.themeIcon} onClick={() => onClickThemeIcon(UiTheme.dark)} />
          ) : (
            <MdBrightness3 size={24} className={styles.themeIcon} onClick={() => onClickThemeIcon(UiTheme.light)} />
          )}
        </div>

        <Divider orientation="vertical" className={styles.hideOnModile} />

        <div className={styles.userInfoWrapper} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <img className={styles.avatar} src={getUserAvatarSrc(userId)} />

          <div className={styles.userNameAndBalanceWrapper}>
            <p className={styles.userName}>{getShortenStringIfLongerThanCount(userName, 10)}</p>

            {!checkIsResearcher((UserRoleCodeMap as { [key: number]: string })[role]) && (
              <p className={styles.balance}>{toFixedWithDollarSign(balance, 2)}</p>
            )}
          </div>
          <MdArrowDropDown size={20} className={styles.hideOnModile} />
        </div>
      </div>

      {Boolean(anchorEl) && (
        <DialogModal open={Boolean(anchorEl)} onClose={handleClose}>
          <Menu
            keepMounted
            id="simple-menu"
            anchorEl={anchorEl}
            autoFocus={false}
            open={Boolean(anchorEl)}
            classes={{ root: styles.menu, list: styles.list }}
            onClose={handleClose}
          >
            <MenuItem className={styles.menuClientInfoWrapper} onClick={handleClose}>
              <div className={styles.menuClientInfo}>
                <p className={styles.menuClientInfoText}>{getShortenStringIfLongerThanCount(userName, 10)}</p>

                {!checkIsResearcher((UserRoleCodeMap as { [key: number]: string })[role]) && (
                  <p className={styles.menuClientInfoText}>{toFixedWithDollarSign(balance, 2)}</p>
                )}
              </div>

              <Avatar className={styles.avatar} src={getUserAvatarSrc(userId)} />
            </MenuItem>
            <MenuItem className={styles.mobileAllowedRolesWrapper} onClick={handleClose}>
              <p className={styles.mobileUserRoleTitle}>{t(TranslationKey['Your role:'])}</p>
              {allowedRolesWithoutCandidate?.length > 1 ? (
                <div className={styles.allowedRolesWrapper}>
                  {allowedRolesWithoutCandidate?.map((roleCode: number) => (
                    <div key={roleCode} className={styles.userRoleWrapper}>
                      {roleCode === role ? <span className={styles.indicator}></span> : null}

                      <p
                        className={cx(styles.userRole, {
                          [styles.currentAllowedRolesItem]: roleCode === role,
                        })}
                        onClick={throttle(() => onChangeUserInfo(roleCode))}
                      >
                        {(UserRoleCodeMap as { [key: number]: string })[roleCode]}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.userRoleWrapper}>
                  <span className={styles.indicator}></span>
                  <p className={cx(styles.userRole, styles.currentAllowedRolesItem)}>
                    {(UserRoleCodeMap as { [key: number]: string })[role]}
                  </p>
                </div>
              )}
            </MenuItem>

            <MenuItem
              className={styles.menuItem}
              onClick={() => {
                onClickProfile()
                handleClose()
              }}
            >
              <MdPerson size={22} className={styles.icon} />
              {t(TranslationKey.Profile)}
            </MenuItem>
            <MenuItem
              className={styles.menuItem}
              onClick={() => {
                onClickExit()
                handleClose()
              }}
            >
              <ExitIcon className={styles.icon} />
              {t(TranslationKey.Exit)}
            </MenuItem>
          </Menu>
        </DialogModal>
      )}
    </div>
  )
})
