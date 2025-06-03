# Visualização Interativa de Clusters K-means 🎨

## Projeto de Engenharia de Software

> **Alunos:**
> - Rodrigo Shodi Sumioshi - 220141912
> - Natanael Figueredo Balbo - 220141852
> - Vinicius Luiz Santa Rosa - 240421212

---

## O que é K-means? 🤔

Imagine uma festa cheia de pessoas. Naturalmente, elas vão formando "rodinhas" de conversa com quem tem interesses parecidos: futebol, música, games... Cada rodinha é um **cluster**! O algoritmo K-means faz exatamente isso: agrupa dados semelhantes em grupos (clusters) automaticamente.

- **Pontos** = Pessoas na festa
- **Clusters** = Rodinhas de conversa
- **Centroide** = O "coração" de cada grupo (a mesa principal)

---

## Como funciona a aplicação? 🖥️

### 1. Adicionando Pontos
- Clique no plano cartesiano para adicionar pontos (bolinhas de gude no chão!)
- Cada ponto é um dado que será agrupado

### 2. Ajustando Grupos
- Use os botões + e - para escolher quantos grupos (rodinhas) você quer
- De 2 a 8 grupos

### 3. Agrupando
- Clique em "Agrupar Pontos" para ver a mágica acontecer
- Os pontos se organizam automaticamente em grupos coloridos
- O círculo maior é o centroide (a mesa principal do grupo)

### 4. Clusters Dinâmicos
- Se um grupo ficar muito disperso, a aplicação cria uma nova rodinha automaticamente!
- Isso simula quando, numa festa, um grupo se divide porque alguns querem falar de outro assunto

### 5. Dados Categóricos e KNN
- Você pode adicionar um valor de texto (ex: "Azul", "Cliente A")
- O sistema converte esse texto em número, pronto para algoritmos como o KNN
- Exemplo: "Ação" vira 1, "Comédia" vira 2, etc.

---

## Analogia Visual 🎉

- **Cores**: Cada cor é um time diferente
- **Círculo grande (⭕)**: Capitão do time (centroide)
- **Círculo pequeno (●)**: Jogador do time (ponto)
- **Áreas coloridas**: Região de influência de cada grupo

---

## Exemplos do dia a dia
- Spotify: Agrupa pessoas com gosto musical parecido
- Netflix: Sugere filmes baseando-se em grupos de usuários
- Lojas: Segmenta clientes por comportamento de compra

---

## Como usar? 🚀

1. **Clique no plano** para adicionar pontos
2. **Ajuste o número de grupos** com + e -
3. **Clique em "Agrupar Pontos"** para ver os clusters
4. **Adicione valores categóricos** para ver a conversão para números
5. **Ajuste o limiar de dispersão** para ver grupos se dividindo automaticamente
6. **Limpe tudo** com o botão de lixeira para recomeçar

---

## Tecnologias Utilizadas
- React + TypeScript
- Tailwind CSS
- Canvas API
- Lucide React (ícones)

---

## Dicas para estudar e aprender 🧠
- Experimente criar padrões diferentes de pontos
- Veja como os grupos mudam ao ajustar o número de clusters
- Teste valores categóricos e veja como seriam usados em Machine Learning
- Use as analogias para lembrar: clusters são como rodinhas de amigos!

---

## Licença

Este projeto é livre para fins acadêmicos e de aprendizado.
