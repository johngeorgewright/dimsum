import React, {Component} from 'react';
import {render} from 'react-dom';
import DimSum from 'react-dim-sum';
import {assoc} from 'ramda';

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
      enum: ['one', 'two', 'three'],
      multi: true
    }
  }
};

const replaceSchema = assoc('schema');
const replaceValue = assoc('value');
const replaceErrors = assoc('errors');
const stringify = json => JSON.stringify(json, null, '  ');

class Example extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      errors: [],
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

  validate() {
    this.refs.editor.validate();
  }

  handleError(errors) {
    this.setState(replaceErrors(errors, this.state));
  }

  get errors() {
    return this.state.errors.length
      ? <ul>
          {this.state.errors.map((error, i) => (
            <li key={i}>
              {error.message}
            </li>
          ))}
        </ul>
      : <div/>;
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
        {this.errors}
        <DimSum
          onChange={this.setValue.bind(this)}
          onError={this.handleError.bind(this)}
          ref="editor"
          value={this.state.value}
          {...this.state.schema}
        />
        <button onClick={this.validate.bind(this)}>
          Validate
        </button>
        <pre>
          {stringify(this.state.value)}
        </pre>
      </div>
    );
  }
}

render(<Example/>, document.getElementById('app'));
