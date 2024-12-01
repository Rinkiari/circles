import React from "react";
import styles from "./FillMyProfBlock.module.scss";

import ProgressLine from "../ProgressLine";

const FillMyProfileBlock = () => {
  const [step, setStep] = React.useState(1);
  const [formValues, setFormValues] = React.useState({
    name: "",
    surname: "",
    gender: "",
    date_of_birth: "",
    city: "",
  });

  // mассив для генерации placeholder'ов
  const infoArr = [
    { label: "Имя", key: "name" },
    { label: "Фамилия", key: "surname" },
    { label: "Пол", key: "gender" },
    { label: "День рождения", key: "date_of_birth" },
    { label: "Город", key: "city" },
  ];

  const handleInputChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNextStep = () => {
    const isFormValid = Object.values(formValues).every(
      (value) => value.trim() !== "",
    );
    if (!isFormValid) {
      alert("Пожалуйста, заполните все поля перед продолжением!");
      return;
    }
    setStep((prev) => Math.min(3, prev + 1));
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.top_inner_cont}>
        <h2>ОБЩАЯ ИНФОРМАЦИЯ</h2>
        <p onClick={handleNextStep}>Далее</p>
      </div>
      <ProgressLine currentStep={step} />
      <div className={styles.bottom_inner_cont}>
        <div className={styles.general_info_box}>
          <form>
            {infoArr.map(({ label, key }) => (
              <input
                required
                className={styles.inputek}
                key={key}
                placeholder={label}
                value={formValues[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            ))}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FillMyProfileBlock;
