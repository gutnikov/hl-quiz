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
            <div className="row">
                <div className="col-12 animated fadeIn">
                    <h1 className="display-4 font-bold mb-5 Up">Рейтинг игроков</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>№</th> */}
                                <th>Rating</th>
                                <th>Name</th>
                                <th>Score</th>
                                {/* <th>Contact</th> */}
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.players.map(function(player) {
                                return (<tr key={player.id}>
                                    {/* <th scope="row">{t('id = ')}{player.id}</th> */}
                                    <th scope="row">{t('rating = ')}{player.rating}</th>
                                    <td>{t('name = ')}{player.name}</td>
                                    <td>{t('score = ')}{player.score}</td>
                                    {/* <td>{t('phone = ')}{player.phone}</td> */}
                                </tr>);
                            })
                        }
                        </tbody>
                    </table>
                </div>
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

