import Header2 from "../Header2/Header2";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import { UserContext } from '../App/App';
import "./Dashboard.css";
import Footer from "../Footer/Footer";
import BarGraph from "../BarGraph/BarGraph";
import DashboardCustom from "../DashboardCustom/DashboardCustom";

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
  level6: number;
}

interface GameRank {
  date: string;
  location: string;
  score: number;
  user_rank: number;
}

interface competitiveStats {
  top5username: string;
  top5score: string;
  userRank: number;
  gameCount: number;
  avgCompScore: number;
  lastThreeCompetitiveGamesRank: GameRank[];
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
  console.log(competitiveData )
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
          console.log(data);
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
            level5: data.daily_stats.grade_book_daily_round["5000.01-10000.00"],
            level6: data.daily_stats.grade_book_daily_round["10000.01+"],
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
            .map((user) => user.score.toFixed(2))
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
            avgCompScore:
              data.competitive_stats.average_score_in_competitive_games.toFixed(
                2
              ),
            lastThreeCompetitiveGamesRank:
              data.competitive_stats.last_three_competitive_games_rank,
            topThreeCompetitiveRoundsByScore:
            data.competitive_stats.top_three_competitive_rounds_by_score
          };
          console.log(competitiveData);
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
  const barGraphData = dailyStatsData
    ? [
        { label: "0-500", value: dailyStatsData.level1 },
        { label: "501-1000", value: dailyStatsData.level2 },
        { label: "1001-2000", value: dailyStatsData.level3 },
        { label: "2001-5000", value: dailyStatsData.level4 },
        { label: "5001-10000", value: dailyStatsData.level5 },
        { label: "10001+", value: dailyStatsData.level6 },
        // Add more entries as needed
      ]
    : [];
  const storedUser = JSON.parse(localStorage.getItem("User"));
  return (
    <div className="dashboard-container">
      <Header2 />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="dashboard-content">
          <div className="daily-game-stats">
            <h3>Daily Game Stats</h3>
            <h5>Games Played: {dailyStatsData && dailyStatsData.gameCount}</h5>
            {dailyStatsData && <BarGraph data={barGraphData} />}
            <div className="avg-best">
              <h5>Average Score: {dailyStatsData && dailyStatsData.avgScore}</h5>
              <h5>Best Score: {dailyStatsData && dailyStatsData.bestScore}</h5>
            </div>
          </div>
  
          <div className="competitive-stats">
            <div className="competitive-stats-header">
              <h3>Competitive Stats</h3>
              <div className="links">
                <div className="link-box">
                  <Link to="/competitive">Go Play!</Link>
                </div>
              </div>
            </div>
            <div className="leaderboard-container">
              <h4 className="leaderboard-text">Leaderboard</h4>
              <h5 className="games-played">
                Games Played: {competitiveData && competitiveData.gameCount}
              </h5>
            </div>
            {competitiveData && (
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Avg. Score</th>
                  </tr>
                </thead>
                <tbody>
                  {competitiveData.top5username.split(", ").map((username, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{username}</td>
                      <td>{competitiveData.top5score.split(", ")[index]}</td>
                    </tr>
                  ))}
                  <tr key={storedUser.id}>
                    <td>{competitiveData.userRank || "No rank"}</td>
                    <td>
                      {storedUser.attributes
                        ? storedUser.attributes.username
                        : "No username"}
                    </td>
                    <td>{competitiveData.avgCompScore || "No scores"}</td>
                  </tr>
                </tbody>
              </table>
            )}
            <div className="last-three-games">
              <h3>Last Three Competitive Games</h3>
              {competitiveData &&
                competitiveData.lastThreeCompetitiveGamesRank && (
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Target Location</th>
                        <th>Score</th>
                        <th>Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitiveData.lastThreeCompetitiveGamesRank.map(
                        (game, index) => (
                          <tr key={index}>
                            <td>{game.date}</td>
                            <td>{game.location.replace(/^,|,$/g, '')}</td>
                            <td>{game.score || "No Score"}</td>
                            <td>{game.user_rank || "No rank"}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                )}
            </div>
          </div>
  
          <div className="custom-games">
            <div className="custom-heading-container">
              <h3 className="custom-heading">Custom Games</h3>
              <div className="links">
                <div className="link-box">
                  <Link to="/new-private-game">Create New Game</Link>
                </div>
              </div>
            </div>
            <DashboardCustom />
          </div>
        </div>
      )}
      {error && <h2>Something happened with getting all of the data.</h2>}
      <Footer />
    </div>
  );               
     }  

export default Dashboard;
