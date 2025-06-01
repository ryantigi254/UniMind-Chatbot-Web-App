import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TermsPage from './pages/TermsPage';
import ChatPage from './pages/ChatPage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import JournalPage from './pages/JournalPage';
import ResourcesPage from './pages/ResourcesPage';
import SettingsPage from './pages/SettingsPage';
import InfoPage from './pages/InfoPage';
import DisclaimerModal from './components/DisclaimerModal';
import { useStore } from './store';

function App() {
  const { settings } = useStore((state) => ({
    settings: state.settings,
  }));

  const isDark = settings.darkMode;

  return (
    <div className={isDark ? 'dark' : ''}>
      <Router>
        <Routes>
          <Route path="/terms" element={<TermsPage />} />
          
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/chat" replace />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/mood" element={<MoodTrackerPage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/info" element={<InfoPage />} />
                  <Route path="*" element={<Navigate to="/chat" replace />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;