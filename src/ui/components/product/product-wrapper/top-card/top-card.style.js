import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainCardWrapper: {
    padding: '16px',
    marginBottom: '24px',
    backgroundColor: theme.palette.background.general,
    borderRadius: 10,
  },

  carouselWrapper: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center',
  },

  imageFileInputWrapper: {
    width: '100%',
  },

  actionsWrapper: {
    width: '100%',
    display: 'flex',
    marginBottom: '16px',
  },

  mainCard: {
    width: '48%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  topPartCardWrapper: {
    width: '100%',
    display: 'flex',
    gap: 30,
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
    },
  },

  variationWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  variationText: {
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.text.second,
  },

  variationIcon: {
    width: '24px !important',
    height: '24px !important',
    color: theme.palette.text.second,
  },

  parentVariation: {
    color: theme.palette.primary.main,
  },
}))
