import React, { createRef, useContext, useEffect, useState } from "react";
import Button from "../../button";
import { useNavigate } from "react-router-dom";
import { MdAddAPhoto } from "react-icons/md";
import "./index.css";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { MainContext } from "../../mainContext";

const ConfigGame2 = () => {
  const { control, handleSubmit, watch, setValue } = useForm();
  const [refs, setRefs] = useState([]);
  const { setFormData } = useContext(MainContext);

  const { fields, append } = useFieldArray({
    control,
    name: "image",
  });

  const navigate = useNavigate();

  const configDone = (values) => {
    localStorage.setItem("game2", JSON.stringify(values));
    setFormData(values);

    navigate("/game2/game");
  };

  const pCount = watch("playerCount");

  useEffect(() => {
    setValue("image", []);
    if (pCount > 0) {
      const refs = [];
      Array(pCount)
        .fill("")
        .map(() => {
          append({ src: "" });
          refs.push(createRef(null));
        });
      setRefs([...refs]);
    } else {
      setRefs([]);
    }
  }, [pCount, append, setValue]);

  return (
    <form className="backgroundWrapper" onSubmit={handleSubmit(configDone)}>
      <div
        className="formGroup"
        style={{
          marginTop: 16,
        }}
      >
        <label>Шүүгчдийн тоо</label>
        <Controller
          control={control}
          name="judgeCount"
          rules={{
            required: "Шүүгчийн тоо оруулна уу",
          }}
          render={({ field, fieldState }) => {
            return (
              <input
                className={`input ${fieldState.error ? " errorInput" : ""}`}
                type="number"
                placeholder="Шүүгчдийн тоо"
                {...field}
                onChange={(e) => {
                  const num = Number(e.target.value);
                  field.onChange(num > 0 ? num : "");
                }}
              />
            );
          }}
        />
      </div>
      <div className="formGroup">
        <label>Оролцогчдын тоо</label>
        <Controller
          control={control}
          name="playerCount"
          rules={{
            required: "Оролцогчийн тоо оруулна уу",
          }}
          render={({ field, fieldState }) => {
            return (
              <input
                className={`input ${fieldState.error ? " errorInput" : ""}`}
                type="number"
                placeholder="Оролцогчдын тоо"
                {...field}
                onChange={(e) => {
                  const num = Number(e.target.value);
                  field.onChange(num > 0 ? num : "");
                }}
              />
            );
          }}
        />
      </div>
      {pCount > 0 ? (
        <div className="formGroup">
          <label>Оролцогчдын зураг</label>
          <div className="imageButtonWrap">
            {fields.map((_field, index) => {
              return (
                <Controller
                  key={_field.id}
                  name={`image.${index}.src`}
                  control={control}
                  render={({ field }) => {
                    console.log(field.value)
                    return (
                      <>
                        <input
                          type="file"
                          accept="image/png,image/jpg,image/jpeg"
                          hidden
                          value={""}
                          ref={refs[index]}
                          name={field.name}
                          onChange={(e) => {
                            field.onChange(e.target.files[0]);
                          }}
                        />
                        <div
                          key={`k_${index}`}
                          className="imageButton"
                          onClick={() => {
                            refs[index].current.click();
                          }}
                        >
                          {field?.value ? (
                            <img
                              alt={`img_${index}`}
                              className="upImg"
                              src={URL.createObjectURL(field.value)}
                              height={100}
                              width={100}
                            />
                          ) : (
                            <MdAddAPhoto className="img" />
                          )}
                        </div>
                      </>
                    );
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="d-flex justify-content-end">
        <Button
          type="submit"
          style={{
            marginTop: 16,
          }}
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </form>
  );
};

export default ConfigGame2;
