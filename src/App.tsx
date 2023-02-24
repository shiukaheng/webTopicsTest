import React from 'react';
import './App.css';
import { createTopic, TopicClient } from 'webtopics';
import { io } from 'socket.io-client';
import { z } from 'zod';

const stageStateSchema = z.number()
type StageState = z.infer<typeof stageStateSchema>;
const stageTopic = createTopic("sample", stageStateSchema);

function useStageState() {
  const [stageState, setStageState] = React.useState<StageState>(0);
  const clientRef = React.useRef<TopicClient>();
  React.useEffect(() => {
    const socket = io("http://localhost:3000");
    console.log("socket", socket);
    const client = new TopicClient(socket);
    clientRef.current = client;
    client.sub(stageTopic, (data)=>{
      setStageState(data);
      console.log("data", data)
    })
  }, []);
  return stageState;
}

function App() {
  const stageState = useStageState();

  return (
    <div className="App">
      <h1>There should be a number under here!</h1>
      <h1>{stageState}</h1>
    </div>
  );
}

export default App;
