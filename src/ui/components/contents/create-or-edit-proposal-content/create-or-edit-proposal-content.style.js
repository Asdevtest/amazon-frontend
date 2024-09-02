import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
    height: '86vh',
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 30,
    padding: 20,
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    borderRadius: 20,
  },

  adviceWrapper: {
    width: '25%',
  },

  adviceTitle: {
    marginBottom: 10,
    fontSize: 25,
    lineHeight: '35px',
    fontWeight: 600,
  },

  adviceListItem: {
    padding: 0,
  },

  listItemDot: {
    width: '8px !important',
    color: theme.palette.text.primary,
  },

  adviceListItemText: {
    marginLeft: 20,
  },

  trainingTextWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 30,
    marginTop: 20,
  },

  trainingText: {
    color: theme.palette.text.second,
  },

  trainingLink: {
    margin: '0 5px',
  },

  mainLeftWrapper: {
    width: '35%',
  },

  clientInfo: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  userPhoto: {
    width: 50,
    height: 50,
  },

  subTitle: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  infoBlockWrapper: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 20,
  },

  infoCellWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  requestTitleName: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  requestTitle: {
    wordBreak: 'break-word',
  },

  editorWrapper: {
    marginTop: 10,
    marginBottom: 20,
    height: 250,
  },

  editor: {
    maxHeight: 250,
  },

  pricesWrapper: {
    display: 'flex',
    gap: 5,
  },

  newPrice: {
    color: '#FB1D5B',
  },

  oldPrice: {
    textDecoration: 'line-through',
  },

  mainRightWrapper: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
  },

  spanLabel: {
    marginBottom: 10,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  descriptionWrapper: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    gap: 5,
  },

  descriptionField: {
    height: '100%',
    width: '100%',
  },

  descriptionConrainer: {
    margin: 0,
  },

  inputTitleWrapper: {
    display: 'flex',
    gap: 5,
  },

  imageFileInputTitle: {
    fontSize: 14,
    lineHeight: '19px',
  },

  proposalContainer: {
    display: 'flex',
    gap: 20,
  },

  titleStyle: {
    marginBottom: 10,
  },

  footerWrapper: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
  },
}))
