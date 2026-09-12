// WARNING: importing this barrel statically pulls all three canvases (and with
// them the whole three.js bundle) into whatever chunk imports it. It is kept
// only for convenience — prefer lazy(() => import("./canvas/<Name>")).
import EarthCanvas from "./Earth";
import ComputersCanvas from "./Computers";
import StarsCanvas from "./Stars";

export { EarthCanvas, ComputersCanvas, StarsCanvas };
