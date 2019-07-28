import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteOpinion from './DeleteOpinion';
import OpinionDialog from './OpinionDialog';

// Redux stuff
import { connect } from 'react-redux';
import { likeOpinion, unlikeOpinion } from '../redux/actions/dataActions';

// Mui Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles = {
	card: {
		position: 'relative',
		display: 'flex',
		marginBottom: 20
	},
	image: {
		minWidth: 200
	},
	content: {
		padding: 25,
		objectFit: 'cover'
	}
};

class Opinion extends Component {
	likedOpinion = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find(
				like => like.opinionId === this.props.opinion.opinionId
			)
		)
			return true;
		else return false;
	};

	likeOpinion = () => {
		this.props.likeOpinion(this.props.opinion.opinionId);
	};
	unlikeOpinion = () => {
		this.props.unlikeOpinion(this.props.opinion.opinionId);
	};
	render() {
		dayjs.extend(relativeTime);
		const {
			classes,
			opinion: {
				body,
				createdAt,
				userImage,
				userHandle,
				opinionId,
				likeCount,
				commentCount
			},
			user: {
				authenticated,
				credentials: { handle }
			}
		} = this.props;
		const likeButton = !authenticated ? (
			<MyButton tip='Like'>
				<Link to='/login'>
					<FavoriteBorder color='primary' />
				</Link>
			</MyButton>
		) : this.likedOpinion() ? (
			<MyButton tip='Undo like' onClick={this.unlikeOpinion}>
				<FavoriteIcon color='primary' />
			</MyButton>
		) : (
			<MyButton tip='Like Opinion' onClick={this.likeOpinion}>
				<FavoriteBorder color='primary' />
			</MyButton>
		);
		const deleteButton =
			authenticated && userHandle === handle ? (
				<DeleteOpinion opinionId={opinionId} />
			) : null;
		return (
			<Card className={classes.card}>
				<CardMedia
					image={userImage}
					title='Profile image'
					className={classes.image}
				/>
				<CardContent className={classes.content}>
					<Typography
						variant='h5'
						component={Link}
						to={`/users/${userHandle}`}
						color='primary'
					>
						{userHandle}
					</Typography>
					{deleteButton}
					<Typography variant='body2' color='textSecondary'>
						{dayjs(createdAt).fromNow()}
					</Typography>
					<Typography variant='body1'>{body}</Typography>
					{likeButton}
					<span>{likeCount} Likes</span>
					<MyButton tip='Comments'>
						<ChatIcon color='primary' />
					</MyButton>
					<span>{commentCount} Comments</span>
					<OpinionDialog opinionId={opinionId} userHandle={userHandle} />
				</CardContent>
			</Card>
		);
	}
}

Opinion.propTypes = {
	likeOpinion: PropTypes.func.isRequired,
	unlikeOpinion: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	opinion: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
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
)(withStyles(styles)(Opinion));
