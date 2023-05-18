export const styles = theme => ({
  control: {
    background: theme.palette.background.general,
    maxWidth: 500,
    maxHeight: 150,
    overflow: 'auto',
    padding: 3,
  },

  multiValue: {
    display: `flex`,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 5px',
    background: '#CCE2FF',
  },

  menu: {
    position: 'relative',
    background: theme.palette.background.general,
    boxShadow: `inset 0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
  },

  menuList: {
    transition: '.3s ease',
    overflowX: 'hidden',
    overflowY: 'auto',
  },

  option: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },

  multiValueLabel: {
    color: theme.palette.primary.main,
  },

  multiValueRemove: {
    color: '#001029',
  },

  input: {
    color: theme.palette.text.general,
  },

  hideDropdownIndicator: {
    display: 'none',
  },

  hideIndicatorSeparator: {
    display: 'none',
  },
})
