import { Component } from "react";
import ErrorMassege from "../errorMessage/ErrorMessage";


class ErrorBoundery extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) return <ErrorMassege />

        return this.props.children;
    }
}

export default ErrorBoundery;