import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container-col">
      <Title className="landing-title">
        Controle Financeiro
      </Title>
      <Paragraph className="landing-paragraph">
        Controle seus gastos, veja seu historico de transações e muito mais.
      </Paragraph>
      <Button type="primary" size="large" onClick={() => navigate('/login')} className="btn-landing">
        Começar Agora
      </Button>
    </div>
  );
};
