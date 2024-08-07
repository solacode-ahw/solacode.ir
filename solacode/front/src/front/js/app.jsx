import React, { useReducer } from "react";
import { Outlet } from "react-router-dom";

import Footer from "./components/footer";

import { SettingsContext, settingsReducer } from "./utils/context";


function App() {

  const [settings, updateSettings] = useReducer(settingsReducer,{
    theme: 'light',
    lang: 'fa',
  });

  return (
    <SettingsContext.Provider value={settings}><>
      <header>
        <img src="/assets/front/img/logo.png" />
      </header>
      <Outlet />
      <Footer onChangeSettings={updateSettings} />
    </></SettingsContext.Provider>
  );
}

export default App;