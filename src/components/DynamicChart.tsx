import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartType,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    LinearScale,
    PointElement
)
//T is generic parameter type ,by extending ChartType it accept only valid chart type
interface DynamicChartProps<T extends ChartType>{
    data:ChartData<T>,
    options:ChartOptions<T>,
    type:T,
    className?:string
}

const chartMap={
    line:Line,
    bar:Bar,
    doughnut:Doughnut,
}


//by extending key of chartMap,it means type only be line|bar or doughn
const DynamicChart = <T extends keyof typeof chartMap>({type,data,options,className}:DynamicChartProps<T>) => {
  const ChartComponent=chartMap[type] as any
  return <ChartComponent data={data} options={options} className={className}/>
}

export default DynamicChart

