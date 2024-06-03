import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '650px',
    padding: 10,
    paddingBottom: 0,
  },

  mainTitle: {
    fontSize: 18,
    lineHeight: '25px',
    marginBottom: 15,
  },

  standartText: {
    color: theme.palette.text.general,
  },

  listSubheader: {
    color: theme.palette.text.general,
    backgroundColor: theme.palette.background.second,
  },

  multiline: {
    width: '100%',
    minHeight: '100px',
  },

  descriptionField: {
    height: '100px',
    width: '100%',
    overflowY: 'hidden',
  },

  allowPermissions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    border: '1px solid rgba(0,0,0,.3)',
    borderRadius: '10px',
    padding: '5px',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: 30,
    justifyContent: 'flex-end',
    position: 'sticky',
    bottom: 0,
    paddingBlock: 5,
    backgroundColor: theme.palette.background.general,
  },

  permissionSelect: {
    maxWidth: '200px',

    color: theme.palette.text.general,
  },

  permissionsSubTitle: {
    fontWeight: 'bold',
    fontSize: '16px',

    color: theme.palette.text.second,
  },

  selectWrapper: {
    display: 'flex',
    alignItems: 'center',

    gap: '10px',
  },

  selectChoose: {
    fontSize: '26px',
    color: theme.palette.text.general,
  },

  singlePermission: {
    fontSize: '18px',
    lineHeight: '1.5',
    color: 'rgba(0, 123, 255, 1)',
  },

  newSinglePermissionWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  selectModalBtnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10,
    position: 'sticky',
    bottom: '0',
    right: '0',
    zIndex: 7,
  },

  fieldLabel: {
    fontSize: 14,
    lineHeight: '19px',
    marginBottom: 5,
  },

  permissionInfoWrapper: {
    maxHeight: 200,
    overflowY: 'auto',
  },
}))
