import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Opinion from '../components/Opinion';
import Profile from '../components/Profile';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getOpinions } from '../redux/actions/dataActions';

class home extends Component {
	componentDidMount() {
		this.props.getOpinions();
	}
	render() {
		const { opinions, loading } = this.props.data;
		let recentOpinionsMarkup = !loading ? (
			opinions.map(opinion => (
				<Opinion key={opinion.opinionId} opinion={opinion} />
			))
		) : (
			<p>Loading...</p>
		);
		return (
			<Grid container spacing={2}>
				<Grid item sm={8} xs={12}>
					{recentOpinionsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					<Profile />
				</Grid>
			</Grid>
		);
	}
}

home.propTypes = {
	getOpinions: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	data: state.data
});

export default connect(mapStateToProps, { getOpinions })(home);
