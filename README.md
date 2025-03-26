# MEU PORTFÓLIO

## Visão Geral
Este portfólio foi criado para praticar JavaScript, mas agora estou expandindo suas funcionalidades.  
[🔗 Meu Portfólio](https://meu-portfolio-ten-blond.vercel.app/)

![Imagem Inicial do Portfolio](assets/img/imgPortfolio.png/)

## Tecnologias Utilizadas  
🔶 HTML5  
🎨 SASS/SCSS
⚡ JavaScript (ES6+)

## 📂 Estrutura de Pastas
Explicação sobre a organização dos arquivos no projeto:

📂 assets/ → Contém ícones e imagens utilizadas no front-end.  
📂 css/ → Arquivo de estilização gerado pelo SCSS (style.css). 
📂 js/ → Contém os arquivos responsáveis por tornar o projeto interativo.  
📂 scss/ → Arquivos SCSS organizados em módulos.

## ⚙️ Instalação e Configuração  

Para configurar e executar o projeto localmente, siga os passos abaixo:   

1️⃣ Clone o repositório  

```git clone  https://github.com/EndriwBraga/Meu-Portfolio.git ```  
``` cd Meu-Portfolio ```    

2️⃣ Instale as dependências    
Execute o comando abaixo para instalar as dependências necessárias:    

```npm install```   

3️⃣ Compile os arquivos SCSS    

```npm run sass```   

Observação: O comando npm run sass utiliza a versão local do Sass instalada no projeto para compilar o arquivo scss/main.scss em css/style.css. Além disso, ele monitora automaticamente qualquer alteração nos arquivos SCSS, recompilando o CSS em tempo real.  

### Explicação SCSS // Iniciando a refatoração do CSS

/scss  
│── base/          # Reset, cores, tipografia  
│── components/    # Estilos de botões, inputs, cards  
│── layouts/       # Estilos de layout como header, footer, etc.  
│── pages/         # Estilos específicos de páginas  
│── utils/         # Mixins, variáveis, funções  
│── main.scss      # Arquivo principal que importa todos os arquivos  

A convenção de usar o underscore (_) no início dos nomes de arquivos SCSS (como _buttons.scss) tem um motivo importante relacionado à organização e compilação 
dos arquivos SCSS.

### 📜 Explicação detalhada do que cada modulo do JS faz.  

📄 darkMode.js → Responsável por detectar a preferência de cor (modo claro/escuro) do sistema e permitir que o usuário altere manualmente a cor da página.  
📄 debounce.js → Implementação do padrão debounce para limitar a frequência de chamadas a funções, utilizado em várias partes do projeto.  
📄 messagesStudies.js → Responsável pela troca dinâmica das mensagens ao passar o mouse sobre os cards do plano de estudo.  
📄 smoothScroll.js → Responsável pela implementação de scroll suave ao selecionar um link no menu de navegação.  
📄 script.js → Arquivo principal que inicializa e configura várias funcionalidades interativas no projeto. Para mais detalhes, consulte o próprio arquivo.  
📄 slide.js → Responsável pelo carrossel de slides na seção "Meus Projetos", permitindo navegação interativa através dos ícones dos projetos, com versão mobile inclusa. Este carrossel foi inspirado em uma aula do curso de JavaScript da Origamid.  
📄 skillsAnimation.js → Responsável pela animação das skills, movendo-as para cima e depois retornando à sua posição original. Utiliza requestAnimationFrame(), uma funcionalidade nativa do JavaScript, para melhorar a performance da animação.  

### ✨ Principais Funcionalidades   
✅ Modo escuro automático e manual     
✅ Carrossel interativo de projetos    
✅ Mensagens dinâmicas nos cards de estudo  
✅ Scroll suave para melhor navegação  
✅ Animação nas habilidades (Skills)  

### 🛠️ Próximos Passos

Adicionar testes automatizados.
Rever CEO
Arrumar responsividade

### 🏛️ Conceitos de Programação Aplicados

🔄 Herança  
A classe SlideNav herda funcionalidades da classe Slide, reutilizando a lógica básica e adicionando navegação por setas.   

🔒 Encapsulamento  
O código divide responsabilidades entre classes, evitando acesso direto a propriedades internas.  

🎭 Abstração  
Métodos como moveSlide() e transition() simplificam a lógica de movimentação dos slides.   

⚠️⚠️⚠️ Por algum motivo o target do botão não funciona no read.me, então melhor abrir em nova guia.  
<a href="https://meu-portfolio-ten-blond.vercel.app/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Acessar%20Portfólio-28a745?style=for-the-badge&logo=github&logoColor=white">
</a>
