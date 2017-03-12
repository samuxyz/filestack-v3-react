import React from 'react';
import { render } from 'react-dom';
import filestack from 'filestack-js';
import Container from 'components/Container';
import '../dist/css/style.css';

const client = filestack.init('Anj637BlDTyMhOXjonqruz');
console.log(filestack.version);

render(
  <Container client={client} />,
  document.getElementById('app'),
);
