import React from "react";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import "./styles.css";

type Inputs = {
  name: string;
  birthYear: string;
};

function App() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation

  const getPrevYears = (startYear: number) => {
    const currYear = new Date().getFullYear();
    const back = currYear - startYear;
    const result = Array.from(
      { length: back },
      (_value, i) => currYear - back + i
    ).concat(currYear);
    return result.sort((a, b) => b - a);
  };

  const years = getPrevYears(1900);

  const handleClick = () => {
    if (!watch("birthYear")) {
      setValue("birthYear", "1980");
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setValue("birthYear", e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>姓名</label>
      <input {...register("name")} defaultValue="test" />
      <label>出生年份</label>
      <div style={{ position: "relative" }}>
        <input {...register("birthYear")} placeholder="请选择出生年份" />
        <select
          onClick={handleClick}
          onChange={handleChange}
          defaultValue="1980"
          style={{ position: "absolute", top: 0, opacity: 0 }}
        >
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>
      <input type="submit" />
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
