import { useState } from "react";

export default function UsestateComponent() {
    const [count, setCount] = useState(0);

    // If the argument passed to useState is a function, React will call that 
    // function only during the first render.

    // ❌ expensiveCalculation() runs EVERY render
    const [value, setValue] = useState(expensiveCalculation());
    // or
    // const result = expensiveCalculation(); // JS runs this every render
    // const [value, setValue] = useState(result); // value is initialised only once


    // ✅ This runs ONLY on the initial render
    // const [value, setValue] = useState(expensiveCalculation);





    return (
        <div>
            <p>Count: {count}</p>
            <p>Value: {value}</p>

            <button onClick={() => {
                setCount(count + 1);
                // setValue(200);
                // console.log("render value:", value);

            }}>
                Re-render
            </button>
        </div>
    );
}
function expensiveCalculation() {
    const dt = Date.now();
    console.log("🔥 expensiveCalculation ran", dt);
    return dt;
}


// In this example, the expensiveCalculation function is called on every render
// because it's passed directly to useState. This defeats the purpose of using
// useState to preserve state across renders. Instead, we should use a lazy
// initializer function to ensure that expensiveCalculation is only called once
// during the initial render.