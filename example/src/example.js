import React, {Component} from 'react';
import {render} from 'react-dom';
import DimSum from 'react-dim-sum';
import {set, lensProp} from 'ramda';

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

class Example extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      schema,
      value: {}
    };
    this.schemaLens = lensProp('schema');
    this.valueLens = lensProp('value');
  }

  onSchemaChange(event) {
    try {
      let schema = JSON.parse(event.target.value);
      this.setState(set(this.schemaLens, schema, this.state));
    } catch (e) {
    }
  }

  onValueChange(value) {
    this.setState(set(this.valueLens, value, this.state));
  }

  render() {
    return (
      <div>
        <textarea
          onChange={this.onSchemaChange.bind(this)}
          rows="10"
          style={{width: '100%'}}
          defaultValue={JSON.stringify(this.state.schema, null, '  ')}
        >
        </textarea>
        <DimSum
          onChange={this.onValueChange.bind(this)}
          value={this.state.value}
          {...this.state.schema}
        />
        <pre>
          {JSON.stringify(this.state.value, null, '  ')}
        </pre>
      </div>
    );
  }
}

render(<Example/>, document.getElementById('app'));
