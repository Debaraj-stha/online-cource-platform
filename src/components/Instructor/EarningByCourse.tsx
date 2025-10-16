
import { useDispatch, useSelector } from "react-redux";
import DynamicChart from "../DynamicChart";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";



const EarningByCourse = () => {
  let { earnings } = useSelector((state: RootState) => state.instructor)
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {

  }, [dispatch])


  const earningByCourse = earnings?.earningByCourse
  const courses = earningByCourse?.map((ele) => ele.course) ?? [];
  const totalEarningByCourse = earningByCourse?.map((ele) => ele.totalEarning) ?? [];

  // Find highest earning course
  const maxEarning = Math.max(...totalEarningByCourse);
  const maxIndex = totalEarningByCourse.indexOf(maxEarning);


  const minEarning = Math.min(...totalEarningByCourse);
  const minIndex = totalEarningByCourse.indexOf(minEarning);
  const data = {
    labels: courses,
    datasets: [
      {
        label: "Earnings ($)",
        data: totalEarningByCourse.map((val, index) =>
          index !== maxIndex && index !== minIndex ? val : null
        ),
        backgroundColor: "rgba(74, 222, 128, 0.7)",
        borderWidth: 2,
      },
      {
        label: "Maximum ($)",
        data: totalEarningByCourse.map((val, index) =>
          index === maxIndex ? val : null
        ),
        backgroundColor: "rgba(255, 206, 86, 0.9)",
        borderWidth: 2,
      },
      {
        label: "Minimum ($)",
        data: totalEarningByCourse.map((val, index) =>
          index === minIndex ? val : null
        ),
        backgroundColor: "rgba(255, 2, 128, 0.7)",
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
