import React from 'react';
import { render } from 'react-dom';
import filestack from 'filestack-js';
import Container from 'components/Container';
import '../dist/css/style.css';

const client = filestack.init('YOUR_API_KEY');
console.log(filestack.version);

render(
  <Container client={client} />,
  document.getElementById('app'),
);
