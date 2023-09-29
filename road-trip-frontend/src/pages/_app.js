import React from 'react';
import { Provider } from 'react-redux';
import { buildStore } from '../util/redux';

import Head from 'next/head';
import { CssBaseline } from '@material-ui/core';
import { RoadTripThemeProvider } from '../util/theme';
import NotificationService from "../services/notificationService";
import './StyleSchemes/_app.css';

let initialState = {};
let store = buildStore(initialState);

const RoadTripApp = ({ Component, pageProps }) => {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <NotificationService>
            <Provider store={ store }>
                <Head>
                    <title>Road Trip</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                </Head>

                <RoadTripThemeProvider>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />

                    <Component {...pageProps} />
                </RoadTripThemeProvider>
            </Provider>
        </NotificationService>
    )
};

export default RoadTripApp;