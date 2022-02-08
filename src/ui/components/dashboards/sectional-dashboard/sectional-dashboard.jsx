import {React} from 'react'

import {Grid, Typography} from '@material-ui/core'

// import {useClassNames} from './sectional-dashboard.style'
import {DashboardInfoCard} from '../dashboard-info-card'

export const SectionalDashboard = (config, valueByKeyFunction, onClickInfoCardViewMode) => {
  // const classNames = useClassNames()

  // console.log('RRRR')

  const renderInfoCard = (infoCardData, section) => (
    <Grid key={`dashboardSection_${section.dataKey}_infoCard_${infoCardData.dataKey}`} item lg={4} sm={6} xs={12}>
      <DashboardInfoCard
        color={infoCardData.color}
        title={infoCardData.title}
        route={infoCardData.route || false}
        value={valueByKeyFunction(infoCardData.dataKey)}
        onClickViewMore={onClickInfoCardViewMode}
      />
    </Grid>
  )

  const renderInfoCardsSections = sections =>
    sections.map(section => (
      <div key={`dashboardSection_${section.key}`}>
        <Typography paragraph variant="h5">
          {section.title}
        </Typography>
        <Grid container justify="center" spacing={3}>
          {section.items.map(item => renderInfoCard(item, section))}
        </Grid>
      </div>
    ))

  return renderInfoCardsSections(config)
}

// import React from 'react'

// import {Grid, Typography} from '@material-ui/core'

// // import {useClassNames} from './sectional-dashboard.style'
// import { DashboardInfoCard } from '../dashboard-info-card'

// export const SectionalDashboard = ({config, valueByKeyFunction, onClickViewMore}) => {
//   // const classNames = useClassNames()

//   const renderInfoCard = (infoCardData, section) => (
//     <Grid key={`dashboardSection_${section.dataKey}_infoCard_${infoCardData.dataKey}`} item lg={4} sm={6} xs={12}>
//       <DashboardInfoCard
//         color={infoCardData.color}
//         title={infoCardData.title}
//         route={infoCardData.route || false}
//         value={valueByKeyFunction(infoCardData.dataKey)}
//         onClickViewMore={onClickViewMore}
//       />
//     </Grid>
//   )

//   const renderInfoCardsSections = sections =>
//     sections.map(section => (
//       <div key={`dashboardSection_${section.key}`}>
//         <Typography paragraph variant="h5">
//           {section.title}
//         </Typography>
//         <Grid container justify="center" spacing={3}>
//           {section.items.map(item => renderInfoCard(item, section))}
//         </Grid>
//       </div>
//     ))

//   return (
//     renderInfoCardsSections(config)
//   )
// }
