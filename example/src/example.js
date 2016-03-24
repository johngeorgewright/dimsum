import React, {Component} from 'react';
import {render} from 'react-dom';
import DimSum from 'react-dim-sum';
import {assoc} from 'ramda';
import AceEditor from 'react-ace';
import Highlight from 'react-highlight';
import 'brace/mode/json';
import 'brace/theme/github';

const schema = {
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

const replaceSchema = assoc('schema');
const replaceValue = assoc('value');
const replaceError = assoc('error');
const stringify = json => JSON.stringify(json, null, '  ');

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

  onSchemaChange(schemaString) {
    try {
      let schema = JSON.parse(schemaString);
      this.setSchema(schema);
    } catch (e) {
    }
  }

  validate() {
    this.refs.editor.validate();
  }

  handleError(error) {
    this.setState(replaceError(error, this.state));
  }

  get error() {
    let {error} = this.state;
    if (error) {
      let message = 'There was an error';
      if (error.dataPath.length) message += ` ${error.dataPath}`;
      message += ': ';
      return (
        <p>
          {message}
          <strong>
            {error.message}
          </strong>
        </p>
      );
    } else {
      return <div/>;
    }
  }

  get schemaEditor() {
    return (
      <div>
        <h2>Schema</h2>
        <AceEditor
          mode="json"
          theme="github"
          onChange={this.onSchemaChange.bind(this)}
          value={stringify(this.state.schema)}
        />
      </div>
    );
  }

  get dimSumEditor() {
    return (
      <div>
        <h2>Example Editor</h2>
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
      </div>
    );
  }

  get result() {
    return (
      <div>
        <h2>Resulting Value</h2>
        <Highlight className="json">
          {stringify(this.state.value)}
        </Highlight>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.schemaEditor}
        {this.error}
        {this.dimSumEditor}
        {this.result}
      </div>
    );
  }
}

render(<Example/>, document.getElementById('app'));
