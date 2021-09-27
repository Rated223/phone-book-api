# Phone Book API

## Configure app

1. Create **configs** folder in the root of the project
1. Add 2 files in the folder, **dev.env** and **test.env**
1. In each file add the enviroment variables

   ENV=_test or dev_
   API_URL=_url to api_
   WEB_URL=_url to web app_
   DB_URI=_uri to connect to database_
   CONN_KEY=_secret key for jwt_
   CONN_ALGORITHM=_algorithm for jwt_
   PORT=_port where the application will run_
   MAILER_SERVICE=_service to send emails, should be gmail_
   MAILER_USER=_mail address_
   MAILER_PASS=_mail password_
   MAILER_CLIENT_ID=_variable provided by google_
   MAILER_SECRET=_variable provided by google_
   MAILER_REFRESH_TOKEN=_variable provided by google_
   MAILER_ACCESS_TOKEN=_variable provided by google_

1. To get the variables to configure the mailer function follow this [guide](http://https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1 'guide')
1. Run **dev:sync** and **test:sync** scripts to create the model tables in db

## Running the project

    $ npm start

## Simple build for production

    $ npm build

## Sync models and database

    $ npm run dev:sync
    $ npm run test:sync
