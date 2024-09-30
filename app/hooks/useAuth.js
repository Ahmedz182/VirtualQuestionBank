import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const isLogin = localStorage.getItem('Login');
        if (!isLogin) {
            router.push('/auth/login');
        }
    });
};

export default useAuth;
