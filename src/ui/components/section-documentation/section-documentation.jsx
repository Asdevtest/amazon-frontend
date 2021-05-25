import React from 'react'

import {Box, Divider, Link, Typography} from '@material-ui/core'

import {Anchor} from '../anchor'
import {useStyles} from './section-documentation.style'

const SectionMain = React.forwardRef(({title, link, img, imgAlt = ''}, ref) => {
  const classes = useStyles()()
  const linkProps = {
    ...(!!link && {href: link}),
  }
  const linkLabel = link ? link : 'Link is not yet available'
  return (
    <React.Fragment>
      <Anchor ref={ref}>
        <Typography variant="h4">{title}</Typography>
      </Anchor>
      <Link {...linkProps} target="_blank">
        {linkLabel}
      </Link>
      <Divider className={classes.root} />
      <Box textAlign="center">
        <img alt={imgAlt} className={classes.imgClass} src={img} />
      </Box>
    </React.Fragment>
  )
})

const Section = props => (
  // mb - MarginBottom
  <Box mb={5}>{props.children}</Box>
)

export {Section, SectionMain}
