## Run Locally
Install
1- Add .env file in root of repo with below content
REACT_APP_SITE_KEY={CATCHA_SITE_KEY}
SITE_SECRET={captcha}
token={API_KEY}
2- Run "docker compose up -d"

Validate API:
List all users
curl --location 'localhost:8080/api/v1/users' \
--header 'x-api-key: {API_KEY}' \
--header 'Cookie: _csrf=8pKX1-xFJZjdhW_AhQGj6gT9'
Add User:
curl --location 'localhost:8080/api/v1/users' \
--header 'x-api-key: {API_KEY}' \
--header 'Content-Type: application/json' \
--header 'Cookie: _csrf=8pKX1-xFJZjdhW_AhQGj6gT9' \
--data-raw '{
    "name": "Asmaa",
    "surname":"Mah",
    "email":"testg@test.com",
    "dob":"1982-08-27"
}'
Run React App
http://localhost
