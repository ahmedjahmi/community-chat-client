import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Opinion from '../components/opinion/Opinion';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import OpinionSkeleton from '../util/OpinionSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
	state = {
		profile: null,
		opinionIdParam: null
	};

	componentDidMount() {
		// .match holds all the url props & .params holds the parameters in the url path
		// `user/:handle/opinion/:opinionId`
		const handle = this.props.match.params.handle;
		// handle is set to the ':handle' in the route path `/user/:handle` in App.js
		const opinionId = this.props.match.params.opinionId;
		// opinionId is set to the ':opinionId' in the route path `user/:handle/opinion/:opinionId` in App.js

		if (opinionId) this.setState({ opinionIdParam: opinionId });

		this.props.getUserData(handle);
		axios
			.get(`/user/${handle}`)
			.then(res => {
				this.setState({
					profile: res.data.user
				});
			})
			.catch(err => console.log(err));
	}
	render() {
		const { opinions, loading } = this.props.data;
		const { opinionIdParam } = this.state;

		const opinionsMarkup = loading ? (
			<OpinionSkeleton />
		) : opinions === null ? (
			<p>No opinions from this user...</p>
		) : !opinionIdParam ? (
			opinions.map(opinion => (
				<Opinion key={opinion.opinionId} opinion={opinion} />
			))
		) : (
			opinions.map(opinion => {
				if (opinion.opinionId !== opinionIdParam)
					return <Opinion key={opinion.opinionId} opinion={opinion} />;
				else return <Opinion key={opinion.opinionId} opinion={opinion} openDialog />;
			})
		);

		return (
			<Grid container spacing={2}>
				<Grid item sm={8} xs={12}>
					{opinionsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					{this.state.profile === null ? (
						<ProfileSkeleton />
					) : (
						<StaticProfile profile={this.state.profile} />
					)}
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	data: state.data
});

user.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

export default connect(
	mapStateToProps,
	{ getUserData }
)(user);
