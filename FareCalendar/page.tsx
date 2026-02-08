"use client";
import { useState } from "react";
import FareCalendarComponent from "./_components/FareViewcom";

function FareCalendar() {
  const resetReduxStore = false;
  const query = {
    depCityName: "Yerevan",
    depCity: "EVN",
    arrCityName: "Tivat",
    arrCity: "TIV",
    startDate: "2026-05-01",
    endDate: "2026-05-01",
  };
  // const defaultStartDate = {
  //     "value": "2026-05-01",
  //     "label": "May, 2026"
  // }
  // const defaultEndDate = {
  //     "value": "2026-05-01",
  //     "label": "May, 2026"
  // }
  const [defaultEndDate, setDefaultEndDate] = useState({
    value: "2026-05-01",
    label: "May, 2026",
  });
  const [defaultStartDate, setDefaultStartDate] = useState({
    value: "2026-05-01",
    label: "May, 2026",
  });

  return (
    <div className="fareCalendarView">
      <section className=" inner_content pt-0">
        {resetReduxStore ? (
          <></>
        ) : (
          <FareCalendarComponent
            query={query}
            defaultStartDate={defaultStartDate}
            defaultEndDate={defaultEndDate}
            setDefaultEndDate={setDefaultEndDate}
            setDefaultStartDate={setDefaultStartDate}
          />
        )}
      </section>
    </div>
  );
}

export default FareCalendar;
