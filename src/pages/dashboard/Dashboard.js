import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./Dashboard.css";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const DATA = [
    {
      genre: "Comedy",
      A: 120,
      B: 100,
      max: 150,
    },
    {
      genre: "Action",
      A: 86,
      B: 82,
      max: 150,
    },
    {
      genre: "Romance",
      A: 102,
      B: 72,
      max: 150,
    },
    {
      genre: "Musical",
      A: 104,
      B: 99,
      max: 150,
    },
    {
      genre: "Drama",
      A: 150,
      B: 150,
      max: 150,
    },
  ];
  return (
    <div>
      <Header />
      <div className="title_container_dashboard">
        <h1 className="title_text">DASHBOARD</h1>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={DATA}>
            <PolarGrid />
            <PolarAngleAxis dataKey="genre" />
            <Radar
              dataKey="A"
              stroke="#05DB8B"
              fill="#05DB8B"
              fillOpacity={0.9}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="logos_container">
          <div
            style={{
              border: "1px solid #05DB8B",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <Link to="/webflix">
              <img
                src={require("../../assets/webflix-logo.png")}
                alt=""
                style={{ width: "150px", height: "40px" }}
              />
            </Link>
          </div>
          <div
            style={{
              border: "1px solid #05DB8B",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <Link>
              <img
                src={require("../../assets/destiny-plus.png")}
                alt=""
                style={{ width: "180px", height: "40px" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
