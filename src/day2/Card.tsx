import React from "react";

type CardProps = {
    title: string;
    description: string;
    imageUrl: string;
};

const Card: React.FC<CardProps> = ({
    title,
    description,
    imageUrl,
}) => {
    return (
        <div style={styles.card}>
            <img
                src={imageUrl}
                alt={title}
                style={styles.image}
            />

            <div style={styles.content}>
                <h3 style={styles.title}>{title}</h3>
                <p style={styles.text}>{description}</p>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    card: {
        width: "320px",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        backgroundColor: "#fff",
        fontFamily: "system-ui, sans-serif",
    },
    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
    },
    content: {
        padding: "16px",
    },
    title: {
        margin: "0 0 8px",
        fontSize: "18px",
    },
    text: {
        margin: 0,
        color: "#555",
        lineHeight: 1.5,
    },
};

export default Card;
