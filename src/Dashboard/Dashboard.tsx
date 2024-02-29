import Header2 from "../Header2/Header2";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import { UserContext } from '../App/App';
import "./Dashboard.css";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from 'chart.js'
import "chart.js/auto";

interface dailyStats {
  gameCount: number;
  avgScore: number;
  date: string;
  bestScore: number;
  level1: number;
  level2: number;
  level3: number;
  level4: number;
  level5: number;
}

interface competitiveStats {
  top5username: string;
  top5score: string;
  userRank: number;
  gameCount: number;
  avgCompScore: number;
}

interface custom {
  names: string[] | null;
}

const Dashboard: React.FC = () => {
  // const [user, setUser] = useState<User | null>(null)
  const [customGames, setCustomGames] = useState<custom | null>(null);
  const [dailyStatsData, setDailyStatsData] = useState<dailyStats | null>(null);
  const [competitiveData, setCompetitiveData] =
    useState<competitiveStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("User")) {
      return navigate("../login");
    }
    const storedUser = JSON.parse(localStorage.getItem("User"));
    const fetchRoundData = async () => {
      if (!localStorage.getItem("DailyStats")) {
        try {
          const response = await fetch(
            `https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/${storedUser.id}/daily_stats`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch daily round data");
          }
          const data = await response.json();
          const dailyStats = {
            gameCount: data.daily_stats.daily_game_count,
            avgScore: data.daily_stats.average_score_in_daily_games,
            date: data.daily_stats.date_and_score_of_best_daily_score.date,
            bestScore:
              data.daily_stats.date_and_score_of_best_daily_score.score,
            level1: data.daily_stats.grade_book_daily_round["0.00-500.00"],
            level2: data.daily_stats.grade_book_daily_round["500.01-1000.00"],
            level3: data.daily_stats.grade_book_daily_round["1000.01-2000.00"],
            level4: data.daily_stats.grade_book_daily_round["2000.01-5000.00"],
            level5: data.daily_stats.grade_book_daily_round["5000.01+"],
          };
          setDailyStatsData(dailyStats);
          localStorage.setItem("DailyStats", JSON.stringify(dailyStats));
          console.log("Daily stats", localStorage.getItem("DailyStats"));
          console.log("fetched data", data);
        } catch (error) {
          setError(error.message);
        }
      }
      setDailyStatsData(JSON.parse(localStorage.getItem("DailyStats")));
    };
    const fetchCustomData = async () => {
      if (!localStorage.getItem("CustomGames")) {
        console.log("Fetching custom data...");
        try {
          const response = await fetch(
            `https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/${storedUser.id}/games`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch daily round data");
          }
          const responseData = await response.json();

          // Extract game names from each game object
          const gameNames = {
            names: responseData.data.map(
              (game: any) => game.attributes.game_name
            ),
          };
          localStorage.setItem("CustomGames", JSON.stringify(gameNames));
          console.log("fetched custom data", responseData.data);
        } catch (error) {
          setError(error.message);
        }
      }
      setCustomGames(JSON.parse(localStorage.getItem("CustomGames")));
    };

    const fetchCompetitiveData = async () => {
      if (!localStorage.getItem("CompetitiveData")) {
        try {
          const response = await fetch(
            `https://powerful-sierra-25067-22c20bb81d9c.herokuapp.com/api/v0/users/${storedUser.id}/competitive_stats`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch competitive stats data");
          }
          const data = await response.json();

          //format the scores in an array
          const top5scores = data.competitive_stats.top_5_competitive_users
            .map((user) => Math.round(user.score))
            .join(", ");

          //an array of usernames
          const top5usernames = data.competitive_stats.top_5_competitive_users
            .map((user) => user.username)
            .join(", ");

          const competitiveData = {
            top5username: top5usernames,
            top5score: top5scores,
            userRank: data.competitive_stats.user_competitive_rank,
            gameCount: data.competitive_stats.competitive_game_count,
            avgCompScore: Math.round(
              data.competitive_stats.average_score_in_competitive_games.toString()
            ),
          };
          localStorage.setItem(
            "CompetitiveData",
            JSON.stringify(competitiveData)
          );
          console.log("fetched competitive stats data", data);
        } catch (error) {
          setError(error.message);
        }
      }
      setIsLoading(false);
      setCompetitiveData(JSON.parse(localStorage.getItem("CompetitiveData")));
    };
    fetchRoundData();
    fetchCustomData();
    fetchCompetitiveData();
  }, [navigate]);
  const storedUser = JSON.parse(localStorage.getItem("User"));
  const options: ChartOptions<"bar"> = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      }
    }, 
  };
  const chartData = {
    labels: ["0-500", "501-1000", "1001-2000", "2001-5000", "5001-10000", "10001+"],
    datasets: [
      {
        label: "Daily Game Stats",
        data: dailyStatsData ? [dailyStatsData.level1, dailyStatsData.level2, dailyStatsData.level3, dailyStatsData.level4, dailyStatsData.level5] : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="dashboard-container">
      <Header2 />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="dashboard-content">
          <div className="user-stats">
            <div className="game-count-stats">
            <h3 className="user-title">{storedUser.attributes.username}'s Daily Stats</h3>
            <p className="total-games">Games Played: {Math.round(dailyStatsData.gameCount)}</p>
            </div>
            <div className="chart-container">
              {dailyStatsData && <Bar data={chartData} options={options}/>}
            </div>
            {dailyStatsData && (
              <div className="avg-best">
                <p className="avg">
                  Avg. Score: {Math.round(dailyStatsData.avgScore) || "N/A"}
                </p>
                <p className="best">Best Score: {Math.round(dailyStatsData.bestScore)} on {dailyStatsData.date}
                </p>
              </div>
            )}
          </div>
          <div className="competitive-stats">
            <h1>Leaderboard</h1>
            {competitiveData && (
              <>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {competitiveData.top5username
                    .split(", ")
                    .reverse()
                    .map((username, index) => (
                      <li key={index} style={{ marginBottom: "5px" }}>
                        {username} -{" "}
                        {competitiveData.top5score.split(", ").reverse()[index]}
                      </li>
                    ))}
                </ul>
                <p>User Competitive Rank: {competitiveData.userRank}</p>
                <p>Competitive Game Count: {competitiveData.gameCount}</p>
                <p>
                  Average Score in Competitive Games:{" "}
                  {competitiveData.avgCompScore}
                </p>
              </>
            )}
          </div>
          <div className="custom-games">
            <h3>Custom Games</h3>
            {customGames &&
            customGames.names &&
            customGames.names.length > 0 ? (
              <ul className="game-list">
                {customGames.names.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            ) : (
              <p>No Games</p>
            )}
          </div>
        </div>
      )}
      <div className="links">
        <div className="link-box">
          <Link to="/competitive">Competitive Game</Link>
        </div>
        <div className="link-box">
          <Link to="/new-private-game">New Private Game</Link>
        </div>
      </div>
      {error && <h2>Something happened with getting all of the data.</h2>}
    </div>
  );
};

export default Dashboard;
