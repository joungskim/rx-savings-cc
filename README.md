# rx-savings-cc

### INITIAL SETUP:

Clone Repository:

Go to directory in command shell and run command:

npm install

### SETTING UP DATABASE:

Note: ask me directly to use my pre-seeded Database, contact me here: https://joungskim.github.io/my-portfolio/

OPTION 1: copy and paste the snippit below into the .env file.  This has read-only access.

CONNECTDB = <Not available on github>

OPTION 2: If you would like to seed your own database.  Setup a free mongodb account and add your own connection string.  The connection string above will not allow you to seed the database.  Seeding will scaffold the model with mongoose.

Step 1 - Place connection string in .env file: 

CONNECTDB = "YOUR CONNECTION STRING"

Step 2 - Run script with "npm run dbseed"  Example Below:

PS C:\projects\rx-savings-cc> npm dbseed

### START API:

In the shell write command:

npm start

Output should say: 
nodemon server.js

[nodemon] 2.0.4
[nodemon] to restart at any time, enter rs
[nodemon] watching path(s): .
[nodemon] watching extensions: js,mjs,json
[nodemon] starting node server.js
Server is running!
Successfully connected to DB

### POSTMAN ROUTE EXAMPLE:

GET: localhost:3000/api/pharmacy/nearest
Body Request: 

{
    "latitude": 20.03504,
    "longitude": -50.7587
}

Body Response:

{
    "name": "WAL-MART PHARMACY",
    "address": "600 NE CORONADO DRIVE",
    "city": "BLUE SPRINGS",
    "state": "MO",
    "zip": 64014,
    "distance": 2889.7641240245443
}

### RUNNING TESTS:

In the shell write: npm test
