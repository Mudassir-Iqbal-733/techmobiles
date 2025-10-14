import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const isLogin = useSelector((state) => state.auth.isLogin);

    return (isLogin === true) ? children : <Navigate to="/" />;
};

export default ProtectedRoute;