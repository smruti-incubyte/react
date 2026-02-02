interface ListProps {
    items: string[];
    ordered?: boolean;
}

export default function List({ items, ordered = false }: ListProps) {
    const ListComponent = ordered ? 'ol' : 'ul';

    return (
        <ListComponent style={{
            width: '100%',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            margin: '20px auto'
        }}>
            {items.map((item, index) => (
                <li key={index} style={{
                    padding: '10px 0',
                    color: '#333',
                    fontSize: '16px',
                    borderBottom: index !== items.length - 1 ? '1px solid #eee' : 'none'
                }}>
                    {item}
                </li>
            ))}
        </ListComponent>
    );
}
