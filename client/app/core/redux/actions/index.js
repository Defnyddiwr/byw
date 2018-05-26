const types = {
    setLanguage: "com.byw.set-language",
    setLocations: "com.byw.set-locations",
    requestLocations: "com.byw.request-locations",
    filterLocations: "com.byw.filter-locations",
    setFilteredLocations: "com.byw.set-filtered-locations",
    filterLocationsByPolygon: "com.byw.filter-locations-by-polygon"
};

const setLanguageAction = function (language) {
    return { type: types.setLanguage, payload: language };
};

const setLocationsAction = function (data) {
    return { type: types.setLocations, payload: data };
};

const requestLocationsAction = function () {
    return { type: types.requestLocations, payload: {} };
};

const filterLocationsAction = function (filterString, filterDistance) {
    return { type: types.filterLocations, payload: { filterString, filterDistance } };
};

const filterLocationsByPolygon = function (polygon) {
    return { type: types.filterLocationsByPolygon, payload: polygon };
};

const setFilteredLocationsAction = function (locations) {
    return { type: types.setFilteredLocations, payload: locations };
};

export {
    types,
    setLanguageAction,
    setLocationsAction,
    requestLocationsAction,
    filterLocationsAction,
    filterLocationsByPolygon,
    setFilteredLocationsAction
};