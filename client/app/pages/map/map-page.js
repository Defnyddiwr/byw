import React from "react";
import PropTypes from "prop-types";
import hash from "../../core/hash";
import FullPageMap from "./full-page-map";

class MapPage extends React.Component {

    render() {

        const {
            searchResults,
            searchText,
            searchValueDidChange
        } = this.props;

        const locations = searchResults.map(location => (
            <p key={hash(location.name)}>
                {location.name}<br/>
                {location.address}
            </p>
        ));

        return (

            <div>

                <div style={{ width: "100%", height: "50vh" }}>
                    <FullPageMap searchResults={searchResults}/>
                </div>

                <div className="container full-page-content">
                    <div className="row">
                        <div className="col-md-12">
                        
                            <input type="text" onChange={searchValueDidChange} value={searchText}/>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {locations}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MapPage.propTypes = {
    searchResults: PropTypes.array,
    searchText: PropTypes.string,
    searchValueDidChange: PropTypes.func.isRequired
};

export default MapPage;