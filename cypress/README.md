# Cypress Tests Documentation

Esta documentação descreve os testes automatizados criados para a aplicação Vue.js de controle de presença biométrica.

## 📋 Visão Geral

O projeto utiliza Cypress para testes end-to-end (E2E) e de componentes, garantindo a qualidade e funcionalidade da aplicação.

## 🏗️ Estrutura dos Testes

### Testes de Componente
- **Localização**: `src/App.cy.js`
- **Propósito**: Testar componentes Vue isoladamente
- **Framework**: Cypress Component Testing com Vue 3 + Vite

### Testes E2E
- **Localização**: `cypress/e2e/site.cy.js`
- **Propósito**: Testar fluxos completos da aplicação
- **Cobertura**: Navegação, formulários, filtros e interações

## 🚀 Como Executar os Testes

### Pré-requisitos
- Node.js >= 20.19.0
- npm >= 9
- Servidor de desenvolvimento rodando (`npm run dev`)

### Comandos Disponíveis

```bash
# Executar todos os testes E2E
npm run test:e2e

# Executar apenas testes de componente
npm run test:component

# Abrir interface gráfica do Cypress
npx cypress open
```

## 📝 Descrição dos Testes

### Testes E2E (`site.cy.js`)

#### 1. `should load the home page and show registrar presença`
- **Objetivo**: Verificar carregamento da página inicial
- **Ações**: Visita `/`, verifica redirecionamento para `/registrar-presenca`
- **Verificações**:
  - Presença do título "Leitor Biométrico"
  - Botão "Capturar digital do aluno" visível

#### 2. `should navigate to dashboard`
- **Objetivo**: Testar navegação para dashboard
- **Ações**: Visita `/dashboard` diretamente
- **Verificações**: URL correta

#### 3. `should navigate to login`
- **Objetivo**: Testar navegação para página de login
- **Ações**: Visita `/login` diretamente
- **Verificações**: URL correta

#### 4. `should redirect root to registrar-presenca`
- **Objetivo**: Verificar redirecionamento automático
- **Ações**: Visita `/`
- **Verificações**: Redirecionamento para `/registrar-presenca`

#### 5. `should show login button`
- **Objetivo**: Verificar presença do botão de login
- **Ações**: Verifica elemento na página
- **Verificações**: Botão "Fazer Login" visível

#### 6. `should show biometric scanner section`
- **Objetivo**: Verificar seção do scanner biométrico
- **Ações**: Verifica elementos da seção Scanner
- **Verificações**:
  - Título "Scanner" visível
  - Imagem da impressão digital presente

#### 7. `should display login form correctly`
- **Objetivo**: Verificar formulário de login
- **Ações**: Visita `/login`
- **Verificações**:
  - Título "Administração de presença"
  - Campos de email e senha presentes
  - Botão "Entrar" visível

#### 8. `should show registrar presença button on login page`
- **Objetivo**: Verificar botão de navegação na página de login
- **Ações**: Visita `/login`
- **Verificações**: Botão "Registrar Presença" visível

#### 9. `should display dashboard with student list`
- **Objetivo**: Verificar página do dashboard
- **Ações**: Visita `/dashboard`
- **Verificações**:
  - Título "Lista de Presença"
  - Disciplina "Projeto em computação"
  - Campo de busca presente
  - Botão "Export CSV" visível

#### 10. `should filter students by search query`
- **Objetivo**: Testar funcionalidade de busca
- **Ações**:
  - Visita `/dashboard`
  - Digita "Anthony" no campo de busca
- **Verificações**:
  - Aluno "Anthony Vinicius de Brito Barros" visível
  - Outros alunos não visíveis

#### 11. `should filter students by status`
- **Objetivo**: Testar filtros por status
- **Ações**:
  - Visita `/dashboard`
  - Clica em "Status: All"
  - Seleciona "Presente"
- **Verificações**: Apenas alunos com status "Presente" visíveis

#### 12. `should navigate from registrar-presenca to login`
- **Objetivo**: Testar navegação via botão
- **Ações**:
  - Clica em "Fazer Login"
- **Verificações**: Redirecionamento para `/login`

#### 13. `should navigate from login to registrar-presenca`
- **Objetivo**: Testar navegação reversa
- **Ações**:
  - Visita `/login`
  - Clica em "Registrar Presença"
- **Verificações**: Redirecionamento para `/registrar-presenca`

### Testes de Componente (`App.cy.js`)

#### 1. `playground`
- **Objetivo**: Teste básico de montagem do componente App
- **Ações**: Monta o componente App com router
- **Verificações**: Componente renderiza sem erros

## 🔧 Configuração Técnica

### `cypress.config.js`
```javascript
export default defineConfig({
  projectId: 'b2siei',
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
```

### `package.json` Scripts
```json
{
  "scripts": {
    "test:e2e": "cypress run --e2e",
    "test:component": "cypress run --component"
  }
}
```

## 📊 Cobertura de Testes

### Funcionalidades Testadas
- ✅ Navegação entre páginas
- ✅ Redirecionamentos automáticos
- ✅ Presença de elementos visuais
- ✅ Formulários e campos de entrada
- ✅ Funcionalidades de busca e filtro
- ✅ Botões e interações básicas
- ✅ Montagem de componentes Vue

### Funcionalidades Não Testadas
- ❌ Submissão de formulários (login real)
- ❌ Captura biométrica (requer hardware/API)
- ❌ Notificações dinâmicas
- ❌ Export CSV
- ❌ Responsividade mobile
- ❌ Estados de erro da API

## 🐛 Tratamento de Erros

### Problemas Conhecidos
1. **Servidor não iniciado**: Testes E2E falham se `npm run dev` não estiver rodando
2. **Timeouts**: Alguns testes podem falhar em conexões lentas

### Soluções
- Sempre execute `npm run dev` antes dos testes E2E
- Ajuste timeouts no `cypress.config.js` se necessário

## 📈 Melhorias Futuras

### Testes Adicionais Sugeridos
1. **Testes de API**: Mock das chamadas para `/alunos`
2. **Testes de Login**: Fluxo completo de autenticação
3. **Testes de Responsividade**: Diferentes tamanhos de tela
4. **Testes de Performance**: Tempos de carregamento
5. **Testes de Acessibilidade**: Conformidade WCAG

### Melhorias na Estrutura
1. **Page Objects**: Para melhor organização dos seletores
2. **Custom Commands**: Para ações repetitivas
3. **Fixtures**: Para dados de teste mockados
4. **CI/CD**: Integração com pipelines de deploy

## 📚 Recursos Adicionais

- [Documentação Cypress](https://docs.cypress.io/)
- [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/introduction)
- [Vue Testing com Cypress](https://docs.cypress.io/guides/component-testing/vue/overview)

---

**Última atualização**: Janeiro 2025
**Versão Cypress**: 15.5.0
**Cobertura**: Navegação, UI básica, filtros
