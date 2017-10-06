import React, {Component} from 'react';
import t from './t';

const TOP_PLAYERS_COUNT = 10;

class PlayerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: []
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.players.map(function(player) {
                        return (<div key={player.id}>
                            <span>{t('id = ')}{player.id} | </span>
                            <span>{t('rating = ')}{player.rating} | </span>
                            <span>{t('name = ')}{player.name} |</span>
                            <span>{t('score = ')}{player.score} |</span>
                            <span>{t('phone = ')}{player.phone} |</span>
                        </div>);
                    })
                }
            </div>
        );
    }

    updatePlayers() {
        // fetch player list
        // TODO: handle errors
        fetch('http://localhost:8080/players')
            .then(function(res) {
                return res.json();
            })
            .then(function(json) {
                json.players.sort(function(a, b) {
                    if (a.score === b.score) {
                        return 0;
                    } else {
                        return a.score < b.score ? 1 : -1;
                    }
                }).slice(TOP_PLAYERS_COUNT);
                this.setState({
                    players: json.players
                });
            }.bind(this));
    }

    componentDidMount() {
        this.updatePlayers();
        this.intervalId = setInterval(this.updatePlayers.bind(this), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

}

export default PlayerList;

