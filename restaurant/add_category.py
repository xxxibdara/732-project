import sys
assert sys.version_info >= (3, 5) # make sure we have Python 3.5+
from pyspark.sql import SparkSession, functions, types
from pyspark.sql.types import *
from pyspark.sql.functions import udf

top_categories = [   
   'Restaurants','Food', 'Nightlife','Shopping','Beauty & Spas',
   'Local Services','Fashion','Active Life',
   'Automotive','Health & Medical'
   ]

def reassign_category(categories):
    if categories is None:
        return 'Others'
    else:
        categories_list = categories.split(', ')
        for c in categories_list:
            if c in top_categories:
                 return c
        return 'Others'


def main(inputs, output):
    
  
    df = spark.read.json(inputs)
    df = df.filter(df['state']=="AB")

    reassignCategory = udf(reassign_category, StringType())

    df = df.withColumn('category', reassignCategory('categories')) 

    df.coalesce(1).write.json(output, mode='overwrite')
    

if __name__ == '__main__':
    spark = SparkSession.builder.appName('yelp').getOrCreate()
    assert spark.version >= '3.0' # make sure we have Spark 3.0+
    spark.sparkContext.setLogLevel('WARN')
    sc = spark.sparkContext
    inputs = sys.argv[1]
    output = sys.argv[2]
    main(inputs, output)