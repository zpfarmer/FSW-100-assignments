import React, { Component } from "react"
import TodoDataService from "../services/todoService";

export default class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.newTodo = this.newTodo.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,

            submitted: false
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    saveTodo() {
        var data = {
            title: this.state.title,
            description: this.state.description
        }

        TodoDataService.create(data) 
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published,

                    submitted: true
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    newTodo() {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,

            submitted: false
        })
    }

    render() {
        return (
            <div className="submitFform">
                {this.state.submitted ? (
                    <div>
                        <h4>Todo Added!</h4>
                        <button className="btnSuccess" onClick={this.newTodo}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>

                        <button onClick={this.saveTodo} className="btnSuccess">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        )
    }
}