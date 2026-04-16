import { useState, useEffect } from 'react';
import { Card, Select, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../services';
import type { User } from '../types';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

export const LoginPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUser();
      setUsers(data);
    } catch {
      message.error('Erro ao carregar os perfis');
    }
  };

  const handleLogin = () => {
    if (!selectedUserId) {
      message.error('Selecione um usuário para continuar!');
      return;
    }
    
    setLoading(true);
    const selectedUser = users.find(u => u.id === selectedUserId);
    
    if (selectedUser) {
      setTimeout(() => {
        login(selectedUser);
        navigate('/app/dashboard');
      }, 800);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card" bordered={false}>
        <div style={{ textAlign: 'center', margin: '16px 0 32px' }}>
          <Title level={1} className="auth-title">
            Acessar Sistema
          </Title>
          <Text type="secondary" className="auth-subtitle">Selecione o seu perfil para visualizar os painéis</Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <Text strong>Quem está acessando?</Text>
            <Select
              style={{ width: '100%', marginTop: '8px' }}
              size="large"
              placeholder="Selecione seu nome"
              onChange={(value) => setSelectedUserId(value)}
              options={users.map(u => ({ value: u.id, label: u.name }))}
            />
          </div>

          <Button type="primary" size="large" onClick={handleLogin} loading={loading} block className="btn-large-block">
            Entrar no Painel
          </Button>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Text type="secondary" style={{ fontSize: '13px', display: 'block', marginBottom: '8px' }}>
              Novo pro aqui?
            </Text>
            <Button type="dashed" onClick={() => navigate('/register')} style={{ borderRadius: '8px' }}>
              Criar Novo Perfil
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
