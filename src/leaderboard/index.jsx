import React from "react";
import "./index.css";
import { GiTrophy } from "react-icons/gi";

// eslint-disable-next-line react/prop-types
const Leaderboard = ({ data }) => {
  const orderedData = Object.keys(data)
    .map((name) => {
      return {
        name,
        point: data[name],
      };
    })
    .sort((a, b) => b.point - a.point);
  return (
    <div className="leaderboard">
      <ul>
        {orderedData.map((item, index) => {
          if (index === 0) {
            return (
              <li key={index}>
                <div className="group">
                  <div className="one">
                    <GiTrophy size={60} />
                    <span className="hashtag">{index + 1}</span>
                  </div>
                  <div className="name">{item.name}</div>
                </div>
                <div className="point one">{item.point}</div>
              </li>
            );
          }
          if (index === 1) {
            return (
              <li key={index}>
                <div className="group">
                  <div className="two">
                    <GiTrophy size={60} />
                    <span className="hashtag">{index + 1}</span>
                  </div>
                  <div className="name">{item.name}</div>
                </div>
                <div className="point two">{item.point}</div>
              </li>
            );
          }
          if (index === 2) {
            return (
              <li key={index}>
                <div className="group">
                  <div className="three">
                    <GiTrophy size={60} />
                    <span className="hashtag">{index + 1}</span>
                  </div>
                  <div className="name">{item.name}</div>
                </div>
                <div className="point three">{item.point}</div>
              </li>
            );
          }
          return (
            <li key={index}>
              <div className="group">
                <div className="other">
                  <GiTrophy size={60} />
                  <span className="hashtag">{index + 1}</span>
                </div>
                <div className="name">{item.name}</div>
              </div>
              <div className="point other">{item.point}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;
