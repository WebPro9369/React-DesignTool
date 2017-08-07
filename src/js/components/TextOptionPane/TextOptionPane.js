import './TextOptionPane.scss';

import React, { Component, PropTypes } from 'react';
import { Panel, FormGroup, FormControl, Form, Col, ControlLabel } from 'react-bootstrap';
import classnames from 'classnames';

export default class TextOptionPane extends Component {

  static propTypes = {
    title: PropTypes.string,
    fontList: PropTypes.array.isRequired, 
    selectedFont: PropTypes.string.isRequired,
    lineCount: PropTypes.number.isRequired,
    value: PropTypes.array.isRequired, 
    onChooseFont: PropTypes.func,
    onChangeText: PropTypes.func,
    colorList: PropTypes.array,
    selectedFontColor: PropTypes.object,
    onChooseFontColor: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedFontColor: typeof props.selectedFontColor !== "undefined" ? props.selectedFontColor : {}
    };
  }

  render_font_list() {
    return this.props.fontList.map((ft) =>
      (
        <option value={ft} key={ft}>{ft}</option>
      )
    );
  }

  onChooseFont(e) {
    if (this.props.onChooseFont)
    {
      this.props.onChooseFont(e.target.value);
    }
  }

  onChangeText(line, e) {
    if (this.props.onChangeText)
    {
      this.props.onChangeText(line, e.target.value);
    }
  }

  onClickColor(cl) {
    this.setState( {selectedFontColor: cl});

    if (this.props.onChooseFontColor) {
      this.props.onChooseFontColor(cl);
    }
  }

  render_color_thumbnails() {
    return this.props.colorList.map((cl) =>
      (
        <a 
          href="#"
          className={classnames('color-thumbnail', { 'selected': this.state.selectedFontColor.colorName === cl.colorName })}
          key={cl.colorRGB}
          style={{ backgroundColor: cl.colorRGB }}
          onClick={this.onClickColor.bind(this, cl)}
        />
      )
    );
  }

  render () {
    let { title, value } = this.props;

    return (
      <div className="text-option-pane">
        <Panel header={title} bsStyle="info">
          <Panel header="Choose Your Font" bsStyle="info">
            <FormControl componentClass="select" placeholder="" onChange={this.onChooseFont.bind(this)} defaultValue={this.props.selectedFont}>
              <option value="">Select Font</option>
              {this.render_font_list()}
            </FormControl>
          </Panel>
          <Panel header="Enter Your Text" bsStyle="info">
            <Form horizontal>
            {
              [...Array(this.props.lineCount)].map((x, line) => 
                (
                  <FormGroup controlId="formHorizontalEmail" key={line}>
                    <Col componentClass={ControlLabel} sm={3}>
                      Line {line + 1}:
                    </Col>
                    <Col sm={8}>
                      <FormControl type="text" placeholder="" onChange={this.onChangeText.bind(this, line)} value={value[line]}/>
                    </Col>
                  </FormGroup>
                )
              )
            } 
            </Form>
          </Panel>
          {
            this.props.colorList && 
              <div className="text-color-option-pane">
                <Panel header="Choose Your Font" bsStyle="info">
                  {this.render_color_thumbnails()}
                </Panel>
              </div>
          }
        </Panel>
      </div>
    );
  }
}