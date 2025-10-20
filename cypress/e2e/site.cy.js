describe('Site E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the home page and show registrar presença', () => {
    cy.url().should('include', '/registrar-presenca')
    cy.contains('Leitor Biométrico').should('be.visible')
    cy.contains('Capturar digital do aluno').should('be.visible')
  })

  it('should navigate to dashboard', () => {
    cy.visit('/dashboard')
    cy.url().should('include', '/dashboard')
  })

  it('should navigate to login', () => {
    cy.visit('/login')
    cy.url().should('include', '/login')
  })

  it('should redirect root to registrar-presenca', () => {
    cy.visit('/')
    cy.url().should('include', '/registrar-presenca')
  })

  it('should show login button', () => {
    cy.contains('Fazer Login').should('be.visible')
  })

  it('should show biometric scanner section', () => {
    cy.contains('Scanner').should('be.visible')
    cy.get('img[alt="Impressão Digital"]').should('be.visible')
  })

  it('should display login form correctly', () => {
    cy.visit('/login')
    cy.contains('Administração de presença').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.contains('Entrar').should('be.visible')
  })

  it('should show registrar presença button on login page', () => {
    cy.visit('/login')
    cy.contains('Registrar Presença').should('be.visible')
  })

  it('should display dashboard with student list', () => {
    cy.visit('/dashboard')
    cy.contains('Lista de Presença').should('be.visible')
    cy.contains('Projeto em computação').should('be.visible')
    cy.get('input[placeholder="Pesquisar por aluno"]').should('be.visible')
    cy.contains('Export CSV').should('be.visible')
  })

  it('should filter students by search query', () => {
    cy.visit('/dashboard')
    cy.get('input[placeholder="Pesquisar por aluno"]').type('Anthony')
    cy.contains('Anthony Vinicius de Brito Barros').should('be.visible')
    cy.contains('Vinicíus José de Arruda').should('not.exist')
  })

  it('should filter students by status', () => {
    cy.visit('/dashboard')
    cy.contains('Status: All').click()
    cy.contains('Presente').click()
    cy.get('tbody tr').should('have.length.greaterThan', 0)
    cy.contains('Falta').should('not.exist')
  })

  it('should navigate from registrar-presenca to login', () => {
    cy.contains('Fazer Login').click()
    cy.url().should('include', '/login')
  })

  it('should navigate from login to registrar-presenca', () => {
    cy.visit('/login')
    cy.contains('Registrar Presença').click()
    cy.url().should('include', '/registrar-presenca')
  })
})
