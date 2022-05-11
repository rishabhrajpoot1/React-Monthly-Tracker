import React from "react";

class Tracker extends React.Component {
  constructor(props) {
    super(props);
  }

  handleTracker = (month, year) => {
    let days;
    switch (month) {
      case "January":
      case "March":
      case "May":
      case "July":
      case "August":
      case "October":
      case "December":
        days = 31;
        break;
      case "April":
      case "June":
      case "September":
      case "November":
        days = 30;
        break;
      case "February":
        days = year % 4 === 0 ? 29 : 28;
    }
    let monthDays = [];

    for (let i = 1; i <= days; i++) {
      monthDays.push(i);
    }

    return monthDays;
  };

  render() {
    let monthDays = this.handleTracker(
      this.props.act.month,
      this.props.act.year
    );

    return (
      <>
        <div className="tracker flex justify-between ">
          <div className="activity  flex-30 flex justify-center align-center flex-direction-column">
            <p>{this.props.act.name}</p>
            <span className="btn btn-primary">{this.props.act.month}</span>
          </div>
          <div className="flex-70 consistancy flex justify-start align-start flex-wrap-yes ">
            {monthDays.map((day) => {
              return (
                <span
                  onClick={() =>
                    this.props.handleSelectedDate(this.props.act.id, day)
                  }
                  className={
                    this.props.act.selectedDates.includes(day)
                      ? "selectedOne dates flex justify-center align-center"
                      : "dates flex justify-center align-center"
                  }
                >
                  {day}
                </span>
              );
            })}
          </div>
          <span
          
            className="delete"
            onClick={() => this.props.handleDelete(this.props.act.id)}
          >
           X
          </span>
        </div>
      </>
    );
  }
}

export default Tracker;
