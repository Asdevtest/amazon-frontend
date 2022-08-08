import React from 'react'

import {Grid, Typography} from '@material-ui/core'

import {DashboardInfoCard} from '../dashboard-info-card'
import {useClassNames} from './sectional-dashboard.style'

export const SectionalDashboard = ({config, valuesData, onClickViewMore}) => {
  const classNames = useClassNames()

  const renderInfoCard = (infoCardData, section, sectionIndex, sectionSubIndex) => (
    <Grid key={`dashboardSection_${section.dataKey}_infoCard_${infoCardData.dataKey}`} item lg={4} sm={6} xs={12}>
      <DashboardInfoCard
        sectionSubIndex={sectionSubIndex}
        sectionIndex={sectionIndex}
        color={infoCardData.color}
        title={infoCardData.title}
        route={infoCardData.route || false}
        dataGridFilter={infoCardData.dataGridFilter}
        value={valuesData[infoCardData.dataKey]}
        onClickViewMore={onClickViewMore}
      />
    </Grid>
  )

  const renderInfoCardsSections = sections =>
    sections.map((section, sectionIndex) => (
      <div key={`dashboardSection_${section.key}`}>
        <Typography paragraph variant="h5" className={classNames.sectionTitle}>
          {section.title}
        </Typography>
        <Grid container spacing={3} direction="row" justifyContent="flex-start" alignItems="flex-start">
          {section.items.map((item, sectionSubIndex) => renderInfoCard(item, section, sectionIndex, sectionSubIndex))}
        </Grid>
      </div>
    ))

  return renderInfoCardsSections(config)
}
