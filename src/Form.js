// flow
import React, { Component } from "react";

class Form extends Component<*, *> {
    handleChange: (Object) => void;
    handleSubmit: (Object) => void;

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            legend: "",
            input: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        try {
            const name = this.state.name;
            const legend = this.state.legend.split(",").map(parseFloat);
            const input = parseFloat(this.state.input);

            this.props.onSubmit({ name, legend, input });
        } catch (e) {
            console.log(e);
            console.log("Wrong input for creating widget");
        }

        event.preventDefault();
    }

    render() {
        return (
            <div className="form-creation-container">
                <form className="form-creation" onSubmit={this.handleSubmit}>
                    <label>
           Name: <input onChange={this.handleChange} type="text" name="name" placeholder="Meditation" />
                    </label>
                    <label>
           Legend: <input onChange={this.handleChange} type="text" name="legend" placeholder="2,3,4,5"/>
                    </label>
                    <label>
           Input default value: <input onChange={this.handleChange} type="number" name="input" placeholder="1"/>
                    </label>
                    <input type="submit" value="Create" />
                </form>
            </div>
        );
    }
}

export default Form;
