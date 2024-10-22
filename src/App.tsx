import {useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
    FeatureString,
    GrowthBook,
    GrowthBookProvider,
    IfFeatureEnabled,
} from "@growthbook/growthbook-react";


const gb = new GrowthBook({
    apiHost: "https://api.growthbook.io",
    clientKey: "sdk-FwFUQ0dV8repQkVG",
    enableDevMode: true,
    trackingCallback: (experiment, result) => {
        console.log("Viewed Experiment", {
            experimentId: experiment.key,
            variationId: result.key
        });
    }
});

gb.init({
    streaming: true,
}).then(() => {
    console.log("GrowthBook started");
})

const attributes = {
    "id": "Affonsera",
    "url": "foo",
    "path": "foo",
    "host": "foo",
    "query": "foo",
    "deviceType": "desktop",
    "browser": "chrome",
    "utmSource": "foo",
    "utmMedium": "foo",
    "utmCampaign": "foo",
    "utmTerm": "foo",
    "utmContent": "foo",
    "platform": "macos"
}


function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        gb.setAttributes(attributes);
        gb.refreshFeatures()
    })

    return (
        <GrowthBookProvider growthbook={gb}>
            <div>
                <IfFeatureEnabled feature="first-feature">
                    <h1>first-feature está habilitada</h1>
                </IfFeatureEnabled>
                <p>
                    <FeatureString feature="remote-alert" default="Local Alert"/>
                </p>
            </div>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>

        </GrowthBookProvider>
    )
}

export default App
