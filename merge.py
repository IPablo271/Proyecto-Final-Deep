import pandas as pd

# Cargar los archivos CSV
csv1 = pd.read_csv('data/ACC_2017.csv')
csv2 = pd.read_csv('data/ACC_2018.csv')
csv3 = pd.read_csv('data/ACC_2019.csv')
csv4 = pd.read_csv('data/ACC_2020.csv')

# Obtener las columnas de cada archivo
columns1 = set(csv1.columns)
columns2 = set(csv2.columns)
columns3 = set(csv3.columns)
columns4 = set(csv4.columns)

# Verificar si las columnas son iguales entre todos los archivos
if columns1 == columns2 == columns3 == columns4:
    print("Los archivos tienen las mismas variables.")
else:
    print("Los archivos no tienen las mismas variables.")

# Mostrar las columnas de un archivo (puedes elegir cualquiera de los cuatro)
merged_csv = pd.concat([csv1, csv2, csv3, csv4])
merged_csv.to_csv('data.csv', index=False)
