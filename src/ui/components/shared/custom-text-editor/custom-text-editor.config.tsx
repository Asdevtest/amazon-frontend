import { TCustomControl, TToolbarControl } from 'mui-rte'

import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'

import { useStyles } from './custom-text-editor.style'

import { TextAlign } from './text-align'

export const getCustomControls = (title?: string): TCustomControl[] => {
  const { classes: styles } = useStyles()

  const CustomOptionTitle = () => {
    return <p className={styles.title}>{title}</p>
  }

  return [
    {
      name: 'my-title',
      type: 'block',
      component: CustomOptionTitle,
    },
    {
      name: 'justifyLeft',
      icon: <FormatAlignLeftIcon />,
      type: 'block',
      blockWrapper: <TextAlign textAlign="start" />,
    },
    {
      name: 'justifyCenter',
      icon: <FormatAlignCenterIcon />,
      type: 'block',
      blockWrapper: <TextAlign textAlign="center" />,
    },

    {
      name: 'justifyRight',
      icon: <FormatAlignRightIcon />,
      type: 'block',
      blockWrapper: <TextAlign textAlign="end" />,
    },

    {
      name: 'justifyFull',
      icon: <FormatAlignJustifyIcon />,
      type: 'block',
      blockWrapper: <TextAlign textAlign="justify" />,
    },
  ]
}

export const getControls = (readOnly?: boolean): Array<TToolbarControl> =>
  readOnly
    ? []
    : [
        'my-title',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'numberList',
        'bulletList',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
      ]
