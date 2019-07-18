import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Opinion from '../components/Opinion';

class home extends Component {
    state = {
        opinions: null
    };
    componentDidMount() {
        axios.get('/opinions')
            .then(res => {
                this.setState({
                    opinions: res.data
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        let recentOpinionsMarkup = this.state.opinions ? (
            this.state.opinions.map((opinion) => <Opinion key={opinion.opinionId} opinion={opinion} />)
        ) : <p>Loading...</p>;
        return (
					<Grid container spacing={2}>
						<Grid item sm={8} xs={12}>
							{recentOpinionsMarkup}
						</Grid>
						<Grid item sm={4} xs={12}>
							<p>Profile...</p>
						</Grid>
					</Grid>
				);
    }
}

export default home
