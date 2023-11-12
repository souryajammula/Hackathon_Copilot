import { Link } from "react-router-dom";
import "../App.css";
import { MenuCard } from "./home";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DataChart } from "../Data/Data";
import { AgriculturalDataChart } from "../Data/AgriculturalDataChart";
import { ManufactoringDataChart } from "../Data/ManufactoringDataChart";
import { FertilizersDataChart } from "../Data/FertilizersDataChart";
import { FertilizersProductionChart } from "../Data/FertilizersProductionChart";
import { GDPCurrentUSD } from "../Data/GDPCurrentUSD";
import { FDINetPercGDP } from "../Data/FDINetPercGDP";
import { FDIBoP } from "../Data/FDIBoP";
import { CurrentACBal } from "../Data/CurrentACBal";
import { NetInflowChart } from "../Data/NetInflow";
import ChatGPT from "./chatGPT";
import React from "react";

const NavBar = (props) => {
  const macroeconomic = [
    {
      id: 1,
      name: "GDP Growth Rate",
      chart: <DataChart country={props.country} range={props.range} />,
    },
    {
      id: 2,
      name: "GDP Current USD",
      chart: <GDPCurrentUSD country={props.country} range={props.range} />,
    },
    {
      id: 3,
      name: "Current Account Balance",
      chart: <CurrentACBal country={props.country} range={props.range} />,
    },
    {
      id: 4,
      name: "FDI net",
      chart: <NetInflowChart country={props.country} range={props.range} />,
    },
    {
      id: 5,
      name: "FDI net outflows - BoP",
      chart: <FDIBoP country={props.country} range={props.range} />,
    },
    { id: 6, name: "FDI inflows", chart: ": No data present" },
    {
      id: 7,
      name: "FDI net outflows % GDP",
      chart: <FDINetPercGDP country={props.country} range={props.range} />,
    },
  ];

  const agricultural = [
    {
      id: 1,
      name: "Contribution",
      chart: (
        <AgriculturalDataChart country={props.country} range={props.range} />
      ),
    },
    {
      id: 2,
      name: "Manufactoring",
      chart: (
        <ManufactoringDataChart country={props.country} range={props.range} />
      ),
    },
    {
      id: 3,
      name: "Fertilizers",
      chart: (
        <FertilizersDataChart country={props.country} range={props.range} />
      ),
    },
    {
      id: 4,
      name: "Fertilizer Production",
      chart: (
        <FertilizersProductionChart
          country={props.country}
          range={props.range}
        />
      ),
    },
    { id: 5, name: "Forestery and Fishin", chart: ": No data present" },
  ];

  const debt = [
    { id: 1, name: "Reservers - imports", chart: ": No data present" },
    { id: 2, name: "Reservers - gold", chart: ": No data present" },
    { id: 3, name: "% GNI", chart: ": No data present" },
    { id: 4, name: "Total Debt", chart: ": No data present" },
    { id: 5, name: "Debt service", chart: ": No data present" },
    { id: 6, name: "GNI current", chart: ": No data present" },
  ];

  const [visible, setVisible] = React.useState(false);
  function click(e) { e.preventDefault(); setVisible(true); }

  return (
    <div>
      <div className="Macro">
        <div className="nav-main-elements">
          <footer className="footer" >
            {true && (<ChatGPT />) }
            {/*<img className="gpt" onClick={(event) => { click(event) }} src="./gpt1.png" alt="Click Here to Access GPT Prompt"/>*/}
          </footer>
        </div>
        <div className="nav-main-elements">
          <Link to="/home">
            <h6>Macroeconomic (USD)</h6>
          </Link>
          <DndProvider backend={HTML5Backend}>
            <div className="pets">
              {macroeconomic.map((mc) => (
                <MenuCard
                  draggable
                  id={mc.id}
                  name={mc.name}
                  chart={mc.chart}
                />
              ))}
            </div>
          </DndProvider>
        </div>

        <div className="nav-main-elements">
          <Link to="/home">
            <h6>Agricultural</h6>
          </Link>
          <DndProvider backend={HTML5Backend}>
            <div className="pets">
              {agricultural.map((ag) => (
                <MenuCard
                  draggable
                  id={ag.id}
                  name={ag.name}
                  chart={ag.chart}
                />
              ))}
            </div>
          </DndProvider>
        </div>
        <div className="nav-main-elements">
          <Link to="/home">
            <h6>Debt</h6>
          </Link>
          <DndProvider backend={HTML5Backend}>
            <div className="pets">
              {debt.map((db) => (
                <MenuCard
                  draggable
                  id={db.id}
                  name={db.name}
                  chart={db.chart}
                />
              ))}
            </div>
          </DndProvider>
        </div>

      </div>
    </div>
  );
};

export default NavBar;
