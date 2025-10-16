import { useState } from 'react'
import DynamicChart from '../DynamicChart'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'

const EarningPerYear = () => {

    const { earnings } = useSelector((state: RootState) => state.instructor)
    const earningPerYear = earnings?.earningPerYear



    const allEarnings = earningPerYear?.map((ele) => ele.totalEarning) ?? []
    const allLabels = earningPerYear?.map((ele) => ele.year) ?? []


    //range of year to show on chart
    const [fromYear, setFromYear] = useState(2019)
    const [toYear, setToYear] = useState(2025)

    // Filter labels and earnings by range
    const filteredData = allLabels
        .map((year, i) => ({ year: year, earning: allEarnings[i] }))
        .filter(d => d.year >= fromYear && d.year <= toYear)



    const labels = filteredData.map(d => d.year.toString())
    const earningsToShow = filteredData.map(d => d.earning)

    const highestEarning = Math.max(...earningsToShow)
    const lowestEarning = Math.min(...earningsToShow)
    const maxIndex = earningsToShow.indexOf(highestEarning)
    const minIndex = earningsToShow.indexOf(lowestEarning)

    const data = {
        labels,
        datasets: [
            {
                label: "Yearly Earnings ($)",
                data: earningsToShow.map((value, index) =>
                    index !== maxIndex && index !== minIndex ? value : null
                ),
                backgroundColor: "rgba(74, 222, 128, 0.7)", // green-400
                borderColor: "rgba(34, 197, 94, 1)", // green-600
                borderWidth: 2,
            },
            {
                label: "Highest Earning ($)",
                data: earningsToShow.map((_, index) =>
                    index === maxIndex ? highestEarning : null
                ),
                backgroundColor: "rgba(239, 68, 68, 0.8)", // red-500
                borderColor: "rgba(220, 38, 38, 1)", // red-600
                borderWidth: 2,
            },
            {
                label: "Lowest Earning ($)",
                data: earningsToShow.map((_, index) =>
                    index === minIndex ? lowestEarning : null
                ),
                backgroundColor: "rgba(59, 130, 246, 0.8)", // blue-500
                borderColor: "rgba(37, 99, 235, 1)", // blue-600
                borderWidth: 2,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: "#fff" },
            },
            title: {
                display: true,
                text: "Earnings Per Year",
                color: "#fff",
            },
        },
        scales: {
            x: {
                ticks: { color: "#9ca3af" },
                grid: { color: "#374151" },
            },
            y: {
                ticks: { color: "#9ca3af" },
                grid: { color: "#374151" },
            },
        },
    }

    return (
        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-md space-y-4">
            {/* Range Filter */}
            <div className="flex gap-4">
                <label>
                    From:
                    <select
                        value={fromYear}
                        onChange={(e) => setFromYear(Number(e.target.value))}
                        className="ml-2 bg-gray-700 text-white p-1 rounded"
                    >
                        {allLabels.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </label>

                <label>
                    To:
                    <select
                        value={toYear}
                        onChange={(e) => setToYear(Number(e.target.value))}
                        className="ml-2 bg-gray-700 text-white p-1 rounded"
                    >
                        {allLabels.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Chart */}
            <DynamicChart type="bar" data={data} options={options} />
        </div>
    )
}

export default EarningPerYear
