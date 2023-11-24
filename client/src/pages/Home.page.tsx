import React, { useState } from 'react';
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { NavbarSegmented } from '../components/NavbarSegmented/NavbarSegment';

import { GridAsymmetrical } from '../components/GridAsymmetrical/GridAsymmetrical';

import { Select, TextInput, NumberInput, Slider, Switch, Button } from '@mantine/core';
import classes from './ContainedInput.module.css';
import classesSlider from './SliderInput.module.css';

export function HomePage() {
  const [section, setSection] = useState<'account' | 'general'>('account');

  return (
    <div style={containerStyle}>
      <NavbarSegmented section={section} onSectionChange={setSection} />
      {section === 'account' ? <ModeloForm /> : <ExtrasComponent />}
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
};

const margenStyle: React.CSSProperties = {
  marginTop: '30px',
  marginBottom: '30px',
};

function ExtrasComponent() {
  return <GridAsymmetrical />;
}

const cityMapping: { [key: string]: number } = {
  'Sobrio': 0,
  'Ebrio': 1,
  'No conciderar': 9
};

const monthMapping: { [key: string]: number } = {
  'Enero': 1,
  'Febrero': 2,
  'Marzo': 3,
  'Abril': 4,
  'Mayo': 5,
  'Junio': 6,
  'Julio': 7,
  'Agosto': 8,
  'Septiembre': 9,
  'Octubre': 10,
  'Noviembre': 11,
  'Diciembre': 12,
};

// Colisión
// Choque
// Vuelco
// Caída
// Atropello
// Derrape
// Embarranco
// Encuneto
// Ignorado

const eventMapping: { [key: string]: number } = {
  'Colisión': 1,
  'Choque': 2,
  'Vuelco': 3,
  'Caída': 4,
  'Atropello': 5,
  'Derrape': 6,
  'Embarranco': 7,
  'Encuneto': 8,
  'Ignorado': 9,
};

// Guatemala
// El Progreso
// Sacatepéquez
// Chimaltenango
// Escuintla
// Santa Rosa
// Sololá
// Totonicapán
// Quetzaltenango
// Suchitepéquez
// Retalhuleu
// San Marcos
// Huehuetenango
// Quiché
// Baja Verapaz
// Alta Verapaz
// Petén
// Izabal
// Zacapa
// Chiquimula
// Jalapa
// Jutiapa

const departmentMapping: { [key: string]: number } = {
  'Guatemala': 1,
  'El Progreso': 2,
  'Sacatepéquez': 3,
  'Chimaltenango': 4,
  'Escuintla': 5,
  'Santa Rosa': 6,
  'Sololá': 7,
  'Totonicapán': 8,
  'Quetzaltenango': 9,
  'Suchitepéquez': 10,
  'Retalhuleu': 11,
  'San Marcos': 12,
  'Huehuetenango': 13,
  'Quiché': 14,
  'Baja Verapaz': 15,
  'Alta Verapaz': 16,
  'Petén': 17,
  'Izabal': 18,
  'Zacapa': 19,
  'Chiquimula': 20,
  'Jalapa': 21,
  'Jutiapa': 22,
};

function ModeloForm() {



  const [ciudad, setCiudad] = useState<string | null>('');

  const [mes, setMes] = useState<string | null>('');

  const [area, setArea] = useState<number | string>(12);

  const [rooms, setRooms] = useState<number | string>(16);

  const [evento, setEvento] = useState<string | null>('');

  const [department, setDepartment] = useState<string | null>('');

  const handleSubmit = async () => {

    const cityIndex = cityMapping[ciudad || ''] || 0;

    const monthIndex = monthMapping[mes || ''] || 0;

    const eventIndex = eventMapping[evento || ''] || 0;

    const departmentIndex = departmentMapping[department || ''] || 0;

    console.log("Enviando a servidor:")
    console.log({
      "estado_con": cityIndex,
      "mes_ocu": monthIndex,
      "hora_ocu": Number(area),
      "dia_ocu": Number(rooms),
      "tipo_evento": eventIndex,
      'depto_ocu': departmentIndex,
    })

    const response = await fetch('http://127.0.0.1:5000/modelo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "estado_con": cityIndex,
        "mes_ocu": monthIndex,
        "hora_ocu": Number(area),
        "dia_ocu": Number(rooms),
        "tipo_evento": eventIndex,
        'depto_ocu': departmentIndex,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      alert(`Predicción: ${data.prediccion}`);  // Mostrando el resultado en un popup
      // alert(`Predicción: ${data.prediccion}`);  // Mostrando el resultado en un popup
    } else {
      const data = await response.json();
      alert(`Error: ${data}`);  // Mostrando el mensaje de error en un popup
      // alert(`Error: ${data.error}`);  // Mostrando el mensaje de error en un popup
    }
  };

  return (
    <>
      <div style={{ width: "50vw", marginLeft: "10%", marginTop: "10%" }}>



        <Select
          style={{ marginBottom: "25px" }}
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={['Sobrio', 'Ebrio', 'No conciderar']}
          placeholder="Porfavor elija una opción"
          label="Estado en el que conduce el conductor"
          classNames={classes}
          value={ciudad}
          onChange={(value) => setCiudad(value || '')}
        />

        <Select
          style={{ marginBottom: "25px" }}
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
          placeholder="Porfavor elija un mes"
          label="Mes en el que ocurrio el accidente"
          classNames={classes}
          value={mes}
          onChange={(value) => setMes(value || '')}
        />

        <SliderInput value={area} onChange={setArea} label="Hora en la que sucedió" min={0} max={23} step={1} />

        <SliderInput value={rooms} onChange={setRooms} label="Día en el que sucedió" min={1} max={31} step={1} />

        <Select
          style={{ marginBottom: "25px" }}
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={['Colisión', 'Choque', 'Vuelco', 'Caída', 'Atropello', 'Derrape', 'Embarranco', 'Encuneto', 'Ignorado']}
          placeholder="Porfavor elija un tipo de envento"
          label="Evento que ocurrió"
          classNames={classes}
          value={evento}
          onChange={(value) => setEvento(value || '')}
        />

        <Select
          style={{ marginBottom: "25px" }}
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={['Guatemala', 'El Progreso', 'Sacatepéquez', 'Chimaltenango', 'Escuintla', 'Santa Rosa', 'Sololá', 'Totonicapán', 'Quetzaltenango', 'Suchitepéquez', 'Retalhuleu', 'San Marcos', 'Huehuetenango', 'Quiché', 'Baja Verapaz', 'Alta Verapaz', 'Petén', 'Izabal', 'Zacapa', 'Chiquimula', 'Jalapa', 'Jutiapa']}
          placeholder="Porfavor elija un departamento"
          label="Departamento en el que ocurrió"
          classNames={classes}
          value={department}
          onChange={(value) => setDepartment(value || '')}
        />


        <Button fullWidth onClick={handleSubmit}>Enviar</Button>



      </div>
    </>
  );
}

interface SliderInputProps {
  value: number | string;
  onChange: (value: number | string) => void;
  label: string;
  min: number;
  max: number;
  step: number;
}

function SliderInput({ value, onChange, label, min, max, step }: SliderInputProps) {
  return (
    <div className={classesSlider.wrapper} style={margenStyle}>
      <NumberInput
        value={value}
        onChange={onChange}
        label={label}
        step={step}
        min={min}
        max={max}
        hideControls
        classNames={{ input: classesSlider.input, label: classesSlider.label }}
      />
      <Slider
        max={max}
        step={step}
        min={min}
        label={null}
        value={typeof value === 'string' ? 0 : Number(value)}
        onChange={onChange}
        size={2}
        className={classesSlider.slider}
        classNames={classesSlider}
      />
    </div>
  );
}
