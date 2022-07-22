import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect } from "react";
import { checkAuthToken } from "../redux/auth/LoginThunks";
import { Products } from '../pages/Products';
import { LoadingPage } from '../pages/LoadingPage';
import { CategoriesPage } from '../pages/CategoriesPage';

export const AppRouter = () => {


  const { status } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthToken() as any)
  }, [dispatch])

  if (status === 'checking') {
    return (
      <LoadingPage />
    )
  }


  return (
    <div className="App">
      <Routes>

        {
          (status === 'no-authenticated')
            ?
            (
              <>
                <Route path="/" element={<LoginPage />} />
                <Route path="register/" element={<RegisterPage />} />
              </>
            )
            : (
              <>
                <Route path='/' element={<Products />} />
                <Route path='/categories' element={<CategoriesPage />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </>
            )
        }

      </Routes>
    </div>
  );
}