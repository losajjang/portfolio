import { useState } from "react";
import TimePicker from "./TimePicker";
import dayjs from "dayjs";

const TimeSelect = () => {
  const [time, setTime] = useState<string>("");
  console.log("time: ", time);

  return (
    <div className="w-full mx-auto">
      <p className="pb-4">선택한 시간: ▶︎{dayjs(time).format("HH:mm")}◀︎</p>
      <TimePicker
        dateValue={dayjs().toString()}
        setTime={(time) => setTime(time)}
        useRolling={true}
      />
    </div>
  );
};

export default TimeSelect;
