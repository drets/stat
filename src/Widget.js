import React, { Component } from 'react';
import CalHeatMap from 'cal-heatmap'

const getTimestamp = () => Date.now() / 1000 | 0

const calConfig = ({ legend, dataKey, data }) => ({
  itemSelector: `.stat${dataKey}`,
  domain: "year",
  subDomain: "day",
  highlight: ["now", new Date()],
  label: {
    position: "right",

  },
  legendVerticalPosition: "left",
  data,
  cellSize: 10,
  range: 1,
  legend
})

const getInitialState = val => ({
  inputValue: val
})

class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState(this.props.input);
    this.cal = new CalHeatMap();
  }

  componentWillMount() {
    const data = JSON.parse(localStorage.getItem(this.props.dataKey)) || {}
    setTimeout(() => this.cal.init(calConfig({
      data,
      dataKey: this.props.dataKey,
      legend: this.props.legend
    })), 0)
  }

  updateInputValue(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const dataKey = this.props.dataKey
      let data = JSON.parse(localStorage.getItem(dataKey)) || {}
      data[getTimestamp()] = parseInt(this.state.inputValue, 10)
      localStorage.setItem(dataKey, JSON.stringify(data))
      this.setState(getInitialState(this.props.input))
      this.cal.update(data)
    }
  }

  render() {
    return (
      <div className="widget-container">
        <h3 className="widget-title">{this.props.title}</h3>
        <div className={`stat${this.props.dataKey} widget`}></div>
        <input
          className="stat-input"
          value={this.state.inputValue}
          type="number"
          min={this.props.min}
          max={this.props.max}
          onKeyPress={this.handleKeyPress}
          onChange={e => this.updateInputValue(e)}
        />
      </div>
    );
  }
}

export default Widget;
