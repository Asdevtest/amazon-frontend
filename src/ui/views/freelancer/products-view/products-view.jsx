import React, {useState} from 'react'

import {Box, Typography, Button, Paper} from '@material-ui/core'

import {FREELANCER_HEAD_CELLS, FREELANCER_PRODUCT_LIST} from '@constants/mocks'
import {categoriesList} from '@constants/navbar'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {Table} from '@components/table'
import {TableBodyRow} from '@components/table-rows/freelancer/table-body-row'
import {TableHeadRow} from '@components/table-rows/freelancer/table-head-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/freelancerAvatar.jpg'
import {useClassNames} from './products-view.style'

const textConsts = getLocalizedTexts(texts, 'en').freelancerProductsView

export const ProductsView = () => {
  const classNames = useClassNames()
  const [activeCategory, setCategory] = useState(1)
  const [activeSubCategory, setSubCategory] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [paginationPage, setPaginationPge] = useState(1)

  const renderHeadRow = <TableHeadRow headCells={FREELANCER_HEAD_CELLS} />

  const renderButtons = (
    <React.Fragment>
      <Button disableElevation color="primary" variant="contained">
        Button1
      </Button>
      <Button>Button2</Button>
      <Button>Button3</Button>
    </React.Fragment>
  )

  const onChangePagination = (e, value) => {
    setPaginationPge(value)
  }

  const onChangeRowsPerPage = e => {
    setRowsPerPage(Number(e.target.value))
    setPaginationPge(1)
  }

  return (
    <React.Fragment>
      <Navbar
        activeItem={activeCategory}
        setItem={setCategory}
        activeSubItem={activeSubCategory}
        categoriesList={categoriesList.freelancer}
        setSubItem={setSubCategory}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        user={textConsts.appUser}
      />
      <Main>
        <Appbar
          title={textConsts.appBarTitle}
          notificationCount={2}
          avatarSrc={avatar}
          username={textConsts.appBarUsername}
          setDrawerOpen={setDrawerOpen}
        >
          <MainContent>
            <Paper className={classNames.card}>
              <Typography variant="h3">{textConsts.cardMainTitle}</Typography>
              <Field title={textConsts.linkAmazon} />
              <Field title={textConsts.codeOfGood} />
              <Box className={classNames.boxBtn}>
                <Button className={classNames.button}>{textConsts.buttonChek}</Button>
                <SuccessButton>{textConsts.buttonAdd}</SuccessButton>
              </Box>
            </Paper>

            <Typography variant="h4">{textConsts.mainTitle}</Typography>

            <Table
              buttons={renderButtons}
              currentPage={paginationPage}
              data={FREELANCER_PRODUCT_LIST}
              handlerPageChange={onChangePagination}
              handlerRowsPerPage={onChangeRowsPerPage}
              pageCount={Math.ceil(FREELANCER_PRODUCT_LIST.length / rowsPerPage)}
              BodyRow={TableBodyRow}
              renderHeadRow={renderHeadRow}
              rowsPerPage={rowsPerPage}
            />
          </MainContent>
        </Appbar>
      </Main>
    </React.Fragment>
  )
}
