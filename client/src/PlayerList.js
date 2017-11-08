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
                    <div className="card">
                        <div className="card-body">
                            {/* <div id="myCarousel" className="carousel slide" data-ride="carousel">
            
                                <ol className="carousel-indicators">
                                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                    <li data-target="#myCarousel" data-slide-to="1"></li>
                                    <li data-target="#myCarousel" data-slide-to="2"></li>
                                </ol>

                                <div className="carousel-inner">
                                <div className="item active">
                                    <img src="/img/slider/1-1/png" alt="" />
                                </div>
                            
                                <div className="item">
                                    <img src="/img/slider/1-2/png" alt="" />
                                </div>
                            
                                <div className="item">
                                <img src="/img/slider/1/png" alt="" />
                                </div>
                            </div>
          
                            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                                <span className="glyphicon glyphicon-chevron-left"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                                <span className="glyphicon glyphicon-chevron-right"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div> */}
                            
                            <h1 className="display-4 font-bold mb-5 Up">Рейтинг игроков</h1>
                            <table className="table secondary-color-dark text-white text-center animated zoomIn">
                                <thead>
                                    <tr>
                                        {/* <th>№</th> */}
                                        <th className="text-center"># место</th>
                                        <th className="text-center">Имя игрока</th>
                                        <th className="text-center">Количество очков</th>
                                        {/* <th>Contact</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.players.map(function(player) {
                                        return (<tr key={player.id}>
                                            {/* <th scope="row">{t('id = ')}{player.id}</th> */}
                                            <th scope="row"><h3>{player.rating}{t(')')}</h3></th>
                                            <td><h3>{player.name}</h3></td>
                                            <td><h3>{player.score}</h3></td>
                                            {/* <td>{t('phone = ')}{player.phone}</td> */}
                                        </tr>);
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
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

