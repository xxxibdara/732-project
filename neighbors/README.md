## Introduction
How to run this program to get the input data of website

## Command line for train

- spark-submit neighbors_train.py train-data 500 test-model
- It will produce a output.zip file, a test-data.csv file and a test-model
- 500: the range that our users could change
- output.zip: Contains our input data
- test-data.csv: our test data
- test-model: is used for run our neighboes_test.py

## Command line for test
- spark-submit neighbors_test.py test-model 500 test-data.csv
- It will produce a file called: distance_index.csv
- This file contains the corresponding neighbors' distances and indices of each location
- 500: could be changed based on what users want
