# Yelp Business Analysis and Location Recommendation

Preview Link(Deployed URL): https://cmpt732-demo-web.azurewebsites.net

Demo Video: https://www.youtube.com/watch?v=j9IToR9_agg

# Menu
- [Yelp Business Analysis and Location Recommendation](#yelp-business-analysis-and-location-recommendation)
- [Menu](#menu)
  - [Introduction](#introduction)
  - [Run the application locally](#run-the-application-locally)
  - [Repo Structure](#repo-structure)
  - [Tech Stack](#tech-stack)


## Introduction
The Yelp challenge dataset was chosen because we want to work on a scope with potentially real business needs. After doing a simple explanatory analysis of the dataset and integrating the feedback from the project proposal, our team decided to initiate a project on offering data analysis targeting business owners and potential investors by concentrating on the following products: a dashboard for an overview of the market,  an analysis of users’ reviews using natural language processing to provide insight, and a machine learning algorithm offering recommendation about where to choose the location for the chain restaurants. A specific region, Alberta province was chosen for project demonstration.

## Run the application locally
See the RUNNING.md for more details.

## Repo Structure
- flask-backend: Serves as the backend for our web visualization page.
- frontend: Contains the react repo for our frontend webpage.
- neighbors: Contains the machine learning logic for the location recommender part.
- nlp: Contains the NLP part to analyze the user review for each business.
- restaurant: Collect and clean the business data.

## Tech stack
- Data Processing: Spark, Spark SQL, Pandas.
- Machine Learning: Scikit-learn.
- Database: MongoDB.
- Web backend: flask .
- Web frontend: React.js, Chart.js, leaflet.js, Leaflet.markercluster.js.




