import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import React, {useState} from 'react'

import {TextareaAutosize, Paper, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Field} from '@components/field/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './custom-request-details.style'

const textConsts = getLocalizedTexts(texts, 'en').productSearchRequestContent

export const CustomSearchRequestDetails = ({request}) => {
  const classNames = useClassNames()

  const [showDetails, setShowDetails] = useState(false)

  return (
    <Paper className={classNames.root}>
      <Accordion
        classes={{root: classNames.accordion}}
        expanded={showDetails}
        onChange={() => setShowDetails(!showDetails)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classNames.title}>{'Подробное описание заявки'}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div className={classNames.mainWrapper}>
            <Field
              multiline
              label={textConsts.conditionsRequest}
              containerClasses={classNames.conditionsFieldWrapper}
              inputComponent={
                <TextareaAutosize
                  disabled
                  className={classNames.conditionsField}
                  value={request?.details?.conditions}
                />
              }
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </Paper>
  )
}
