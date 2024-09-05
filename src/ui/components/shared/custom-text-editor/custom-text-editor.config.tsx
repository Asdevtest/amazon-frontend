import { TCustomControl, TToolbarControl } from 'mui-rte'
import { MdFormatAlignCenter, MdFormatAlignJustify, MdFormatAlignLeft, MdFormatAlignRight } from 'react-icons/md'

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
      icon: <MdFormatAlignLeft size={20} />,
      type: 'block',
      blockWrapper: <TextAlign textAlign="start" />,
    },
    {
      name: 'justifyCenter',
      icon: <MdFormatAlignCenter size={22} />,
      type: 'block',
      blockWrapper: <TextAlign textAlign="center" />,
    },

    {
      name: 'justifyRight',
      icon: <MdFormatAlignRight size={22} />,
      type: 'block',
      blockWrapper: <TextAlign textAlign="end" />,
    },

    {
      name: 'justifyFull',
      icon: <MdFormatAlignJustify size={22} />,
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
