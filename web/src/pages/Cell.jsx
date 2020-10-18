import React from 'react';
import { Component } from 'react';

class Cell extends Component {
  render() {
    const { cell, onClick } = this.props;
    return (
      <div className={cell} onClick={(x, y) => onClick(x, y)}>
        {this.props.children}
      </div>
    );
  };
};

export default Cell;