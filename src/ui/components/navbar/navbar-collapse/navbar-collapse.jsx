import React from 'react'

import {Collapse, List, ListItemText} from '@material-ui/core'
import clsx from 'clsx'
import {Link} from 'react-router-dom'

import {NavbarSubCategory} from '../navbar-sub-category'
import {useClassNames} from './navbar-collapse.style'

export const NavbarCollapse = ({activeCategory, activeSubCategory, category, index}) => {
  const classNames = useClassNames()

  return (
    <Collapse in={index === activeCategory}>
      <List disablePadding>
        {category.subtitles?.map((subCategory, subIndex) => (
          <NavbarSubCategory
            button
            component={Link}
            disableGutters
            key={subIndex}
            selected={subIndex === activeSubCategory}
            to={subCategory.subRoute}
          >
            <ListItemText
              className={clsx({[classNames.selected]: subIndex === activeSubCategory})}
              disableTypography
              primary={subCategory.subtitle}
            />
          </NavbarSubCategory>
        ))}
      </List>
    </Collapse>
  )
}
