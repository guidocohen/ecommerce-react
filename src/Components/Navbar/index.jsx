import { useContext } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { navItems1, navItems2 } from './navItems';
import { ShoppingCartContext } from '../../Context';
import NavItem from './NavItem';

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = 'underline underline-offset-4';

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
              {
                text
                // {link.to === '/cart' ? `${link.text} ${context.Count}` : link.text}
              }
            </NavItem>
          </li>
        ))}
        <li className="flex items-center">
          <ShoppingBagIcon className="h-6 w-6 text-black" />
          <div className="pl-1">{context.count}</div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
