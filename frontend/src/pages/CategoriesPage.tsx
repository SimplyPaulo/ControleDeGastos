import { CategoryForm } from '../components/CategoryForm';

export const CategoriesPage = () => {
  return (
    <div className="page-container-sm">
      <h2 className="panel-title">Cadastro de Categorias</h2>
      <p className="page-description">Defina se a etiqueta é exclusiva de Despesa, Receita ou Ambas.</p>
      <div className="form-panel panel-padded">
        <CategoryForm />
      </div>
    </div>
  );
};
