const { json } = require("body-parser");
const { Op } = require("sequelize");
const db = require("../models");
const { validationResult } = require("express-validator");
const { User, Election, Candidate, Vote } = db;

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let newElection = await Election.findOne({
    where: { election_id: req.body.election_id },
  });
  const { election_id, candidates } = req.body;

  if (newElection) {
    return res.status(400).json({ error: "This election ID already exists." });
  }

  for (let index = 0; index < candidates.length; index++) {
    const candidate = candidates[index];
    const user = await User.findOne({ where: { username: candidate } });
    if (!user) {
      return res.status(400).json({ error: candidate });
    }
  }

  newElection = Election.build(req.body);
  if (!newElection.start_time) newElection.start_time = "08:00:00";
  if (!newElection.end_time) newElection.end_time = "18:00:00";

  try {
    await newElection.save();
    let newCandidates = [];
    for (let index = 0; index < candidates.length; index++) {
      const candidate = candidates[index];
      newCandidates.push({ username: candidate, election_id });
    }
    console.log(newCandidates);

    await Candidate.bulkCreate(newCandidates);

    return res.status(200).json({ election_id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

// ####################################################################

const getElections = async (req, res) => {
  try {
    const elections = await Election.findAll();
    return res.status(200).json({ elections });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// ####################################################################
const getCandidates = async (req, res) => {
  const election_id = req.params.id;
  try {
    const election = await Election.findOne({
      where: { election_id: election_id },
    });

    if (!election) {
      return res
        .status(400)
        .json({ error: "Election with this ID doesn't exists" });
    }

    const candidates = await Candidate.findAll({
      where: {
        election_id: election_id,
      },
    });
    for (let index = 0; index < candidates.length; index++) {
      const element = candidates[index];
      const user = await User.findOne({
        where: {
          username: element.username,
        },
      });

      candidates[
        index
      ].dataValues.name = `${user.first_name} ${user.last_name}`;

      console.log(candidates[index]);
    }
    return res.status(200).json({ candidates });
  } catch (error) {
    res.status(400).json({ error: "Some error has occured." });
  }
};

// ####################################################################

const vote = async (req, res) => {
  const { username, election_id, candidate_username } = req.body;
  try {
    const vote = await Vote.findOne({
      where: {
        [Op.and]: {
          election_id: election_id,
          candidate_username: candidate_username,
          username: username,
        },
      },
    });

    if (!vote) {
      return res.status(400).json({ error: "You have already voted." });
    }

    await Vote.create({ username, election_id, candidate_username });
    return res.status(400).json({ success: true });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const result = async (req, res) => {
  res.json({ name: "Rahul Maurya" });
};

module.exports = { create, vote, result, getElections, getCandidates };
