# Run the application locally
1. Clone this git repository.
2. In your terminal, under the repository root folder, start the backend with the following:
- 2.1 cd flask-backend.
- 2.2 make sure you have installed the dependency packages such as Flask, Flask-Cors, pymongo, etc.\
If not, use pip to install them correspondingly.
- 2.3 Under application folder, open _init_.py file, replace line 5 and line 7 with the followings:\
```app.config["SECRET_KEY"] ='657fe4b48c16dab9ba6804334bbcf1d9e77f4d75'```\
```client = MongoClient('mongodb+srv://User:user@cluster0.eyapovd.mongodb.net/?retryWrites=true&w=majority')```
- 2.4 run the command: ```flask run```, then you should run the backend successfully.
- 2.5 the backend should be available in ```http://localhost:5000/```. 
3. Now, let's start the frontend. 
- 3.1 In your terminal, back to the repository root folder, start the frontend with the following:
- 3.2 cd frontend.
- 3.3 make sure you computer devise has installed node/npm，the version we used for this project is:\
```node --version```\
```v14.17.6```\
```npm --version```\
```6.14.16```
- 3.4 run the command: ```npm run install``` so that npm can install all the requires dependencies.
- 3.5 then, run the command ```npm run start```,then your browser should open ```http://localhost:3000/``` for you, and this is the frontend webpage.
- 3.6 (Optional, if you want to use the backend locally. Otherwise, no action is required since the local frontend is already connected to the deployed backend) Under frontend folder, go to util -> axios.js. In line 4, update the baseURL with ```http://localhost:5000/``` if you want to use the local backend.