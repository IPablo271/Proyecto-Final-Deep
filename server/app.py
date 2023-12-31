import joblib
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS  # Importa CORS
from keras.models import load_model

car_type_model = load_model('modelo4.h5')
label_encoder_cargado = joblib.load('label_encoder.pkl')

codigos_vehiculos = {
    1: 'Automóvil',
    2: 'Camioneta sport o blazer',
    3: 'Pick up',
    4: 'Motocicleta',
    5: 'Camión',
    6: 'Cabezal',
    7: 'Bus extraurbano',
    8: 'Jeep',
    9: 'Microbús',
    10: 'Taxi',
    11: 'Panel',
    12: 'Bus urbano',
    13: 'Tractor',
    14: 'Moto taxi',
    15: 'Furgón',
    16: 'Grúa',
    17: 'Bus escolar',
    18: 'Bicicleta',
    19: 'Avioneta',
    20: 'Montacargas',
    21: 'Bus militar',
    22: 'Cuatrimoto',
    23: 'Furgoneta',
}


def predict_car_type(model, dataframe):
    predictions = model.predict(dataframe)
    predicted_classes = predictions.argmax(axis=-1)
    predicted_classes = label_encoder_cargado.inverse_transform(predicted_classes)
    predicted_classes.tolist()
    return predicted_classes[0]

app = Flask(__name__)
CORS(app)  # Habilita CORS para tu aplicación Flask

@app.route('/modelo', methods=['POST'])
def getModel():
    try:
        data = request.get_json()

        if data is None:
            return jsonify({'error': 'El cuerpo de la solicitud debe contener datos JSON'}), 400

        input_data = {
            'estado_con': [data.get('estado_con', 1)],
            'mes_ocu': [data.get('mes_ocu', 1)],
            'hora_ocu': [data.get('edad_per', 1)],
            'dia_ocu': [data.get('sexo_per', 10)],
            'tipo_evento': [data.get('tipo_evento', 1)],
            "depto_ocu": [data.get('depto_ocu', 1)],
        }

        input_df = pd.DataFrame(input_data)
        pred = predict_car_type(car_type_model, input_df)
        print(pred)
        pred = int(pred)
        nombre_predicho = codigos_vehiculos.get(pred, 'Desconocido')
        print(nombre_predicho)
        return jsonify({'prediccion': nombre_predicho})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)