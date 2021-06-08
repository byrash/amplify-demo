import React, { useState } from 'react';
import './App.css';
import Amplify, { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure({
    // OPTIONAL - if your API requires authentication
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'ap-southeast-2:3b5c11d7-c02a-4dfd-be89-32afc10502ec',
        // REQUIRED - Amazon Cognito Region
        region: 'ap-southeast-2',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'ap-southeast-2_rUNap6uVQ',
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '6onidlpidn61h7enehul2af66r',
    },
    API: {
        endpoints: [
            {
                name: 'APIGW-PaletteAPI',
                endpoint: 'https://xrnqtnglpg.execute-api.ap-southeast-2.amazonaws.com',
                region: 'ap-southeast-2',
            },
        ],
    },
});

function App() {
    const [banner, setBanner] = useState('Click to check access');

    function getData(color) {
        const apiName = 'APIGW-PaletteAPI';
        const path = '/prod/colorpicker/' + color;
        API.get(apiName, path)
            .then((response) => {
                setBanner('Congratulations! You have access to a colorful API named ' + response.color);
            })
            .catch((error) => {
                setBanner('Hmm, you do not have access. Please contact your admin about access to ' + color);
                console.log(error.response);
            });
    }

    return (
        <div className="App">
            <header className="App-header">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">
                                <div>{banner}</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <button
                                    className="colorButton"
                                    style={{ background: '#0000ff' }}
                                    onClick={function () {
                                        getData('blue');
                                    }}
                                >
                                    BLUE
                                </button>
                            </td>
                            <td>
                                <button
                                    className="colorButton"
                                    style={{ background: '#00FF00', color: '#000000' }}
                                    onClick={function () {
                                        getData('green');
                                    }}
                                >
                                    GREEN
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    className="colorButton"
                                    style={{ background: '#FF0000' }}
                                    onClick={function () {
                                        getData('red');
                                    }}
                                >
                                    RED
                                </button>
                            </td>
                            <td>
                                <button
                                    className="colorButton"
                                    style={{ background: '#FFFF00', color: '#000000' }}
                                    onClick={function () {
                                        getData('yellow');
                                    }}
                                >
                                    YELLOW
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <AmplifySignOut />
            </header>
        </div>
    );
}

export default withAuthenticator(App);
