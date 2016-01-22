import React, {Component} from 'react';
import {render} from 'react-dom';
import DimSum from 'react-dim-sum';
import {lensProp, set} from 'ramda';

let schema = {
  name: 'test',
  title: 'Test',
  type: 'object',
  required: ['prop1'],
  properties: {
    prop1: {
      type: 'number'
    },
    prop2: {
      type: 'boolean'
    },
    prop3: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    prop4: {
      type: 'array',
      title: 'People',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          age: {
            type: 'number'
          }
        }
      }
    },
    prop5: {
      type: 'string',
      enum: ['one', 'two', 'three']
    }
  }
};

let replaceSchema = set(lensProp('schema'));
let replaceValue = set(lensProp('value'));
let stringify = json => JSON.stringify(json, null, '  ');

class Example extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      schema,
      value: {}
    };
  }

  setSchema(schema) {
    this.setState(replaceSchema(schema, this.state));
  }

  setValue(value) {
    this.setState(replaceValue(value, this.state));
  }

  onSchemaChange(event) {
    try {
      let schema = JSON.parse(event.target.value);
      this.setSchema(schema);
    } catch (e) {
    }
  }

  render() {
    return (
      <div>
        <textarea
          defaultValue={stringify(this.state.schema)}
          onChange={this.onSchemaChange.bind(this)}
          rows="10"
          style={{width: '100%'}}
        >
        </textarea>
        <DimSum
          onChange={this.setValue.bind(this)}
          value={this.state.value}
          {...this.state.schema}
        />
        <pre>
          {stringify(this.state.value)}
        </pre>
      </div>
    );
  }
}

render(<Example/>, document.getElementById('app'));
