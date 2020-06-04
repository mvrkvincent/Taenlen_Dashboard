import React from 'react';
import { connect } from 'react-redux';
import { submitCell, updateCell } from '../../actions/cell_actions';
// import { DayPicker, DatePicker, MonthPicker } from './Pickers';

const CellOptions = ({ cell, setCellData, submitCell, updateCell, darkStyle }) => {

  const handleFrequency = e => {
    e.preventDefault();
    let toggle = '';
      switch (cell.frequency) {
        case 'Once':
          toggle = "Weekly";
          break;
        case 'Weekly':
          toggle = "Bi-Monthly";
          break;
        case 'Bi-Monthly':
          toggle = 'Monthly';
          break;
        case 'Monthly':
          toggle = 'Yearly';
          break;
        default:
          toggle = 'Once';
      }

    setCellData({
      ...cell,
      [e.target.value]: toggle
    });
  };

  const generatePriority = () => {
    if (cell.label === 'expenses') {
      return(
        <button style={darkStyle.button} onClick={handlePriority} value="priority" className="option">
          {cell.priority}
        </button>
      )
    } else {
      return null;
    }
  };

  const handlePriority = e => {
    e.preventDefault();
    let toggle = '';

    switch (cell.priority) {
      case 'Low':
        toggle = "Medium";
        break;
      case 'Medium':
        toggle = "High";
        break;
      default:
        toggle = 'Low';
    }
    setCellData({
      ...cell,
      [e.target.value]: toggle
    });
  };

  // const generateDatePicker = () => {
  //   switch(cell.frequency) {
  //     case 'Once':
  //       return null;
  //     case 'Weekly':
  //       return <DayPicker 
  //                 style={darkStyle.button} 
  //                 cell={cell} 
  //                 handleChange={handleDate}/>;
  //     case 'Monthly':
  //       return <DatePicker 
  //                 style={darkStyle.button} 
  //                 cell={cell} 
  //                 handleChange={handleDate} />;
  //     case 'Yearly':
  //       return [
  //         <MonthPicker
  //           style={darkStyle.button}
  //           cell={cell}
  //           handleChange={handleDate}
  //         />, 
  //         <DatePicker
  //           style={darkStyle.button}
  //           cell={cell}
  //           handleChange={handleDate}
  //         />,
  //       ]
  //     default:
  //       return null;
  //   }
  // };

  // const handleDate = e => {
  //   e.preventDefault();
    
  //   setCellData({
  //     ...cell,
  //     [e.target.id]: e.target.value
  //   });
  // };

  const toggleView = () => {
    let visible = {};
    if ((cell.title !== '') && (cell.amount !== '')) {
      visible = {
        height: '4rem',
        paddingTop: '1rem'
      };
    }
    return visible;
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    const formattedCell = { ...cell, 
      amount: parseInt(cell.amount.split(',').join(''))
    };

    if (cell.id) {
      updateCell(formattedCell);
    } else {
      submitCell(formattedCell);
    }

  };

  return (
    <div id="cell-options" style={toggleView()} className="row">

      <div className="row">

        <button style={darkStyle.button} onClick={handleFrequency} value="frequency" className="option">
          {cell.frequency}
        </button>

        {/* {generateDatePicker()} */}

        {generatePriority()}

      </div>

      <button style={darkStyle.button} onClick={handleSubmit} className="right action">
        <i className="fas fa-check"/>
      </button>

    </div>
  )
};

const mdp = dispatch => ({
  submitCell: cell => dispatch(submitCell(cell)),
  updateCell: cell => dispatch(updateCell(cell))
})

export default connect(null, mdp)(CellOptions);