import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./cartSlice";
import type { RootState } from "./store";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

const products: Product[] = [
    {
        id: 1,
        name: "Fresh Apples",
        price: 50,
        image: "🍎",
        description: "Crispy and fresh red apples"
    },
    {
        id: 2,
        name: "Bananas",
        price: 30,
        image: "🍌",
        description: "Sweet ripe bananas"
    },
    {
        id: 3,
        name: "Oranges",
        price: 40,
        image: "🍊",
        description: "Juicy citrus oranges"
    },
    {
        id: 4,
        name: "Grapes",
        price: 80,
        image: "🍇",
        description: "Fresh purple grapes"
    },
    {
        id: 5,
        name: "Strawberries",
        price: 120,
        image: "🍓",
        description: "Sweet strawberries"
    },
    {
        id: 6,
        name: "Watermelon",
        price: 60,
        image: "🍉",
        description: "Refreshing watermelon"
    }
];

export default function Cart() {
    const items = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    const itemCount = items.length;

    const handleAddToCart = (product: Product) => {
        dispatch(
            addItem({
                id: Date.now(),
                name: product.name,
                price: product.price
            })
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>🛒 Shopping Cart</h1>
                <div style={styles.cartBadge}>
                    Cart: {itemCount} items | ₹{totalPrice}
                </div>
            </div>

            <div style={styles.mainContent}>
                {/* Products Section */}
                <div style={styles.productsSection}>
                    <h2 style={styles.sectionTitle}>Available Products</h2>
                    <div style={styles.productsGrid}>
                        {products.map((product) => (
                            <div key={product.id} style={styles.productCard}>
                                <div style={styles.productImage}>{product.image}</div>
                                <div style={styles.productInfo}>
                                    <h3 style={styles.productName}>{product.name}</h3>
                                    <p style={styles.productDescription}>
                                        {product.description}
                                    </p>
                                    <div style={styles.productFooter}>
                                        <span style={styles.productPrice}>
                                            ₹{product.price}
                                        </span>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            style={styles.addButton}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart Items Section */}
                <div style={styles.cartSection}>
                    <h2 style={styles.sectionTitle}>Your Cart</h2>
                    {items.length === 0 ? (
                        <div style={styles.emptyCart}>
                            <p style={styles.emptyCartText}>
                                Your cart is empty
                            </p>
                            <p style={styles.emptyCartSubtext}>
                                Add some products to get started!
                            </p>
                        </div>
                    ) : (
                        <div style={styles.cartItems}>
                            {items.map((item) => (
                                <div key={item.id} style={styles.cartItem}>
                                    <div style={styles.cartItemInfo}>
                                        <span style={styles.cartItemName}>
                                            {item.name}
                                        </span>
                                        <span style={styles.cartItemPrice}>
                                            ₹{item.price}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => dispatch(removeItem(item.id))}
                                        style={styles.removeButton}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <div style={styles.cartTotal}>
                                <span style={styles.totalLabel}>Total:</span>
                                <span style={styles.totalAmount}>₹{totalPrice}</span>
                            </div>
                            <button style={styles.checkoutButton}>
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        paddingBottom: "20px",
        borderBottom: "2px solid #e0e0e0"
    },
    title: {
        fontSize: "32px",
        fontWeight: "bold",
        color: "#2c3e50",
        margin: 0
    },
    cartBadge: {
        backgroundColor: "#07534e",
        color: "white",
        padding: "10px 20px",
        borderRadius: "25px",
        fontWeight: "600",
        fontSize: "16px"
    },
    mainContent: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "30px"
    },
    productsSection: {
        flex: 1
    },
    sectionTitle: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#2c3e50",
        marginBottom: "20px"
    },
    productsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px"
    },
    productCard: {
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        border: "2px solid transparent"
    },
    productImage: {
        fontSize: "64px",
        marginBottom: "15px"
    },
    productInfo: {
        width: "100%",
        textAlign: "center"
    },
    productName: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#2c3e50",
        margin: "0 0 8px 0"
    },
    productDescription: {
        fontSize: "14px",
        color: "#7f8c8d",
        margin: "0 0 15px 0"
    },
    productFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: "10px"
    },
    productPrice: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#07534e"
    },
    addButton: {
        backgroundColor: "#07534e",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600",
        transition: "background-color 0.2s"
    },
    cartSection: {
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        padding: "20px",
        height: "fit-content",
        position: "sticky",
        top: "20px"
    },
    emptyCart: {
        textAlign: "center",
        padding: "40px 20px"
    },
    emptyCartText: {
        fontSize: "18px",
        color: "#7f8c8d",
        margin: "0 0 10px 0"
    },
    emptyCartSubtext: {
        fontSize: "14px",
        color: "#95a5a6",
        margin: 0
    },
    cartItems: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    cartItem: {
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
    },
    cartItemInfo: {
        display: "flex",
        flexDirection: "column",
        gap: "5px"
    },
    cartItemName: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#2c3e50"
    },
    cartItemPrice: {
        fontSize: "14px",
        color: "#07534e",
        fontWeight: "600"
    },
    removeButton: {
        backgroundColor: "#e74c3c",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "600"
    },
    cartTotal: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 0",
        marginTop: "10px",
        borderTop: "2px solid #e0e0e0",
        borderBottom: "2px solid #e0e0e0"
    },
    totalLabel: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#2c3e50"
    },
    totalAmount: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#07534e"
    },
    checkoutButton: {
        width: "100%",
        backgroundColor: "#07534e",
        color: "white",
        border: "none",
        padding: "15px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "600",
        marginTop: "15px",
        transition: "background-color 0.2s"
    }
};
