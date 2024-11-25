import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  deliveryParamsWrapper: {
    display: 'flex',
    gap: '10px',
  },

  deliveryCostsWrapper: {
    display: 'flex',
    gap: '5px',
  },

  supplierCourseWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}))
