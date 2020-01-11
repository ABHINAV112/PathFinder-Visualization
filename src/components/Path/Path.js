import BreadthFirstSearch from "./BreadthFirstSearch";
import DepthFirstSearch from "./DepthFirstSearch";
import Dijkstra from "./Dijkstra";
import Astar from "./Astar";

// wrapper json for all functionality
export default {
  BreadthFirstSearch: BreadthFirstSearch,
  DepthFirstSearch: DepthFirstSearch,
  Dijkstra: Dijkstra,
  Astar: Astar,
  none: function() {}
};
