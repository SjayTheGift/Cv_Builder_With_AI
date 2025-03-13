// Layout.js
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation'

const Layout = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default Layout;