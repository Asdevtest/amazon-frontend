import React from 'react'

import {Collapse, List, ListItemText} from '@material-ui/core'
import clsx from 'clsx'
import {Link} from 'react-router-dom'

import {NavbarSubCategory} from '../navbar-sub-category'
import {useClassNames} from './navbar-collapse.style'

export const NavbarCollapse = ({activeCategory, activeSubCategory, category, index, onChangeSubCategory}) => {
  const classNames = useClassNames()

  const onClickCategory = subIndex => {
    onChangeSubCategory && onChangeSubCategory(subIndex)
  }

  return (
    <Collapse in={index === activeCategory}>
      <List disablePadding>
        {category.subtitles?.map((subCategory, subIndex) => (
          <NavbarSubCategory
            key={subIndex}
            button
            disableGutters
            component={Link}
            selected={subIndex === activeSubCategory}
            to={subCategory.subRoute}
            onClick={() => onClickCategory(subIndex)}
          >
            <ListItemText
              disableTypography
              className={clsx(classNames.listItemText, {[classNames.selected]: subIndex === activeSubCategory})}
              primary={subCategory.subtitle}
            />
          </NavbarSubCategory>
        ))}
      </List>
    </Collapse>
  )
}
