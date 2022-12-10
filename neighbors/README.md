## Introduction
How to run this program to get the input data of website

## Command line for train
![train-command](https://github.com/ziyaocui/732-project/blob/d6fb29feeaba3ca2a277e087f20dfe881425a650/neighbors/img-folder/train-command.png)
- spark-submit neighbors_train.py train-data 500 test-model
- It will produce a output.zip file, a test-data.csv file and a test-model
- 500: the range that our users could change
- output.zip: Contains our input data for the web
- test-data.csv: our test data
- test-model: is used for run our neighboes_test.py

## Command line for test
![test-command](https://github.com/ziyaocui/732-project/blob/6aea74f68ef1c68c77c9c9516ab573b3fef83843/neighbors/img-folder/test-command.png)
- spark-submit neighbors_test.py test-model 500 test-data.csv
- It will produce a file called: distance_index.csv
- This file contains the corresponding neighbors' distances and indices of each location
- 500: could be changed based on what users want
