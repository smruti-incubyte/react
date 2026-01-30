function SpreadOperatorComponent() {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    // Spread arrays
    const combined = [...arr1, ...arr2];

    const user = { name: "Smruti", role: "Developer" };

    // Spread objects
    const updatedUser = { ...user, role: "Senior Developer" };

    return (
        <div style={{ border: "2px solid red", padding: "10px", margin: "10px" }}>
            <h3>Spread Operator</h3>

            <p>Combined Array: {combined.join(", ")}</p>

            <p>Original Role: {user.role}</p>
            <p>Updated Role: {updatedUser.role}</p>
        </div>
    );
}

export default SpreadOperatorComponent;
