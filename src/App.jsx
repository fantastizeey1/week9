import * as React from "react";
import axios from "axios";

const URL = "http://hn.algolia.com/api/v1/search";

const getUser = () => {
  return Promise.resolve({ id: "1", name: "Robin" });
};

function App() {
  const [search, setSearch] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [stories, setStories] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function handleFetch(event) {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const result = await axios.get(`${URL}?query=${search}`);
      setStories(result.data.hits);
    } catch (error) {
      setError("Failed to fetch stories. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    loadUser();
  }, []);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        {user ? <p style={styles.userInfo}>Signed in as {user.name}</p> : null}
        <Search value={search} onChange={handleChange}>
          Search:
        </Search>
        <p style={styles.searchText}>Searching for: {search || "..."}</p>
      </header>
      <main style={styles.main}>
        <button style={styles.button} type="button" onClick={handleFetch}>
          Fetch Stories
        </button>

        {loading && <p>Loading stories...</p>}
        {error && <span style={styles.error}>{error}</span>}

        <ul style={styles.storyList}>
          {stories.map((story) => (
            <li key={story.objectID} style={styles.storyItem}>
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                {story.title}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

function Search({ value, onChange, children }) {
  return (
    <div style={styles.searchContainer}>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "auto",
  },
  header: {
    marginBottom: "20px",
  },
  userInfo: {
    fontSize: "1.2em",
    color: "#333",
  },
  searchText: {
    fontSize: "1em",
    color: "#666",
  },
  main: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  error: {
    color: "red",
  },
  storyList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  storyItem: {
    marginBottom: "10px",
  },
  searchContainer: {
    marginBottom: "10px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    borderColor: "#ccc",
    borderWidth: "1px",
    width: "100%",
  },
};

export default App;
