import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import DimSum from 'react-dim-sum';
import {assoc, merge} from 'ramda';
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
      info: {},
      schema,
      rawSchema: stringify(schema),
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
    let schema;
    let rawSchema = schemaString;
    try {
      schema = JSON.parse(schemaString);
    } catch (e) {
      schema = this.state.schema;
    }
    this.setState(merge(this.state, {
      rawSchema: schemaString,
      schema
    }));
  }

  validate() {
    this.refs.editor.validate();
  }

  handleError(error) {
    this.setState(replaceError(error, this.state));
  }

  handleInfo(info) {
    this.setState({...this.state, info});
  }

  getChildContext() {
    return {
      user: {
        name: 'Test User'
      }
    };
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
          value={this.state.rawSchema}
        />
      </div>
    );
  }

  get dimSumEditor() {
    return (
      <div>
        <h2>Example Editor</h2>
        <DimSum
          {...this.state.schema}
          info={this.state.info}
          onChange={this.setValue.bind(this)}
          onError={this.handleError.bind(this)}
          onInfo={this.handleInfo.bind(this)}
          ref="editor"
          value={this.state.value}
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

Example.childContextTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

render(<Example/>, document.getElementById('app'));
