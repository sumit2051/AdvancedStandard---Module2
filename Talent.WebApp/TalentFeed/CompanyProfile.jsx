import React from 'react';
import { Loader } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.company) return null
        const { company } = this.props
        const profilePhoto = this.props.profilePhotoUrl ? this.props.profilePhotoUrl : "http://localhost:60290/images/sumitTelecom.jpg"
        return (
            <React.Fragment>


                <div className="content">
                    <div className="center aligned">
                        <div className="ui circular tiny image">
                            <img src={profilePhoto} />
                        </div>
                    </div>
                    <br />
                    <div className="center aligned header">{company.name}</div>
                    <div className="center aligned meta"><i className="map pin icon" />{`${company.location.city}, ${company.location.country}`}</div>
                    <div className="center aligned description">
                        We are number one company in the telecom industry.
                </div>
                </div>
                <div className="extra content">
                    <a><i className="phone icon" />: {company.phone}</a>
                    <br />
                    <a><i className="mail icon" />: {company.email}</a>
                </div>
            </React.Fragment>
        )
    }
}