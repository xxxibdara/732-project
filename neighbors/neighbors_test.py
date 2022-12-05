import sys
import pickle
import pandas as pd
import numpy as np
from math import *
assert sys.version_info >= (3, 5) # make sure we have Python 3.5+
from pyspark.sql import SparkSession, types


def distance(l1,l2):
    lon1, lat1 = map(radians, l1)
    lon2, lat2 = map(radians, l2)
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    distance = round(2 * asin(sqrt(a)) * 6371000, 1)
    return distance



def test_model(model_file, duration,inputs):
    location_schema = types.StructType([
        types.StructField('latitude', types.FloatType()),
        types.StructField('longitude', types.FloatType())
    ])

    # get the data
    test = spark.read.csv(inputs, schema=location_schema)
    data = test.select('latitude', 'longitude').toPandas()
    demo = [[53.518303, -113.50561],[53.4, -114.0]] #first data from test, the other is randomly picked
    # load the model
    model = pickle.load(open(model_file, 'rb'))
    
    # use the model to make predictions
    distances, indices = model.radius_neighbors(data.values, duration, return_distance=True)
    ans= pd.DataFrame((zip(distances.tolist(), indices.tolist())), columns=['distance', 'index'])
    
    compression_opts = dict(method='zip',
                        archive_name='distance_index.csv')  
    ans.to_csv('distance_index.zip', index=False,
          compression=compression_opts)
    
    



if __name__ == '__main__':
    spark = SparkSession.builder.appName('Neighbors test').getOrCreate()
    assert spark.version >= '3.0' # make sure we have Spark 3.0+
    spark.sparkContext.setLogLevel('WARN')
    sc = spark.sparkContext

    model_file = sys.argv[1]
    range = sys.argv[2]
    inputs = sys.argv[3]
    test_model(model_file, range, inputs)
