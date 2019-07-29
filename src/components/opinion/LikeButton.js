import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// mui icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

// redux
import { connect } from 'react-redux';
import { likeOpinion, unlikeOpinion } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
	likedOpinion = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find(
				like => like.opinionId === this.props.opinionId
			)
		)
			return true;
		else return false;
	};

	likeOpinion = () => {
		this.props.likeOpinion(this.props.opinionId);
	};
	unlikeOpinion = () => {
		this.props.unlikeOpinion(this.props.opinionId);
	};

	render() {
		const { authenticated } = this.props.user;
		const likeButton = !authenticated ? (
			<Link to='/login'>
				<MyButton tip='Like'>
					<FavoriteBorder color='primary' />
				</MyButton>
			</Link>
		) : this.likedOpinion() ? (
			<MyButton tip='Undo like' onClick={this.unlikeOpinion}>
				<FavoriteIcon color='primary' />
			</MyButton>
		) : (
			<MyButton tip='Like Opinion' onClick={this.likeOpinion}>
				<FavoriteBorder color='primary' />
			</MyButton>
		);
		return likeButton;
	}
}

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	opinionId: PropTypes.string.isRequired,
	likeOpinion: PropTypes.func.isRequired,
	unlikeOpinion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	user: state.user
});

const mapActionsToProps = {
	likeOpinion,
	unlikeOpinion
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(LikeButton);
