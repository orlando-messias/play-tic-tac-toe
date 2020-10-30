import React from 'react';
import { Component } from 'react';

class Cell extends Component {
  render() {
    const { cell, onClick, value } = this.props;
    return (
      <div className={`cell ${value}`} onClick={(x, y) => onClick(x, y)}>
        {value}
      </div>
    );
  };
};

export default Cell;