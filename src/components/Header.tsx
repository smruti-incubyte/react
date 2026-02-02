interface HeaderProps {
    title?: string;
    subtitle?: string;
}

export default function Header({ title = 'My App', subtitle }: HeaderProps) {
    return (
        <header style={{
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd',
            marginBottom: '20px'
        }}>
            <h1 style={{ margin: '0 0 8px 0', color: 'GrayText' }}>{title}</h1>
            {subtitle && <p style={{ margin: '0', color: '#666' }}>{subtitle}</p>}
        </header>
    );
}
