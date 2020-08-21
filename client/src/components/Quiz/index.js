/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import "./arrow.css";
import API from "../../utils/API";
import Button from "react-bootstrap/Button";
import Map from "./Map";

let quizArr = [];

function Quiz() {
  const continent = useParams().continent;

  const [country, setCountry] = useState("");
  const [questionCount, setQuestionCount] = useState(1);

  const countryArr = useRef(null);
  useEffect(() => {
    API.getCountryByContinent(continent).then((res) => {
      countryArr.current = res.data; // Country Array from response

      getRandomCountry();
    });

    //TODO: Make call gto map api to retrieve the map for the given continent
  }, []);

  //Retrieving random country from the array to ask the user.
  function getRandomCountry() {
    console.log(quizArr);

    const randomCountry =
      countryArr.current[Math.floor(Math.random() * countryArr.current.length)];
    quizArr.push(randomCountry);
    console.log(quizArr);
    setCountry(randomCountry);
    setQuestionCount(questionCount + 1);
    //TODO: Add functionality to check for correct answer and record the score
  }

  return (
    <div className="container mt-5 p-4">
      <div className="row text-center title-container p-2">
        <div className="col-sm-12">
          <h2 className="continent-heading">{continent}</h2>
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-sm-6">
          {/* 3 rows of elements */}
          <div className="row">
            <p className="question-container">Where is {country}?</p>
          </div>
          <div className="row mb-5 click-container">
            Click your Answer on the Map
            <div id="arrowAnim">
              <div className="arrowSliding">
                <div className="arrow"></div>
              </div>
              <div className="arrowSliding delay1">
                <div className="arrow"></div>
              </div>
              <div className="arrowSliding delay2">
                <div className="arrow"></div>
              </div>
              <div className="arrowSliding delay3">
                <div className="arrow"></div>
              </div>
            </div>
          </div>
          <div className="row next-container m-4">
            {questionCount <= 5 ? (
              <Button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={getRandomCountry}
              >
                <h3>NEXT QUESTION</h3>
              </Button>
            ) : (
              <Button
                type="button"
                className="btn btn-danger btn-lg"
                href={"/results/" + continent}
              >
                <h3>VIEW RESULTS</h3>
              </Button>
            )}
          </div>
        </div>
        <div className="col-sm-6 map-container p-5">
          <Map continent={continent} />
        </div>
      </div>
    </div>
  );
}

export default Quiz;
