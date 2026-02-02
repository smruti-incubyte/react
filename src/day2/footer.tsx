interface FooterProps {
    text?: string;
    year?: number;
}

export default function Footer({ text = 'My App', year = new Date().getFullYear() }: FooterProps) {
    return (
        <footer style={{
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderTop: '1px solid #ddd',
            marginTop: '20px',
            textAlign: 'center',
            color: '#666'
        }}>
            <p style={{ margin: '0' }}>
                &copy; {year} {text}. All rights reserved.
            </p>
        </footer>
    );
}
