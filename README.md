# Visualização de Clusters K-means

Esta aplicação é uma ferramenta interativa para visualizar e entender como funciona o algoritmo de agrupamento K-means. O K-means é um método de aprendizado de máquina que agrupa dados semelhantes em clusters (grupos).

## Como funciona?

1. **Pontos de Dados**: 
   - Clique em qualquer lugar do plano cartesiano para adicionar pontos
   - Cada ponto representa um dado que será agrupado

2. **Centroides (Centros dos Clusters)**:
   - Os círculos maiores com "C1", "C2", etc., são os centroides
   - Cada centroide representa o centro de um grupo
   - A cor ao redor de cada ponto mostra a qual grupo ele pertence

3. **Processo de Agrupamento**:
   - O algoritmo atribui cada ponto ao centroide mais próximo
   - Os centroides são recalculados com base na média dos pontos do seu grupo
   - Este processo se repete até encontrar a melhor distribuição

## Como usar

1. **Adicionar/Remover Pontos**:
   - Clique em qualquer lugar do plano para adicionar um ponto
   - Use o botão de lixeira para limpar todos os pontos

2. **Ajustar Número de Clusters**:
   - Use os botões + e - para aumentar ou diminuir o número de grupos
   - Você pode ter de 2 a 8 grupos diferentes

3. **Executar o Algoritmo**:
   - Clique no botão de atualização para iniciar o processo de agrupamento
   - Observe como os pontos são automaticamente organizados em grupos

4. **Visualização**:
   - As cores diferentes representam grupos diferentes
   - As áreas coloridas mostram as regiões de influência de cada centroide
   - Os números (C1, C2, etc.) identificam cada grupo

## Dicas

- Tente criar padrões diferentes de pontos para ver como o algoritmo se comporta
- Observe como o número de clusters afeta o agrupamento
- Experimente com diferentes quantidades de pontos e distribuições

## Tecnologias utilizadas

- React
- TypeScript
- Canvas API
- Tailwind CSS
