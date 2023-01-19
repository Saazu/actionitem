import ActionItem from "./ActionItem";

function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <ActionItem
        title="Delta"
        description="This is the force we know"
        saveActionHandler={() => console.log("Saved")}
      />
    </div>
  );
}

export default App;
