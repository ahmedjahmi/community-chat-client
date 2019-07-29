import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

// mui stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// redux stuff
import { connect } from 'react-redux';
import { deleteOpinion } from '../../redux/actions/dataActions';

const styles = {
	deleteButton: {
		position: 'absolute',
		left: '90%',
		top: '10%'
	}
};

class DeleteOpinion extends Component {
	state = {
		open: false
	};
	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};
	deleteOpinion = () => {
        this.props.deleteOpinion(this.props.opinionId);
		this.setState({ open: false });
	};
	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<MyButton
					tip='Delete opinion'
					onClick={this.handleOpen}
					btnClassName={classes.deleteButton}
				>
					<DeleteOutline color='secondary' />
				</MyButton>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth='sm'
				>
					<DialogTitle>
						Are you sure you want to delete this opinion?
					</DialogTitle>
					<DialogActions>
						<Button onClick={this.handleClose} color='primary'>
							Cancel
						</Button>
						<Button onClick={this.deleteOpinion} color='secondary'>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

DeleteOpinion.propTypes = {
	deleteOpinion: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	opinionId: PropTypes.string.isRequired
};

export default connect(
	null,
	{ deleteOpinion }
)(withStyles(styles)(DeleteOpinion));