import React, { useContext } from 'react';
import {
    Container,
    Col
} from 'react-bootstrap';
import styles from './styles.module.css';
import background from "../../assets/network.jpg";
import { Context } from '../../controllers/context_provider'
import { useHistory } from "react-router-dom";
import Login from '../../components/login/login'
import { requestLogin } from '../../requesters/account_requester'

function LoginScreen() {
    const history = useHistory();
    const { setLogged } = useContext(Context);
    
    const login = async (email, password) => {
        console.log("Trying to login")
        try {
            const [status, res] = await requestLogin(email, password);

            const success = status === 200;

            console.log("Res is ", res)

            if (success) {
                setLogged(true)
                history.push("/");
            }

            return success;
        } catch (e) {
            console.log("Error")
            return false;
        }
    }

    return (
        <Container
            fluid
            style={{backgroundImage: `url(${background}` }}
            className={styles.loginBackground}
        >
            <Col className={styles.login}>
                <Login
                    login={login}
                    forgotPassUrl={"/forgot-password"}
                    registerUrl={"/register"}
                />
            </Col>
        </Container>
    );
};

export default LoginScreen;
