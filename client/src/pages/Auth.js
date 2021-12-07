import React, { useContext, useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
	const { user } = useContext(Context);
	const location = useLocation();
	const history = useHistory();
	const isLogin = location.pathname === LOGIN_ROUTE;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const click = async () => {
		try {
			if (isLogin) {
				user.setUser(await login(email, password));
			} else {
				user.setUser(await registration(email, password));
			}
			user.setIsAuth(true);
		} catch (e) {
			alert(e.response.data.message);
		}
	};

	return (
		<div className="main-width">
			<h2>Авторизация</h2>
			<form>
				<div>
					<label>
						Email:
						<input
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</label>
					<label>
						Пароль:
						<input
							placeholder="Пароль"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
						/>
					</label>
				</div>
				<div>
					{isLogin ? (
						<div>
							<span>Нет аккаунта? </span>
							<NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
						</div>
					) : (
						<div>
							<span>Есть аккаунт? </span>
							<NavLink to={LOGIN_ROUTE}>Авторизироваться</NavLink>
						</div>
					)}
					<button onClick={click}>{isLogin ? "Войти" : "Регистрация"}</button>
				</div>
			</form>
		</div>
	);
});

export default Auth;
