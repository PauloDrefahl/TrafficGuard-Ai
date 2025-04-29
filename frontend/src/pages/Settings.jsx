import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

import CardHeader from '../components/CardHeader';
import UserLogin from '../components/UserLogin';
import ThemeCard from '../components/ThemeCard';
import ChangeRouter from '../components/ChangeRouter';
import ScrollBoxRouter from '../components/ScrollBoxRouter';
import { useRouter } from '../context/RouterContext';

function Settings() {
  const { routers, activeIndex, selectRouter, deleteRouter } = useRouter();

  return (
    <div className="container mt-2">
      <h7>Settings</h7>
      <div className="row px-5 move-up">
        <div className="col-md-4">
          <CardHeader HeaderText="User Login" />
          <UserLogin />
          <CardHeader HeaderText="Theme" className="mt-6" />
          <ThemeCard />
        </div>

        <div className="col-md-5">
          <CardHeader HeaderText="Change Router" />
          <ChangeRouter />

          <CardHeader HeaderText="Available Routers" className="mt-4" />
          <ScrollBoxRouter
            routers={routers}
            selectedIndex={activeIndex}
            onSelect={selectRouter}
            onDelete={deleteRouter}
          />
        </div>

        <div className="col-md-3">
          <CardHeader HeaderText="Accessibility" />
          {/* future settings */}
        </div>
      </div>
    </div>
  );
}

export default Settings;
