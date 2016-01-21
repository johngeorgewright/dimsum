import React from 'react';
import {render} from 'react-dom';
import DimSum from 'react-dim-sum';

let schema = {
  name: 'test',
  title: 'Test',
  type: 'object',
  properties: {
    prop1: {
      type: 'string'
    },
    prop2: {
      type: 'string'
    },
    prop3: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
};

render(<DimSum {...schema}/>, document.getElementById('app'));
