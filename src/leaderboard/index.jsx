import React, { useContext } from "react";
import "./index.css";
import { GiTrophy } from "react-icons/gi";
import { MainContext } from "../mainContext";
import { FaUserCircle } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Leaderboard = ({ data }) => {
  const { formData } = useContext(MainContext);

  let orderedData = Object.keys(data)
    .map((name, index) => {
      return {
        name,
        point: Number(data[name]),
        img: formData?.image[index]?.src,
      };
    })
    .sort((a, b) => b.point - a.point);

  const grouped = orderedData.reduce((result, currentValue) => {
    (result[currentValue["point"]] = result[currentValue["point"]] || []).push(
      currentValue
    );
    return result;
  }, {});

  orderedData = Object.keys(grouped)
    .map((point) => {
      return {
        point,
        list: grouped[point],
      };
    })
    .sort((a, b) => b.point - a.point);

  return (
    <div className="leaderboard">
      <ul>
        {orderedData.map((item, index) => {
          if (index === 0) {
            return item.list.map((listItem, itemIndex) => {
              return (
                <li key={`${index}_${itemIndex}`}>
                  <div className="group">
                    <div className="one">
                      <GiTrophy size={60} />
                      <span className="hashtag">{index + 1}</span>
                    </div>
                    <div className="name d-flex align-items-center">
                      <div
                        style={{
                          marginRight: 16,
                          marginTop: 10,
                        }}
                      >
                        {listItem.img ? (
                          <img
                            src={URL.createObjectURL(listItem.img)}
                            alt="img"
                            className="upImg3"
                          />
                        ) : (
                          <FaUserCircle className="img3" />
                        )}
                      </div>
                      {listItem.name}
                    </div>
                  </div>
                  <div className="point one">{listItem.point}</div>
                </li>
              );
            });
          }
          if (index === 1) {
            return item.list.map((listItem, itemIndex) => {
              return (
                <li key={`${index}_${itemIndex}`}>
                  <div className="group">
                    <div className="two">
                      <GiTrophy size={60} />
                      <span className="hashtag">{index + 1}</span>
                    </div>
                    <div className="name d-flex align-items-center">
                      <div
                        style={{
                          marginRight: 16,
                          marginTop: 10,
                        }}
                      >
                        {listItem.img ? (
                          <img
                            src={URL.createObjectURL(listItem.img)}
                            alt="img"
                            className="upImg3"
                          />
                        ) : (
                          <FaUserCircle className="img3" />
                        )}
                      </div>
                      {listItem.name}
                    </div>
                  </div>
                  <div className="point two">{listItem.point}</div>
                </li>
              );
            });
          }
          if (index === 2) {
            return item.list.map((listItem, itemIndex) => {
              return (
                <li key={`${index}_${itemIndex}`}>
                  <div className="group">
                    <div className="three">
                      <GiTrophy size={60} />
                      <span className="hashtag">{index + 1}</span>
                    </div>
                    <div className="name d-flex align-items-center">
                      <div
                        style={{
                          marginRight: 16,
                          marginTop: 10,
                        }}
                      >
                        {listItem.img ? (
                          <img
                            src={URL.createObjectURL(listItem.img)}
                            alt="img"
                            className="upImg3"
                          />
                        ) : (
                          <FaUserCircle className="img3" />
                        )}
                      </div>
                      {listItem.name}
                    </div>
                  </div>
                  <div className="point three">{listItem.point}</div>
                </li>
              );
            });
          }
          return item.list.map((listItem, itemIndex) => {
            return (
              <li key={`${index}_${itemIndex}`}>
                <div className="group">
                  <div className="other">
                    <GiTrophy size={60} />
                    <span className="hashtag">{index + 1}</span>
                  </div>
                  <div className="name d-flex align-items-center">
                    <div
                      style={{
                        marginRight: 16,
                        marginTop: 10,
                      }}
                    >
                      {listItem.img ? (
                        <img
                          src={URL.createObjectURL(listItem.img)}
                          alt="img"
                          className="upImg3"
                        />
                      ) : (
                        <FaUserCircle className="img3" />
                      )}
                    </div>
                    {listItem.name}
                  </div>
                </div>
                <div className="point other">{listItem.point}</div>
              </li>
            );
          });
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;
