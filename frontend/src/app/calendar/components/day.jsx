import { act } from "react";
import { Activity, EmptyActivity } from "./activity";
import { faker } from '@faker-js/faker';

export default function Day({ date }) {
    const roundToNearestFiveMinutes = (date) => {
        const minutes = date.getUTCMinutes();
        const roundedMinutes = Math.round(minutes / 5) * 5;
        date.setUTCMinutes(roundedMinutes);
        return date;
    };

    const generateTime = () => {
        const date = roundToNearestFiveMinutes(faker.date.anytime());
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'UTC' // or use your specific timezone, e.g., 'America/New_York'
        });
    };

    const activities = [];
    for (let i = 0; i < 3; i++) { // Generate 3 activities for example
        let startTime = generateTime();
        let endTime = generateTime();

        // Ensure endTime is after startTime
        while (endTime <= startTime) {
            endTime = generateTime();
        }

        activities.push(new Activity(`Activity ${i + 1}`, startTime, endTime));
    }

    console.log("Initial activities:", activities);

    activities.sort((a, b) => a.startInMinutes - b.startInMinutes);

    console.log("Sorted activities:", activities);
    if (activities[0].startInMinutes > 0) {
        activities.unshift(new EmptyActivity(0, activities[0].startInMinutes));
    }
    console.log("After unshift:", activities);
    for (let i = 0; i < activities.length - 1; i++) {
        if (activities[i].endInMinutes === activities[i + 1].startInMinutes) {
            continue;
        }
        console.log("Activity before splice:", activities[i]);
        activities.splice(i + 1, 0, new EmptyActivity(activities[i].endInMinutes, activities[i + 1].startInMinutes));
        console.log("After splice:", activities);
    }
    activities.sort((a, b) => a.startInMinutes - b.startInMinutes);

    console.log("Final sorted activities:", activities);

    let dateString = date.toISOString().split('T')[0];

    const divs = activities.map((activity, index) => {
        const heightPercentage = (activity.height * 100).toFixed(2) + '%'; // Convert decimal to percentage string
        if (activity.isEmpty) {
            return (
                <div key={index} className="w-full" style={{ height: heightPercentage }}>
                </div>
            );
        }
        return (
            <div key={index} className="w-full border-2 border-white bg-blue-500" style={{ height: heightPercentage }}>
                {activity.name}
            </div>
        );
    });

    return (
        <div className="h-screen w-1/7 border-2 border-white flex flex-col items-center justify-items-center">
            <div className="w-full flex">
                <div className="w-1/2 border-r-2 border-white">
                    <p>{dateString}</p>
                    {divs}
                </div>
                <div className="w-1/2">
                    <p>{dateString}</p>
                    {divs}
                </div>
            </div>
            
        </div>
    );
}