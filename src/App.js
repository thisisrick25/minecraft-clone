import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Fpv } from "./components/Fpv";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <Fpv/>
        <Physics>
          <Player />
          <Ground />
        </Physics>
      </Canvas>
      <div className="absolute center crosshair">+</div>
    </>
  );
}

export default App;
