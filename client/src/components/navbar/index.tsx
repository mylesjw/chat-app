import * as React from 'react';
import {
  NavContainer,
  NavItemGroup,
  NavItem
} from './styles'

export default function Navbar() {
  const navItems = [
    {name: 'home', url: '/'},
    {name: 'about', url: '/about'},
  ]


  return (
    <NavContainer className="container">
      <NavItemGroup>
        {navItems.map(item => (
          <NavItem>
            <a href={item.url}>{item.name}</a>
          </NavItem>
        ))}
      </NavItemGroup>
    </NavContainer>
  )
}