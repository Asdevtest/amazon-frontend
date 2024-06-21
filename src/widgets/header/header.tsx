import { Header as AntHeader } from 'antd/es/layout/layout'
import { observer } from 'mobx-react'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosNotificationsOff, IoIosNotificationsOutline } from 'react-icons/io'
import { PiMoonLight, PiSunLight } from 'react-icons/pi'
// import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { languageOptions } from '@constants/translations/language-options'

import { CustomButton } from '@components/shared/custom-button'
import { CustomSelect } from '@components/shared/custom-select'
import { CustomTimer } from '@components/shared/custom-timer'

import { Roles } from '@typings/enums/roles'

import { Theme, useTheme } from '../../app/providers/theme'

import { HeaderModel } from './header.model'
import classes from './header.module.scss'

interface Props {
  title: string
}

export const Header: FC<Props> = observer(({ title }) => {
  // const history = useHistory()
  const [viewModel] = useState(() => new HeaderModel(history))
  const [isEnabledNotifications, setIsEnabledNotifications] = useState(true)

  /* useEffect(() => {
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
        { className: classes.toastContainer },
      )
      markNotificationAsReaded(snackNoticeKey.SIMPLE_MESSAGE)
    }
  }, [snackNotifications]) */

  const onClickExit = () => {
    toast.dismiss()
    toast.clearWaitingQueue()
    viewModel.onExitFromRole()
    // history.push('/auth')
  }

  const onClickProfile = () => {
    // history.push(`/profile`)
  }

  const onToggleNotifications = () => {
    setIsEnabledNotifications(prev => {
      localStorage.setItem('isEnabledNotifications', String(!prev))
      return !prev
    })
  }

  const allowedRolesWithoutCandidate = viewModel.userInfo?.allowedRoles?.filter((el: number) => el !== Roles.CANDIDATE)
  const roleMapper = (roleCode: number) => ({
    label: Roles[roleCode],
    value: roleCode,
  })
  const roles =
    allowedRolesWithoutCandidate?.length > 1
      ? allowedRolesWithoutCandidate?.map(roleMapper)
      : [roleMapper(viewModel.userInfo?.role)]

  const { theme, onToggleTheme } = useTheme()

  const { t, i18n } = useTranslation()

  const handleToggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <AntHeader className={classes.header}>
      <p>{t('New price')}</p>
      <p>{t('New price')}</p>
      <p>{t('New price')}</p>
      <p>{t('New price')}</p>
      <p>{t('New price')}</p>
      <p>{t('New price')}</p>
      <p>{t('New price')}</p>
      <p>{t('New price')}</p>
      <p>{t('New price')}</p>
      <p>{t('New price')}</p>
      <p>{t('New price')}</p>
      {/* <div className={classes.menuIconWrapper}>
        <MenuIcon className={classes.menuIcon} />
      </div> */}

      {/* <div className={classes.titleWrapper}>
        <p key={SettingsModel.languageTag} className={classes.title}>
          {t(TranslationKey[`${title as TranslationKey}`])}
        </p>
      </div> */}

      <CustomTimer
        targetDate={viewModel.toggleServerSettings?.approximateShutdownTime}
        tooltipText="Time until server shutdown"
      />

      <CustomSelect
        value={viewModel.userInfo?.role}
        options={roles}
        disabled={roles.length === 1}
        className={classes.roleSelect}
        onChange={viewModel.onChangeUserInfo}
      />

      <CustomSelect
        value={i18n.language}
        options={languageOptions}
        className={classes.languageSelect}
        onChange={handleToggleLanguage}
      />

      <CustomButton type="link" className={classes.themeButton} onClick={onToggleNotifications}>
        {isEnabledNotifications ? (
          <IoIosNotificationsOutline className={classes.icon} />
        ) : (
          <IoIosNotificationsOff className={classes.icon} />
        )}
      </CustomButton>

      {/* <LanguageSelector className={classes.languageSelector} /> */}

      <CustomButton type="link" className={classes.themeButton} onClick={onToggleTheme}>
        {theme === Theme.LIGHT ? <PiSunLight className={classes.icon} /> : <PiMoonLight className={classes.icon} />}
      </CustomButton>

      {/* <Divider orientation="vertical" className={classes.hideOnModile} />

        <div className={classes.userInfoWrapper} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <img className={classes.avatar} src={getUserAvatarSrc(userId)} />

          <div className={classes.userNameAndBalanceWrapper}>
            <p className={classes.userName}>{getShortenStringIfLongerThanCount(userName, 10)}</p>

            {!checkIsResearcher((UserRoleCodeMap as { [key: number]: string })[role]) && (
              <p className={classes.balance}>{toFixedWithDollarSign(balance, 2)}</p>
            )}
          </div>
          <ArrowDropDownIcon className={classes.hideOnModile} />
        </div> */}

      {/* {Boolean(anchorEl) && (
        <DialogModal open={Boolean(anchorEl)} onClose={handleClose}>
          <Menu
            keepMounted
            id="simple-menu"
            anchorEl={anchorEl}
            autoFocus={false}
            open={Boolean(anchorEl)}
            classes={{ root: classes.menu, list: classes.list }}
            onClose={handleClose}
          >
            <MenuItem className={classes.menuClientInfoWrapper} onClick={handleClose}>
              <div className={classes.menuClientInfo}>
                <p className={classes.menuClientInfoText}>{getShortenStringIfLongerThanCount(userName, 10)}</p>

                {!checkIsResearcher((UserRoleCodeMap as { [key: number]: string })[role]) && (
                  <p className={classes.menuClientInfoText}>{toFixedWithDollarSign(balance, 2)}</p>
                )}
              </div>

              <Avatar className={classes.avatar} src={getUserAvatarSrc(userId)} />
            </MenuItem>
            <MenuItem className={classes.mobileAllowedRolesWrapper} onClick={handleClose}>
              <p className={classes.mobileUserRoleTitle}>{t(TranslationKey['Your role:'])}</p>
              {allowedRolesWithoutCandidate?.length > 1 ? (
                <div className={classes.allowedRolesWrapper}>
                  {allowedRolesWithoutCandidate?.map((roleCode: number) => (
                    <div key={roleCode} className={classes.userRoleWrapper}>
                      {roleCode === role ? <span className={classes.indicator}></span> : null}

                      <p
                        className={cx(classes.userRole, {
                          [classes.currentAllowedRolesItem]: roleCode === role,
                        })}
                        onClick={() => onChangeUserInfo(roleCode)}
                      >
                        {(UserRoleCodeMap as { [key: number]: string })[roleCode]}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={classes.userRoleWrapper}>
                  <span className={classes.indicator}></span>
                  <p className={cx(classes.userRole, classes.currentAllowedRolesItem)}>
                    {(UserRoleCodeMap as { [key: number]: string })[role]}
                  </p>
                </div>
              )}
            </MenuItem>

            <MenuItem
              className={classes.menuItem}
              onClick={() => {
                onClickProfile()
                handleClose()
              }}
            >
              <PersonIcon className={classes.icon} />
              {t(TranslationKey.Profile)}
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => {
                onClickExit()
                handleClose()
              }}
            >
              <ExitIcon className={classes.icon} />
              {t(TranslationKey.Exit)}
            </MenuItem>
          </Menu>
        </DialogModal>
      )} */}
    </AntHeader>
  )
})
