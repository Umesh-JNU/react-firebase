import React from "react";

const Event = ({
  location,
  id,
  date,
  time,
  getDetails,
  cls,
  handleActiveEvent,idx
}) => {
  return (
    <div
      className={cls}
      onClick={() => {
        handleActiveEvent(idx);
        getDetails(id);
      }}
    >
      <div className="top">
        <p>
          {id}: {location}
        </p>
        <h5>{`${date} ${time}`}</h5>
      </div>
      <h5>Person Detected.</h5>
    </div>
  );
};

export default Event;
