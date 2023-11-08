import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(() => ({
  smallRowImgWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  img: {
    height: '58px',
    width: '58px',
    marginRight: '16px',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '4px',
    border: `1px solid #E0E0E0`,
  },
}))
