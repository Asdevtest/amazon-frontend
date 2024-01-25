import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  sectionWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 326px)',
    gap: '20px',
  },

  bottomWidgetsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '35px',
    padding: '0 86px',
  },
  cardListTitle: {
    fontSize: '18px',
    lineHeight: '27px',
    color: theme.palette.text.general,
    fontWeight: 600,
  },
  cardListSubTitle: {
    color: theme.palette.text.second,
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
}))
