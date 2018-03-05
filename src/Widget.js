// @flow
import React, { Component } from "react";
// $FlowFixMe
import CalHeatMap from "cal-heatmap";
import type { Meta } from "./App";

const getTimestamp = () => Date.now() / 1000 | 0;

const calConfig = ({ legend, dataKey, data }) => ({
    itemSelector: `.stat${dataKey}`,
    domain: "year",
    subDomain: "day",
    highlight: ["now", new Date()],
    label: {
        position: "right",

    },
    data,
    cellSize: 10,
    range: 1,
    legend
});

type State = {|
  inputValue: number,
  dataKey: string
|}

const getInitialState = (val: number, key: string): State => ({
    inputValue: val,
    dataKey: `stat-${key}`
});

type Props = Meta

class Widget extends Component<Props, State>  {
  initialState: State;
  cal: any;

  constructor(props: *) {
      super(props);
      this.initialState = getInitialState(this.props.input, this.props.title.toLowerCase());
      this.state = this.initialState;
      this.cal = new CalHeatMap();
  }

  componentWillMount() {
      const data = JSON.parse(localStorage.getItem(this.state.dataKey) || "{}");
      setTimeout(() => this.cal.init(calConfig({
          data,
          dataKey: this.state.dataKey,
          legend: this.props.legend
      })), 0);
  }

  updateInputValue(e: Object) {
      this.setState({ inputValue: e.target.value });
  }

  handleKeyPress = (e: Object) => {
      if (e.key === "Enter") {
          const dataKey = this.state.dataKey;
          let data = JSON.parse(localStorage.getItem(dataKey) || "{}");
          data[getTimestamp()] = parseInt(this.state.inputValue, 10);
          localStorage.setItem(dataKey, JSON.stringify(data));
          this.setState(this.initialState);
          this.cal.update(data);
      }
  }

  render() {
      return (
          <div>
              <div className="widget-container">
                  <h3 className="widget-title">{this.props.title}</h3>
                  <div className={`stat${this.state.dataKey} widget`}></div>
                  <input
                      className="stat-input"
                      value={this.state.inputValue}
                      type="number"
                      onKeyPress={this.handleKeyPress}
                      onChange={e => this.updateInputValue(e)}
                  />
              </div>
              <br />
          </div>
      );
  }
}

export default Widget;
