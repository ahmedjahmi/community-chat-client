import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteOpinion from './DeleteOpinion';
import OpinionDialog from './OpinionDialog';
import LikeButton from './LikeButton';

// Redux stuff
import { connect } from 'react-redux';


// Mui Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

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
					<LikeButton opinionId={opinionId} />
					<span>{likeCount} Likes</span>
					<MyButton tip='Comments'>
						<ChatIcon color='primary' />
					</MyButton>
					<span>{commentCount} Comments</span>
					<OpinionDialog opinionId={opinionId} userHandle={userHandle} openDialog={this.props.openDialog} />
				</CardContent>
			</Card>
		);
	}
}

Opinion.propTypes = {
	user: PropTypes.object.isRequired,
	opinion: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
	user: state.user
});

export default connect(
	mapStateToProps
)(withStyles(styles)(Opinion));
