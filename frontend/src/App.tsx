import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'antd/dist/reset.css';
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import { RequireAuth } from './components/RequireAuth';
import { MainLayout } from './layouts/MainLayout';
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  UsersPage,
  CategoriesPage,
  NewTransactionPage,
  HistoryPage
} from './pages';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ConfigProvider 
      theme={{ 
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: { 
          colorPrimary: '#4f46e5',
          fontFamily: "'Inter', sans-serif" 
        }
      }}
    >
      <AuthProvider>
        <AntdApp>
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rotas Protegidas (Dashboard) */}
            <Route path="/app" element={<RequireAuth />}>
              <Route element={<MainLayout />}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="transactions/new" element={<NewTransactionPage />} />
                <Route path="transactions/history" element={<HistoryPage />} />
              </Route>
            </Route>

           
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AntdApp>
    </AuthProvider>
    </ConfigProvider>
  );
}

export default App;