import { act } from "react";
import { Activity } from "./activity";
import { faker } from '@faker-js/faker';

export default function Day() {
  const roundToNearestFiveMinutes = (date) => {
    const minutes = date.getUTCMinutes();
    const roundedMinutes = Math.round(minutes / 5) * 5;
    date.setUTCMinutes(roundedMinutes);
    return date;
  };

  const start = roundToNearestFiveMinutes(faker.date.anytime());
  const startTime = start.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC' // or use your specific timezone, e.g., 'America/New_York'
  });
  console.log(start);
  console.log(startTime);

  const end = roundToNearestFiveMinutes(faker.date.anytime());
  const endTime = end.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC' // or use your specific timezone, e.g., 'America/New_York'
  });
  console.log(end);
  console.log(endTime);






  const test = new Activity("test", startTime, endTime);

  console.log(test.getActivity());

  const activity = test.getActivity();

  const activityArray = []

  activityArray.length = 288;
  activityArray.fill(1, activity.startInMinutes/5, activity.endInMinutes/5);
  console.log(activityArray);

    const divs = Array.from({ length: 288 }, (_, index) => (
        <div
            key={index}
            className={`h-1/288 w-full ${activityArray[index] === 1 ? 'bg-red-500' : 'bg-green-500'}`}
        ></div>
    ));

  return (
    <div className="h-screen w-1/7 border-2 border-white flex flex-col items-center justify-items-center">
      {divs}
    </div>
  );
}