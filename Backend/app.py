from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import math

app = Flask(__name__)
CORS(app)  # conexão com frontend em React/HTML

# Fórmula de Haversine
def haversine(latitude1, longitude1, latitude2, longitude2):
    RaioDaTerra = 6371  # raio da Terra em km
    difeLatitude = math.radians(latitude2 - latitude1)
    difeLongitude = math.radians(longitude2 - longitude1)

    distancia = (math.sin(difeLatitude / 2) ** 2 +
                 math.cos(math.radians(latitude1)) *
                 math.cos(math.radians(latitude2)) *
                 math.sin(difeLongitude / 2) ** 2)

    distGraus = 2 * math.atan2(math.sqrt(distancia), math.sqrt(1 - distancia))
    
    return RaioDaTerra * distGraus

@app.route('/buscar', methods=['GET'])
def buscar():
    latitude = float(request.args.get('Latitude'))
    longitude = float(request.args.get('Longitude'))

    conn = sqlite3.connect(r"C:\Users\Utilizador\Documents\Estágio Nuh Digital\Desafio Tecnico\Database\pontosFict.db")

    interagir = conn.cursor()
    interagir.execute("SELECT Id, Nome, Latitude, Longitude, Tecnologia, Velocidade, Contato FROM pontos")
    pontos = interagir.fetchall()
    conn.close()

    resultados = []

    for pontoDeconexao in pontos:
        distFinal = haversine(latitude, longitude, pontoDeconexao[2], pontoDeconexao[3])

        resultados.append({
            "Id": pontoDeconexao[0],
            "Nome": pontoDeconexao[1],
            "Latitude": pontoDeconexao[2],
            "Longitude": pontoDeconexao[3],
            "Tecnologia": pontoDeconexao[4],
            "Velocidade": pontoDeconexao[5],
            "Contato": pontoDeconexao[6],
            "distancia_km": round(distFinal, 2)
        })

    resultados = sorted(resultados, key=lambda x: x["distancia_km"])[:3]

    return jsonify(resultados)

if __name__ == '__main__':
    app.run(debug=True)


    