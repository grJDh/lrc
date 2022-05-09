import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MantineProvider, Paper, Divider } from '@mantine/core';

import FromTo from 'containers/FromTo';
import Price from 'containers/Price';
import Path from 'containers/Path';
import Distance from 'containers/Distance';
import Time from 'containers/Time';
import Detailed from 'containers/Detailed';
import Settings from 'containers/Settings';

import { mainSelector, setDistance, setPath, setTime, setFormattedTime } from 'slices/main';
import { settingsSelector } from 'slices/settings';


const App = () => {
  const dispatch = useDispatch();
  const { fromStation, toStation, rails4E, rails3E, distance, path } = useSelector(mainSelector);
  const { layover, speed } = useSelector(settingsSelector);

  const [error, setError] = useState(false);

  //temp
  const distanceSource = '4E';
  const customRails = [];
  //temp

  const getRailsSource = () => {
    switch (distanceSource) {
      case '3E':
        return rails3E;
      case 'Only custom':
        return [];
      default:
        return rails4E;
    }
  }

  const combineStations = () => {
    let baseRails = getRailsSource();
    let combinedRails = {};

    baseRails = baseRails.concat(customRails);

    baseRails.forEach(element => {
      combinedRails = {...combinedRails, [element[0]]:{...combinedRails[element[0]], [element[1]]: element[2]}}
      combinedRails = {...combinedRails, [element[1]]:{...combinedRails[element[1]], [element[0]]: element[2]}}
    });

    return combinedRails;
  }

  const rails = combineStations();
  const stations = Object.keys(rails);

  const getTime = (distance, numOfStations=0) => {
    const layoverTime = (numOfStations > 2) ? (numOfStations - 2) * layover : 0;
    const time = (distance / speed) + layoverTime;
  
    const days = Math.trunc(time / 24);
    const hours = Math.trunc(time) - (days * 24);
    const minutes = Math.ceil((time - Math.trunc(time)) * 60);
  
    const formattedDays = days ? days + ':' : '0:';
    const formattedHours = ((hours / 10 < 1) ? '0' + hours : hours)
    const formattedMinutes = minutes / 10 < 1 ? '0' + minutes : minutes
  
    return formattedDays + formattedHours  + ':' + formattedMinutes;
  }

  const findLowestCostNode = (costs, processed) => {
    const knownNodes = Object.keys(costs)
    
    const lowestCostNode = knownNodes.reduce((lowest, node) => {
        if (lowest === null && !processed.includes(node)) {
          lowest = node;
        }
        if (costs[node] < costs[lowest] && !processed.includes(node)) {
          lowest = node;
        }
        return lowest;
    }, null);
  
    return lowestCostNode
  };

  const findPath = (start, finish) => {
    let weights = {...rails[start], [start]: 0};
    let visited = [];

    for (let i = 0; i < stations.length; i++) {
      if (!Object.keys(weights).includes(stations[i])) {
        weights = {...weights, [stations[i]]: Infinity};
      }
    }

    let path = {};
    for (let child in rails[start]) {
      path[child] = start;
    }

    let node = findLowestCostNode(weights, visited);

    while (node) {
      let costToReachNode = weights[node];
      let childrenOfNode = rails[node];
    
      for (let child in childrenOfNode) {
        let costFromNodetoChild = childrenOfNode[child]
        let costToChild = costToReachNode + costFromNodetoChild;
    
        if (!weights[child] || weights[child] > costToChild) {
          weights[child] = costToChild;
          path[child] = node;
        }
      }
    
      visited.push(node);
  
      node = findLowestCostNode(weights, visited);
    }

    delete path[start];
    let optimalPath = [finish];
    let parent = path[finish];

    // eslint-disable-next-line
    for (let i in path) {
      if (parent) {
        optimalPath.push(parent);
        parent = path[parent];
      }
    }
    optimalPath.reverse();

    return [weights[finish], optimalPath]
  }

  const letsTravel = () => {
    if (stations.includes(fromStation) && stations.includes(toStation)) {
      setError(false);

      if (fromStation !== toStation) {
        const answer = findPath(fromStation, toStation);
        const answerDistance = answer[0];
        const answerPath = answer[1];
        const formattedPath = [];
        let distanceTotal = 0;

        for (let i = 0; i < answerPath.length; i++) {
          const station = answerPath[i];

          // const nextStationDistance = (i === answerPath.length-1) ? 0 : rails[station][answerPath[i+1]];
          const prevStationDistance = (i === 0) ? 0 : rails[station][answerPath[i-1]];

          distanceTotal += prevStationDistance;
          const distanceTo = prevStationDistance;

          formattedPath.push({name:station, distanceTotal: distanceTotal, distanceTo: distanceTo});
        }

        // console.log(formattedPath);
        dispatch(setDistance(answerDistance));
        dispatch(setPath(formattedPath));
      }
    } else {
      setError(true);
    }
  }

  const settingsStore = useSelector(settingsSelector)
  const placeToLocalStorage = (name, item) => localStorage.setItem(name, JSON.stringify(item));
  useEffect(() => {
    placeToLocalStorage('settingsStore', settingsStore);
  }, [settingsStore]);

  useEffect(() => {
    if (fromStation !== '' && toStation !== '') letsTravel();
    // eslint-disable-next-line
  }, [toStation, fromStation]);
  //customPrices, customRails, 

  return (
    <MantineProvider theme={{colorScheme: 'dark', }}>
      <div className='flex justify-center'>
        <Paper shadow="xl" radius="md" p="md" className='max-w-6xl flex flex-wrap flex-auto flex-col content-center m-10 p-5'>

          <div className='flex w-full m-5'>
            <FromTo stations={stations} />
          </div>

          <div className='flex w-full flex-wrap m-5'>
            <Distance />
            <Time getTime={getTime} />
          </div>

          <Divider my="sm" />

          <div className='flex w-full flex-wrap m-5'>
            <Price />
            <Path />
          </div>

          <Divider my="sm" />

          {/* <div className='flex w-full flex-wrap m-5'>
            <Detailed getTime={getTime} />
          </div> */}

          <div className='flex w-full flex-wrap m-5'>
            <Settings />
          </div>

        </Paper>
      </div>
    </MantineProvider>
  );
}

export default App;
