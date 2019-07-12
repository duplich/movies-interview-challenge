This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can follow the next steps in order to test the application:

### STEP 1 `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### STEP 2: `cd movies-backend && npm start`
Start the Backend based on the Express enginge that connects to the `mongodb://localhost:27017/movies`

Open [http://localhost:8000](http://localhost:8000) to view the backend it in the browser. (you will need the json parser if you want to see some useful information :)


### STEP 3: `mongod`
Start the mongo database server

### STEP 4: `mongo`
Start the mongo database. 

##Extras
The fixture file  file can be found in `movies-backend/movies.json`
THis file can be imported into the database for easier testing of the app
