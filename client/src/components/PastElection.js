import React, { useContext } from "react";
import ElectionContext from "../contexts/election/ElectionContext";

const PastElection = () => {
  const { curElection } = useContext(ElectionContext);
  const { election_name, election_id } = curElection;

  const results = [
    { name: "Hitesh Maurya", votes: 45 },
    { name: "Vineet Verma", votes: 40 },
    { name: "Aman Singh", votes: 35 },
    { name: "Rahul Maurya", votes: 33 },
    { name: "Alestien Mawrie", votes: 15 },
    { name: "Chandresh Kumar Maurya", votes: 12 },
    { name: "Manish Kumar", votes: 7 },
    { name: "Hazari Triloki", votes: 7 },
  ];

  return (
    <>
      <div className="past-election">
        <h1>Election Name: {election_name}</h1>
        <h2>Election ID: {election_id}</h2>
        <table border={4} cellSpacing={0}>
          <tbody>
            <tr>
              <th>Rank</th>
              <th>Candidate Name</th>
              <th>No. of Votes</th>
            </tr>
            {results.map((candidate, index) => {
              const { name, votes } = candidate;
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{votes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PastElection;
