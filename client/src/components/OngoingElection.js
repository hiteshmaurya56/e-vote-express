import React, { useContext, useEffect, useState } from "react";
import "../css/ongoingelection.css";
import ElectionContext from "../contexts/election/ElectionContext";
const OngoingElection = () => {
  const { curElection } = useContext(ElectionContext);
  const { election_id, election_name } = curElection;
  const [vote, setVote] = useState({ username: "" });

  const [candidates, setCandidates] = useState([]);
  const getCandidates = async () => {
    console.log(election_id);
    const response = await fetch(
      `http://localhost:5000/api/election/getallcandidates/${election_id}`,
      {
        method: "GET",
        headers: { "auth-token": localStorage.getItem("token") },
      }
    );
    const json = await response.json();
    setCandidates(json.candidates);
  };

  useEffect(() => {
    getCandidates();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(vote);
    const response = await fetch("http://localhost:5000/api/election/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ election_id, username, candidate_username }),
    });
  };

  const handleChange = (e) => {
    setVote(e.target.value);
  };

  const Vote = (props) => {
    return (
      <>
        <tr>
          <td>{props.index + 1}</td>
          <td>{props.name}</td>
          <td>
            <input
              value={props.username}
              type="radio"
              name="k"
              id={props.username}
              onChange={handleChange}
            />
          </td>
        </tr>
      </>
    );
  };

  return (
    <div className="voting">
      <h1>Election Name: {election_name}</h1>
      <h2>Election ID: {election_id}</h2>
      <table border={4} cellSpacing={0}>
        <tbody>
          <tr>
            <th>Sr. No.</th>
            <th>Candidate Name</th>
            <th>Vote</th>
          </tr>
          {candidates.map((candidate, index) => {
            const { name, username } = candidate;
            return (
              <Vote
                key={username}
                name={name}
                username={username}
                index={index}
              />
            );
          })}

          <tr>
            <th colSpan={3}>
              <button onClick={handleClick}>Submit</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OngoingElection;
