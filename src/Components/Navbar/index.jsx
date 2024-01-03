import { useContext } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { navItems1, navItems2 } from './navItems';
import { ShoppingCartContext } from '../../Context';
import NavItem from './NavItem';

const Navbar = () => {
  const {
    count,
    toggleCheckoutSideMenu,
    isCheckoutSideMenuOpen,
    isProductDetailOpen,
    toggleProductDetail,
  } = useContext(ShoppingCartContext);
  const activeStyle = 'underline underline-offset-4';

  const openCheckoutSideMenu = () => {
    isProductDetailOpen && toggleProductDetail();
    !isCheckoutSideMenuOpen && toggleCheckoutSideMenu();
  };

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        {navItems1.map(({ text, to, className }) => (
          <li key={text} className={className}>
            <NavItem to={to} activeStyle={activeStyle}>
              {text}
            </NavItem>
          </li>
        ))}
      </ul>
      <ul className="flex gap-3 items-center">
        <li className="text-black/60">guidocohens@gmail.com</li>
        {navItems2.map(({ text, to, className }) => (
          <li key={text} className={className}>
            <NavItem to={to} activeStyle={activeStyle}>
              {text}
            </NavItem>
          </li>
        ))}
        <li onClick={openCheckoutSideMenu} className="flex items-center">
          <ShoppingCartIcon className="h-6 w-6 text-black" />
          <div className="pb-3">{count}</div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
