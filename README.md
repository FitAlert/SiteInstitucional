# 🌐 FitAlert – Site Institucional

Este é o repositório do site institucional da **FitAlert**, uma plataforma voltada para o monitoramento de fluxo de pessoas em provadores de roupa. O site serve como uma vitrine informativa, oferecendo funcionalidades como cadastro, login e uma calculadora financeira. O projeto está sendo desenvolvido por alunos da SPTECH e será integrado com banco de dados e captura dinâmica com sensor ultrassônico do arduíno.

---

## 📸 O site

<p align="center">
  <img src="images/demonstrcao.png" alt="Página inicial do FitAlert" width="1000"/>
</p>

## 📁 Estrutura de Arquivos

| Arquivo/ Pasta       | Descrição |
|----------------------|-----------|
| `index.html`         | Página principal com informações sobre a FitAlert. |
| `cadastroP.html`     | Tela de cadastro para novos usuários. |
| `loginP.html`        | Tela de autenticação (login). |
| `calculadora.html`   | Página com calculadora de IMC. |
| `styles/`            | Contém os arquivos CSS utilizados no site. |
| `imgs/`              | Contém logotipos e imagens utilizadas nas páginas. |

---
## Arquitetura de Pastas
```
site-institucional/
    ├── public/
    │   ├── assets/
    │   │   ├── images/            # Imagens e logos do site
    │   │   │   └── demonstracao.png
    |   |   |   |__ logos               # Pasta contendo as logos
    |   |   |   |__ sessaoComoFunciona  # Pasta com imagens de uma sessão
    |   |   |   |__ ...                 # Outras pastas de imagens
    │   │   ├── css/              # Arquivos de estilo
    │   │   │   ├── style.css     # Estilos globais
    │   │   │   ├── login.css     # Estilos da página de login
    │   │   │   ├── cadastro.css  # Estilos da página de cadastro
    │   │   │   └── calculator.css # Estilos da calculadora
    │   │   └── js/               # Scripts JavaScript
    │   │       ├── login.js      # Lógica do login
    │   │       ├── cadastro.js   # Lógica do cadastro
    │   │       └── calculator.js  # Lógica da calculadora
    │   │
    │   └── pages/                # Páginas do site
    │       ├── login.html        # Página de login
    │       ├── cadastro.html     # Página de cadastro
    │       └── calculator.html   # Página da calculadora
    │
    ├── src/                      # Código fonte
    │   ├── database/             # Conexão com banco de dados
    │   │   └── connection.js
    │   └── utils/               # Utilitários
    │       └── validators.js    # Validações de formulários
    │
    ├── index.html              # Página inicial
    ├── README.md              # Documentação do projeto
    └── .gitignore            # Arquivos ignorados pelo git
```

## 🚀 Funcionalidades

- ✅ Apresentação da proposta da plataforma FitAlert.
- ✅ Cadastro de novos usuários.
- ✅ Login para usuários já registrados.
- ✅ Calculadora financeira para o cliente entender o valor que nosso projeto agrega a empresa dele.

---

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- Sem dependência de frameworks ou bibliotecas externas

---

## 📦 Como utilizar

Você pode clonar este repositório e abrir os arquivos diretamente no navegador.

```bash
git clone https://github.com/FitAlert/SiteInstitucional.git
