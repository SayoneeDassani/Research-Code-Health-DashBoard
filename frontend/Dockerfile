FROM node:20

WORKDIR /app

COPY . .

RUN npm install


RUN npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# --- Commented out to speed up production builds ---
# RUN npm run test


CMD ["npm", "run", "dev", "--", "--host"]
