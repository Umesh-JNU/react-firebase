import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Tune, Menu, ExitToApp } from "@mui/icons-material";
import { Button } from "@mui/material";
import Event from "./components/Event";
import Filter from "./components/Filter";
import Content from "./components/Content";

const month = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const App = () => {
  const coll = collection(db, "userdata");
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [dataDetails, setDataDetails] = useState();
  const [activeIndex, setActiveIndex] = useState();

  const fetchData = async () => {
    console.log(date, gender, city);
    let q;
    if (!date && !gender && !city) q = coll;
    else if (!date && !gender) {
      console.log(city);
      q = query(coll, where("location", "==", city));
    } else if (!date && !city) {
      console.log(gender);
      q = query(coll, where("gender", "==", gender));
    } else if (!gender && !city) {
      console.log(date);
      q = query(coll, where("date", ">=", date));
    } else if (!gender) {
      q = query(coll, where("location", "==", city), where("date", ">=", date));
    } else if (!city) {
      q = query(coll, where("gender", "==", gender), where("date", ">=", date));
    } else if (!date) {
      q = query(
        coll,
        where("location", "==", city),
        where("gender", "==", gender)
      );
    } else {
      q = query(
        coll,
        where("location", "==", city),
        where("gender", "==", gender),
        where("date", ">=", date)
      );
    }

    console.log(q);
    try {
      const querySnapshot = await getDocs(q);
      setMaleCount(0);
      setFemaleCount(0);
      const obj = {};
      querySnapshot.forEach((doc) => {
        doc.data().gender === "Male" ? setMaleCount((prev) => prev + 1) : setFemaleCount((prev) => prev + 1);
        Object.defineProperty(obj, doc.id, {
          value: doc.data(),
        });
      });
      // console.log(obj);
      setData(obj);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const handleActiveEvent = (idx) => setActiveIndex(idx);
  const handleOpenClose = () => (open ? setOpen(false) : setOpen(true));
  const handleLocationChange = (c) => setCity(c);
  const handleGenderChange = (g) => setGender(g);
  const handleDateChange = (dt) => {
    const d = dt.date();
    const m = month[dt.month()];
    const y = dt.year();
    setDate(d + "-" + m + "-" + y);
  };
  const applyFilter = () => {
    setDataDetails(null);
    fetchData();
    handleOpenClose();
  };

  const func = {
    applyFilter: applyFilter,
    handleOpenClose: handleOpenClose,
    handleLocationChange: handleLocationChange,
    handleGenderChange: handleGenderChange,
    handleDateChange: handleDateChange,
    open: open,
    city: city,
    val: date,
  };

  const getDetails = async (id = null) => {
    console.log("ID", id);
    if (id) {
      const d = data[id];
      setDataDetails({
        location: d.location,
        id: id,
        gender: d.gender,
        date: d.date,
        time: d.time,
        name: d.name,
        image: `images/${d.name}.jpg`,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="green"><h5>{maleCount}</h5></div>
        <div className="orange"><h5>{femaleCount}</h5></div>
      </div>
      <div className="content">
        <div className="left-sidebar">
          <Menu style={{ color: "#fff" }} />
          <ExitToApp style={{ color: "#fff" }} />
        </div>

        <div className="main-content">
          {dataDetails && <Content {...dataDetails} />}
        </div>

        <div className="right-sidebar">
          <div className="event-header">
            <h3>Event</h3>
            <Button onClick={handleOpenClose}>
              <Tune />
            </Button>
            <Filter {...func} />
          </div>
          <div className="event-list">
            {console.log(data, typeof data, Object.getOwnPropertyNames(data))}
            {data &&
              Object.getOwnPropertyNames(data).map((k, idx) => (
                <Event
                  key={k}
                  {...data[k]}
                  id={k}
                  getDetails={getDetails}
                  handleActiveEvent={handleActiveEvent}
                  cls={activeIndex === idx ? "box active" : "box"}
                  idx={idx}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
