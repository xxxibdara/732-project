from pyspark.sql import SparkSession, types
import sys, re, uuid, datetime

assert sys.version_info >= (3, 5) # make sure we have Python 3.5+



def main(input, output):
    
    busi_schema = types.StructType([
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

    locations = spark.read.json(input, schema = busi_schema)
    locations.createOrReplaceTempView('locations')

    restaurant = spark.sql("""
    SELECT id, business_id, name, address, postal_code, latitude, longitude, attributes, stars, categories
    FROM (SELECT *, COUNT(id) OVER (partition by name) AS rk FROM locations) cte
    WHERE categories LIKE '%Restaurants%' and cte.rk >= 2 
    ORDER BY id
    """)

    restaurant.write.save(output, format='csv', mode = 'overwrite', header=True)



if __name__ == "__main__":
    spark = SparkSession.builder.appName('restaurant locations').getOrCreate()
    assert spark.version >= '3.0' # make sure we have Spark 3.0+
    spark.sparkContext.setLogLevel('WARN')
    sc = spark.sparkContext

    business_file = sys.argv[1]
    locations = sys.argv[2]
    
    main(business_file, locations)
