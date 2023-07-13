from flask import Flask,request, jsonify
import cx_Oracle
import json
from datetime import datetime
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
CORS(app)

app.config['ORACLE_USER'] = 'hr'
app.config['ORACLE_PASSWORD'] = 'hr'
# app.config['ORACLE_DSN'] = 'your_DSN'


def get_oracle_connection():
    dsn = cx_Oracle.makedsn(
        'localhost',
        '1522',
        service_name='xe'
    )
    return cx_Oracle.connect(
        user=app.config['ORACLE_USER'],
        password=app.config['ORACLE_PASSWORD'],
        # dsn=dsn
    )

@app.route('/register',methods=['POST'])
def registerUser():
    connection = get_oracle_connection()
    cursor= connection.cursor()
    data=request.get_json()
    try:
        userName=data['userName']
        password=data['password']
        emailId=data['emailId']
        role=data['role']

        salt = bcrypt.gensalt()
        hashedPassword = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf8')
        cursor.execute('select * from bookingUser where emailId = :emailId',(emailId,))
        userData=cursor.fetchall()
        items = [dict(zip([key[0] for key in cursor.description], row)) for row in userData]
        
        if userData==[]:
            cursor.execute('insert into bookingUser (userId, userName , password, emailId, role) values(incrementID.nextVal ,:userName, :password, :emailId, :role)' ,(userName,hashedPassword,emailId,role))
            connection.commit()
            return jsonify({'message': 'User Created Successfully'})
        else:
            return jsonify({'message': 'Email ID already Exists Successfully'})
    finally:
        cursor.close()
        connection.close()    

@app.route('/login',methods=['POST'])
def loginUser():
    connection = get_oracle_connection()
    cursor= connection.cursor()
    data=request.get_json()
    try:
        password=data['password']
        emailId=data['emailId']
    
        cursor.execute('select * from bookingUser where emailId = :emailId',(emailId,))
        userData=cursor.fetchall()
        items = [dict(zip([key[0] for key in cursor.description], row)) for row in userData]
        if(items!=[]):
            passwordInDatabase=items[0]['PASSWORD']
            if(bcrypt.checkpw(password.encode('utf-8'),passwordInDatabase.encode('utf-8'))):
                return jsonify({
                    "userId":items[0]['USERID'],
                    "role":items[0]['ROLE'],
                    "userName":items[0]['USERNAME'],
                    "emailId":items[0]['EMAILID']
                })
            else:
                return jsonify({'message':"incorrect password"})
        else:
            return jsonify({'message':'emailId not exists'})    
    finally:
        cursor.close()
        connection.close()  

@app.route('/user/all',methods=['GET'])
def userAll():
    connection = get_oracle_connection()
    cursor = connection.cursor()

    try:
        cursor.execute('SELECT * FROM bookingUser')
        result = cursor.fetchall()

        # Get column names from the cursor description
        keys = [column[0] for column in cursor.description]

        # Convert the result to a list of dictionaries
        data = []
        for row in result:
            row_dict = dict(zip(keys, row))

            # Convert datetime objects to string representation
            for key, value in row_dict.items():
                if isinstance(value, datetime):
                    row_dict[key] = value.strftime('%Y-%m-%d')

            data.append(row_dict)

        # Convert the list of dictionaries to JSON
        json_result = json.dumps(data)

        return json_result

    finally:
        cursor.close()
        connection.close()
    
@app.route('/')
def homepage():
    return "API's For ITM GOI BOOKING SYSTEM"

@app.route('/movie/all',methods=['GET'])
def movieAll():

    connection = get_oracle_connection()
    cursor = connection.cursor()

    try:
        cursor.execute('SELECT * FROM MOVIE')
        result = cursor.fetchall()

        # Get column names from the cursor description
        keys = [column[0] for column in cursor.description]

        # Convert the result to a list of dictionaries
        data = []
        for row in result:
            row_dict = dict(zip(keys, row))

            # Convert datetime objects to string representation
            for key, value in row_dict.items():
                if isinstance(value, datetime):
                    row_dict[key] = value.strftime('%Y-%m-%d')

            data.append(row_dict)

        # Convert the list of dictionaries to JSON
        json_result = json.dumps(data)

        return json_result

    finally:
        cursor.close()
        connection.close()

@app.route('/movie',methods=["POST"])
def createMovie():
    connection = get_oracle_connection()
    cursor = connection.cursor()
    data = request.get_json()

    try:
        movieName = data['movieName']
        releaseDate = data['releaseDate']
        endDate = data['endDate']
        noOfSeats = int(data['noOfSeats'])
        imageUrl = data['imageUrl']
        description = data['description']
        isRecommended = data['isRecommended']
        genre = data['genre']
        price=data['price']

        query = """
            INSERT INTO movie 
                (movieId, movieName, releaseDate, endDate, noOfSeats, imageUrl, description, isRecommended, genre,price)
            VALUES 
                (incrementID.nextval, :movieName, TO_DATE(:releaseDate, 'YYYY-MM-DD'),
                TO_DATE(:endDate, 'YYYY-MM-DD'), :noOfSeats, :imageUrl, :description, :isRecommended, :genre, :price)
        """
        cursor.execute(query, (movieName, releaseDate, endDate, noOfSeats, imageUrl, description, isRecommended, genre, price))
 
        cursor.execute("SELECT MAX(movieId) FROM movie")
        lastCreatedMovie = cursor.fetchone()[0]

        for i in range(1, noOfSeats + 1):
            cursor.execute(
                "INSERT INTO seat (seatId, movieId, seatNo, bookingStatus, userId) VALUES (incrementID.nextVal, :movieId, :seatNo, 0, NULL)",
                (lastCreatedMovie, i)
            )
        connection.commit()
        return jsonify({'message': 'Created Successfully'})
    finally:
        cursor.close()
        connection.close()

@app.route("/movie/<movieId>",methods=['get'])
def getAMovie(movieId):
    connection = get_oracle_connection()
    cursor = connection.cursor()

    movie_id = movieId
    try:
        cursor.execute('SELECT * FROM MOVIE where movieId = :id', (movie_id,))
        result = cursor.fetchall()
        items = [dict(zip([key[0] for key in cursor.description], row)) for row in result]
        return jsonify(items)

    finally:
        cursor.close()
        connection.close()

@app.route('/movie/<movieId>',methods=['DELETE'])
def deleteMovie(movieId):
    connection= get_oracle_connection()
    cursor = connection.cursor()
    movieId=movieId

    try:
        cursor.execute("delete from movie where movieId = :id",(movieId,))
        cursor.execute("delete from seat where movieId = :id",(movieId,))
        connection.commit()
        return jsonify({'message':"Deleted Successfully"})    
    finally:
        cursor.close()
        connection.close()

@app.route('/movie/<movieId>',methods=['PATCH'])
def updateMovie(movieId):
    connection = get_oracle_connection()
    cursor = connection.cursor()
    data = request.get_json()

    try:
        movieName = data['movieName']
        releaseDate = data['releaseDate']
        endDate = data['endDate']
        imageUrl = data['imageUrl']
        description = data['description']
        isRecommended = data['isRecommended']
        genre = data['genre']

        query =  '''
            UPDATE movie
            SET movieName = :movieName,
                releaseDate = TO_DATE(:releaseDate, 'YYYY-MM-DD'),
                endDate = TO_DATE(:endDate, 'YYYY-MM-DD'),
                imageUrl = :imageUrl,
                description = :description,
                isRecommended = :isRecommended,
                genre = :genre
            WHERE movieId = :movieId
        '''
        cursor.execute(query, (movieName, releaseDate, endDate, imageUrl, description, isRecommended, genre, movieId))
        connection.commit()
        return jsonify({'message': 'Movie Edited Successfully'})
    finally:
        cursor.close()
        connection.close()

@app.route('/seat/bookSeat',methods=['POST'])
def bookSeat():
    connection = get_oracle_connection()
    cursor = connection.cursor()
    requestData = request.get_json()
    seatIdList=requestData['seatIdList']
    userId=requestData['userId']
    movieId=requestData['movieId']
    
    try:
        for id in seatIdList:
            cursor.execute("UPDATE seat SET bookingStatus = :1 ,userId = :2 WHERE seatId = :3",(1,userId,id))

        cursor.execute(""" select price from movie where movieId = :movieId """,(movieId,))
        price=cursor.fetchone()[0]

        for seatId in seatIdList:
            cursor.execute('''
            insert into ticket (ticketId,movieId,userId,seatId,amount)
            values (incrementID.nextval,:movieId,:userId,:id,:price)
            ''',(movieId,userId,seatId,price))

        connection.commit()
        return jsonify({'message':"Seat Booked Successfully"})

    finally:
        cursor.close()
        connection.close()

@app.route('/seat/<movieId>',methods=['GET'])
def getAllSeatsForMovieID(movieId):
    connection = get_oracle_connection()
    cursor = connection.cursor()

    movie_id = movieId
    try:
        cursor.execute('SELECT * FROM seat where movieId = :id', (movie_id,))
        result = cursor.fetchall()
        items = [dict(zip([key[0] for key in cursor.description], row)) for row in result]
        return jsonify(items)

    finally:
        cursor.close()
        connection.close()

@app.route('/seat/all',methods=['GET'])
def seatAll():
    connection = get_oracle_connection()
    cursor = connection.cursor()

    try:
        cursor.execute('SELECT * FROM SEAT')
        result = cursor.fetchall()

        # Get column names from the cursor description
        keys = [column[0] for column in cursor.description]

        # Convert the result to a list of dictionaries
        data = []
        for row in result:
            row_dict = dict(zip(keys, row))

            # Convert datetime objects to string representation
            for key, value in row_dict.items():
                if isinstance(value, datetime):
                    row_dict[key] = value.strftime('%Y-%m-%d')

            data.append(row_dict)

        # Convert the list of dictionaries to JSON
        json_result = json.dumps(data)

        return json_result

    finally:
        cursor.close()
        connection.close()

@app.route('/ticket/<userId>',methods=['GET'])
def getAllTicketsForUserID(userId):
    connection = get_oracle_connection()
    cursor = connection.cursor()

    id = userId
    try:
        cursor.execute('SELECT * FROM ticket where userId = :id', (id,))
        result = cursor.fetchall()
        items = [dict(zip([key[0] for key in cursor.description], row)) for row in result]
        return jsonify(items)

    finally:
        cursor.close()
        connection.close()

@app.route('/ticket/all',methods=['GET'])
def ticketAll():
    connection = get_oracle_connection()
    cursor = connection.cursor()

    try:
        cursor.execute('SELECT * FROM ticket')
        result = cursor.fetchall()

        # Get column names from the cursor description
        keys = [column[0] for column in cursor.description]

        # Convert the result to a list of dictionaries
        data = []
        for row in result:
            row_dict = dict(zip(keys, row))

            # Convert datetime objects to string representation
            for key, value in row_dict.items():
                if isinstance(value, datetime):
                    row_dict[key] = value.strftime('%Y-%m-%d')

            data.append(row_dict)

        # Convert the list of dictionaries to JSON
        json_result = json.dumps(data)

        return json_result

    finally:
        cursor.close()
        connection.close()

@app.route('/dashboard',methods=['GET'])
def dashboard():
    connection = get_oracle_connection()
    cursor = connection.cursor()

    try:
        cursor.execute('SELECT count(*) as totalMovies FROM MOVIE')
        resultMovie = cursor.fetchall()
        itemMovie = [dict(zip([key[0] for key in cursor.description], row)) for row in resultMovie]
        
        cursor.execute('SELECT sum(amount) as totalAmount FROM TICKET')
        resultTicket = cursor.fetchall()
        itemTicket = [dict(zip([key[0] for key in cursor.description], row)) for row in resultTicket]
        
        cursor.execute('SELECT count(*) as totalUser FROM BOOKINGUSER')
        resultUser = cursor.fetchall()
        itemUsers = [dict(zip([key[0] for key in cursor.description], row)) for row in resultUser]
        
        return jsonify({
            "totalUsers":itemUsers[0]['TOTALUSER'],
            "totalRevenue":itemTicket[0]['TOTALAMOUNT'],
            "totalMovies":itemMovie[0]['TOTALMOVIES']
        })

    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)