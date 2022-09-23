import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/covidNigeriaSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { RootState } from "../redux/store";
import Spinner from 'react-bootstrap/Spinner';
import { Button, TextField } from "@mui/material";
import { Chart } from "react-google-charts";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const { loading, entities } = useSelector(
    (state: RootState) => state.covidNigeria
  );
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${entities?.state} State Bar and Pie Chart`,
      },
    },
  };

  const labels = ["casesOnAdmission", "confirmedCases", "death", "discharged"];

  const { casesOnAdmission, confirmedCases, death, discharged } = entities;
  const data2 = {
    labels,
    datasets: [
      {
        label: "Data",
        data: { casesOnAdmission, confirmedCases, death, discharged },
        backgroundColor: "#8da832",
      },
    ],
  };
 const data = [
    
  ["Case", "number"],
  ["casesOnAdmission", casesOnAdmission],
  ["confirmedCases", confirmedCases],
  ["death", death],
  ["discharged", discharged],
 
  ];
  return (
    <>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter state"
        />
        <Button
          style={{ marginLeft: 5 }}
          variant="contained"
          color="success"
          onClick={() => {
            dispatch(fetchData(input) as any);
          }}
        >
          Search
        </Button>
      </div>
      {entities.state !== undefined ? (
        <>
          <Bar options={options} data={data2} />
          <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
        </>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: "2rem",
            marginTop: "2rem",
            opacity: "0.6",
          }}
        >
          {loading === true ? <Spinner animation="border" size="sm"/>: "Search for a state in Nigeria."}
        </p>
      )}
    </>
  );
};
