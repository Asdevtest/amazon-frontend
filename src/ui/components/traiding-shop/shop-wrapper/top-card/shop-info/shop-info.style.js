import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  photosWrapper: {
    height: '211px',
  },

  shopInfoTopWrapper: {
    display: 'grid',
    gridTemplateColumns: '333px 1fr',
    gap: '30px',
  },

  statusWrapper: {
    display: 'flex',
    gap: '10px',
  },

  rightSideWrapper: {
    width: '100%',
    height: '261px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  rightSideHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  shopTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  shortInfoValue: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  shortInfoLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  shortInfoWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '20px',
  },

  editButton: {
    width: '220px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 400,
  },
  deleteButton: {
    width: '258px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 400,
  },

  link: {
    padding: '5px 20px',
    border: '1px solid #006CFF',
  },

  chartLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 400,
    color: theme.palette.text.second,
  },

  chart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  chartsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '60px',
  },
  profit: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.general,
    marginBottom: '5px',
  },

  profitability: {
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: '600',
    color: theme.palette.text.general,
    marginBottom: '20px',
  },
}))
