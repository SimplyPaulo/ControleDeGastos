import { Card, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../components/UserForm';

const { Title, Text } = Typography;

export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <Card className="auth-card" bordered={false}>
        <div style={{ textAlign: 'center', margin: '16px 0 32px' }}>
          <Title level={1} className="auth-title">Criar Conta</Title>
          <Text type="secondary" className="auth-subtitle">Cadastre seu nome e idade para acessar</Text>
        </div>

        <UserForm />

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Button type="link" onClick={() => navigate('/login')}>
            Já tem um perfil? Voltar para o Login
          </Button>
        </div>
      </Card>
    </div>
  );
};
