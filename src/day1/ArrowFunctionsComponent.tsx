function ArrowFunctionsComponent() {
    const numbers = [1, 2, 3, 4];

    // Arrow function inside map
    const doubled = numbers.map(n => n * 2);

    // Arrow function event handler
    const handleClick = () => {
        console.log("Arrow function button clicked");
    };

    return (
        <div style={{ border: "2px solid blue", padding: "10px", margin: "10px" }}>
            <h3>Arrow Functions</h3>
            <p>Original: {numbers.join(", ")}</p>
            <p>Doubled: {doubled.join(", ")}</p>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
}

export default ArrowFunctionsComponent;
