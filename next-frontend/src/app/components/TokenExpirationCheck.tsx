import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const isTokenExpired = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    const now = Date.now();
    return now >= exp;
};


const CheckTokenExpiration = () => {
    const router = useRouter();

    useEffect(() => {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('access='));
        if (!accessToken || isTokenExpired(accessToken.split('=')[1])) {
            router.push('/login');
        }
    }, [router]);
};

export default CheckTokenExpiration;

