import React, {Fragment} from "react";

const History = () => {
  const timelineEvents = [
    {
      year: "2005",
      title: "Company Founded",
      description: "Our journey began with a small team of passionate innovators."
    },
    {
      year: "2010",
      title: "First Major Product",
      description: "Launched our flagship product that revolutionized the industry."
    },
    {
      year: "2015",
      title: "Global Expansion",
      description: "Opened offices in 3 new countries across Europe and Asia."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Successfully transitioned all services to cloud platforms."
    },
    {
      year: "2023",
      title: "Current Milestone",
      description: "Reached 1 million satisfied customers worldwide."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Our History Timeline</h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 w-1 h-full bg-gray-200 transform -translate-x-1/2 md:left-6"></div>

        {/* Timeline items */}
        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className="relative flex flex-col md:flex-row items-center"
            >
              {/* Year bubble */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-lg z-10 mb-4 md:mb-0 md:mr-8">
                {event.year}
              </div>

              {/* Content card */}
              <div className={`flex-1 p-6 rounded-lg shadow-md ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} md:w-3/4`}>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;