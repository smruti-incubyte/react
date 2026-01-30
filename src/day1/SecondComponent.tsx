function SecondComponent() {
    return (
        <div
            style={{
                backgroundColor: "lightblue",
                padding: "0px",
                border: "3px solid blue"
            }}
        >
            <h2
                style={{
                    backgroundColor: "lightgreen",
                    padding: "0px",
                    border: "2px solid green"
                }}
            >
                Hello from Second Component
            </h2>

            <p
                style={{
                    backgroundColor: "lightcoral",
                    padding: "0px",
                    border: "2px solid red"
                }}
            >
                This is my 2nd custom component
            </p>
        </div>
    )
}

export default SecondComponent
