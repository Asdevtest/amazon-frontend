import { Flex, Layout } from 'antd'
import { observer } from 'mobx-react'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { VscFeedback } from 'react-icons/vsc'

import { appVersion } from '@constants/app-version'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { navbarConfig } from '@constants/navigation/navbar'
import { navBarActiveCategory } from '@constants/navigation/navbar-active-category'
import { TranslationKey } from '@constants/translations/translation-key'

import { VersionHistoryForm } from '@components/forms/version-history-form'
import { FeedBackModal } from '@components/modals/feedback-modal'
import { CustomButton } from '@components/shared/custom-button'
import { Modal } from '@components/shared/modal'
import { ShortLogoIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { isAdmin, isModerator } from '@typings/guards/roles'

import { useStyles } from './sider.style'

import { getCategoryBadge } from './helper/get-category-badge'
import { MenuItem } from './menu-item'
import { MenuSubItem } from './menu-sub-item'
import { SiderModel } from './sider.model'

export const alwaysShowSubCategoryKeys = [
  navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
  navBarActiveCategory.NAVBAR_READY_TO_CHECK,
]

const { Sider: AntSider } = Layout

export const Sider = observer(props => {
  const { activeCategory, activeSubCategory } = props

  const { classes: styles, theme, cx } = useStyles()
  const viewModel = useMemo(() => new SiderModel(), [])

  const [filteredCategories, setFilteredCategories] = useState([])
  const [filteredBottomCategories, setFilteredBottomCategories] = useState([])

  const getFilteredCategories = () => navbarConfig[UserRoleCodeMap[viewModel.userInfo.role]]
  const getBadge = category =>
    category.route?.includes('/messages') ? viewModel.unreadMessages : getCategoryBadge(category, viewModel.userInfo)

  useEffect(() => {
    setFilteredCategories(getFilteredCategories())
  }, [])

  return (
    <>
      <AntSider width={280} className={styles.sider}>
        <Flex component="div" align="center" justify="center" style={{ minHeight: 50 }}>
          <ShortLogoIcon />
        </Flex>

        <Flex vertical>
          {filteredCategories.map((category, index) =>
            category?.checkHideBlock?.(viewModel.userInfo) ? (
              <Fragment key={index}>
                <MenuItem
                  isSelected={category.key === activeCategory}
                  userInfo={viewModel.userInfo}
                  category={category}
                  badge={getBadge(category)}
                />

                {(category.key === activeCategory || alwaysShowSubCategoryKeys.includes(category.key)) && (
                  <MenuSubItem
                    activeCategory={activeCategory}
                    activeSubCategory={activeSubCategory}
                    category={category}
                    userInfo={viewModel.userInfo}
                  />
                )}
              </Fragment>
            ) : null,
          )}
        </Flex>

        <Flex vertical>
          {!isAdmin(viewModel.userInfo.role) && !isModerator(viewModel.userInfo.role) ? (
            <CustomButton
              block
              size="large"
              type="link"
              textAlign="left"
              icon={<VscFeedback size={24} />}
              className={styles.feedback}
              onClick={() => viewModel.onTriggerOpenModal('showFeedbackModal')}
            >
              {t(TranslationKey.Feedback)}
            </CustomButton>
          ) : null}
          <CustomButton
            block
            type="link"
            size="small"
            textAlign="left"
            className={styles.version}
            onClick={viewModel.onClickVersion}
          >
            {appVersion}
          </CustomButton>
        </Flex>
      </AntSider>

      {viewModel.showFeedbackModal ? (
        <FeedBackModal
          // @ts-ignore
          openModal={viewModel.showFeedbackModal}
          onSubmit={viewModel.sendFeedbackAboutPlatform}
          onClose={() => viewModel.onTriggerOpenModal('showFeedbackModal')}
        />
      ) : null}

      <Modal
        openModal={viewModel.showVersionHistoryModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showVersionHistoryModal')}
      >
        <VersionHistoryForm
          title={t(TranslationKey['Version history of releases'])}
          selectedPatchNote={viewModel.patchNote}
          patchNotes={viewModel.patchNotes}
          onScrollPatchNotes={viewModel.loadMoreDataHadler}
          onResetPatchNote={viewModel.onResetPatchNote}
          onViewPatchNote={viewModel.getPatchNote}
          onClickResetVersion={viewModel.onClickResetVersion}
        />
      </Modal>
    </>
  )
})
