interface ListItemData {
    id: number;
    title: string;
    description?: string;
    priority?: 'high' | 'medium' | 'low';
}

interface ListItemProps {
    data: ListItemData;
}

export default function ListItem({ data }: ListItemProps) {
    const priorityColors: Record<string, string> = {
        high: '#ff6b6b',
        medium: '#ffd93d',
        low: '#6bcf7f'
    };

    const priorityColor = data.priority ? priorityColors[data.priority] : '#999';

    return (
        <div style={{
            padding: '16px',
            backgroundColor: '#f9f9f9',
            borderLeft: `4px solid ${priorityColor}`,
            borderRadius: '4px',
            marginBottom: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h3 style={{ margin: '0 0 4px 0', color: '#333', fontSize: '16px' }}>
                        {data.title}
                    </h3>
                    {data.description && (
                        <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                            {data.description}
                        </p>
                    )}
                </div>
                {data.priority && (
                    <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: priorityColor,
                        color: '#fff',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                    }}>
                        {data.priority}
                    </span>
                )}
            </div>
        </div>
    );
}
