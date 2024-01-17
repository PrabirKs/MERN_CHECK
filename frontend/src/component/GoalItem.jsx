import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
function GoalItem({ goal }) {
  const dateConverter = (dateString) => {
    const dateObject = new Date(dateString);
    // Format the date components
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
    // Create the final formatted string
    const formattedDate = `${formattedHours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm} , ${dateObject.getDate()}-${
      dateObject.getMonth() + 1
    }-${dateObject.getFullYear()}`;

    return formattedDate;
  };

  const dispatch = useDispatch();
  return (
    <div className="goal">
      <div>{dateConverter(goal.createdAt)}</div>
      <h2>{goal.text}</h2>
      <button className="close close-btn" onClick={() => dispatch(deleteGoal(goal._id))}>
        X
      </button>
    </div>
  );
}

export default GoalItem;
