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

For Deployment to AWS:

to start:
npm run start

to run aws server in cmd (make sure you are cmd'd to the location of the TwitterAPIKey.pem file):

ssh -i TwitterAPIKey.pem ec2-user@ec2-18-191-26-69.us-east-2.compute.amazonaws.com

on AWS server cmd:
sudo yum update -y

sudo yum install git -y

git clone https://github.com/SuperPablo987/TwitterBackend.git

cd to that TwitterBAckend directory and run:

npm i

then run with npm run dev

if any of the files give permission errors you can set correct permissions with (last file in the error message will be the file name to replace i.e. nodemon) (in cmd for AWS terminal machine):

chmod +x /home/ec2-user/TwitterBackend/node_modules/.bin/nodemon 

ensure permissions changed with:

ls -l /home/ec2-user/TwitterBackend/node_modules/.bin/nodemon


you may also need to update the prisma.schema file to add binary targets so the file includes:

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-3.0.x"]
}

to do this cd to the prisma.client file and type nano prisma.schema to open in nano editor. To add text start typing and you will see the cursor. move it into place and add the code.

Save by Ctl + O and exit with Ctrl + x

then in AWS cmd run:

npx prisma generate

to run this in AWS terminal is the same commands as above (be sure to do this so we can ensure it will run and we do not need to set any more permissions)


to have the AWS server be peristent when closing run:

npm install pm2 -g

once pm2 is installed to run (from home directory on AWS cmd):

pm2 start TwitterBackend/build/index.js

now the terminal AWS can be closed and pm2 will continue to keep it alive

to check the status of it, in the AWS terminal run:

pm2 status

to check logs of pm2, in the AWS terminal run:

pm2 monit

Update the app and need to pull it to the AWS server?

1) navigate to the directory of the application (i.e. cd TwitterBackend)
2) git pull
3) npm run build
4) pm2 ls (or status) - to check status of running instances (not necessary)
5) pm2 restsrt all (or individual file)


1:01:59