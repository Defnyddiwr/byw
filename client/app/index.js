import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import { privacyRoute } from "./pages/privacy";
import { route } from "./nav";
import About from "./pages/about";
import App from "./app";
import Home from "./pages/home";
import isBrowser from "./core/is-browser";
import makeApiClient from "./core/api-client";
import makeFilterLocationsMiddleware from "./core/redux/middleware/filter-locations-middleware";
import makeRequestLocationsMiddleware from "./core/redux/middleware/request-locations-middleware";
import makeSubmitMiddleware from "./core/redux/middleware/submit-middleware";
import MapPage from "./pages/map";
import Privacy from "./pages/privacy";
import reducers from "./core/redux/reducers";
import Submit from "./pages/submit";

const hostname = function (window) {
    return window.location.hostname;
};

const isStagingEntryPoint = function () {
    if (!isBrowser()) { return false; }
    return hostname(window).includes("github"); // Temp fix for gh-pages staging environment
};

const stageRoute = function (url) {
    return `/byw/${url}`;
};

const routes = [
    { url: route.home, component: Home },
    { url: route.map, component: MapPage },
    { url: route.about, component: About },
    { url: route.submit, component: Submit },
    { url: privacyRoute.url, component: Privacy }
];

const makeRouteWrangler = function (needsStagingRoute) {
    return function (route) {
        return {
            url: (needsStagingRoute) ? stageRoute(route.url) : route.url,
            component: route.component
        };
    };
};

if (isBrowser()) {
    const container = document.getElementById("root");

    if (container) {

        const api = makeApiClient(fetch);

        const store = createStore(
            reducers,
            applyMiddleware(makeRequestLocationsMiddleware(api),
                makeFilterLocationsMiddleware(api),
                makeSubmitMiddleware(api)));


        const components = routes.map(makeRouteWrangler(isStagingEntryPoint()))
            .map(function (route, i) {
                return (<Route key={`route-${i}`} exact path={route.url} component={route.component} />);
            });

        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <App>
                        {components}
                    </App>
                </BrowserRouter>
            </Provider>
            , container);

    }
}