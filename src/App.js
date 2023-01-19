import ActionItem from "./ActionItem";

function App() {
  return (
    <div className="App">
      <ActionItem
        id={1}
        title=""
        description=""
        saveActionHandler={(id, title, description) =>
          console.log("Saved:", id, title, description)
        }
        archiveActionHandler={(id) => console.log("Archived:", id)}
        unArchiveActionHandler={(id) => console.log("Unarchiving:", id)}
      />
    </div>
  );
}

export default App;
