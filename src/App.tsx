import React from 'react';
import './App.css';
import { createTopic, TopicClient } from 'webtopics';
import { io } from 'socket.io-client';
import { z } from 'zod';

const stageStateSchema = z.number()
type StageState = z.infer<typeof stageStateSchema>;
const statgeStateScheme = createTopic("stage", stageStateSchema);

function useStageState() {
  const [stageState, setStageState] = React.useState<StageState>(0);
  const clientRef = React.useRef<TopicClient>();
  React.useEffect(() => {
    const socket = io("http://172.20.156.212:3000");
    console.log("socket", socket);
    const client = new TopicClient(socket);
    clientRef.current = client;
    client.sub(statgeStateScheme, setStageState);
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
