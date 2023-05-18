import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  topWrapper: {
    display: 'flex',
    gap: '40px',
  },

  bottomWrapper: {
    display: 'flex',
    gap: '40px',
  },

  detailsWrapper: {
    width: '1016px',
    height: '555px',
    padding: '40px 30px',
  },

  featuresWrapper: {
    width: '524px',
    height: '555px',
    padding: '40px 30px',
  },

  bottomCardWrapper: {
    width: '380px',
    height: '336px',
    padding: '40px 30px',
  },

  bottomCardsWrapper: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.general,
    marginBottom: '20px',
  },
}))
