import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  DashboardOutlined,
  UserOutlined,
  TagsOutlined,
  DollarOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e: any) => {
    navigate(e.key);
  };

  const menuItems = [
    {
      key: '/app/dashboard',
      icon: <DashboardOutlined />,
      label: 'Resumo e Totais',
    },
    {
      key: '/app/transactions/new',
      icon: <DollarOutlined />,
      label: 'Lançar Transação',
    },
    {
      key: '/app/transactions/history',
      icon: <UnorderedListOutlined />,
      label: 'Histórico de Transações',
    },
    {
      key: '/app/users',
      icon: <UserOutlined />,
      label: 'Cadastro de Usuários',
    },
    {
      key: '/app/categories',
      icon: <TagsOutlined />,
      label: 'Cadastro de Categorias',
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout className="layout-root">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <div className="sidebar-logo" style={{ fontSize: collapsed ? '12px' : '18px' }}>
          {collapsed ? 'CF' : 'Controle Financeiro'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={menuItems}
        />
      </Sider>
      <Layout className="layout-main">
        <Header className="layout-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="header-actions">
            <span>Olá, <b>{user?.name}</b></span>
            <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </Header>
        <Content className="layout-content" style={{ borderRadius: borderRadiusLG }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
