import React, { Component } from "react";
import TodoDataService from "../services/todoService";

export default class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangTitle = this.onChangTitle.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.getTodo = this.getTodo.bind(this)
        this.updatePublished = this.updatePublished.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)

        this.state = {
            currentTodo: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        }
    }

    componentDidMount() {
        this.getTodo(this.props.match.params.id)
    }

    onChangeTitle(e) {
        const title = e.target.value

        this.setState(function(prevState) {
            return {
                currentTodo: {
                    ...prevState.currentTodo,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentTodo: {
                ...prevState.currentTodo,
                description: description
            }
        }));;
    }

    getTodo(id) {
        TodoDataService.get(id)
        .then(response => {
            this.setState({
                currentTodo: response.data
            })
            console.log(response.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentTodo.id,
            title: this.state.currentTodo.title,
            description: this.state.currentTodo.description,
            published: status
        };

        TodoDataService.update(this.state.currentTodo.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentTodo: {
                        ...prevState.currentTodo,
                        published: status
                    }
                }))
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
        } 

    updateTodo() {
        TodoDataService.update(
            this.state.currentTodo.id,
            this.state.currentTodo
        )
            .then(response => {
                console.log(response.data)
                this.setState({
                    message: "The Todo was updated"
                })
            })
            .catch(e => {
                console.log(e)
            })
        }

    deleteTodo() {
        TodoDataService.delete(this.state.currentTodo.id)
            .then(response => {
                console.log(response.data)
                this.props.history.push('/todos')
            })
            .catch(e => {
                console.log(e)
            });
        }

        render() {
            const { currentTodo } = this.state;

                return (
                    <div>
                        {currentTodo ? (
                            <div className="edit-form">
                                <h4>Todo</h4>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input
                                            type="text"
                                            classname="form-control"
                                            id="title"
                                            value={currentTodo.title}
                                            onChange={this.onChangTitle}
                                        />    
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <input
                                            type="text"
                                            classname="form-control"
                                            id="title"
                                            value={currentTodo.description}
                                            onChange={this.onChangeDescription}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <strong>Status:</strong>
                                        </label>
                                        {currentTodo.published ? "Published" : "Pending"}
                                    </div>
                                </form>

                                {currentTodo.published ? (
                                    <button
                                        className="badgePrimary"
                                        onClick={() => this.updatePublished(false)}
                                    >
                                        UnPublish
                                    </button>
                                ) : (
                                    <button
                                        className="badgePrimary"
                                        onClick={() => this.updatePublished(true)}
                                    >
                                        Publish
                                    </button>
                                )}

                                <button
                                    className="badgeDanger"
                                    onClick={this.deleteTodo}
                                >
                                    Delete Todo
                                </button>

                                <button
                                    type="submit"
                                    className="badge-success"
                                    onClick={this.updateTodo}
                                >
                                    Update
                                </button>
                                <p>{this.state.message}</p>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <p>Please click on a Todo</p>
                            </div>
                        )}
                    </div>
                )
            
        
    }
}