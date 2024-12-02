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

    console.log(activities);


    const divs = Array.from({ length: 288 }, (_, index) => {
        const minutes = index * 5;
        const activity = activities.find(activity => activity.isWithinTimeRange(minutes));
        if (activity) {
            
            console.log(activity.calculateCoveredHeight());
        }
        return (
            <div
                key={index}
                className={`h-1/288 w-full ${activity ? 'bg-red-500' : 'bg-green-500'}`}
            >
                {activity ? activity.name : ''}
            </div>
        );
    });

    return (
        <div className="h-screen w-1/7 border-2 border-white flex flex-col items-center justify-items-center">
            {divs}
        </div>
    );
}