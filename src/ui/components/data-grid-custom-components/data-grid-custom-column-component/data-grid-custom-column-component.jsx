// import StarOutlineIcon from '@mui/icons-material/StarOutline'
// import Box from '@mui/material/Box'
import {
  GridColumnMenu,
  GridColumnMenuContainer,
  GridFilterMenuItem,
  SortGridMenuItems,
  HideGridColMenuItem,
  GridColumnsMenuItem,
} from '@mui/x-data-grid'

import {IsFormedMenuItem} from '../data-grid-menu-items/data-grid-menu-items'

export const DataGridCustomColumnMenuComponent = props => {
  const {hideMenu, currentColumn, isFormedData, /* onClickFormedMenu,*/ ...other} = props

  const renderStandartItems = () => (
    <>
      <SortGridMenuItems column={currentColumn} onClick={hideMenu} />
      <GridFilterMenuItem column={currentColumn} onClick={hideMenu} />
      <HideGridColMenuItem column={currentColumn} onClick={hideMenu} />
      <GridColumnsMenuItem column={currentColumn} onClick={hideMenu} />
    </>
  )

  if (currentColumn.field === 'isFormed') {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <IsFormedMenuItem isFormedData={isFormedData} />
        {renderStandartItems()}
      </GridColumnMenuContainer>
    )
  }

  // if (currentColumn.field === 'isFormed') {
  //   return (
  //     <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
  //       <Box
  //         sx={{
  //           width: 127,
  //           height: 160,
  //           display: 'flex',
  //           justifyContent: 'center',
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <StarOutlineIcon sx={{fontSize: 80}} />
  //       </Box>
  //       {renderStandartItems()}
  //     </GridColumnMenuContainer>
  //   )
  // }
  return <GridColumnMenu hideMenu={hideMenu} currentColumn={currentColumn} {...other} />
}
