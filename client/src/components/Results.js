import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const getResults = async () => {
    if (!localStorage.getItem("token")) navigate("../login");
  };

  useEffect(() => {
    getResults();
  });

  if (!localStorage.getItem("token")) navigate("../login");
  const elections = [
    { id: 42624, name: "Hitesh Maurya", winner: "Hitesh Maurya" },
    { id: 42624, name: "Hitesh Maurya", winner: "Hitesh Maurya" },
    { id: 42624, name: "Hitesh Maurya", winner: "Hitesh Maurya" },
    { id: 42624, name: "Hitesh Maurya", winner: "Hitesh Maurya" },
    { id: 42624, name: "Hitesh Maurya", winner: "Hitesh Maurya" },
    { id: 42624, name: "Hitesh Maurya", winner: "Hitesh Maurya" },
    { id: 42624, name: "Hitesh Maurya", winner: "Hitesh Maurya" },
  ];

  return (
    <div className="results">
      <table border={4} cellSpacing={0}>
        <tbody>
          <tr>
            <th colSpan={3}>
              <h1>Results</h1>
            </th>
          </tr>
          <tr>
            <th>Election ID</th>
            <th>Election Name</th>
            <th>Winner</th>
          </tr>
          {elections.map((election, index) => {
            const { id, name, winner } = election;
            return (
              <>
                <tr>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{winner}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AboutUs;
