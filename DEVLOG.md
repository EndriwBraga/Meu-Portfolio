## Depoimento de Eu para Eu // Pode pular!
⭐ 1.0
- O arquivo skillsAnimation.js foi simplificado para manter a funcionalidade essencial, priorizando a manutenção e futuras modificações.

- Optei por usar módulos JavaScript (arquivos .js separados) e classes para estudar mais sobre Orientação a Objetos (OOP). Um exemplo disso é o arquivo slide.js, que utilizou conceitos de herança, encapsulamento e um pouco de abstração.  

⭐ 2.0  
- O arquivo skillsAnimation.js foi refatorado para incorporar mais conceitos de OOP, alinhando-se com o restante do projeto, que foi projetado para seguir boas práticas de programação orientada a objetos.

🔄 Herança  
A classe SlideNav herda funcionalidades da classe Slide, reutilizando a lógica básica de navegação de slides e estendendo-a com funcionalidades específicas de navegação, como os controles de seta.

⭐ 2.0
🔄 Composição  
Optei por parar de usar herança no código e optei por usar composição, tornei o codigo menos dependente em caso de precisar escalar ele, tornei o código dessa maneira mais flexivel, mais facil para reutilizar, e o ficou mais simples, pois cada classe tem uma responsabilidade clara e não há uma cadeia de herança.

A principal diferença de herança e composição se dá no fato de **É um** e **Tem um**, por exemplo, em herança motor **é uma** peça de um carro, nesse caso herança é aplicado, no meu caso do slide, meu Slide **tem um** SlideNav, algo parecido com isso.  


🔒 Encapsulamento  
No arquivo Slide, detalhes sobre a movimentação, posição e transição dos slides são encapsulados dentro de métodos, evitando que o código externo manipule diretamente esses dados. O mesmo acontece no arquivo Animation: a manipulação do estado de cada cartão (cartoons) e a animação de seus movimentos são controladas internamente pelos métodos da classe SkillsAnimation.

🎭 Abstração  
No arquivo Slide, a complexidade da navegação dos slides (movimento, transições e controle de estados) é abstraída através de métodos como moveSlide(), transition(), e changeSlide(). Já no arquivo Animation, o comportamento da animação (movimento dos cartões) é abstraído pelo método animate(), onde a lógica de transformação é escondida dentro de uma única função que controla o movimento dos cartões para cima e para baixo sem expor os detalhes do cálculo do movimento.

## 📌 Coisas que Aprendi / Percebi ao Criar o slide.js
🔹 Removendo Event Listeners Corretamente
Quando usamos uma função anônima ou arrow function ao adicionar um ouvinte de evento (addEventListener), devemos removê-lo exatamente da mesma forma. Caso contrário, o navegador não conseguirá identificar corretamente o ouvinte e o evento permanecerá ativo.

❌ Erro Comum
Se adicionarmos o evento assim:

this.wrapper.addEventListener(movetype, (event) => this.onMove(event), { passive: true });
E tentarmos remover assim:

this.wrapper.removeEventListener(movetype, this.onMove);
Isso não funciona, porque estamos passando uma função diferente ao remover o evento.

✅ Forma Correta
A solução é garantir que usamos a mesma referência de função para adicionar e remover o evento. Podemos fazer isso armazenando a função em uma variável:

this.currentMoveHandler = (event) => this.onMove(event);
this.wrapper.addEventListener(movetype, this.currentMoveHandler, { passive: true });
E depois remover da mesma forma:

this.wrapper.removeEventListener(movetype, this.currentMoveHandler);
Dessa forma, evitamos eventos presos na memória e garantimos que o removeEventListener funcione corretamente. 

====================================================================================================================

Também aprendi sempre commitar oque estava fazendo, eu resolvi um bug e ele voltou 2 dias depois, e por nao ter comitado, tive que voltar modifação por modificação e depurar o codigo até entender aonde tava voltando o bug. 😭. Temos que amar o processo rsr!

====================================================================================================================


A mudança no ActiveNext e ActivePrev Slide para uma unica função segue um principio fundamental da programação **DRY (Don't Repeat Yourself)**. 



