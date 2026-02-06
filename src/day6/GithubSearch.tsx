import { useState } from 'react';
import axios from 'axios';

interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
    name: string;
    bio: string;
    public_repos: number;
    followers: number;
}

export default function GithubSearch() {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const searchUser = async () => {
        if (!username.trim()) return;

        setLoading(true);
        setError('');
        setUser(null);

        try {
            const response = await axios.get<GitHubUser>(
                `https://api.github.com/users/${username}`
            );
            setUser(response.data);
        } catch (err) {
            setError(axios.isAxiosError(err) && err.response?.status === 404
                ? 'User not found'
                : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ color: '#fff', marginBottom: '30px' }}>GitHub User Search</h1>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchUser()}
                    placeholder="Enter GitHub username"
                    style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '2px solid #30a3a0' }}
                />
                <button
                    onClick={searchUser}
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#30a3a0',
                        color: '#fff',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    Search
                </button>
            </div>

            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '5px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '5px solid #fff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            )}

            {error && <div style={{ color: '#ff6b6b', marginBottom: '20px', textAlign: 'center', fontSize: '16px' }}>{error}</div>}

            {user && (
                <div style={{
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                    color: '#333',
                    textAlign: 'center'
                }}>
                    <img
                        src={user.avatar_url}
                        alt={user.login}
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            border: '4px solid #30a3a0',
                            marginBottom: '20px'
                        }}
                    />
                    <h2 style={{ margin: '0 0 10px 0', fontSize: '28px', color: '#333' }}>{user.name || user.login}</h2>
                    <p style={{ color: '#666', marginBottom: '20px', fontSize: '16px' }}>{user.bio}</p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '30px',
                        marginBottom: '20px',
                        fontSize: '16px'
                    }}>
                        <div>
                            <strong style={{ color: '#30a3a0' }}>Repos:</strong> {user.public_repos}
                        </div>
                        <div>
                            <strong style={{ color: '#30a3a0' }}>Followers:</strong> {user.followers}
                        </div>
                    </div>
                    <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            padding: '10px 24px',
                            backgroundColor: '#30a3a0',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        View Profile
                    </a>
                </div>
            )}
        </div>
    );
}
