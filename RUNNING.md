# Run the location recommender part 
## Introduction
How to run this program to get the input data of website

## Command line for train
![train-command](https://github.com/ziyaocui/732-project/blob/d6fb29feeaba3ca2a277e087f20dfe881425a650/neighbors/img-folder/train-command.png)
- spark-submit neighbors_train.py train-data 500 test-model
- It will produce a output.zip file, a test-data.csv file and a test-model
- 500: the range that our users could change
- output.zip: Contains our input data
- test-data.csv: our test data
- test-model: is used for run our neighboes_test.py

## Command line for test
![test-command](https://github.com/ziyaocui/732-project/blob/6aea74f68ef1c68c77c9c9516ab573b3fef83843/neighbors/img-folder/test-command.png)
- spark-submit neighbors_test.py test-model 500 test-data.csv
- It will produce a file called: distance_index.csv
- This file contains the corresponding neighbors' distances and indices of each location
- 500: could be changed based on what users want

## Run wordcount.ipynb
- Input file for wordcount.ipynb is "input file for wordcount.zip"
- It will produce a file called: out_negative.csv or out_positive.csv
- The file contains word count for each single business that has 1 review star or 5, each row represents one business

# Save data into MongoDB
We manually save the data into mongoDB. Our mongodb connection string is:\
```'mongodb+srv://User:user@cluster0.eyapovd.mongodb.net/?retryWrites=true&w=majority'``` \
Upload data from the csv file generated above so that the frontend can use it to render the webpage.

# Run the frontend application locally
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
