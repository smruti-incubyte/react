function DestructuringComponent() {
    const user = {
        name: "Smruti",
        role: "Developer",
        location: "India"
    };

    // Object destructuring
    const { name, role, location } = user;

    // Array destructuring
    const colors = ["Red", "Green", "Blue"];
    const [firstColor, secondColor] = colors;

    return (
        <div style={{ border: "2px solid green", padding: "10px", margin: "10px" }}>
            <h3>Destructuring</h3>
            <p>Name: {name}</p>
            <p>Role: {role}</p>
            <p>Location: {location}</p>

            <p>First Color: {firstColor}</p>
            <p>Second Color: {secondColor}</p>
        </div>
    );
}

export default DestructuringComponent;
