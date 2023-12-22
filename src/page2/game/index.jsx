import { useEffect, useState } from "react";
import "./index.css";
import GameButton from "../../game-button";
import CustomModal from "../../congratulations-modal/CustomModal";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const Game = () => {
  const [loadingMain, setLoadingMain] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState();

  const { control, reset, handleSubmit } = useForm();

  const { fields, append } = useFieldArray({
    control,
    name: "player",
  });

  useEffect(() => {
    try {
      reset();
      setResult({});
      const game2Json = localStorage.getItem("game2");
      const game2Data = JSON.parse(game2Json);

      const headerRow = {};
      Array(game2Data.judgeCount)
        .fill(null)
        .map((_, index) => {
          headerRow[`column_${index}`] = "";
        });

      append({ ...headerRow });

      Array(game2Data.playerCount)
        .fill(null)
        .map((_, index) => {
          const bodyRow = {
            [`player_${index}`]: "",
          };
          Array(game2Data.judgeCount)
            .fill(null)
            .map((_, index) => {
              bodyRow[`column_${index}`] = "";
            });
          append({ ...bodyRow });
        });

      setLoadingMain(false);
    } catch (err) {
      setLoadingMain(false);
    }
  }, [append, reset]);

  const onSubmit = (values) => {
    const _result = {};
    values.player.map((row, index) => {
      if (index > 0) {
        let playerName = "";
        Object.keys(row).map((colKey, colIndex) => {
          if (colIndex === 0) {
            playerName = row[colKey];
            _result[playerName] = 0;
          } else {
            _result[playerName] += Number(row[colKey]);
          }
        });
      }
    });
    setResult(_result);
    setShowModal(true);
  };

  if (loadingMain) {
    return null;
  }

  return (
    <div className="backgroundWrapper">
      <CustomModal
        show={showModal}
        title={"Ялагч"}
        data={result}
        gameKey="game2"
        onHide={() => setShowModal(false)}
      />
      <h1
        className="title"
        style={{
          textAlign: "center",
          width: "100%",
          fontSize: 42,
          marginBottom: 40,
        }}
      >
        Онооны самбар
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            maxHeight: 500,
            overflowY: "auto",
          }}
        >
          <table
            style={{
              maxWidth: 1024,
            }}
          >
            <thead>
              <tr>
                <td></td>
                {Object.keys(fields[0]).map((colKey, index) => {
                  if (colKey === "id") {
                    return null;
                  }
                  return (
                    <td key={`headerCell_${index}`}>
                      <Controller
                        name={`player.0.${colKey}`}
                        control={control}
                        rules={{
                          required: "Талбар хоосон байна.",
                        }}
                        render={({ field, fieldState }) => (
                          <input
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}
                            className={`input ${
                              fieldState.error ? "errorInput" : ""
                            }`}
                            placeholder="Шүүгчийн нэр"
                            type="text"
                            style={{
                              width: "calc(100% - 32px)",
                            }}
                          />
                        )}
                      />
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {fields.map((row, index) => {
                if (index === 0) {
                  return null;
                }
                return (
                  <tr key={`row_${index}`}>
                    {Object.keys(row).map((colKey, colIndex) => {
                      if (colKey === "id") {
                        return null;
                      }
                      if (colIndex === 0) {
                        return (
                          <td key={`bodyCell_${colIndex}`}>
                            <Controller
                              name={`player.${index}.${colKey}`}
                              control={control}
                              rules={{
                                required: "Талбар хоосон байна.",
                              }}
                              render={({ field, fieldState }) => (
                                <input
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                  }}
                                  className={`input ${
                                    fieldState.error ? "errorInput" : ""
                                  }`}
                                  placeholder="Оролцогчын нэр"
                                  type="text"
                                  style={{
                                    width: "calc(100% - 32px)",
                                  }}
                                />
                              )}
                            />
                          </td>
                        );
                      }
                      return (
                        <td key={`bodyCell_${colIndex}`}>
                          <Controller
                            name={`player.${index}.${colKey}`}
                            control={control}
                            rules={{
                              required: "Талбар хоосон байна.",
                            }}
                            render={({ field, fieldState }) => (
                              <input
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e.target.value);
                                }}
                                className={`input ${
                                  fieldState.error ? "errorInput" : ""
                                }`}
                                placeholder="Оноо"
                                type="number"
                                style={{
                                  width: "calc(100% - 32px)",
                                }}
                              />
                            )}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{
            marginTop: 40,
          }}
        >
          <GameButton
            type="submit"
            style={{
              fontSize: 24,
              height: 74,
              width: 300,
            }}
          >
            Ялагч тодруулах
          </GameButton>
        </div>
      </form>
    </div>
  );
};

export default Game;
