import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';


export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 3,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null,
            loadMore: false
        }

        this.init = this.init.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    };

    init() {
        var cookies = Cookies.get('talentAuthToken');
        var headers = {
            'Authorization': 'Bearer ' + cookies,
        }
        $.when(
            //get employer profile
            $.ajax({
                url: 'http://localhost:60290/profile/profile/getEmployerProfile',
                headers: headers,
                type: "GET",
            }),
            $.ajax({
                url: `http://localhost:60290/profile/profile/getTalent`,
                headers: headers,
                type: "GET",
                data: {
                    position: this.state.loadPosition,
                    number: this.state.loadNumber
                }
            }),
        )
            .done(function (resEmployer, resFeed) {
                var employerData = null;
                var feedData = null;


                if (resEmployer[0].employer) {
                    employerData = resEmployer[0].employer.companyContact
                }
                if (resFeed[0].data) {
                    feedData = this.state.feedData.concat(resFeed[0].data);
                }

                let loaderData = TalentUtil.deepCopy(this.state.loaderData)
                loaderData.isLoading = false;
                this.setState({ companyDetails: employerData, feedData, loaderData, loadPosition: 1 })
            }.bind(this))
            .fail(function (e) {
                console.log(e);
            })


    }

    handleScroll() {
        var cookies = Cookies.get('talentAuthToken');
        var headers = {
            'Authorization': 'Bearer ' + cookies,
        }

        $(window).scroll(function () {
            if (($(window).scrollTop() == $(document).height() - $(window).height()) && this.state.loadMore == false) {
                this.setState({ loadMore: true }, function () {
                    $.ajax({
                        url: `http://localhost:60290/profile/profile/getTalent`,
                        headers: headers,
                        type: "GET",
                        data: {
                            position: this.state.loadPosition,
                            number: this.state.loadNumber
                        }
                    }).done(function (resFeed) {
                        var feedData = null;
                        var loadPosition = this.state.loadPosition;
                        if (resFeed.data) {
                            feedData = this.state.feedData.concat(resFeed.data);
                            loadPosition++;
                            console.log(resFeed.data)
                        }

                        this.setState({ feedData, loadMore: false, loadPosition })
                    }.bind(this))
                })
            }
        }.bind(this));
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.init();
    };


    render() {

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui grid">
                            <div className="row">
                                <div className="column four wide ">
                                    <CompanyProfile company={this.state.companyDetails} />
                                </div>
                                <div className="column eight wide ">
                                    {this.state.feedData.map(talent =>
                                        <TalentCard
                                            talent={talent}
                                            key={talent.id}
                                        />)}
                                    {this.state.loadMore
                                        ? <div style={{ 'height': '30rem' }}>
                                            <div className="ui active loader">
                                            </div>
                                        </div>
                                        : null}
                                </div>
                                <div className="column four wide">
                                    <FollowingSuggestion />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </BodyWrapper>
        )
    }
}