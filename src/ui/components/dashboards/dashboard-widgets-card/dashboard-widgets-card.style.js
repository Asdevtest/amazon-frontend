import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles({
  cardWrapper: {
    padding: '0 80px',
  },
  sectionWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 326px)',
    gap: '20px',
  },

  bottomWidgetsWrapper: {
    display: 'flex',
    gap: '40px',
    marginTop: '35px',
  },
  cardListTitle: {
    fontSize: '20px',
    lineHeight: '27px',
    color: '#001029',
    fontWeight: 600,
  },
  cardListSubTitle: {
    color: '#656565',
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: '10px',
  },
  bottomRightSideTopWidgetsWrapper: {
    display: 'flex',
    gap: '30px',
  },
  bottomRightSideWidgetsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '35px',
  },
})
