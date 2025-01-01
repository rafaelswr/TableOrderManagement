import React, { useState, useEffect } from "react";

export function HourOpenClose(item) {
  const week = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  const [isOpen, setIsOpen] = useState(false);
  const [currentDayInfoState, setCurrentDayInfoState] = useState(null);

  const currentWeekDay = week[new Date().getDay()];
  const horario = item.weekDays;
  const currentDayInfo = horario.find(info => info.day === currentWeekDay);

  useEffect(() => {
    if (currentDayInfo && currentDayInfo.close !== "" && currentDayInfo.open !== "") {
      const currentTime = new Date();
      const openTime = new Date();
      const closeTime = new Date();

      openTime.setHours(Number(currentDayInfo.open.split(":")[0]), Number(currentDayInfo.open.split(":")[1]), 0);
      closeTime.setHours(Number(currentDayInfo.close.split(":")[0]), Number(currentDayInfo.close.split(":")[1]), 0);

      if (openTime > closeTime) {
        closeTime.setDate(closeTime.getDate() + 1);
        openTime.setDate(openTime.getDate() + 1);
      }

      if (currentTime >= openTime && currentTime <= closeTime) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }

    setCurrentDayInfoState(currentDayInfo);
  }, [currentDayInfoState]);

  return { isOpen, currentDayInfo };
}


