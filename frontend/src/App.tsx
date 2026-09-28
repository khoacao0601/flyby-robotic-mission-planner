// Copyright (c) 2026 Khoa Cao. All rights reserved.

import { MapViewer } from './components/mapViewer';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
      <Header />
      <Sidebar />
      <MapViewer />
    </div>
  );
}

export default App;