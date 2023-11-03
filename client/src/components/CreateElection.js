import React, { useContext, useState } from "react";
import "../css/createelection.css";
import AlertContext from "../contexts/alert/AlertContext";
const CreateElection = () => {
  const [candidates, setCandidates] = useState([]);
  const [candidate, setCandidate] = useState("");
  const preElection = {
    election_id: "",
    election_name: "",
    edate: "2023-10-01",
  };
  const [election, setElection] = useState(preElection);
  const { unSuccessful, successful } = useContext(AlertContext);
  const addCandidate = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/auth/getuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: candidate }),
      }
    );

    const json = await response.json();
    if (json.error) {
      unSuccessful("Please ener a valid username.");
    } else {
      const { username } = json.user;
      for (let i = 0; i < candidates.length; i++) {
        const element = candidates[i];
        if (element === username) {
          unSuccessful("Candidate has been already added.");
          return;
        }
      }
      let newCandidates = candidates;
      newCandidates.push(username);
      setCandidates(newCandidates);
      setCandidate("");
    }
  };

  const handleOnChange = async (e) => {
    setCandidate(e.target.value);
  };

  const createElection = async (e) => {
    e.preventDefault();

    setElection({
      ...election,
      candidates,
    });
    const response = await fetch(
      `http://${process.env.REACT_APP_HOST}:5000/api/election/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("token"),
        },
        body: JSON.stringify(election),
      }
    );
    const json = await response.json();
    if (json.error) {
      unSuccessful(json.error);
    } else {
      successful("Election has been created successfully.");
      setCandidate([]);
      setElection(preElection);
    }
  };

  const changeElectionCred = async (event) => {
    const { name, value } = event.target;
    setElection({ ...election, [name]: value });
  };

  return (
    <>
      <section className="create-election">
        <div className="add-candidates">
          <form action="">
            <h1>Create a New Election.</h1>
            <div className="ename">
              <label htmlFor="ename">Election ID: </label>
              <input
                type="number"
                name="election_id"
                id="election_id"
                required
                value={election.election_id}
                onChange={changeElectionCred}
              />
              <label htmlFor="ename">Election Name: </label>
              <input
                type="text"
                name="election_name"
                id="election_name"
                required
                onChange={changeElectionCred}
                value={election.election_name}
              />
              <label htmlFor="ename">Election Date: </label>
              <input
                type="date"
                name="edate"
                id="edate"
                value={election.edate}
                onChange={changeElectionCred}
              />
            </div>
            <table border={10}>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Candidate Username</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{candidate}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td>{candidates.length + 1}.</td>
                  <td>
                    <input
                      type="text"
                      name="candiaate"
                      id="candiaate"
                      onChange={handleOnChange}
                      value={candidate}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button onClick={addCandidate}>Add Candidate</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={createElection}>Submit</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateElection;
