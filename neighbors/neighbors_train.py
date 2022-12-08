import pandas as pd
import numpy as np
import sys
from math import *
from pyspark.sql import SparkSession, types, functions
from sklearn.model_selection import train_test_split
from sklearn.neighbors import NearestNeighbors
import pickle

def distance(l1,l2):
    lon1, lat1 = map(radians, l1)
    lon2, lat2 = map(radians, l2)
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    distance = round(2 * asin(sqrt(a)) * 6371000, 1)
    return distance


def main(inputs, duration, model_file):
    location_schema = types.StructType([
        types.StructField('id', types.IntegerType()),
        types.StructField('business_id', types.StringType()),
        types.StructField('name', types.StringType()),
        types.StructField('address', types.StringType()),
        types.StructField('postal_code', types.StringType()),
        types.StructField('latitude', types.FloatType()),
        types.StructField('longitude', types.FloatType()),
        types.StructField('attributes', types.StringType()),
        types.StructField('stars', types.FloatType()),
        types.StructField('categories', types.StringType())
    ])

    data = spark.read.csv(inputs, schema = location_schema)
    store_info = data.select('id','business_id','name','address','postal_code','attributes','stars','categories')

    location = data.select(data['id'], data['name'], data['latitude'], data['longitude']).orderBy('id')
    location = location.withColumn('i', functions.lit('1'))
    pandasDF = location.toPandas()
    pandasDF['i'] = pandasDF.reset_index().index
    print('Pandas DataFrame: \n', pandasDF)

    x = pandasDF[['id','name', 'latitude', 'longitude', 'i']]
    train, test = train_test_split(x, test_size=.25, random_state=0) #25% is the test data

    train_data = train.values[:, 2:4]
    test_data = test.values[:, 2:4]
    print('Train data looks like: \n', train_data)
    

    clt = NearestNeighbors(metric=distance, algorithm='ball_tree')
    clt.fit(train_data)


    #find the neighbors with 500 meters
    distances, indices = clt.radius_neighbors(train_data, duration, return_distance=True)
    train['distances'] = distances.tolist()
    train['indices'] = indices.tolist()

    #test contains 7 column: id, name, longitude, latitude, distances, indices, row number  
    
    #filter out the points that it is the test data itself and some unrealiable 
    results = []
    
    for name, la1, lo1, i, dis, indices in train.values[:, 1:7]:
        #points and dis are Numpy arrays
        indices = np.array(indices).tolist()
        dis = np.array(dis).tolist()
        for ic in indices:
            idx = indices.index(ic) 
            if idx >= 0:
                indices.pop(idx)
                dis.pop(idx)

            zipped = zip(indices, distances)
            for p, d in zipped:
                p = int(p)

                id, name2, la2, lo2 = x.loc[p].values[0:4]
                results.append((name, la1, lo1, id, name2, la2, lo2, d))
    results = pd.DataFrame(results, columns=['STORE','LATITUDE', 'LONGITUDE', 'NEIGHBOR ID', 'NEIGHBOR STORE', 'NEIGHBOR LATITUDE', 'NEIGHBOR LONGITUDE', 'DISTANCE'])
    results = results.drop_duplicates(['NEIGHBOR LATITUDE'])
    #I want to know which store has the most neighbors
    results['COUNTS'] = results.groupby('STORE')['NEIGHBOR STORE'].transform(len)
    store_info_pd = store_info.toPandas()

    neighbors = results.merge(store_info_pd, left_on='NEIGHBOR ID', right_on='id', how='inner')
    compression_opts = dict(method='zip',
                        archive_name='out.csv')  
    neighbors.to_csv('out.zip', index=False,
          compression=compression_opts)
    

    
    pd.DataFrame(test_data).to_csv('test-data.csv', index=False)

    pickle.dump(clt, open(model_file,'wb'))
    #pickle.close()

if __name__ == "__main__":
    spark = SparkSession.builder.appName('Neighbors train').getOrCreate()
    assert spark.version >= '3.0' # make sure we have Spark 3.0+
    spark.sparkContext.setLogLevel('WARN')
    sc = spark.sparkContext

    input = sys.argv[1]
    duration = sys.argv[2]
    model = sys.argv[3]
    main(input, duration, model)



