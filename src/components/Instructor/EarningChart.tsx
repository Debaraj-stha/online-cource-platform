import { useRef, useState } from "react";
import { FaChartLine } from "react-icons/fa";
import DynamicChart from "../DynamicChart";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Skeleton from "../Skeleton";
import {  useSelector } from "react-redux";
import type {  RootState } from "../../store/store";
import { months } from "../../constants/instructors";
import useLoadEarningStats from "../../hooks/useLoadEarningStats";


const EarningChart = () => {
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const { loadStats, loading } = useLoadEarningStats()
  loadStats()

  const { reports } = useSelector((state: RootState) => state.instructor)
  const monthlyEarnings = reports?.earningByInstructorPerMonth



  const earningAmounts = monthlyEarnings?.map(e => e.totalEarning) ?? [];
  const earningMonths = monthlyEarnings?.map(e => e.month) ?? [];



  const maxEarning = Math.max(...earningAmounts);
  const minEarning = Math.min(...earningAmounts);
  const maxIndex = earningAmounts.indexOf(maxEarning); // Index of highest month
  const minIndex = earningAmounts.indexOf(minEarning); // Index of lowest month


  const monthsInWord = earningMonths.map((m) => months[m - 1])

  const backgroundColors = earningAmounts.map((_, index) => {
    if (index === maxIndex) return "rgba(34,0,225,0.9)"; // green for max
    if (index === minIndex) return "rgba(250,204,21,0.9)"; // yellow for min
    return "rgba(0,222,0,0.5)"; // default soft green
  });


  const data = {
    labels: monthsInWord,
    datasets: [
      {
        label: "Earnings ($)",
        data: earningAmounts,
        borderColor: "#4ade80",
        backgroundColor: backgroundColors,
        fill: true,
        pointRadius: 7,
      },

    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#fff" },
      },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: "#9ca3af" }, grid: { color: "#374151" } },
      y: { ticks: { color: "#9ca3af" }, grid: { color: "#374151" } },
    },
  };

  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (!ref.current) return
    gsap.from(ref.current, {
      opacity: 0,
      y: 40,
      ease: "power1.inOut",
      delay: 0.2,
    })
  }, { scope: ref })

  return (
    <>
      {
        loading ?
          <div className="h-96">
            <Skeleton extraClass="h-full w-2xl  bg-gray-700" />
          </div>
          : <div className="chart_bg" ref={ref}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaChartLine /> Earnings Overview
            </h3>

            {/* Chart Type Selector */}
            <div className="mb-4">
              <label className="mr-2">Chart Type:</label>
              <select
                className=" p-1 rounded"
                value={chartType}
                onChange={(e) => setChartType(e.target.value as "line" | "bar")}
              >
                <option value="line">Line</option>
                <option value="bar">Bar</option>
              </select>
            </div>

            {/* Chart */}
            <div className="h-96 w-full">
              <DynamicChart type={chartType} data={data} options={options} />
            </div>
          </div>
      }
    </>

  );
};

export default EarningChart;
