import React, { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import { getImage } from "../firebase";

const Content = ({ location, id, gender, date, time, name, image }) => {
  const [img, setImg] = useState();
  useEffect(() => {
    async function getImg() {
      setImg(await getImage(image));
    }
    getImg();
  }, [image]);

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        style={{
          flex: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <h3>
          {id}
          <br />
          Person Detected
        </h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>:{name}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>:{location}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>:{date}</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>:{time}</td>
            </tr>
          </tbody>
        </table>
        <p>
          Description:
          <br />
          {name} detected at <br />
          {location} on {date}.
        </p>
      </Box>
      <Box style={{ flex: "50%" }}>
        <div>{gender}</div>
        {img ? <img src={img} alt={image} /> : "Loading Image..."}
      </Box>
    </Stack>
  );
};

export default Content;
