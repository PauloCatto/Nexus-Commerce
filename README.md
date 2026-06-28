# 🪐 Nexus Commerce | Arquitetura E-Commerce de Elite

**Demo ao vivo:** [https://nexus-commerce-beta.vercel.app/](https://nexus-commerce-beta.vercel.app/)

O Nexus Commerce é uma plataforma web avançada e de alto desempenho construída com **Angular 18**. A plataforma implementa uma arquitetura moderna de `standalone-components`, com foco em gerenciamento de estado robusto, estética de UI premium e fluxos de usuário sem fricção.

---

## 🎯 Visão Geral da Arquitetura

* **Interações de Baixa Latência:** Integração profunda com `NgZone` e estratégias reativas do Angular (RxJS) para garantir atualizações de estado instantâneas, contornando quedas comuns no event-loop do navegador.
* **Identidade e Auth com Firebase:** Sistema de autenticação seguro e robusto com vinculação dinâmica. Tooltips customizados tratam erros explícitos de `invalid-credential` com precisão durante operações assíncronas.
* **UI Premium com Glassmorphism:** Micro-animações sofisticadas configuradas via SCSS estritamente modular, para alto apelo visual sem penalidades de performance.

### ⚙️ Módulos Principais
- `Core`: Serviços e Gerenciadores de Estado
- `Features`: Fluxos de Login, lógica do Carrinho de Produtos, Identidade do Usuário
- `Shared/UI`: Elementos de layout standalone reutilizáveis

---

## 🛠️ Stack Tecnológico

| Sistema | Tecnologia | Função |
| :--- | :--- | :--- |
| **Framework** | Angular 18 | `standalone: true`, RxJS |
| **Autenticação** | Firebase / GoTrue | Identidade e Auth com JWT |
| **Estilização** | SCSS | Glassmorphism, CSS Grid Responsivo |
| **Transferência de Dados** | Fetch / Observables | Manipulação de streams |

---

## 🔥 Como Executar

Rode a plataforma localmente:

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor local
npm start
```
*Aguarde o compilador fazer o bundle. A aplicação estará disponível em `http://localhost:4200/`.*

---

*Desenvolvido com 💡 e mecânicas modernas da web para máxima experiência do usuário.*
