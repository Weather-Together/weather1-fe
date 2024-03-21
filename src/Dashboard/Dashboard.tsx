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
  top5: { username: string; score: number }[];
  userRank: number;
  gameCount: number;
  avgCompScore: number;
  lastThreeCompetitiveGamesRank: GameRank[];
}

function formatDate(dateString: string): string {
  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Subtract 1 to adjust for 0-based months
  const day = parseInt(dateParts[2], 10);

  // Create a Date object using the extracted date components
  const dateObject = new Date(year, month, day);

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    month: 'short', // Short month name (e.g., Mar)
    day: 'numeric', // Day of the month (e.g., 18)
    year: '2-digit', // Two-digit representation of the year (e.g., 24 for 2024)
  };

  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObject);

  return formattedDate;
}

const Dashboard: React.FC = () => {
  // const [user, setUser] = useState<User | null>(null)
  // const [customGames, setCustomGames] = useState<custom | null>(null);
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

          const top5 = data.competitive_stats.top_5_competitive_users;

          const competitiveData = {
            top5username: top5usernames,
            top5score: top5scores,
            top5: top5,
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
    // fetchCustomData();
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
          <div>
            <div className="daily-game-stats" id="daily-game-stats">
              <div className="half-grid">
              <h3 style={{ marginLeft: '25px'}}>Daily Game Stats</h3>
              <h5 style={{ marginRight: '10px', textAlign: 'right' }}> &nbsp; Rounds Played: {dailyStatsData && dailyStatsData.gameCount}</h5>
              </div>
              <hr
                  style={{
                    color: 'gray',
                    backgroundColor: 'gray',
                    width: '100%'
                  }}
              />
              {dailyStatsData && <BarGraph data={barGraphData} />}
              <hr
                  style={{
                    color: 'gray',
                    backgroundColor: 'gray',
                    width: '100%'
                  }}
                  />
                <div style={{ textAlign: 'center'}}>
                <div className="custom-h5">
                  Average Score: &nbsp; <span className="custom-h4">{dailyStatsData && Math.round(dailyStatsData.avgScore)}</span>
                </div>
                </div>
                {/* <h5>Best Score: {dailyStatsData && dailyStatsData.bestScore}</h5> */}
            </div>
            <div className="custom-games" id="custom-games">
            <div className="custom-heading-container">
              <h3 className="custom-heading">Custom Games</h3>
              <div className="links">
                <div className="link-box">
                  <Link to="/new-private-game">Create New Game</Link>
                </div>
              </div>
            </div>
            <hr
              style={{
                color: 'gray',
                backgroundColor: 'gray',
                width: '100%',
                margin: '5px 0px 10px 0px'
              }}></hr>
            <DashboardCustom />
            </div>
          </div>
          <div className="competitive-stats" 
          // style={{
          //   height: document.getElementById('daily-game-stats').clientHeight+document.getElementById('custom-games').clientHeight,
          // }}
          >
            <div className="competitive-stats-header">
              <h3 style={{ marginLeft: '25px'}}>Competitive Stats</h3>
              <div className="links">
                <div className="comp-link-box">
                  <Link to="/competitive">Go Play!</Link>
                </div>
              </div>
            </div>
            <hr
            style={{
              color: 'gray',
              backgroundColor: 'gray',
              width: '100%'
            }}></hr>
            <div className="leaderboard-container">
              <h4 className="leaderboard-text">Leaderboard</h4>

            </div>
            <div className="leaderboard-grid">
              <div style={{borderRight: '1px solid black'}}>Rank</div>
              <div></div>
              <div>Player</div>
              <div style={{textAlign: 'center', borderLeft: '1px solid black'}}>Average Score</div>
            </div>
            <hr
            style={{
              color: 'gray',
              backgroundColor: 'gray',
              width: '100%'
            }}></hr>
            {competitiveData.top5 && competitiveData.top5.length > 0 ? (
            <div>
              {competitiveData.top5.map((user, index) => (
                <div key={index}>
                  <div className="leaderboard-grid">
                    <div style={{textAlign: 'center', borderRight: '1px solid black', paddingBottom: '15px'}}>{index+1}</div>
                    <div></div>
                    <div>{user.username}</div>
                    <div style={{textAlign: 'center', borderLeft: '1px solid black'}}>{Math.round(user.score).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
            
          ) : (
            <p>No top 5 users data available</p>
          )}
          <hr
            style={{
              color: 'gray',
              backgroundColor: 'gray',
              width: '100%'
            }}></hr>
          { competitiveData.userRank > 5 ? (<div key={storedUser.id} className="leaderboard-grid">
            <div style={{textAlign: 'center', borderRight: '1px solid black'}}>{competitiveData.userRank || "No rank"}</div>
            <div></div>
            <div>{storedUser.attributes
                        ? storedUser.attributes.username
                        : "No username"}
            </div>
            <div style={{textAlign: 'center', borderLeft: '1px solid black'}}>{competitiveData.avgCompScore || "No scores"}</div>
          </div>) : (
            <div></div>
          ) }
          <br />
            <div className="last-three-games">
              <h4>Last Three Games</h4>

            <div className="recents-grid">
            <div style={{borderRight: '1px solid black'}}>Rank</div>
            <div></div>
            <div>Target Location</div>
            <div style={{textAlign: 'center', borderLeft: '1px solid black'}}>Score</div>
            <div style={{textAlign: 'center', borderLeft: '1px solid black'}}>Date</div>
            </div>
            <hr
            style={{
              color: 'gray',
              backgroundColor: 'gray',
              width: '100%'
            }}></hr>
            {competitiveData && competitiveData.lastThreeCompetitiveGamesRank && (
              <div>
              {competitiveData.lastThreeCompetitiveGamesRank.slice().reverse().map(
                (game, index) => (
                  <div key={index} className="recents-grid">
                    <div style={{textAlign: 'center', borderRight: '1px solid black', paddingBottom: '15px'}}>{game.user_rank || "N/A"}</div>
                    <div></div>
                    <div>{game.location.replace(/^,|,$/g, '')}</div>
                    <div style={{textAlign: 'center', borderLeft: '1px solid black'}}>{Math.round(game.score).toLocaleString() || "N/A"}</div>
                    <div style={{textAlign: 'center', borderLeft: '1px solid black'}}>{formatDate(game.date)}</div>
                  </div>
                )
              )}
              </div>
              )}
            </div>
            <hr
            style={{
              color: 'gray',
              backgroundColor: 'gray',
              width: '100%'
            }}></hr>
            <div className="custom-h5" style={{ textAlign: 'center'}}>
            Rounds Played: &nbsp; <span className="custom-h4">{competitiveData && competitiveData.gameCount}</span>
            </div>
          </div>
  

        </div>
      )}
      {error && <h2>Something happened with getting all of the data.</h2>}
      <Footer />
    </div>
  );               
     }  

export default Dashboard;
