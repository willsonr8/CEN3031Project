import { useEffect, useState } from 'react';

export default function Home() {
    const [message, setMessage] = useState('Hello World!');

    useEffect(() => {
        fetch('http://localhost:3000/hello/')
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.message);
            });
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}
