from application import app,db
from flask_cors import CORS

from flask import Flask, jsonify,render_template, flash, request, redirect, url_for, json
from bson import ObjectId
#from pyspark.sql import SparkSession, functions, types

#spark = SparkSession.builder.appName('jsfile').getOrCreate()
#spark.sparkContext.setLogLevel('WARN')
#sc = spark.sparkContext
#jsfile = 'ab.json'
#df = spark.read.json(jsfile).cache()


CORS(app)


    
# def expand(nested):
#     list=[]
#     for i in range(9):
#         list.append(nested[i][0])
#     return list

@app.route('/', methods=['GET'])
def bar_chart():
    # result =df.groupBy('stars').count().sort("stars").cache()
    
    # labels=result.select("stars").collect()
    # labels=expand(labels)#flatMap(lambda x:x[0]).collect()


    # values=result.select("count").collect()
    #values=expand(values)
    return render_template("chart.html")#, labels = labels, values = values)




@app.route('/map', methods=['GET'])
def map():
    business = db.ab_c.find()
    business_dic = {}
    business_list = []
    for data in business:
        business_dic['business_id'] = data['business_id']
        business_dic['name'] = data['name']
        business_dic['latitude'] = data['latitude']
        business_dic['stars'] = data['stars']
        business_dic['category'] = data['category']
        business_dic['review_count'] = data['review_count'] 
        business_dic['longitude'] = data['longitude']
        business_list.append(business_dic)
        business_dic = {}
    data = json.dumps(business_list)
    return data


@app.route('/map/s/<s>', methods=['GET'])
def star_map(s):
        business = db.ab_c.find({ 'stars': float(s) })
        business_dic = {}
        business_list = []
        for data in business:
            business_dic['name'] = data['name']
            business_dic['latitude'] = data['latitude']
            business_dic['stars'] = data['stars']
            business_dic['category'] = data['category']
            business_dic['review_count'] = data['review_count'] 
            business_dic['longitude'] = data['longitude']
            business_list.append(business_dic)
            business_dic = {}
        data = json.dumps(business_list)
        return data

@app.route('/map/c/<c>', methods=['GET'])
def category_map(c):
        business = db.ab_c.find({ 'category': c })
        business_dic = {}
        business_list = []
        for data in business:
            business_dic['name'] = data['name']
            business_dic['latitude'] = data['latitude']
            business_dic['stars'] = data['stars']
            business_dic['category'] = data['category']
            business_dic['review_count'] = data['review_count'] 
            business_dic['longitude'] = data['longitude']
            business_list.append(business_dic)
            business_dic = {}
        data = json.dumps(business_list)
        return data

@app.route('/map/sc/<s>/<c>', methods=['GET'])
def star_category_map(s, c):
        business = db.ab_c.find({ 'stars': float(s), 'category': c })
        business_dic = {}
        business_list = []
        for data in business:
            business_dic['name'] = data['name']
            business_dic['latitude'] = data['latitude']
            business_dic['stars'] = data['stars']
            business_dic['category'] = data['category']
            business_dic['review_count'] = data['review_count'] 
            business_dic['longitude'] = data['longitude']
            business_list.append(business_dic)
            business_dic = {}
        data = json.dumps(business_list)
        return data

@app.route('/starCount', methods=['GET'])
def star_count():
        star_1 = db.ab_c.count_documents({ 'stars': float(1) })
        star_1_5 = db.ab_c.count_documents({ 'stars': float(1.5) })
        star_2 = db.ab_c.count_documents({ 'stars': float(2) })
        star_2_5 = db.ab_c.count_documents({ 'stars': float(2.5) })
        star_3 = db.ab_c.count_documents({ 'stars': float(3) })
        star_3_5 = db.ab_c.count_documents({ 'stars': float(3.5) })
        star_4 = db.ab_c.count_documents({ 'stars': float(4) })
        star_4_5 = db.ab_c.count_documents({ 'stars': float(4.5) })
        star_5 = db.ab_c.count_documents({ 'stars': float(5) })

        star_count = []
        star_count.append(star_1)
        star_count.append(star_1_5)
        star_count.append(star_2)
        star_count.append(star_2_5)
        star_count.append(star_3)
        star_count.append(star_3_5)
        star_count.append(star_4)
        star_count.append(star_4_5)
        star_count.append(star_5)

        data = json.dumps(star_count)

        return data

@app.route('/categoryCount', methods=['GET'])
def category_count():
        restaurants = db.ab_c.count_documents({ 'category': "Restaurants" })
        food = db.ab_c.count_documents({ 'category': "Food" })
        nightlife = db.ab_c.count_documents({ 'category': "Nightlife" })
        shopping = db.ab_c.count_documents({ 'category': "Shopping" })
        b_s = db.ab_c.count_documents({ 'category': "Beauty & Spas" })
        local_services = db.ab_c.count_documents({ 'category': "Local Services" })
        fashion = db.ab_c.count_documents({ 'category': "Fashion" })
        active_life = db.ab_c.count_documents({ 'category': "Active Life" })
        automotive = db.ab_c.count_documents({ 'category': "Automotive" })
        h_m = db.ab_c.count_documents({ 'category': "Health & Medical" })
        others = db.ab_c.count_documents({ 'category': "Others" })

        category_count = []
        category_count.append(restaurants)
        category_count.append(food)
        category_count.append(nightlife)
        category_count.append(shopping)
        category_count.append(b_s)
        category_count.append(local_services)
        category_count.append(fashion)
        category_count.append(active_life)
        category_count.append(automotive)
        category_count.append(h_m)
        category_count.append(others)

        data = json.dumps(category_count)

        return data

@app.route('/location', methods=['GET'])
def location():
        out = db.final_output.find()
        out_dic = {}
        out_list = []
        for data in out:
            out_dic['id'] = data['STORE ID']
            out_dic['name'] = data['STORE']
            out_dic['longitude'] = data['LONGITUDE']
            out_dic['latitude'] = data['LATITUDE']
            out_dic['neighbor_store'] = data['NEIGHBOR STORE']
            out_dic['neighbor_longitude'] = data['NEIGHBOR LONGITUDE']
            out_dic['neighbor_latitude'] = data['NEIGHBOR LATITUDE']
            out_list.append(out_dic)
            out_dic = {}
        data = json.dumps(out_list)
        
        return data

@app.route('/targetStore/<id>', methods=['GET'])
def targetStore(id):
        out = db.final_output.find({ 'STORE ID': id })
        out_dic = {}
        out_list = []
        for data in out:
            out_dic['id'] = data['STORE ID']
            out_dic['name'] = data['STORE']
            out_dic['longitude'] = data['LONGITUDE']
            out_dic['latitude'] = data['LATITUDE']
            out_dic['distance'] = data['DISTANCE']
            out_dic['neighbor_store'] = data['NEIGHBOR STORE']
            out_dic['neighbor_longitude'] = data['NEIGHBOR LONGITUDE']
            out_dic['neighbor_latitude'] = data['NEIGHBOR LATITUDE']
            out_list.append(out_dic)
            out_dic = {}
        data = json.dumps(out_list)
        
        return data

@app.route('/wordCloudPositive/<id>', methods=['GET'])
def goodWordCloud(id):
        out = db.out_positive.find({ 'bus_id': id })
        out_array = []
        out_list = []
        for data in out:
            for x in range(21): 
                out_array.append(data[str(x)])
            out_list.append(out_array)
            out_array = []

        data = json.dumps(out_list)
        
        return data

@app.route('/wordCloudNegative/<id>', methods=['GET'])
def badWordCloud(id):
        out = db.out_negative.find({ 'bus_id': id })
        out_array = []
        out_list = []
        for data in out:
            for x in range(21): 
                out_array.append(data[str(x)])
            out_list.append(out_array)
            out_array = []

        data = json.dumps(out_list)
        
        return data




    




