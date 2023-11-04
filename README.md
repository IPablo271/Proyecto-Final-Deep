# Proyecto de Clasificación de Vehículos en Accidentes de Tránsito

## Descripción del Proyecto

Este proyecto se enfoca en la clasificación de tipos de vehículos a partir de características relacionadas con accidentes de tránsito. Se utiliza una red neuronal para predecir el tipo de vehículo involucrado en un accidente basado en datos demográficos del conductor y propiedades del vehículo.

## Arquitectura de la Red Neuronal

La red neuronal utilizada es un modelo de clasificación secuencial implementado con la librería Keras. La arquitectura de la red consta de las siguientes capas:

### Capas de la Red Neuronal

1. **Capa de Entrada (Dense):** 
   - Neuronas: 256
   - Función de activación: ReLU

2. **Capa Oculta (Dense):** 
   - Neuronas: 128
   - Función de activación: ReLU

3. **Capa Oculta (Dense):** 
   - Neuronas: 64
   - Función de activación: ReLU

4. **Capa Oculta (Dense):** 
   - Neuronas: 32
   - Función de activación: ReLU

5. **Capa de Salida (Dense):** 
   - Neuronas: 20 (para clasificación multiclase)
   - Función de activación: Softmax

## Propósito de la Red Neuronal

El propósito de esta red neuronal es predecir el tipo de vehículo involucrado en un accidente de tránsito a partir de las siguientes características:

- Color del vehículo.
- Mayoría o minoría de edad del conductor.
- Edad del conductor.
- Sexo del conductor.

## Entrenamiento del Modelo

El modelo se entrena utilizando el optimizador 'adam' y la función de pérdida 'sparse_categorical_crossentropy'. Se realiza un entrenamiento durante 10 épocas con un tamaño de lote de 32.

## Uso del Modelo

Una vez entrenado el modelo, se puede realizar predicciones utilizando datos de entrada proporcionados en un DataFrame de Pandas. En este caso, se realiza una predicción con un conjunto de datos de prueba definido manualmente.

## Ejemplo de Predicción

Se proporciona un ejemplo de cómo realizar una predicción con el modelo entrenado utilizando datos de entrada. En este caso, se muestra la predicción del tipo de vehículo basada en datos ficticios.

---

Este README proporciona una descripción general del proyecto, la arquitectura de la red neuronal utilizada, su propósito, cómo se entrena el modelo y un ejemplo de cómo realizar predicciones con el mismo. Recuerda adaptar y agregar información adicional según las necesidades específicas de tu proyecto y cómo planeas que otros usuarios o colaboradores interactúen con él.
