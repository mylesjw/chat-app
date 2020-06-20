import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: lightgray;
`;

const NavItemGroup = styled.ul`
  max-width: 1000px;
  margin: auto;
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
`;

const NavItem = styled.li`
  padding: 8px 12px;

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    color: darkgray;
  }
`;

export {
  NavContainer,
  NavItemGroup,
  NavItem
}