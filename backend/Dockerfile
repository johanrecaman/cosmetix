# Use imagem base oficial do Node.js
FROM node:20

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (para cache eficiente)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta que seu app usa
EXPOSE 8000

# Comando para rodar a aplicação
CMD ["npm", "run", "server"]
