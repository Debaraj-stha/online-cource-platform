
import DynamicChart from "../DynamicChart";



const EarningByCourse = () => {
  // Sample course earnings
  const courses = ["React", "Node", "Python", "Django", "TypeScript"];
  const earnings = [5000, 7000, 12000, 8000, 10000];

  // Find highest earning course
  const maxEarning = Math.max(...earnings);
  const maxIndex = earnings.indexOf(maxEarning);

  // Colors: highlight highest earning
  const backgroundColors = earnings.map((_, idx) =>
    idx === maxIndex ? "rgba(255, 206, 86, 0.9)" : "rgba(74, 222, 128, 0.7)"
  );

  const data = {
    labels: courses,
    datasets: [
      {
        label: "Earnings ($)",
        data: earnings,
        backgroundColor: backgroundColors,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff", // legend text color
        },
      },
      title: {
        display: true,
        text: "Earnings by Course",
        color: "#fff",
      },

    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#374151" },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "#374151" },
      },
    },
  };


  return (
    <div className="chart_bg" >
      <DynamicChart type="bar" data={data} options={options} />
    </div>
  );
};

export default EarningByCourse;
