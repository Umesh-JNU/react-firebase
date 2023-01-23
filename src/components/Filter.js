import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const LocationFilter = ({ handleLocationChange, city }) => {
  return (
    <>
      <Typography>Location</Typography>
      <Box sx={{ minWidth: 120, marginTop: "1rem" }}>
        <FormControl sx={{ width: "50%" }}>
          <InputLabel id="simple-select-label">Location</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={city}
            label="Location"
            onChange={(e) => handleLocationChange(e.target.value)}
          >
            <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
            <MenuItem value={"Chennai"}>Chennai</MenuItem>
            <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

const GenderFilter = ({ handleGenderChange }) => {
  return (
    <>
      <Typography>Gender</Typography>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => handleGenderChange(e.target.value)}
        >
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
    </>
  );
};

const DateFilter = ({ handleDateChange, val }) => {
  return (
    <>
      <Typography>Date</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Date"
          inputFormat="MM/DD/YYYY"
          value={val}
          onChange={(e) => handleDateChange(e)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

const Filter = ({
  applyFilter,
  handleOpenClose,
  handleLocationChange,
  handleGenderChange,
  handleDateChange,
  city,
  val,
  open,
}) => {
  return (
    <>
      <Dialog open={open} onClose={() => handleOpenClose()}>
        <DialogTitle>Apply Filter</DialogTitle>
        <DialogContent>
          <LocationFilter
            handleLocationChange={handleLocationChange}
            city={city}
          />
          <GenderFilter handleGenderChange={handleGenderChange} />
          <DateFilter handleDateChange={handleDateChange} val={val} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOpenClose()}>Cancel</Button>
          <Button onClick={() => applyFilter()}>Filter</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Filter;
