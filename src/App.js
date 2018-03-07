// @flow
import React, { Component } from "react";
import Widget from "./Widget";
import Form from "./Form";
import "./App.css";

const dataKey = "stat-widgets";

export type Meta = {
  title: string,
  legend: number[],
  input: number,
}

type State = { meta: Meta[] }
type OnSubmitParam = { name: string, legend: number[], input: number }

class App extends Component<*, State> {
    onSubmit: OnSubmitParam => void;

    constructor(props: *) {
        super(props);
        this.state = {
            meta: []
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({ meta: JSON.parse(localStorage.getItem(dataKey) || "[]") });
    }

    onSubmit({ name, legend, input }: OnSubmitParam) {
        const data = JSON.parse(localStorage.getItem(dataKey) || "[]");
        data.push({
            title: name,
            legend,
            input
        });
        localStorage.setItem(dataKey, JSON.stringify(data));
        this.setState({ meta: data });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">If you plant the right seed in the right spot, it will grow without further coaxing.</h1>
                </header>
                <br />
                {this.state.meta.map(i => (<Widget {...i} key={i.title} />))}
                <Form onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default App;
