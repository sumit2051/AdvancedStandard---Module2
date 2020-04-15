import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'profile',
            
        }
        this.showProfileData = this.showProfileData.bind(this)
        this.showVideoData = this.showVideoData.bind(this)
        this.onLinkedinClick = this.onLinkedinClick.bind(this)
        this.onGithubClick = this.onGithubClick.bind(this)
        this.onCvClick = this.onCvClick.bind(this)
    };

    showProfileData() {
        this.setState({ view: 'profile' })
    }
    showVideoData() {        
        this.setState({ view: 'video' })
        this.refs.video.play()
    }
    onLinkedinClick() {
        window.location.href = this.props.talent.linkedInUrl ? this.props.talent.linkedInUrl : "https://www.linkedin.com/in/sumit-shrestha-437701196/";
    }
    onGithubClick() {
        window.location.href = this.props.talent.githubUrl ? this.props.talent.githubUrl : "https://github.com/sumit2051"
    }
    onCvClick() {
        window.location.href = this.props.talent.cVUrl ? this.props.talent.cVUrl : "https://www.cbs.dk/files/cbs.dk/cv_template_sheet_en.pdf"
    }
    render() {
        const { talent } = this.props       
        const skillsList = talent.skills
            ? talent.skills.map(skill => <label key={skill} className="ui basic blue label">{skill}</label>)
            : null
        const photoId = talent.photoId ? talent.photoId : "http://localhost:60290/images/Cart-Hero.png"        
        const middleContent = this.state.view == 'video'
            ? (
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=RKr-U1r1AlM'
                    className='react-player'
                    playing
                    width="100%"
                    height="100%"
                    ref="videos"
                />               
            )
            : (
                <div className="content" style={{ padding: "0" }}>
                    <div className="ui grid">
                        <div className="eight wide column">
                            <div className="image">
                                <img src={photoId} width="100%" height="100%" />
                            </div>
                        </div>
                        <div className="eight wide column">
                            <div className="ui basic segment">
                                <h3 className="ui header">Talent snapshot</h3>
                                <h5 className="ui header">CURRENT EMPLOYER
                                        <div className="sub header">
                                        {talent.currentEmployment}
                                    </div>
                                </h5>
                                <h5 className="ui header">VISA STATUS
                                        <div className="sub header">
                                        {talent.visa}
                                    </div>
                                </h5>
                                <h5 className="ui header">POSITION
                                        <div className="sub header">
                                        {talent.position}
                                    </div>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            )
        return (
            <div className="ui fluid card" key={talent.id}>
                <div className="content">
                    <div className="left floated header">{talent.name}</div>
                    <i className="right floated big star icon" />
                </div>
                {middleContent}
                <div className="content">
                    <div className="ui grid">
                        <div className="four column row">
                            <div className="center aligned column">
                                {this.state.view == 'video'
                                    ? <i className="large user link icon" onClick={this.showProfileData} />
                                    : <i className="large video link icon" onClick={() => {
                                        this.setState({ view: 'video' }), this.refs.videos.getInternalPlayer().play()
                                    }} />
                        }
                            </div>
                            <div className="center aligned column"><i className="large file pdf outline link icon" onClick={this.onCvClick}/></div>
                            <div className="center aligned column"><i className="large linkedin link icon" onClick={this.onLinkedinClick}/></div>
                            <div className="center aligned column"><i className="large github link icon" onClick={this.onGithubClick} /></div>
                        </div>
                    </div>
                </div>
                <div className="extra content">
                    {skillsList}
                </div>
            </div>
        )
    }
}

