export APP_ID=kanbanapp
export MASTER_KEY=Mi1nUw46j3gbeEcZpjUrT5Uf4gk6McqL
export SERVER_URL=http://localhost:1337/parse
docker run -d -p 4040:4040 parseplatform/parse-dashboard --dev --appId $APP_ID --masterKey $MASTER_KEY --serverURL $SERVER_URL