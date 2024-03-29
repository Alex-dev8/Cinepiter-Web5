import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./Dashboard.css";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { CinepiterContext } from "../../context/CinepiterContext";

function Dashboard() {
  const { algorithmStats } = useContext(CinepiterContext);

  return (
    <div>
      <Header />
      <div className="title_container_dashboard">
        <h1 className="title_text">DASHBOARD</h1>
        {algorithmStats.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="80%"
              data={algorithmStats}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="genre" />
              <Radar
                dataKey="count"
                stroke="#05DB8B"
                fill="#05DB8B"
                fillOpacity={0.9}
              />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <h2
            style={{
              color: "#ededed60",
              fontSize: "28x",
              fontFamily: "Inria Sans",
            }}
          >
            Select a movie provider below and start liking movies to view your
            algorithm preferences here.
          </h2>
        )}

        <div className="logos_container">
          <div
            style={{
              border: "1px solid #05DB8B",
              padding: "20px",
              borderRadius: "20px",
            }}
            className="movie_service_buttons"
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
            className="movie_service_buttons"
          >
            <Link to="/destiny-plus">
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
