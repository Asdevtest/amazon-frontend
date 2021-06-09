import React from 'react'

import {Box, Grid, Paper} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {FieldsAndSuppliers} from './fields-and-suppliers'
import {RightSideComments} from './right-side-comments'
import {useClassNames} from './top-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const TopCard = observer(
  ({
    curUserRole,
    onChangeField,
    actionStatus,
    product,
    onClick,
    selectedSupplier,
    onClickSupplier,
    chipList,
    activeChip,
    setActiveChip,
    onClickParseAmazonBtn,
    onClickParseSellCenteralBtn,
  }) => {
    const classNames = useClassNames()
    return (
      <React.Fragment>
        <Paper className={classNames.mainCardWrapper}>
          <Grid container spacing={2}>
            <Grid container item sm={7} xs={12}>
              <Grid item xs={12}>
                <Box className={classNames.parseButtonsWrapper}>
                  <Button className={classNames.buttonParseAmazon} onClick={() => onClickParseAmazonBtn(product)}>
                    {textConsts.buttonParseAmazon}
                  </Button>
                  <Button onClick={() => onClickParseSellCenteralBtn(product)}>
                    {textConsts.buttonParseSellcentrall}
                  </Button>
                </Box>
                {actionStatus === loadingStatuses.success ? (
                  <Alert className={classNames.alert} elevation={0} severity="success">
                    {textConsts.alertSuccess}
                  </Alert>
                ) : undefined}
              </Grid>
              <FieldsAndSuppliers
                curUserRole={curUserRole}
                product={product}
                selectedSupplier={selectedSupplier}
                onChangeField={onChangeField}
                onClick={onClick}
                onClickSupplier={onClickSupplier}
              />
            </Grid>
            <RightSideComments
              curUserRole={curUserRole}
              chipList={chipList}
              activeChip={activeChip}
              setActiveChip={setActiveChip}
              product={product}
              onChangeField={onChangeField}
            />
          </Grid>
        </Paper>
      </React.Fragment>
    )
  },
)
