import React from "react";
import Day from "./components/day";

export default function Home() {
  var date = new Date();

  // add a day
 

  


  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Day date={date}/>
      <Day date={date} />
      <Day date={date} />
      <Day date={date} />
      <Day date={date} />
      <Day date={date} />
      <Day date={date} />
      
    </div>
  );
}
