import PropTypes from 'prop-types';
import React from 'react';

class Input extends React.Component {
    static propTypes = {
        displayName: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        validate: PropTypes.func
    };

    state = {
        value: this.props.value,
        error: false
    };

    static getDerivedStateFromProps(nextProps) {
        return {value: nextProps.value}
    }

    onChange = (evt) => {
        const name = this.props.name;
        const value = evt.target.value;
        const error = this.props.validate ? this.props.validate(value) : false;
        this.setState({value, error});
        this.props.onChange({name, value, error});
    };

    render() {
        return (
            <div>
                {this.props.displayName}:
                <input
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <span style={{color: 'red'}}>{this.state.error}</span>
            </div>
        );
    }
}

export default Input
