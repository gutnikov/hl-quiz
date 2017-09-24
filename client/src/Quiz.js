import React from 'react';

function Quiz({location}) {

    const match = location.search.match(/p1=(\d+)&p2=(\d+)/);
    if (match) {
        const [, p1, p2] = match;
        return (
            <div>{`Player ${p1} VS Player ${p2}`}</div>
        );
    } else {
        return <div>Wrong or missing player id</div>;
    }

}

export default Quiz;
