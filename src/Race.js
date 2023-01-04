import { useEffect, useRef, useState } from "react";
import "./App.css";
import { RaceUI } from "./RaceUI";
import { Logo } from "./Logo";
import { characters } from "./assets/mario_kart/characters/charactersStates";
import { Countdown } from "./Countdown";

export const Race = (props) => {
  const getWindowSize = () => {
    const { innerWidth } = window;
    return { innerWidth };
  };
  let raceInProgress = null;
  const [ordersArr, setOrdersArr] = useState([]);
  const [raceProgress, setRaceProgress] = useState(0);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [countdown, setCountdown] = useState(3);
  const wsConnected = useRef(false);
  const totalEvents = useRef(0);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleMessage = (event) => {
    // console.log(ordersArr);
    const parsed = JSON.parse(event.data);

    const { innerWidth } = getWindowSize();

    if (parsed.message && parsed.message.total_items_price) {
      const totalGbpPrice = parsed.message.total_items_price.gbp_value;
      const brand = parsed.message.property.channel;
      const siteID = parsed.message.property.site_id;

      setOrdersArr((prev) => {
        if (
          prev.length < 6 &&
          prev.filter((e) => e.brandName === brand).length === 0
        ) {
          const order = {
            brandName: brand,
            totalValue: 0,
            characterName: characters[prev.length],
            siteID: siteID,
            logo: "",
            addedTime: new Date().getTime(),
          };

          return [...prev, order];
        } else if (
          prev.length === 6 &&
          prev.every((e) => e.totalValue < innerWidth)
        ) {
          const timedArray = prev.sort(function (a, b) {
            return a.addedTime - b.addedTime;
          });
          const matchingOrder = prev.find((e) => e.brandName === brand);
          if (matchingOrder !== undefined) {
            const timeRange =
              timedArray[5].addedTime - timedArray[0].addedTime + 3000;
            matchingOrder.totalValue =
              matchingOrder.totalValue +
              totalGbpPrice / ((totalEvents.current / timeRange) * 1000);

            return [...prev];
          }
        }
        return [...prev];
      });
    }
  };
  useEffect(() => {
    const socket = new WebSocket(
      "wss://stable-incubator.thehut.net/cashboard-websocket-orders/?filter=orders"
    );
    socket.addEventListener("message", handleMessage);

    socket.addEventListener("open", () => (wsConnected.current = true));

    socket.onerror = () => {
      console.log("Error with the websocket, reloading page");
      window.location.reload(true);
    };

    return () => {
      if (wsConnected.current) {
        console.log("connected");
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let timeout;
    if (countdown > -1 && ordersArr.length === 6) {
      timeout = setTimeout(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [countdown, ordersArr]);

  useEffect(() => {
    const finalPositions = ordersArr.sort(function (a, b) {
      return b.totalValue - a.totalValue;
    });

    if (finalPositions.length === 6) {
      const firstPlace = finalPositions["0"];
      const raceHasFinished =
        firstPlace.totalValue + raceProgress > windowSize.innerWidth;

      if (raceHasFinished) {
        props.setResults(finalPositions);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersArr, raceProgress, windowSize]);

  useEffect(() => {
    if (!raceInProgress) {
      totalEvents.current = totalEvents.current + 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersArr]);

  if (countdown > -1 && ordersArr.length === 6) {
    Logo(ordersArr);
    if (countdown === 0) {
      ordersArr.forEach((element) => {
        element.totalValue = 0;
      });
      return <Countdown text="Go!" array={ordersArr} />;
    }
    return <Countdown text={countdown} array={ordersArr} />;
  }

  if (ordersArr.length === 6) {
    Logo(ordersArr);
  } else {
    Logo(ordersArr);
    return <Countdown text="Loading..." array={ordersArr} />;
  }

  if (ordersArr.length === 6) {
    raceInProgress = true;
    const finalPositions = ordersArr.sort(function (a, b) {
      return b.totalValue - a.totalValue;
    });

    if (raceInProgress) {
      setInterval(() => {
        setRaceProgress((raceProgress) => raceProgress + 0.002);
      }, 10);
    }

    const firstPlace = finalPositions["0"];

    const raceHasFinished =
      firstPlace.totalValue + raceProgress > windowSize.innerWidth;

    if (raceHasFinished) {
      raceInProgress = false;
    }

    return (
      <RaceUI
        raceProgress={raceProgress}
        array={ordersArr}
        totalGbpPrice={ordersArr.totalValue}
      />
    );
  }
};
