twitter backend

in command line:

npm init -y

npm install express

npm install typescript ts-node nodemon @types/node @types/express --save-dev

in terminal of VS Code:

npm install prisma --save-dev

npx prisma init --datasource-provider sqlite

after database schema created we need to do a migration -or any changes to schema with name of change:
npx prisma migrate dev --name "init"

npm install @prisma/client

npm install jsonwebtoken

npm i --save-dev @types/jsonwebtoken

npm install @aws-sdk/client-ses

npx ts-node src/services/email.ts

npm install dotenv --save


to start:

npm run dev

to start prisma (separate terminal):
npx prisma studio

to connect to db/run email client you must create the .env file and include the following values:
DATABASE_URL="[locaiton of db]"
JWT_SECRET="[your secret - user generated]"
AWS_ACCESS_KEY_ID="[from aws]"
AWS_SECRET_ACCESS_KEY="[from aws]"

to test run email client (be sure to uncomment test command at the end of emailServices.ts):
npx ts-node src/services/emailServices.ts
